/**
 * ================================================================
 *  SICOT — Backend API  (Railway-ready)
 *  Node.js + Express + MySQL2
 *
 *  ─── DEPLOY EN RAILWAY ───────────────────────────────────────
 *  1. Sube la carpeta /backend a GitHub
 *  2. Railway → New Project → Deploy from GitHub repo
 *  3. Variables de entorno en Railway:
 *       DATABASE_URL  = mysql://root:cdFLRUidwslSicLWufGKskPbEraFPspX@trolley.proxy.rlwy.net:19348/railway
 *       JWT_SECRET    = sicot_itssnp_2026_secreto
 *       FRONTEND_URL  = https://sicot-app.vercel.app   (poner tu URL de Vercel)
 *       NODE_ENV      = production
 *
 *  ─── DEV LOCAL ───────────────────────────────────────────────
 *  Crea el archivo .env en la raíz del backend:
 *       DATABASE_URL=mysql://root:cdFLRUidwslSicLWufGKskPbEraFPspX@trolley.proxy.rlwy.net:19348/railway
 *       JWT_SECRET=sicot_itssnp_2026_secreto
 *       PORT=3001
 *
 *  npm install && node server.js
 * ================================================================
 */

require("dotenv").config()
const express = require("express")
const mysql   = require("mysql2/promise")
const jwt     = require("jsonwebtoken")
const cors    = require("cors")
const crypto  = require("crypto")

const app  = express()
const PORT = process.env.PORT || 3001

/* ── CORS ────────────────────────────────────────────────────── */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) return cb(null, true)
    cb(new Error("CORS bloqueado: " + origin))
  },
  credentials: true,
}))
app.use(express.json())

/* ── Pool MySQL — soporta DATABASE_URL o variables separadas ─── */
function parseDbUrl(url) {
  try {
    const u = new URL(url)
    return {
      host:     u.hostname,
      port:     Number(u.port) || 3306,
      user:     decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: u.pathname.slice(1),
    }
  } catch { return null }
}

const dbCfg = process.env.DATABASE_URL
  ? parseDbUrl(process.env.DATABASE_URL)
  : {
      host:     process.env.DB_HOST || "localhost",
      port:     Number(process.env.DB_PORT) || 3306,
      user:     process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "railway",
    }

const pool = mysql.createPool({
  ...dbCfg,
  waitForConnections: true,
  connectionLimit:    10,
  charset:            "utf8mb4",
  ssl: { rejectUnauthorized: false },   // Railway requiere SSL
})

/* ── Verificar conexión al arrancar ─────────────────────────── */
;(async () => {
  try {
    const conn = await pool.getConnection()
    console.log("✅  MySQL conectado →", dbCfg.database, "@", dbCfg.host)
    conn.release()
  } catch (err) {
    console.error("❌  Error MySQL:", err.message)
    process.exit(1)
  }
})()

/* ── Health check (Railway lo usa para saber si el server vive) ─ */
app.get("/health", (_req, res) => res.json({ status: "ok", ts: new Date() }))
app.get("/",       (_req, res) => res.json({ app: "SICOT API", version: "1.0.0" }))

function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" })
  }
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET || "sicot_secret_2026")
    next()
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" })
  }
}

function soloAdmin(req, res, next) {
  if (req.user?.tipo !== "admin") return res.status(403).json({ error: "Acceso denegado" })
  next()
}

/* ================================================================
   AUTH
   POST /api/auth/login
   ================================================================ */
