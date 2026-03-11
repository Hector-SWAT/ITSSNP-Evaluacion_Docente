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
 *       FRONTEND_URL  = https://itssnp-evaluacion-docente.vercel.app
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
const crypto  = require("crypto")
const cors    = require("cors")

const app  = express()
const PORT = process.env.PORT || 3001

/* ══════════════════════════════════════════════════════════════
   CORS — Configuración mejorada con el paquete cors
══════════════════════════════════════════════════════════════ */
const corsOptions = {
  origin: function (origin, callback) {
    // Lista de orígenes permitidos
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://itssnp-evaluacion-docente.vercel.app",
      process.env.FRONTEND_URL
    ].filter(Boolean)
    
    // Permitir peticiones sin origen (ej: Postman, curl) en desarrollo
    if (!origin) {
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true)
      }
      return callback(null, false)
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.log('🚫 CORS bloqueado para:', origin)
      callback(new Error('No permitido por CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

// Aplicar CORS a todas las rutas
app.use(cors(corsOptions))

// Middleware para logging de peticiones (útil para debugging)
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path} - Origin: ${req.headers.origin || 'sin origen'}`)
  next()
})

app.use(express.json())

/* ══════════════════════════════════════════════════════════════
   MYSQL — Conexión a Railway via DATABASE_URL
══════════════════════════════════════════════════════════════ */
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
  } catch { 
    return null 
  }
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
  ssl: { rejectUnauthorized: false },
})

/* Verificar conexión al arrancar - AHORA NO SALE DEL PROCESO */
;(async () => {
  try {
    const conn = await pool.getConnection()
    console.log("✅  MySQL conectado →", dbCfg?.database, "@", dbCfg?.host)
    conn.release()
  } catch (err) {
    console.error("⚠️  Advertencia MySQL:", err.message)
    console.log("🔄  Continuando... Railway reintentará la conexión automáticamente")
    // NO HACER process.exit(1) - Railway maneja los reintentos
  }
})()

/* ══════════════════════════════════════════════════════════════
   HEALTH CHECK — SIMPLIFICADO PARA RAILWAY
══════════════════════════════════════════════════════════════ */
app.get("/", (_req, res) => {
  res.json({ 
    app: "SICOT API", 
    status: "ok",
    environment: process.env.NODE_ENV || 'development'
  })
})

// Health check simple que SIEMPRE responde rápido (para Railway)
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Health check detallado (opcional, con verificación de BD)
app.get("/health/detailed", async (_req, res) => {
  try {
    const [result] = await pool.query('SELECT 1 as healthCheck')
    res.json({ 
      status: "ok", 
      timestamp: new Date(),
      database: "connected",
      uptime: process.uptime()
    })
  } catch (err) {
    res.status(500).json({ 
      status: "error", 
      database: "disconnected",
      error: err.message 
    })
  }
})

/* ══════════════════════════════════════════════════════════════
   MIDDLEWARES DE AUTH
══════════════════════════════════════════════════════════════ */
const JWT_SECRET = process.env.JWT_SECRET || "sicot_secret_2026"

function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" })
  }
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" })
  }
}

function soloAdmin(req, res, next) {
  if (req.user?.tipo !== "admin") {
    return res.status(403).json({ error: "Acceso denegado" })
  }
  next()
}

/* ══════════════════════════════════════════════════════════════
   AUTH — POST /api/auth/login
══════════════════════════════════════════════════════════════ */
app.post("/api/auth/login", async (req, res) => {
  const { usuario, password } = req.body

  if (!usuario || !password) {
    return res.status(400).json({ error: "Usuario y contraseña requeridos." })
  }

  const hashInput = crypto.createHash("sha256").update(password).digest("hex")

  try {
    /* ── Admin ── */
    const [[adminRow]] = await pool.query(
      `SELECT id_admin, usuario, nombre, clave
       FROM usuario_admin
       WHERE usuario = ? AND activo = 1 LIMIT 1`,
      [usuario.trim().toLowerCase()]
    )

    if (adminRow) {
      if (hashInput !== adminRow.clave) {
        return res.status(401).json({ error: "Contraseña incorrecta." })
      }
      const token = jwt.sign(
        { tipo: "admin", id: adminRow.id_admin, nombre: adminRow.nombre },
        JWT_SECRET, { expiresIn: "8h" }
      )
      return res.json({
        tipo_usuario:    "admin",
        num_control:     null,
        nombre_completo: adminRow.nombre,
        token,
      })
    }

    /* ── Alumno ── */
    const numControl = Number(usuario.trim())
    if (!numControl) {
      return res.status(401).json({ error: "Usuario no encontrado." })
    }

    const [[alumno]] = await pool.query(
      `SELECT num_control, nombre_completo, clave FROM alumno WHERE num_control = ? LIMIT 1`,
      [numControl]
    )

    if (!alumno) {
      return res.status(401).json({ error: "Número de control no encontrado." })
    }

    if (hashInput !== alumno.clave) {
      return res.status(401).json({ error: "Contraseña incorrecta." })
    }

    const [[periodo]] = await pool.query(
      `SELECT id_perio FROM periodo_escolar WHERE situacion = 1 LIMIT 1`
    )

    const token = jwt.sign(
      { tipo: "alumno", id: alumno.num_control, nombre: alumno.nombre_completo },
      JWT_SECRET, { expiresIn: "4h" }
    )

    return res.json({
      tipo_usuario:    "alumno",
      num_control:     alumno.num_control,
      nombre_completo: alumno.nombre_completo,
      id_perio:        periodo?.id_perio ?? null,
      token,
    })

  } catch (err) {
    console.error("Error en /api/auth/login:", err)
    return res.status(500).json({ error: "Error interno del servidor." })
  }
})

/* ══════════════════════════════════════════════════════════════
   ALUMNO — GET /api/alumno/perfil
══════════════════════════════════════════════════════════════ */
app.get("/api/alumno/perfil", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") {
    return res.status(403).json({ error: "Acceso denegado" })
  }

  try {
    const [[alumno]] = await pool.query(`
      SELECT a.num_control, a.nombre_completo, a.correo_e, a.semestre,
             c.nombre AS carrera, c.nombre_corto AS siglas
      FROM   alumno a
      JOIN   carrera c ON c.id_carre = a.id_carre
      WHERE  a.num_control = ?
    `, [req.user.id])

    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado." })
    }

    const [[periodo]] = await pool.query(
      `SELECT id_perio, nombre FROM periodo_escolar WHERE situacion = 1 LIMIT 1`
    )

    const [tutores] = await pool.query(`
      SELECT  d.id_doce AS id,
              CONCAT(d.grado, ' ', d.nombre, ' ', d.apellidos) AS nombre,
              CONCAT(m.nombre_corto, ' — ', g.clave) AS materia,
              g.clave AS grupo,
              g.id_grupo
      FROM    inscripcion i
      JOIN    grupo g   ON g.id_grupo = i.id_grupo
      JOIN    docente d ON d.id_doce  = g.id_doce
      JOIN    materia m ON m.id_mate  = g.id_mate
      WHERE   i.num_control = ?
        AND   g.id_perio    = ?
        AND   i.activa      = 1
      ORDER BY d.apellidos
    `, [req.user.id, periodo?.id_perio])

    return res.json({ 
      ...alumno, 
      periodo: periodo?.nombre, 
      tutores,
      totalTutores: tutores.length
    })

  } catch (err) {
    console.error("Error en /api/alumno/perfil:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   ALUMNO — GET /api/alumno/evaluaciones
══════════════════════════════════════════════════════════════ */
app.get("/api/alumno/evaluaciones", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") {
    return res.status(403).json({ error: "Acceso denegado" })
  }

  try {
    const [[periodo]] = await pool.query(
      `SELECT id_perio FROM periodo_escolar WHERE situacion = 1 LIMIT 1`
    )

    if (!periodo) {
      return res.json({ evaluaciones: [] })
    }

    const [rows] = await pool.query(`
      SELECT id_doce, estado
      FROM   evaluacion_docente
      WHERE  num_control = ? AND id_perio = ?
    `, [req.user.id, periodo.id_perio])

    return res.json({
      evaluaciones: rows.map(r => ({
        idTutor:    r.id_doce,
        completada: r.estado === 3,
      }))
    })

  } catch (err) {
    console.error("Error en /api/alumno/evaluaciones:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   ENCUESTA — GET /api/encuesta/preguntas
══════════════════════════════════════════════════════════════ */
app.get("/api/encuesta/preguntas", authMiddleware, async (req, res) => {
  try {
    const [[encuesta]] = await pool.query(
      `SELECT id_encuesta FROM encuesta WHERE id_tipo_encuesta = 2 AND activa = 1 LIMIT 1`
    )
    
    if (!encuesta) {
      return res.status(404).json({ error: "No hay encuesta activa." })
    }

    const [preguntas] = await pool.query(`
      SELECT id_pregunta AS id, id_categoria AS idCategoria, texto
      FROM   pregunta
      WHERE  id_encuesta = ? AND activa = 1
      ORDER  BY orden
    `, [encuesta.id_encuesta])

    return res.json({ 
      idEncuesta: encuesta.id_encuesta, 
      preguntas,
      totalPreguntas: preguntas.length
    })

  } catch (err) {
    console.error("Error en /api/encuesta/preguntas:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   EVALUACIÓN — POST /api/evaluacion/iniciar
══════════════════════════════════════════════════════════════ */
app.post("/api/evaluacion/iniciar", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") {
    return res.status(403).json({ error: "Acceso denegado" })
  }

  const { idTutor, idGrupo } = req.body
  if (!idTutor || !idGrupo) {
    return res.status(400).json({ error: "idTutor e idGrupo requeridos." })
  }

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    const [[periodo]]  = await conn.query(
      `SELECT id_perio FROM periodo_escolar WHERE situacion = 1 LIMIT 1`
    )
    
    const [[encuesta]] = await conn.query(
      `SELECT id_encuesta FROM encuesta WHERE id_tipo_encuesta = 2 AND activa = 1 LIMIT 1`
    )

    if (!periodo || !encuesta) {
      await conn.rollback()
      return res.status(409).json({ error: "No hay encuesta o periodo activo." })
    }

    const [[existente]] = await conn.query(`
      SELECT id_evaluacion, estado FROM evaluacion_docente
      WHERE  num_control = ? AND id_doce = ? AND id_perio = ? LIMIT 1
    `, [req.user.id, idTutor, periodo.id_perio])

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
          (id_encuesta, num_control, id_doce, id_grupo, id_perio, estado, pagina_actual)
        VALUES (?, ?, ?, ?, ?, 1, 0)
      `, [encuesta.id_encuesta, req.user.id, idTutor, idGrupo, periodo.id_perio])
      idEvaluacion = ins.insertId
    }

    await conn.commit()
    return res.json({ 
      idEvaluacion, 
      idEncuesta: encuesta.id_encuesta,
      mensaje: "Evaluación iniciada correctamente"
    })

  } catch (err) {
    await conn.rollback()
    console.error("Error en /api/evaluacion/iniciar:", err)
    return res.status(500).json({ error: "Error interno." })
  } finally {
    conn.release()
  }
})

