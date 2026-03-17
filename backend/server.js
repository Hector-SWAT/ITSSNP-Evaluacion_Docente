/**
 * ================================================================
 *  SICOT — Backend API  (Railway-ready)
 *  Node.js + Express + MySQL2
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
   CORS
══════════════════════════════════════════════════════════════ */
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://itssnp-evaluacion-docente.vercel.app",
      process.env.FRONTEND_URL
    ].filter(Boolean)
    if (!origin) {
      if (process.env.NODE_ENV !== 'production') return callback(null, true)
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

app.use(cors(corsOptions))
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path} - Origin: ${req.headers.origin || 'sin origen'}`)
  next()
})
app.use(express.json())

/* ══════════════════════════════════════════════════════════════
   MYSQL — CONEXIÓN
══════════════════════════════════════════════════════════════ */
function getDbConfig() {
  console.log("🔍 Configurando conexión a MySQL...")
  if (process.env.NODE_ENV === 'production') {
    console.log("✅ MODO PRODUCCIÓN: Usando proxy público (trolley.proxy.rlwy.net:19348)")
    return {
      host: "trolley.proxy.rlwy.net",
      port: 19348,
      user: "root",
      password: "cdFLRUidwslSicLWufGKskPbEraFPspX",
      database: "railway",
    }
  }
  if (process.env.DATABASE_URL) {
    try {
      const u = new URL(process.env.DATABASE_URL)
      console.log("✅ MODO DESARROLLO: Usando DATABASE_URL")
      return {
        host: u.hostname,
        port: Number(u.port) || 3306,
        user: decodeURIComponent(u.username),
        password: decodeURIComponent(u.password),
        database: u.pathname.slice(1),
      }
    } catch (e) {
      console.error("Error parsing DATABASE_URL:", e.message)
    }
  }
  console.log("⚠️ Usando configuración por defecto (localhost)")
  return { host: "localhost", port: 3306, user: "root", password: "", database: "railway" }
}

const dbCfg = getDbConfig()
console.log("📊 Configuración MySQL:", { host: dbCfg.host, port: dbCfg.port, database: dbCfg.database, user: dbCfg.user, hasPassword: !!dbCfg.password })

const pool = mysql.createPool({
  host: dbCfg.host,
  port: dbCfg.port,
  user: dbCfg.user,
  password: dbCfg.password,
  database: dbCfg.database,
  waitForConnections: true,
  connectionLimit: 5,
  connectTimeout: 10000,
  charset: "utf8mb4",
  ssl: { rejectUnauthorized: false }
})

;(async () => {
  let retries = 5
  while (retries > 0) {
    try {
      const conn = await pool.getConnection()
      console.log("✅ ¡CONEXIÓN EXITOSA A MYSQL!")
      conn.release()
      break
    } catch (err) {
      retries--
      console.error(`❌ Intento ${5-retries}/5 - Error MySQL:`, err.message)
      if (retries === 0) {
        console.error("⚠️ No se pudo conectar a MySQL después de 5 intentos")
      } else {
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
    }
  }
})()

/* ══════════════════════════════════════════════════════════════
   HEALTH CHECKS
══════════════════════════════════════════════════════════════ */
app.get("/", (_req, res) => {
  res.json({ app: "SICOT API", status: "ok", environment: process.env.NODE_ENV || 'development', db_host: dbCfg.host, db_port: dbCfg.port })
})

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString(), uptime: process.uptime() })
})

app.get("/health/detailed", async (_req, res) => {
  try {
    await pool.query('SELECT 1 as healthCheck')
    res.json({ status: "ok", timestamp: new Date(), database: "connected", db_host: dbCfg.host, db_port: dbCfg.port, uptime: process.uptime() })
  } catch (err) {
    res.status(500).json({ status: "error", database: "disconnected", error: err.message })
  }
})

app.get("/api/db-test", async (req, res) => {
  try {
    const [result] = await pool.query('SELECT NOW() as time, DATABASE() as db, USER() as user')
    res.json({ success: true, message: "✅ Conexión a MySQL exitosa", connection: { host: dbCfg.host, port: dbCfg.port }, result: result[0] })
  } catch (err) {
    res.status(500).json({ success: false, message: "❌ Error de conexión a MySQL", error: err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   MIDDLEWARES DE AUTH
══════════════════════════════════════════════════════════════ */
const JWT_SECRET = process.env.JWT_SECRET || "sicot_itssnp_2026_secreto"

function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Bearer ")) return res.status(401).json({ error: "No autorizado" })
  const token = header.slice(7)
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" })
  }
}

function soloAdmin(req, res, next) {
  if (!req.user || req.user.tipo !== "admin") return res.status(403).json({ error: "Acceso denegado" })
  next()
}

/* ══════════════════════════════════════════════════════════════
   AUTH — POST /api/auth/login
══════════════════════════════════════════════════════════════ */
app.post("/api/auth/login", async (req, res) => {
  const { usuario, password } = req.body
  if (!usuario || !password) return res.status(400).json({ error: "Usuario y contraseña requeridos." })
  const hashInput = crypto.createHash("sha256").update(password).digest("hex")
  try {
    const [[adminRow]] = await pool.query(
      `SELECT id_admin, usuario, nombre, clave FROM usuario_admin WHERE usuario = ? AND activo = 1 LIMIT 1`,
      [usuario.trim().toLowerCase()]
    )
    if (adminRow) {
      if (hashInput !== adminRow.clave) return res.status(401).json({ error: "Contraseña incorrecta." })
      const token = jwt.sign({ tipo: "admin", id: adminRow.id_admin, nombre: adminRow.nombre }, JWT_SECRET, { expiresIn: "8h" })
      return res.json({ tipo_usuario: "admin", num_control: null, nombre_completo: adminRow.nombre, token })
    }
    const numControl = Number(usuario.trim())
    if (!numControl) return res.status(401).json({ error: "Usuario no encontrado." })
    const [[alumno]] = await pool.query(
      `SELECT num_control, nombre_completo, clave FROM alumno WHERE num_control = ? LIMIT 1`,
      [numControl]
    )
    if (!alumno) return res.status(401).json({ error: "Número de control no encontrado." })
    if (hashInput !== alumno.clave) return res.status(401).json({ error: "Contraseña incorrecta." })
    const [[periodo]] = await pool.query(`SELECT id_perio FROM periodo_escolar WHERE situacion = 1 LIMIT 1`)
    const token = jwt.sign({ tipo: "alumno", id: alumno.num_control, nombre: alumno.nombre_completo }, JWT_SECRET, { expiresIn: "4h" })
    return res.json({ tipo_usuario: "alumno", num_control: alumno.num_control, nombre_completo: alumno.nombre_completo, id_perio: periodo?.id_perio ?? null, token })
  } catch (err) {
    console.error("Error en /api/auth/login:", err)
    return res.status(500).json({ error: "Error interno del servidor." })
  }
})

/* ══════════════════════════════════════════════════════════════
   ALUMNO — GET /api/alumno/perfil
══════════════════════════════════════════════════════════════ */
app.get("/api/alumno/perfil", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") return res.status(403).json({ error: "Acceso denegado" })
  try {
    const [[alumno]] = await pool.query(`
      SELECT a.num_control, a.nombre_completo, a.correo_e, a.semestre,
             c.nombre AS carrera, c.nombre_corto AS siglas
      FROM   alumno a
      JOIN   carrera c ON c.id_carre = a.id_carre
      WHERE  a.num_control = ?
    `, [req.user.id])
    if (!alumno) return res.status(404).json({ error: "Alumno no encontrado." })
    const [[periodo]] = await pool.query(`SELECT id_perio, nombre FROM periodo_escolar WHERE situacion = 1 LIMIT 1`)
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
    return res.json({ ...alumno, periodo: periodo?.nombre, tutores, totalTutores: tutores.length })
  } catch (err) {
    console.error("Error en /api/alumno/perfil:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   ALUMNO — GET /api/alumno/evaluaciones
══════════════════════════════════════════════════════════════ */
app.get("/api/alumno/evaluaciones", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") return res.status(403).json({ error: "Acceso denegado" })
  try {
    const [[periodo]] = await pool.query(`SELECT id_perio FROM periodo_escolar WHERE situacion = 1 LIMIT 1`)
    if (!periodo) return res.json({ evaluaciones: [] })
    const [rows] = await pool.query(
      `SELECT id_doce, estado FROM evaluacion_docente WHERE num_control = ? AND id_perio = ?`,
      [req.user.id, periodo.id_perio]
    )
    return res.json({ evaluaciones: rows.map(r => ({ idTutor: r.id_doce, completada: r.estado === 3 })) })
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
    if (!encuesta) return res.status(404).json({ error: "No hay encuesta activa." })
    const [preguntas] = await pool.query(`
      SELECT id_pregunta AS id, id_categoria AS idCategoria, texto
      FROM   pregunta
      WHERE  id_encuesta = ? AND activa = 1
      ORDER  BY orden
    `, [encuesta.id_encuesta])
    return res.json({ idEncuesta: encuesta.id_encuesta, preguntas, totalPreguntas: preguntas.length })
  } catch (err) {
    console.error("Error en /api/encuesta/preguntas:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   EVALUACIÓN — POST /api/evaluacion/iniciar
══════════════════════════════════════════════════════════════ */
app.post("/api/evaluacion/iniciar", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") return res.status(403).json({ error: "Acceso denegado" })
  const { idTutor, idGrupo } = req.body
  if (!idTutor || !idGrupo) return res.status(400).json({ error: "idTutor e idGrupo requeridos." })
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [[periodo]]  = await conn.query(`SELECT id_perio FROM periodo_escolar WHERE situacion = 1 LIMIT 1`)
    const [[encuesta]] = await conn.query(`SELECT id_encuesta FROM encuesta WHERE id_tipo_encuesta = 2 AND activa = 1 LIMIT 1`)
    if (!periodo || !encuesta) {
      await conn.rollback()
      return res.status(409).json({ error: "No hay encuesta o periodo activo." })
    }
    const [[existente]] = await conn.query(
      `SELECT id_evaluacion, estado FROM evaluacion_docente WHERE num_control = ? AND id_doce = ? AND id_perio = ? LIMIT 1`,
      [req.user.id, idTutor, periodo.id_perio]
    )
    if (existente?.estado === 3) {
      await conn.rollback()
      return res.status(409).json({ error: "Ya completaste esta evaluación." })
    }
    let idEvaluacion
    if (existente) {
      idEvaluacion = existente.id_evaluacion
    } else {
      const [ins] = await conn.query(
        `INSERT INTO evaluacion_docente (id_encuesta, num_control, id_doce, id_grupo, id_perio, estado, pagina_actual) VALUES (?, ?, ?, ?, ?, 1, 0)`,
        [encuesta.id_encuesta, req.user.id, idTutor, idGrupo, periodo.id_perio]
      )
      idEvaluacion = ins.insertId
    }
    await conn.commit()
    return res.json({ idEvaluacion, idEncuesta: encuesta.id_encuesta, mensaje: "Evaluación iniciada correctamente" })
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
  if (req.user.tipo !== "alumno") return res.status(403).json({ error: "Acceso denegado" })
  const { idEvaluacion, respuestas } = req.body
  if (!idEvaluacion || !Array.isArray(respuestas) || !respuestas.length) return res.status(400).json({ error: "Datos incompletos." })
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const [[ev]] = await conn.query(
      `SELECT id_evaluacion, estado, num_control FROM evaluacion_docente WHERE id_evaluacion = ? LIMIT 1`,
      [idEvaluacion]
    )
    if (!ev) { await conn.rollback(); return res.status(404).json({ error: "Evaluación no encontrada." }) }
    if (ev.num_control !== req.user.id) { await conn.rollback(); return res.status(403).json({ error: "No es tu evaluación." }) }
    if (ev.estado === 3) { await conn.rollback(); return res.status(409).json({ error: "Ya fue completada." }) }
    for (const r of respuestas) {
      await conn.query(
        `INSERT INTO respuesta_evaluacion (id_evaluacion, id_pregunta, calificacion) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE calificacion = VALUES(calificacion)`,
        [idEvaluacion, r.idPregunta, r.calificacion]
      )
    }
    await conn.query(`CALL sp_CompletarEvaluacion(?, @ok, @msg)`, [idEvaluacion])
    const [[result]] = await conn.query(`SELECT @ok AS ok, @msg AS msg`)
    await conn.commit()
    if (result.ok === 1) return res.json({ success: true, mensaje: "Evaluación completada correctamente." })
    return res.status(400).json({ error: result.msg || "Error al completar la evaluación" })
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
      SELECT d.id_doce AS id,
             CONCAT(d.grado, ' ', d.nombre, ' ', d.apellidos) AS nombre,
             dep.nombre AS departamento
      FROM   docente d
      LEFT JOIN departamento dep ON dep.id_depa = d.id_depa
      WHERE  d.vigente = 1
      ORDER BY dep.nombre, d.apellidos
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
    const [rows] = await pool.query(
      `SELECT id_perio AS id, nombre, situacion AS activo FROM periodo_escolar ORDER BY id_perio DESC`
    )
    return res.json({ periodos: rows })
  } catch (err) {
    console.error("Error en /api/dashboard/periodos:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/docentes/:idDocente/periodos/:idPeriodo/grupos
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/docentes/:idDocente/periodos/:idPeriodo/grupos", authMiddleware, soloAdmin, async (req, res) => {
  const { idDocente, idPeriodo } = req.params
  try {
    const [rows] = await pool.query(`
      SELECT g.id_grupo AS id, g.clave
      FROM   grupo g
      WHERE  g.id_doce = ? AND g.id_perio = ?
      ORDER BY g.clave
    `, [parseInt(idDocente), parseInt(idPeriodo)])
    return res.json({ grupos: rows })
  } catch (err) {
    console.error("Error en /api/dashboard/grupos:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/resultados
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/resultados", authMiddleware, soloAdmin, async (req, res) => {
  const { idDocente, idPeriodo, idGrupo } = req.query
  if (!idDocente || !idPeriodo) return res.status(400).json({ error: "idDocente e idPeriodo requeridos." })

  try {
    const docenteId = parseInt(idDocente)
    const periodoId = parseInt(idPeriodo)
    if (isNaN(docenteId) || isNaN(periodoId)) return res.status(400).json({ error: "IDs inválidos" })

    const grupoId = idGrupo ? parseInt(idGrupo) : null

    // 1. Docente
    const [[docente]] = await pool.query(
      `SELECT id_doce, CONCAT(grado, ' ', nombre, ' ', apellidos) AS nombre FROM docente WHERE id_doce = ?`,
      [docenteId]
    )
    if (!docente) return res.status(404).json({ error: "Docente no encontrado." })

    // 2. Periodo
    const [[periodo]] = await pool.query(
      `SELECT id_perio, nombre FROM periodo_escolar WHERE id_perio = ?`, [periodoId]
    )

    // 3. Promedios por categoría (filtrando por grupo si aplica)
    const promediosCatQuery = grupoId ? `
      SELECT c.id_categoria, c.nombre,
             COALESCE(ROUND(AVG(r.calificacion), 2), 0) AS promedio
      FROM categoria c
      LEFT JOIN pregunta p ON p.id_categoria = c.id_categoria
        AND p.id_encuesta = (SELECT id_encuesta FROM encuesta WHERE id_tipo_encuesta = 2 AND activa = 1 LIMIT 1)
      LEFT JOIN respuesta_evaluacion r ON r.id_pregunta = p.id_pregunta
      LEFT JOIN evaluacion_docente e ON e.id_evaluacion = r.id_evaluacion
        AND e.id_doce = ? AND e.id_perio = ? AND e.id_grupo = ? AND e.estado = 3
      GROUP BY c.id_categoria, c.nombre
      ORDER BY c.id_categoria
    ` : `
      SELECT c.id_categoria, c.nombre,
             COALESCE(ROUND(AVG(r.calificacion), 2), 0) AS promedio
      FROM categoria c
      LEFT JOIN pregunta p ON p.id_categoria = c.id_categoria
        AND p.id_encuesta = (SELECT id_encuesta FROM encuesta WHERE id_tipo_encuesta = 2 AND activa = 1 LIMIT 1)
      LEFT JOIN respuesta_evaluacion r ON r.id_pregunta = p.id_pregunta
      LEFT JOIN evaluacion_docente e ON e.id_evaluacion = r.id_evaluacion
        AND e.id_doce = ? AND e.id_perio = ? AND e.estado = 3
      GROUP BY c.id_categoria, c.nombre
      ORDER BY c.id_categoria
    `
    const promediosCatParams = grupoId ? [docenteId, periodoId, grupoId] : [docenteId, periodoId]
    const [promediosCat] = await pool.query(promediosCatQuery, promediosCatParams)

    // 4. Conteos (filtrando por grupo si aplica)
    const grupoJoin = grupoId ? `AND g.id_grupo = ${grupoId}` : ""
    const [[counts]] = await pool.query(`
      SELECT
        COUNT(DISTINCT i.num_control) AS total_alumnos,
        COUNT(DISTINCT CASE WHEN e.estado = 3 THEN e.num_control END) AS completaron
      FROM inscripcion i
      JOIN grupo g ON g.id_grupo = i.id_grupo AND g.id_doce = ? AND g.id_perio = ? ${grupoJoin}
      LEFT JOIN evaluacion_docente e ON e.num_control = i.num_control
        AND e.id_doce = ? AND e.id_perio = ? AND e.estado = 3 ${grupoId ? `AND e.id_grupo = ${grupoId}` : ""}
      WHERE i.activa = 1
    `, [docenteId, periodoId, docenteId, periodoId])

    // 5. Alumnos que completaron
    const completaronQuery = grupoId ? `
      SELECT a.num_control AS numControl, a.nombre_completo AS nombre,
             c.nombre_corto AS carrera, g.clave AS grupo
      FROM evaluacion_docente e
      JOIN alumno a ON a.num_control = e.num_control
      JOIN carrera c ON c.id_carre = a.id_carre
      JOIN grupo g ON g.id_grupo = e.id_grupo
      WHERE e.id_doce = ? AND e.id_perio = ? AND e.id_grupo = ? AND e.estado = 3
      ORDER BY a.a_paterno, a.a_materno
    ` : `
      SELECT a.num_control AS numControl, a.nombre_completo AS nombre,
             c.nombre_corto AS carrera, g.clave AS grupo
      FROM evaluacion_docente e
      JOIN alumno a ON a.num_control = e.num_control
      JOIN carrera c ON c.id_carre = a.id_carre
      JOIN grupo g ON g.id_grupo = e.id_grupo
      WHERE e.id_doce = ? AND e.id_perio = ? AND e.estado = 3
      ORDER BY a.a_paterno, a.a_materno
    `
    const completaronParams = grupoId ? [docenteId, periodoId, grupoId] : [docenteId, periodoId]
    const [completaron] = await pool.query(completaronQuery, completaronParams)

    // 6. Alumnos pendientes
    const faltantesQuery = grupoId ? `
      SELECT a.num_control AS numControl, a.nombre_completo AS nombre,
             c.nombre_corto AS carrera, g.clave AS grupo
      FROM inscripcion i
      JOIN grupo g ON g.id_grupo = i.id_grupo AND g.id_doce = ? AND g.id_perio = ? AND g.id_grupo = ?
      JOIN alumno a ON a.num_control = i.num_control
      JOIN carrera c ON c.id_carre = a.id_carre
      WHERE i.activa = 1
        AND NOT EXISTS (
          SELECT 1 FROM evaluacion_docente e
          WHERE e.num_control = i.num_control AND e.id_doce = ? AND e.id_perio = ? AND e.id_grupo = ? AND e.estado = 3
        )
      ORDER BY a.a_paterno, a.a_materno
    ` : `
      SELECT a.num_control AS numControl, a.nombre_completo AS nombre,
             c.nombre_corto AS carrera, g.clave AS grupo
      FROM inscripcion i
      JOIN grupo g ON g.id_grupo = i.id_grupo AND g.id_doce = ? AND g.id_perio = ?
      JOIN alumno a ON a.num_control = i.num_control
      JOIN carrera c ON c.id_carre = a.id_carre
      WHERE i.activa = 1
        AND NOT EXISTS (
          SELECT 1 FROM evaluacion_docente e
          WHERE e.num_control = i.num_control AND e.id_doce = ? AND e.id_perio = ? AND e.estado = 3
        )
      ORDER BY a.a_paterno, a.a_materno
    `
    const faltantesParams = grupoId
      ? [docenteId, periodoId, grupoId, docenteId, periodoId, grupoId]
      : [docenteId, periodoId, docenteId, periodoId]
    const [faltantes] = await pool.query(faltantesQuery, faltantesParams)

    // 7. Calcular promedio general y clasificación
    const promediosMap = {}
    promediosCat.forEach(p => { promediosMap[p.id_categoria] = Number(p.promedio) })
    const valoresPromedio = promediosCat.map(p => Number(p.promedio)).filter(v => v > 0)
    const promedioGeneral = valoresPromedio.length
      ? +(valoresPromedio.reduce((a, b) => a + b, 0) / valoresPromedio.length).toFixed(2)
      : 0
    const clasificacion = promedioGeneral >= 4.5 ? "EXCELENTE"
      : promedioGeneral >= 3.5 ? "MUY BUENO"
      : promedioGeneral >= 2.5 ? "BUENO"
      : promedioGeneral >= 1.5 ? "REGULAR"
      : promedioGeneral > 0 ? "DEFICIENTE"
      : "SIN DATOS"

    return res.json({
      docente, periodo,
      totalAlumnos: counts?.total_alumnos ?? 0,
      totalCompletaron: completaron.length,
      totalFaltantes: faltantes.length,
      completaron, faltantes,
      promediosCat: promediosMap,
      promedioGeneral, clasificacion,
    })
  } catch (err) {
    console.error("❌ Error en /api/dashboard/resultados:", err)
    return res.status(500).json({ error: "Error interno: " + err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/departamentos   ← NUEVO
   Query params: ?idPeriodo=X
   Responde con estadísticas agregadas por departamento:
   - promedioGeneral del departamento
   - docentesEvaluados vs totalDocentes
   - participacionAlumnos (%)
   - ranking de docentes del departamento
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/departamentos", authMiddleware, soloAdmin, async (req, res) => {
  const { idPeriodo } = req.query
  if (!idPeriodo) return res.status(400).json({ error: "idPeriodo requerido." })

  const periodoId = parseInt(idPeriodo)
  if (isNaN(periodoId)) return res.status(400).json({ error: "idPeriodo inválido." })

  try {
    // 1. Obtener todos los departamentos con docentes vigentes en ese periodo
    const [deptos] = await pool.query(`
      SELECT DISTINCT
        dep.id_depa,
        dep.nombre AS nombre_depa
      FROM departamento dep
      INNER JOIN docente d ON d.id_depa = dep.id_depa AND d.vigente = 1
      INNER JOIN grupo g   ON g.id_doce = d.id_doce AND g.id_perio = ?
      ORDER BY dep.nombre
    `, [periodoId])

    if (!deptos.length) return res.json({ departamentos: [] })

    // 2. Para cada departamento, calcular sus estadísticas
    const resultado = []

    for (const depto of deptos) {
      // Docentes del depto que tienen grupos en el periodo
      const [docentesDepto] = await pool.query(`
        SELECT DISTINCT
          d.id_doce AS id,
          CONCAT(d.grado, ' ', d.nombre, ' ', d.apellidos) AS nombre,
          d.apellidos AS _sort
        FROM docente d
        INNER JOIN grupo g ON g.id_doce = d.id_doce AND g.id_perio = ?
        WHERE d.id_depa = ? AND d.vigente = 1
        ORDER BY d.apellidos
      `, [periodoId, depto.id_depa])

      const totalDocentes = docentesDepto.length
      if (totalDocentes === 0) continue

      const docenteIds = docentesDepto.map(d => d.id)

      // Total de alumnos inscritos con algún docente del depto en este periodo
      const [[alumnosCounts]] = await pool.query(`
        SELECT
          COUNT(DISTINCT i.num_control) AS total_alumnos,
          COUNT(DISTINCT CASE WHEN e.estado = 3 THEN e.num_control END) AS alumnos_completaron
        FROM inscripcion i
        JOIN grupo g ON g.id_grupo = i.id_grupo
          AND g.id_doce IN (${docenteIds.map(() => '?').join(',')})
          AND g.id_perio = ?
        LEFT JOIN evaluacion_docente e ON e.num_control = i.num_control
          AND e.id_doce = g.id_doce
          AND e.id_perio = ?
          AND e.estado = 3
        WHERE i.activa = 1
      `, [...docenteIds, periodoId, periodoId])

      const totalAlumnos       = alumnosCounts.total_alumnos ?? 0
      const alumnosCompletaron = alumnosCounts.alumnos_completaron ?? 0
      const participacion      = totalAlumnos > 0
        ? parseFloat(((alumnosCompletaron / totalAlumnos) * 100).toFixed(1))
        : 0

      // Docentes que tienen al menos 1 evaluación completada
      const [[evCounts]] = await pool.query(`
        SELECT COUNT(DISTINCT id_doce) AS evaluados
        FROM evaluacion_docente
        WHERE id_doce IN (${docenteIds.map(() => '?').join(',')})
          AND id_perio = ?
          AND estado = 3
      `, [...docenteIds, periodoId])

      const docentesEvaluados = evCounts.evaluados ?? 0

      // Promedio general del departamento (promedio de promedios por docente)
      const [promediosDocentes] = await pool.query(`
        SELECT
          e.id_doce,
          ROUND(AVG(r.calificacion), 2) AS promedio
        FROM evaluacion_docente e
        JOIN respuesta_evaluacion r ON r.id_evaluacion = e.id_evaluacion
        WHERE e.id_doce IN (${docenteIds.map(() => '?').join(',')})
          AND e.id_perio = ?
          AND e.estado = 3
        GROUP BY e.id_doce
      `, [...docenteIds, periodoId])

      const promedioGeneral = promediosDocentes.length
        ? parseFloat((promediosDocentes.reduce((s, d) => s + Number(d.promedio), 0) / promediosDocentes.length).toFixed(2))
        : 0

      const clasificacion = promedioGeneral >= 4.5 ? "EXCELENTE"
        : promedioGeneral >= 3.5 ? "MUY BUENO"
        : promedioGeneral >= 2.5 ? "BUENO"
        : promedioGeneral >= 1.5 ? "REGULAR"
        : promedioGeneral > 0    ? "DEFICIENTE"
        : "SIN DATOS"

      // Ranking de docentes con su promedio y participación individual
      const docentesConStats = await Promise.all(docentesDepto.map(async (doc) => {
        // Promedio del docente
        const [[docProm]] = await pool.query(`
          SELECT COALESCE(ROUND(AVG(r.calificacion), 2), 0) AS promedio
          FROM evaluacion_docente e
          JOIN respuesta_evaluacion r ON r.id_evaluacion = e.id_evaluacion
          WHERE e.id_doce = ? AND e.id_perio = ? AND e.estado = 3
        `, [doc.id, periodoId])

        // Alumnos del docente en este periodo
        const [[docAlumnos]] = await pool.query(`
          SELECT
            COUNT(DISTINCT i.num_control)                                             AS total,
            COUNT(DISTINCT CASE WHEN e.estado = 3 THEN e.num_control END)             AS completaron
          FROM inscripcion i
          JOIN grupo g ON g.id_grupo = i.id_grupo AND g.id_doce = ? AND g.id_perio = ?
          LEFT JOIN evaluacion_docente e ON e.num_control = i.num_control
            AND e.id_doce = ? AND e.id_perio = ? AND e.estado = 3
          WHERE i.activa = 1
        `, [doc.id, periodoId, doc.id, periodoId])

        const promedio = Number(docProm.promedio)
        const docClasif = promedio >= 4.5 ? "EXCELENTE"
          : promedio >= 3.5 ? "MUY BUENO"
          : promedio >= 2.5 ? "BUENO"
          : promedio >= 1.5 ? "REGULAR"
          : promedio > 0    ? "DEFICIENTE"
          : "SIN DATOS"

        return {
          id:               doc.id,
          nombre:           doc.nombre,
          promedio,
          clasificacion:    docClasif,
          totalAlumnos:     docAlumnos.total ?? 0,
          alumnosCompletaron: docAlumnos.completaron ?? 0,
        }
      }))

      resultado.push({
        nombre:              depto.nombre_depa,
        totalDocentes,
        docentesEvaluados,
        promedioGeneral,
        participacionAlumnos: participacion,
        clasificacion,
        docentes: docentesConStats,
      })
    }

    // Ordenar por promedio general descendente
    resultado.sort((a, b) => b.promedioGeneral - a.promedioGeneral)

    return res.json({ departamentos: resultado })

  } catch (err) {
    console.error("❌ Error en /api/dashboard/departamentos:", err)
    return res.status(500).json({ error: "Error interno: " + err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   ARRANCAR SERVIDOR
══════════════════════════════════════════════════════════════ */
app.listen(PORT, '0.0.0.0', () => {
  console.log("=======================================")
  console.log("🚀 SICOT API CORRIENDO")
  console.log("=======================================")
  console.log(`🌐 Puerto: ${PORT} (0.0.0.0)`)
  console.log(`📡 Entorno: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🗄️  Base de datos: ${dbCfg.host}:${dbCfg.port} / ${dbCfg.database}`)
  console.log("=======================================")
  console.log("✅ Endpoints disponibles:")
  console.log(`   📊 Health:               /health`)
  console.log(`   🔧 DB Test:              /api/db-test`)
  console.log(`   🔐 Login:                /api/auth/login`)
  console.log(`   📋 Docentes:             /api/dashboard/docentes`)
  console.log(`   📋 Periodos:             /api/dashboard/periodos`)
  console.log(`   📋 Resultados docente:   /api/dashboard/resultados`)
  console.log(`   🏢 Departamentos:        /api/dashboard/departamentos  ← NUEVO`)
  console.log("=======================================")
})