app.post("/api/auth/login", async (req, res) => {
  const { usuario, password } = req.body

  if (!usuario || !password) {
    return res.status(400).json({ error: "Usuario y contraseña requeridos." })
  }

  try {

    /* ── ¿Es administrador? Buscar en tabla usuario_admin ── */
    const [[adminRow]] = await pool.query(
      `SELECT id_admin, usuario, nombre, clave
       FROM usuario_admin
       WHERE usuario = ? AND activo = 1 LIMIT 1`,
      [usuario.trim().toLowerCase()]
    )

    if (adminRow) {
      const hashInput = crypto.createHash("sha256").update(password).digest("hex")
      if (hashInput !== adminRow.clave) {
        return res.status(401).json({ error: "Credenciales incorrectas." })
      }
      const token = jwt.sign(
        { tipo: "admin", id: adminRow.id_admin, nombre: adminRow.nombre },
        process.env.JWT_SECRET || "sicot_secret_2026",
        { expiresIn: "8h" }
      )
      return res.json({
        tipo_usuario:    "admin",
        num_control:     null,
        nombre_completo: adminRow.nombre,
        token,
      })
    }

    /* ── ¿Es alumno? (no era admin) ── */
    const numControl = Number(usuario.trim())
    if (!numControl) {
      return res.status(401).json({ error: "Usuario o número de control no encontrado." })
    }

    const [[alumno]] = await pool.query(
      `SELECT num_control, nombre_completo, clave FROM alumno WHERE num_control = ? LIMIT 1`,
      [numControl]
    )

    if (!alumno) {
      return res.status(401).json({ error: "Número de control no encontrado." })
    }

    /* La clave en BD es SHA-256 de la contraseña SICOT.
       Comparamos el SHA-256 del password recibido con el hash almacenado.
       Si usaste bcrypt, cambia esto por: bcrypt.compare(password, alumno.clave) */
    const hashInput = crypto.createHash("sha256").update(password).digest("hex")

    if (hashInput !== alumno.clave) {
      return res.status(401).json({ error: "Contraseña incorrecta." })
    }

    /* Obtener el periodo activo */
    const [[periodo]] = await pool.query(
      `SELECT id_perio FROM periodo_escolar WHERE activo = 1 LIMIT 1`
    )

    const token = jwt.sign(
      { tipo: "alumno", id: alumno.num_control, nombre: alumno.nombre_completo },
      process.env.JWT_SECRET || "sicot_secret_2026",
      { expiresIn: "4h" }
    )

    return res.json({
      tipo_usuario:    "alumno",
      num_control:     alumno.num_control,
      nombre_completo: alumno.nombre_completo,
      id_perio:        periodo?.id_perio ?? null,
      token,
    })

  } catch (err) {
    console.error("Error en /auth/login:", err)
    return res.status(500).json({ error: "Error interno del servidor." })
  }
})

/* ================================================================
   ALUMNO — Panel y tutores asignados
   GET /api/alumno/perfil
   ================================================================ */