/* ══════════════════════════════════════════════════════════════
   EVALUACIÓN — POST /api/evaluacion/responder
══════════════════════════════════════════════════════════════ */
app.post("/api/evaluacion/responder", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") {
    return res.status(403).json({ error: "Acceso denegado" })
  }

  const { idEvaluacion, respuestas } = req.body
  if (!idEvaluacion || !Array.isArray(respuestas) || !respuestas.length) {
    return res.status(400).json({ error: "Datos incompletos." })
  }

  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()

    const [[ev]] = await conn.query(
      `SELECT id_evaluacion, estado, num_control FROM evaluacion_docente WHERE id_evaluacion = ? LIMIT 1`,
      [idEvaluacion]
    )

    if (!ev) { 
      await conn.rollback(); 
      return res.status(404).json({ error: "Evaluación no encontrada." }) 
    }
    
    if (ev.num_control !== req.user.id) { 
      await conn.rollback(); 
      return res.status(403).json({ error: "No es tu evaluación." }) 
    }
    
    if (ev.estado === 3) { 
      await conn.rollback(); 
      return res.status(409).json({ error: "Ya fue completada." }) 
    }

    for (const r of respuestas) {
      await conn.query(`
        INSERT INTO respuesta_evaluacion (id_evaluacion, id_pregunta, calificacion)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE calificacion = VALUES(calificacion)
      `, [idEvaluacion, r.idPregunta, r.calificacion])
    }

    await conn.query(`CALL sp_CompletarEvaluacion(?, @ok, @msg)`, [idEvaluacion])
    const [[result]] = await conn.query(`SELECT @ok AS ok, @msg AS msg`)

    await conn.commit()

    if (result.ok === 1) {
      return res.json({ 
        success: true, 
        mensaje: "Evaluación completada correctamente." 
      })
    } else {
      return res.status(400).json({ error: result.msg || "Error al completar la evaluación" })
    }

  } catch (err) {
    await conn.rollback()
    console.error("Error en /api/evaluacion/responder:", err)
    return res.status(500).json({ error: "Error interno." })
  } finally {
    conn.release()
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/docentes
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/docentes", authMiddleware, soloAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id_doce AS id,
             CONCAT(grado, ' ', nombre, ' ', apellidos) AS nombre
      FROM   docente 
      WHERE  vigente = 1 
      ORDER BY apellidos
    `)
    return res.json({ docentes: rows })
  } catch (err) {
    console.error("Error en /api/dashboard/docentes:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/periodos
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/periodos", authMiddleware, soloAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id_perio AS id, nombre, situacion AS activo
      FROM   periodo_escolar 
      ORDER BY id_perio DESC
    `)
    return res.json({ periodos: rows })
  } catch (err) {
    console.error("Error en /api/dashboard/periodos:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/resultados
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/resultados", authMiddleware, soloAdmin, async (req, res) => {
  const { idDocente, idPeriodo } = req.query
  
  if (!idDocente || !idPeriodo) {
    return res.status(400).json({ error: "idDocente e idPeriodo requeridos." })
  }

  try {
    const [[docente]] = await pool.query(`
      SELECT id_doce, CONCAT(grado, ' ', nombre, ' ', apellidos) AS nombre
      FROM   docente 
      WHERE  id_doce = ?
    `, [idDocente])

    if (!docente) {
      return res.status(404).json({ error: "Docente no encontrado." })
    }

    const [[periodo]] = await pool.query(
      `SELECT id_perio, nombre FROM periodo_escolar WHERE id_perio = ?`, 
      [idPeriodo]
    )

    const [promediosCat] = await pool.query(`
      SELECT p.id_categoria AS idCategoria, 
             ROUND(AVG(re.calificacion), 2) AS promedio,
             COUNT(DISTINCT re.id_evaluacion) AS totalEvaluaciones
      FROM   respuesta_evaluacion re
      JOIN   pregunta p             ON p.id_pregunta   = re.id_pregunta
      JOIN   evaluacion_docente ed  ON ed.id_evaluacion = re.id_evaluacion
      WHERE  ed.id_doce = ? AND ed.id_perio = ? AND ed.estado = 3
      GROUP  BY p.id_categoria 
      ORDER BY p.id_categoria
    `, [idDocente, idPeriodo])

    const [[counts]] = await pool.query(`
      SELECT
        COUNT(DISTINCT i.num_control) AS total_alumnos,
        SUM(CASE WHEN ed.estado = 3 THEN 1 ELSE 0 END) AS completaron
      FROM inscripcion i
      JOIN grupo g ON g.id_grupo = i.id_grupo AND g.id_doce = ? AND g.id_perio = ?
      LEFT JOIN evaluacion_docente ed
        ON ed.num_control = i.num_control AND ed.id_doce = ? AND ed.id_perio = ?
      WHERE i.activa = 1
    `, [idDocente, idPeriodo, idDocente, idPeriodo])

    const [completaron] = await pool.query(`
      SELECT DISTINCT a.num_control AS numControl, 
                      a.nombre_completo AS nombre, 
                      c.nombre_corto AS carrera
      FROM   evaluacion_docente ed
      JOIN   alumno a  ON a.num_control = ed.num_control
      JOIN   carrera c ON c.id_carre = a.id_carre
      WHERE  ed.id_doce = ? AND ed.id_perio = ? AND ed.estado = 3
      ORDER BY a.apellidos
    `, [idDocente, idPeriodo])

    const [faltantes] = await pool.query(`
      SELECT DISTINCT a.num_control AS numControl, 
                      a.nombre_completo AS nombre, 
                      c.nombre_corto AS carrera
      FROM   inscripcion i
      JOIN   grupo g   ON g.id_grupo = i.id_grupo AND g.id_doce = ? AND g.id_perio = ?
      JOIN   alumno a  ON a.num_control = i.num_control
      JOIN   carrera c ON c.id_carre = a.id_carre
      WHERE  i.activa = 1
        AND  i.num_control NOT IN (
          SELECT ed2.num_control FROM evaluacion_docente ed2
          WHERE ed2.id_doce = ? AND ed2.id_perio = ? AND ed2.estado = 3
        )
      ORDER BY a.apellidos
    `, [idDocente, idPeriodo, idDocente, idPeriodo])

    const vals = promediosCat.map(p => Number(p.promedio))
    const promedioGeneral = vals.length
      ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) 
      : 0

    const clasificacion = promedioGeneral >= 4.5 ? "EXCELENTE"
                        : promedioGeneral >= 3.5 ? "MUY BUENO"
                        : promedioGeneral >= 2.5 ? "BUENO"
                        : promedioGeneral >= 1.5 ? "REGULAR"
                        : "DEFICIENTE"

    return res.json({
      docente, 
      periodo,
      totalAlumnos: counts?.total_alumnos ?? 0,
      totalCompletaron: completaron.length,
      totalFaltantes: faltantes.length,
      completaron, 
      faltantes,
      promediosCat: Object.fromEntries(promediosCat.map(p => [p.idCategoria, Number(p.promedio)])),
      promedioGeneral, 
      clasificacion,
    })

  } catch (err) {
    console.error("Error en /api/dashboard/resultados:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   ARRANCAR — CORREGIDO PARA RAILWAY
══════════════════════════════════════════════════════════════ */
app.listen(PORT, '0.0.0.0', () => {
  console.log("===================================")
  console.log(`🚀  SICOT API corriendo`)
  console.log(`🌐  Puerto: ${PORT} (0.0.0.0)`)
  console.log(`📡  Entorno: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🗄️  DB: ${dbCfg?.host}/${dbCfg?.database}`)
  console.log(`✅  Health check: /health (para Railway)`)
  console.log(`📊  Health detallado: /health/detailed`)
  console.log("===================================")
})