app.get("/api/alumno/perfil", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") return res.status(403).json({ error: "Acceso denegado" })

  const numControl = req.user.id
  try {
    /* Datos del alumno + carrera */
    const [[alumno]] = await pool.query(`
      SELECT a.num_control, a.nombre_completo, a.correo_e,
             c.nombre AS carrera, c.nombre_corto AS siglas,
             a.semestre
      FROM   alumno a
      JOIN   carrera c ON c.id_carre = a.id_carre
      WHERE  a.num_control = ?
    `, [numControl])

    if (!alumno) return res.status(404).json({ error: "Alumno no encontrado." })

    /* Periodo activo */
    const [[periodo]] = await pool.query(
      `SELECT id_perio, nombre FROM periodo_escolar WHERE activo = 1 LIMIT 1`
    )

    /* Tutores asignados en grupos del periodo activo */
    const [tutores] = await pool.query(`
      SELECT  d.id_doce AS id,
              CONCAT(d.grado, ' ', d.nombre, ' ', d.apellidos) AS nombre,
              CONCAT('Tutoría — ', c.nombre_corto, ' ', g.nombre_grupo) AS materia,
              g.nombre_grupo AS grupo
      FROM    inscripcion i
      JOIN    grupo g       ON g.id_grupo = i.id_grupo
      JOIN    docente d     ON d.id_doce  = g.id_doce
      JOIN    carrera c     ON c.id_carre = g.id_carre
      WHERE   i.num_control = ?
        AND   g.id_perio    = ?
        AND   i.activo      = 1
      ORDER BY d.apellidos
    `, [numControl, periodo?.id_perio])

    return res.json({
      ...alumno,
      periodo: periodo?.nombre ?? "Sin periodo activo",
      tutores,
    })

  } catch (err) {
    console.error("Error en /alumno/perfil:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ================================================================
   ALUMNO — Verificar si ya evaluó a un tutor
   GET /api/alumno/evaluaciones
   ================================================================ */
app.get("/api/alumno/evaluaciones", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") return res.status(403).json({ error: "Acceso denegado" })

  const numControl = req.user.id
  try {
    const [[periodo]] = await pool.query(
      `SELECT id_perio FROM periodo_escolar WHERE activo = 1 LIMIT 1`
    )

    const [rows] = await pool.query(`
      SELECT id_doce, estado
      FROM   evaluacion_docente
      WHERE  num_control = ?
        AND  id_perio    = ?
    `, [numControl, periodo?.id_perio])

    /* Devuelve array de { idTutor, completada } */
    const evaluaciones = rows.map(r => ({
      idTutor:    r.id_doce,
      completada: r.estado === 3,   /* 3 = Completada según el schema */
    }))

    return res.json({ evaluaciones })

  } catch (err) {
    console.error("Error en /alumno/evaluaciones:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ================================================================
   ENCUESTA — Obtener preguntas
   GET /api/encuesta/preguntas?idTutor=X
   ================================================================ */
app.get("/api/encuesta/preguntas", authMiddleware, async (req, res) => {
  const { idTutor } = req.query
  if (!idTutor) return res.status(400).json({ error: "idTutor requerido." })

  try {
    /* Obtener la encuesta de tutoría activa */
    const [[encuesta]] = await pool.query(`
      SELECT e.id_encuesta
      FROM   encuesta e
      JOIN   tipo_encuesta te ON te.id_tipo_encuesta = e.id_tipo_encuesta
      WHERE  te.id_tipo_encuesta = 2   -- 2 = Tutoría
        AND  e.activa = 1
      LIMIT 1
    `)

    if (!encuesta) return res.status(404).json({ error: "No hay encuesta activa." })

    const [preguntas] = await pool.query(`
      SELECT p.id_pregunta AS id,
             p.id_categoria AS idCategoria,
             p.texto
      FROM   pregunta p
      WHERE  p.id_encuesta = ?
      ORDER  BY p.orden
    `, [encuesta.id_encuesta])

    return res.json({ idEncuesta: encuesta.id_encuesta, preguntas })

  } catch (err) {
    console.error("Error en /encuesta/preguntas:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ================================================================
   EVALUACIÓN — Iniciar (crea el header si no existe)
   POST /api/evaluacion/iniciar
   Body: { idTutor, idGrupo }
   ================================================================ */
app.post("/api/evaluacion/iniciar", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") return res.status(403).json({ error: "Acceso denegado" })

  const numControl = req.user.id
  const { idTutor, idGrupo } = req.body

  if (!idTutor || !idGrupo) return res.status(400).json({ error: "idTutor e idGrupo requeridos." })

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    const [[periodo]] = await conn.query(
      `SELECT id_perio FROM periodo_escolar WHERE activo = 1 LIMIT 1`
    )
    const [[encuesta]] = await conn.query(`
      SELECT id_encuesta FROM encuesta
      WHERE  id_tipo_encuesta = 2 AND activa = 1 LIMIT 1
    `)

    if (!periodo || !encuesta) {
      await conn.rollback()
      return res.status(409).json({ error: "No hay encuesta o periodo activo." })
    }

    /* Verificar si ya existe */
    const [[existente]] = await conn.query(`
      SELECT id_evaluacion, estado
      FROM   evaluacion_docente
      WHERE  num_control = ? AND id_doce = ? AND id_perio = ?
      LIMIT 1
    `, [numControl, idTutor, periodo.id_perio])

    if (existente?.estado === 3) {
      await conn.rollback()
      return res.status(409).json({ error: "Ya completaste esta evaluación." })
    }

    let idEvaluacion
    if (existente) {
      idEvaluacion = existente.id_evaluacion
    } else {
      const [ins] = await conn.query(`
        INSERT INTO evaluacion_docente
          (num_control, id_encuesta, id_doce, id_grupo, id_perio, estado, pagina_actual)
        VALUES (?, ?, ?, ?, ?, 1, 0)
      `, [numControl, encuesta.id_encuesta, idTutor, idGrupo, periodo.id_perio])
      idEvaluacion = ins.insertId
    }

    await conn.commit()
    return res.json({ idEvaluacion, idEncuesta: encuesta.id_encuesta })

  } catch (err) {
    await conn.rollback()
    console.error("Error en /evaluacion/iniciar:", err)
    return res.status(500).json({ error: "Error interno." })
  } finally {
    conn.release()
  }
})

/* ================================================================
   EVALUACIÓN — Guardar respuestas y completar
   POST /api/evaluacion/responder
   Body: { idEvaluacion, respuestas: [{ idPregunta, calificacion }] }
   ================================================================ */
app.post("/api/evaluacion/responder", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") return res.status(403).json({ error: "Acceso denegado" })

  const { idEvaluacion, respuestas } = req.body

  if (!idEvaluacion || !Array.isArray(respuestas) || respuestas.length === 0) {
    return res.status(400).json({ error: "Datos incompletos." })
  }

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    /* Verificar que la evaluación pertenece al alumno y no está cerrada */
    const [[ev]] = await conn.query(`
      SELECT id_evaluacion, estado, num_control
      FROM   evaluacion_docente
      WHERE  id_evaluacion = ? LIMIT 1
    `, [idEvaluacion])

    if (!ev) {
      await conn.rollback()
      return res.status(404).json({ error: "Evaluación no encontrada." })
    }
    if (ev.num_control !== req.user.id) {
      await conn.rollback()
      return res.status(403).json({ error: "No es tu evaluación." })
    }
    if (ev.estado === 3) {
      await conn.rollback()
      return res.status(409).json({ error: "La evaluación ya fue completada." })
    }

    /* Insertar respuestas (INSERT IGNORE evita duplicados) */
    for (const r of respuestas) {
      await conn.query(`
        INSERT IGNORE INTO respuesta_evaluacion
          (id_evaluacion, id_pregunta, calificacion)
        VALUES (?, ?, ?)
      `, [idEvaluacion, r.idPregunta, r.calificacion])
    }

    /* Marcar como completada usando el stored procedure */
    await conn.query(`CALL sp_CompletarEvaluacion(?, @ok, @msg)`, [idEvaluacion])
    const [[result]] = await conn.query(`SELECT @ok AS ok, @msg AS msg`)

    await conn.commit()

    if (result.ok === 1) {
      return res.json({ success: true, mensaje: "Evaluación completada exitosamente." })
    } else {
      return res.status(400).json({ error: result.msg || "No se pudo completar la evaluación." })
    }

  } catch (err) {
    await conn.rollback()
    console.error("Error en /evaluacion/responder:", err)
    return res.status(500).json({ error: "Error interno." })
  } finally {
    conn.release()
  }
})

/* ================================================================
   DASHBOARD — Resultados por docente y periodo
   GET /api/dashboard/resultados?idDocente=X&idPeriodo=Y
   ================================================================ */
app.get("/api/dashboard/resultados", authMiddleware, soloAdmin, async (req, res) => {
  const { idDocente, idPeriodo } = req.query

  if (!idDocente || !idPeriodo) {
    return res.status(400).json({ error: "idDocente e idPeriodo requeridos." })
  }

  try {
    /* Nombre del docente */
    const [[docente]] = await pool.query(`
      SELECT id_doce,
             CONCAT(grado, ' ', nombre, ' ', apellidos) AS nombre,
             grado
      FROM   docente WHERE id_doce = ?
    `, [idDocente])

    if (!docente) return res.status(404).json({ error: "Docente no encontrado." })

    /* Nombre del periodo */
    const [[periodo]] = await pool.query(
      `SELECT id_perio, nombre FROM periodo_escolar WHERE id_perio = ?`, [idPeriodo]
    )

    /* Promedio por categoría — usa la vista del schema */
    const [promediosCat] = await pool.query(`
      SELECT id_categoria AS idCategoria,
             ROUND(AVG(calificacion), 2) AS promedio
      FROM (
        SELECT c.id_categoria, re.calificacion
        FROM   respuesta_evaluacion re
        JOIN   pregunta p              ON p.id_pregunta   = re.id_pregunta
        JOIN   categoria c             ON c.id_categoria  = p.id_categoria
        JOIN   evaluacion_docente ed   ON ed.id_evaluacion = re.id_evaluacion
        WHERE  ed.id_doce  = ?
          AND  ed.id_perio = ?
          AND  ed.estado   = 3
      ) t
      GROUP BY id_categoria
      ORDER BY id_categoria
    `, [idDocente, idPeriodo])

    /* Total alumnos inscritos en grupos de este docente/periodo */
    const [[counts]] = await pool.query(`
      SELECT
        COUNT(DISTINCT i.num_control)  AS total_alumnos,
        SUM(CASE WHEN ed.estado = 3 THEN 1 ELSE 0 END) AS completaron
      FROM inscripcion i
      JOIN grupo g ON g.id_grupo = i.id_grupo
        AND g.id_doce = ? AND g.id_perio = ?
      LEFT JOIN evaluacion_docente ed
        ON ed.num_control = i.num_control
        AND ed.id_doce    = ?
        AND ed.id_perio   = ?
      WHERE i.activo = 1
    `, [idDocente, idPeriodo, idDocente, idPeriodo])

    /* Lista alumnos que completaron */
    const [completaron] = await pool.query(`
      SELECT DISTINCT a.num_control AS numControl,
             a.nombre_completo AS nombre,
             c.nombre_corto    AS carrera
      FROM   evaluacion_docente ed
      JOIN   alumno a  ON a.num_control = ed.num_control
      JOIN   carrera c ON c.id_carre    = a.id_carre
      WHERE  ed.id_doce  = ?
        AND  ed.id_perio = ?
        AND  ed.estado   = 3
      ORDER BY a.apellidos
    `, [idDocente, idPeriodo])

    /* Lista alumnos pendientes */
    const [faltantes] = await pool.query(`
      SELECT DISTINCT a.num_control AS numControl,
             a.nombre_completo AS nombre,
             c.nombre_corto    AS carrera
      FROM   inscripcion i
      JOIN   grupo g  ON g.id_grupo = i.id_grupo
              AND g.id_doce  = ?
              AND g.id_perio = ?
      JOIN   alumno a  ON a.num_control = i.num_control
      JOIN   carrera c ON c.id_carre    = a.id_carre
      WHERE  i.activo = 1
        AND  i.num_control NOT IN (
               SELECT ed2.num_control
               FROM   evaluacion_docente ed2
               WHERE  ed2.id_doce  = ?
                 AND  ed2.id_perio = ?
                 AND  ed2.estado   = 3
             )
      ORDER BY a.apellidos
    `, [idDocente, idPeriodo, idDocente, idPeriodo])

    /* Calcular promedio general */
    const vals = promediosCat.map(p => Number(p.promedio))
    const promedioGeneral = vals.length
      ? +(vals.reduce((a,b) => a+b, 0) / vals.length).toFixed(2)
      : 0

    const clasificacion = promedioGeneral >= 4.5 ? "EXCELENTE"
                        : promedioGeneral >= 3.5 ? "MUY BUENO"
                        : promedioGeneral >= 2.5 ? "BUENO"
                        : promedioGeneral >= 1.5 ? "REGULAR"
                        : "DEFICIENTE"

    return res.json({
      docente,
      periodo,
      totalAlumnos:    counts.total_alumnos ?? 0,
      completaron,
      faltantes,
      promediosCat:    Object.fromEntries(promediosCat.map(p => [p.idCategoria, Number(p.promedio)])),
      promedioGeneral,
      clasificacion,
    })

  } catch (err) {
    console.error("Error en /dashboard/resultados:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ================================================================
   DASHBOARD — Lista de docentes
   GET /api/dashboard/docentes
   ================================================================ */
app.get("/api/dashboard/docentes", authMiddleware, soloAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id_doce AS id,
             CONCAT(grado, ' ', nombre, ' ', apellidos) AS nombre,
             grado
      FROM   docente
      WHERE  vigente = 1
      ORDER BY apellidos
    `)
    return res.json({ docentes: rows })
  } catch (err) {
    console.error("Error en /dashboard/docentes:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ================================================================
   DASHBOARD — Lista de periodos
   GET /api/dashboard/periodos
   ================================================================ */
app.get("/api/dashboard/periodos", authMiddleware, soloAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id_perio AS id, nombre, activo
      FROM   periodo_escolar
      ORDER  BY id_perio DESC
    `)
    return res.json({ periodos: rows })
  } catch (err) {
    console.error("Error en /dashboard/periodos:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ── Arrancar servidor ──────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`🚀  SICOT API corriendo en puerto ${PORT} | DB: ${dbCfg.host}`)
  console.log(`    Endpoints disponibles:`)
  console.log(`      POST /api/auth/login`)
  console.log(`      GET  /api/alumno/perfil`)
  console.log(`      GET  /api/alumno/evaluaciones`)
  console.log(`      GET  /api/encuesta/preguntas`)
  console.log(`      POST /api/evaluacion/iniciar`)
  console.log(`      POST /api/evaluacion/responder`)
  console.log(`      GET  /api/dashboard/resultados`)
  console.log(`      GET  /api/dashboard/docentes`)
  console.log(`      GET  /api/dashboard/periodos`)
})
