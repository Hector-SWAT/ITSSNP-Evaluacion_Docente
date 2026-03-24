/**
 * ================================================================
 *  SICOT — Backend API  (AZURE SQL)
 *  Node.js + Express + MSSQL
 *  Versión completa y funcional con todas las correcciones
 * ================================================================
 */
require("dotenv").config()
const express = require("express")
const sql = require("mssql")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const cors = require("cors")

const app = express()
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
  console.log(`📡 ${req.method} ${req.path}`)
  next()
})
app.use(express.json())

/* ══════════════════════════════════════════════════════════════
   AZURE SQL — CONFIGURACIÓN
══════════════════════════════════════════════════════════════ */
const dbConfig = {
  user: process.env.DB_USER || "adminsql",
  password: process.env.DB_PASSWORD || "Hector123*",
  server: process.env.DB_HOST || "swat.database.windows.net",
  database: process.env.DB_NAME || "SIE",
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
}

console.log("🔍 Configurando conexión a Azure SQL...")
console.log(`📊 Servidor: ${dbConfig.server}:${dbConfig.port}`)
console.log(`📊 Base de datos: ${dbConfig.database}`)

let pool = null

async function getConnection() {
  try {
    if (!pool) {
      pool = await sql.connect(dbConfig)
      console.log("✅ ¡CONEXIÓN EXITOSA A AZURE SQL!")
    }
    return pool
  } catch (err) {
    console.error("❌ Error conectando a Azure SQL:", err.message)
    throw err
  }
}

async function executeQuery(query, params = []) {
  const connection = await getConnection()
  try {
    const request = connection.request()
    params.forEach((param, index) => {
      request.input(`p${index}`, param)
    })
    let formattedQuery = query
    params.forEach((_, index) => {
      formattedQuery = formattedQuery.replace('?', `@p${index}`)
    })
    const result = await request.query(formattedQuery)
    return result.recordset
  } catch (err) {
    console.error("Error en executeQuery:", err)
    throw err
  }
}

async function executeQuerySingle(query, params = []) {
  const rows = await executeQuery(query, params)
  return rows.length > 0 ? rows[0] : null
}

/* ══════════════════════════════════════════════════════════════
   HEALTH CHECKS
══════════════════════════════════════════════════════════════ */
app.get("/", async (_req, res) => {
  try {
    await getConnection()
    res.json({ app: "SICOT API", status: "ok", environment: process.env.NODE_ENV || 'development' })
  } catch (err) {
    res.json({ app: "SICOT API", status: "error", error: err.message })
  }
})

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() })
})

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await executeQuery("SELECT GETDATE() as time, DB_NAME() as db, SUSER_NAME() as [user]")
    res.json({ success: true, message: "✅ Conexión exitosa", result: result[0] })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   MIDDLEWARES DE AUTH
══════════════════════════════════════════════════════════════ */
const JWT_SECRET = process.env.JWT_SECRET || "sicot_itssnp_2026_secreto"

function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" })
  }
  const token = header.slice(7)
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" })
  }
}

function soloAdmin(req, res, next) {
  if (!req.user || req.user.tipo !== "admin") {
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
  
  const hashInputSHA256 = crypto.createHash("sha256").update(password).digest("hex")
  
  try {
    const adminRow = await executeQuerySingle(
      `SELECT IdAdmin AS id_admin, Usuario AS usuario, NombreCompleto AS nombre, Clave AS clave, Activo AS activo
       FROM eval.UsuarioAdmin WHERE Usuario = ? AND Activo = 1`,
      [usuario.trim().toLowerCase()]
    )
    
    if (adminRow) {
      if (hashInputSHA256 !== adminRow.clave) {
        return res.status(401).json({ error: "Contraseña incorrecta." })
      }
      const token = jwt.sign(
        { tipo: "admin", id: adminRow.id_admin, nombre: adminRow.nombre }, 
        JWT_SECRET, 
        { expiresIn: "8h" }
      )
      return res.json({ tipo_usuario: "admin", num_control: null, nombre_completo: adminRow.nombre, token })
    }
    
    const numControl = Number(usuario.trim())
    if (!numControl) {
      return res.status(401).json({ error: "Usuario no encontrado." })
    }
    
    const alumno = await executeQuerySingle(
      `SELECT NumControl, NombreCompleto, Clave FROM dbo.Alumno WHERE NumControl = ?`,
      [numControl]
    )
    
    if (!alumno) {
      return res.status(401).json({ error: "Número de control no encontrado." })
    }
    
    const hashInputSHA1 = crypto.createHash("sha1").update(password).digest("hex")
    const claveHex = alumno.Clave ? alumno.Clave.toString('hex') : ''
    
    if (hashInputSHA1 !== claveHex) {
      return res.status(401).json({ error: "Contraseña incorrecta." })
    }
    
    const periodo = await executeQuerySingle(`SELECT IdPerio FROM dbo.PeriodoEscolar WHERE Situación = 1`)
    
    const token = jwt.sign(
      { tipo: "alumno", id: alumno.NumControl, nombre: alumno.NombreCompleto }, 
      JWT_SECRET, 
      { expiresIn: "4h" }
    )
    
    return res.json({ 
      tipo_usuario: "alumno", 
      num_control: alumno.NumControl, 
      nombre_completo: alumno.NombreCompleto, 
      id_perio: periodo?.IdPerio ?? null, 
      token 
    })
    
  } catch (err) {
    console.error("❌ Error en /api/auth/login:", err)
    return res.status(500).json({ error: "Error interno del servidor." })
  }
})

/* ══════════════════════════════════════════════════════════════
   ADMIN — CONFIGURACIÓN DE EVALUACIONES
══════════════════════════════════════════════════════════════ */

// Obtener configuración actual
app.get("/api/admin/configuracion", authMiddleware, soloAdmin, async (req, res) => {
  try {
    console.log("📊 GET /api/admin/configuracion")
    
    const periodoActivo = await executeQuerySingle(`
      SELECT IdPerio, Nombre, NombreCorto, Inicio, Fin
      FROM dbo.PeriodoEscolar WHERE Situación = 1
    `)
    
    const encuesta = await executeQuerySingle(`
      SELECT IdEncuesta, Nombre, 
             FechaInicioTutor, FechaFinTutor, 
             FechaInicioDocente, FechaFinDocente, 
             TutorActivo, DocenteActivo,
             Activa
      FROM eval.Encuesta WHERE IdTipoEncuesta = 1 AND Activa = 1
    `)
    
    const periodos = await executeQuery(`
      SELECT IdPerio, Nombre, NombreCorto, Situación, Inicio, Fin
      FROM dbo.PeriodoEscolar ORDER BY IdPerio DESC
    `)
    
    res.json({ periodoActivo, encuesta, periodos })
    
  } catch (err) {
    console.error("Error en /api/admin/configuracion:", err)
    res.status(500).json({ error: "Error interno." })
  }
})

// Activar un periodo específico
app.post("/api/admin/activar-periodo", authMiddleware, soloAdmin, async (req, res) => {
  const { idPeriodo } = req.body
  
  if (!idPeriodo) {
    return res.status(400).json({ error: "idPeriodo requerido." })
  }
  
  try {
    const periodo = await executeQuerySingle(`
      SELECT IdPerio FROM dbo.PeriodoEscolar WHERE IdPerio = ?
    `, [idPeriodo])
    
    if (!periodo) {
      return res.status(404).json({ error: "Periodo no encontrado." })
    }
    
    await executeQuery(`UPDATE dbo.PeriodoEscolar SET Situación = 0`)
    await executeQuery(`UPDATE dbo.PeriodoEscolar SET Situación = 1 WHERE IdPerio = ?`, [idPeriodo])
    
    res.json({ success: true, mensaje: `Periodo ${idPeriodo} activado correctamente` })
  } catch (err) {
    console.error("Error en /api/admin/activar-periodo:", err)
    res.status(500).json({ error: "Error interno." })
  }
})

// Configurar fechas de evaluación
app.post("/api/admin/configurar-evaluacion", authMiddleware, soloAdmin, async (req, res) => {
  console.log("📥 POST /api/admin/configurar-evaluacion")
  
  const { 
    fechaInicioTutor, 
    fechaFinTutor, 
    fechaInicioDocente, 
    fechaFinDocente,
    tutorActivo, 
    docenteActivo 
  } = req.body
  
  try {
    const encuesta = await executeQuerySingle(`
      SELECT IdEncuesta FROM eval.Encuesta WHERE IdTipoEncuesta = 1 AND Activa = 1
    `)
    
    if (!encuesta) {
      return res.status(404).json({ error: "No hay encuesta activa configurada." })
    }
    
    const convertirFecha = (fechaStr) => {
      if (!fechaStr) return null
      if (fechaStr.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
        return fechaStr
      }
      return fechaStr.replace('T', ' ') + ':00'
    }
    
    await executeQuery(`
      UPDATE eval.Encuesta SET 
        FechaInicioTutor = ?,
        FechaFinTutor = ?,
        FechaInicioDocente = ?,
        FechaFinDocente = ?,
        TutorActivo = ?,
        DocenteActivo = ?
      WHERE IdEncuesta = ?
    `, [
      convertirFecha(fechaInicioTutor) || '2026-01-12 08:00:00',
      convertirFecha(fechaFinTutor) || '2026-06-26 23:59:59',
      convertirFecha(fechaInicioDocente) || '2026-01-12 08:00:00',
      convertirFecha(fechaFinDocente) || '2026-06-26 23:59:59',
      tutorActivo ? 1 : 0,
      docenteActivo ? 1 : 0,
      encuesta.IdEncuesta
    ])
    
    console.log("✅ Configuración guardada correctamente")
    res.json({ success: true, mensaje: "Configuración guardada correctamente" })
    
  } catch (err) {
    console.error("❌ Error:", err)
    res.status(500).json({ error: "Error interno: " + err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   ALUMNO — GET /api/alumno/perfil
══════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════
   ALUMNO — GET /api/alumno/perfil (SOLO LISTAR, NO CREAR EVALUACIONES)
══════════════════════════════════════════════════════════════ */
app.get("/api/alumno/perfil", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") {
    return res.status(403).json({ error: "Acceso denegado" })
  }
  
  try {
    const alumno = await executeQuerySingle(`
      SELECT a.NumControl, a.NombreCompleto, a.CorreoE, a.Semestre,
             c.Nombre AS carrera, c.NombreCorto AS siglas
      FROM dbo.Alumno a
      JOIN dbo.Carrera c ON c.IdCarre = a.IdCarre
      WHERE a.NumControl = ?
    `, [req.user.id])
    
    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado." })
    }
    
    const periodo = await executeQuerySingle(`
      SELECT IdPerio, Nombre FROM dbo.PeriodoEscolar WHERE Situación = 1
    `)
    
    if (!periodo) {
      return res.json({ ...alumno, periodo: null, tutor: null, docentes: [], totalTutores: 0 })
    }
    
    const encuesta = await executeQuerySingle(`
      SELECT IdEncuesta, 
             FechaInicioTutor, FechaFinTutor, 
             FechaInicioDocente, FechaFinDocente,
             TutorActivo, DocenteActivo,
             GETDATE() AS FechaActual
      FROM eval.Encuesta WHERE IdTipoEncuesta = 1 AND Activa = 1
    `)
    
    // Obtener TUTOR (materia de tutoría) - SOLO LISTAR, NO CREAR EVALUACIONES
    let tutor = null
    if (encuesta) {
      const tutorData = await executeQuerySingle(`
        SELECT DISTINCT
          d.IdDoce AS id,
          d.Grado + ' ' + d.Nombre + ' ' + d.Apellidos AS nombre,
          m.Nombre AS materia,
          g.Clave AS grupo,
          g.IdGrupo AS id_grupo
        FROM dbo.CargaAlumno ca
        JOIN dbo.Grupo g ON g.IdGrupo = ca.IdGrupo
        JOIN dbo.Docente d ON d.IdDoce = g.IdDoce
        JOIN dbo.Materia m ON m.IdMate = g.IdMate
        WHERE ca.NumControl = ?
          AND g.IdPerio = ?
          AND ca.Desertor = 0
          AND (m.NombreCorto LIKE '%TUT%' OR m.Nombre LIKE '%Tutoría%')
      `, [req.user.id, periodo.IdPerio])
      
      if (tutorData) {
        // SOLO OBTENER ESTADO, NO CREAR
        const evalEstado = await executeQuerySingle(`
          SELECT Estado FROM eval.EvaluacionDocente 
          WHERE NumControl = ? AND IdDoce = ? AND IdPerio = ?
        `, [req.user.id, tutorData.id, periodo.IdPerio])
        
        tutor = {
          ...tutorData,
          evaluado: evalEstado?.Estado === 3,
          estadoEvaluacion: evalEstado?.Estado || null  // null significa que no existe evaluación
        }
      }
    }
    
    // Obtener DOCENTES - SOLO LISTAR, NO CREAR EVALUACIONES
    let docentes = []
    if (encuesta) {
      docentes = await executeQuery(`
        SELECT 
          d.IdDoce AS id,
          d.Grado + ' ' + d.Nombre + ' ' + d.Apellidos AS nombre,
          m.Nombre AS materia,
          m.NombreCorto AS materiaCorto,
          g.Clave AS grupo,
          g.IdGrupo AS id_grupo
        FROM dbo.CargaAlumno ca
        JOIN dbo.Grupo g ON g.IdGrupo = ca.IdGrupo
        JOIN dbo.Docente d ON d.IdDoce = g.IdDoce
        JOIN dbo.Materia m ON m.IdMate = g.IdMate
        WHERE ca.NumControl = ?
          AND g.IdPerio = ?
          AND ca.Desertor = 0
          AND (m.NombreCorto NOT LIKE '%TUT%' AND m.Nombre NOT LIKE '%Tutoría%')
        ORDER BY d.Apellidos
      `, [req.user.id, periodo.IdPerio])
      
      // SOLO OBTENER ESTADO, NO CREAR
      for (let docente of docentes) {
        const evalEstado = await executeQuerySingle(`
          SELECT Estado FROM eval.EvaluacionDocente 
          WHERE NumControl = ? AND IdDoce = ? AND IdPerio = ?
        `, [req.user.id, docente.id, periodo.IdPerio])
        
        docente.evaluado = evalEstado?.Estado === 3
        docente.estadoEvaluacion = evalEstado?.Estado || null  // null = no existe evaluación
      }
    }
    
    // En el endpoint /api/alumno/perfil, donde se construye configuracion
const configuracion = {
  tutorActivo: encuesta ? (encuesta.TutorActivo === 1 || encuesta.TutorActivo === true) : false,
  docenteActivo: encuesta ? (encuesta.DocenteActivo === 1 || encuesta.DocenteActivo === true) : false,
  fechaInicioTutor: encuesta?.FechaInicioTutor || null,
  fechaFinTutor: encuesta?.FechaFinTutor || null,
  fechaInicioDocente: encuesta?.FechaInicioDocente || null,
  fechaFinDocente: encuesta?.FechaFinDocente || null
}

// Agrega este log para depurar
console.log("🔧 Configuración construida:", {
  tutorActivo: configuracion.tutorActivo,
  docenteActivo: configuracion.docenteActivo,
  tutorActivoRaw: encuesta?.TutorActivo,
  docenteActivoRaw: encuesta?.DocenteActivo
})
    
    const response = {
      NumControl: alumno.NumControl,
      NombreCompleto: alumno.NombreCompleto,
      CorreoE: alumno.CorreoE,
      Semestre: alumno.Semestre,
      carrera: alumno.carrera,
      siglas: alumno.siglas,
      periodo: periodo.Nombre,
      idPeriodo: periodo.IdPerio,
      tutor,
      docentes,
      totalTutores: (tutor ? 1 : 0) + docentes.length,
      completadas: docentes.filter(d => d.evaluado).length + (tutor?.evaluado ? 1 : 0),
      configuracion
    }
    
    console.log(`✅ Perfil enviado: ${response.completadas}/${response.totalTutores} completadas`)
    res.json(response)
    
  } catch (err) {
    console.error("Error en /api/alumno/perfil:", err)
    res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   ALUMNO — GET /api/alumno/evaluaciones
══════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════
   ALUMNO — GET /api/alumno/evaluaciones (SOLO LISTAR, NO CREAR)
══════════════════════════════════════════════════════════════ */
app.get("/api/alumno/evaluaciones", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") {
    return res.status(403).json({ error: "Acceso denegado" })
  }
  
  try {
    const periodo = await executeQuerySingle(`SELECT IdPerio FROM dbo.PeriodoEscolar WHERE Situación = 1`)
    if (!periodo) return res.json({ evaluaciones: [] })
    
    // SOLO LISTAR evaluaciones existentes, NO CREAR NINGUNA
    const rows = await executeQuery(`
      SELECT IdDoce, Estado, FechaInicio, FechaFin
      FROM eval.EvaluacionDocente 
      WHERE NumControl = ? AND IdPerio = ?
    `, [req.user.id, periodo.IdPerio])
    
    const evaluaciones = rows.map(r => ({ 
      idTutor: r.IdDoce, 
      completada: r.Estado === 3,
      estado: r.Estado,
      fechaInicio: r.FechaInicio,
      fechaFin: r.FechaFin
    }))
    
    res.json({ evaluaciones })
  } catch (err) {
    console.error("Error en /api/alumno/evaluaciones:", err)
    res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   ENCUESTA — GET /api/encuesta/preguntas
══════════════════════════════════════════════════════════════ */
app.get("/api/encuesta/preguntas", authMiddleware, async (req, res) => {
  try {
    const encuesta = await executeQuerySingle(`
      SELECT IdEncuesta FROM eval.Encuesta WHERE IdTipoEncuesta = 1 AND Activa = 1
    `)
    
    if (!encuesta) return res.status(404).json({ error: "No hay encuesta activa." })
    
    const preguntas = await executeQuery(`
      SELECT IdPregunta AS id, IdCategoria AS idCategoria, Texto
      FROM eval.Pregunta
      WHERE IdEncuesta = ? AND Activa = 1
      ORDER BY Orden
    `, [encuesta.IdEncuesta])
    
    return res.json({ idEncuesta: encuesta.IdEncuesta, preguntas, totalPreguntas: preguntas.length })
  } catch (err) {
    console.error("Error en /api/encuesta/preguntas:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   ENCUESTA — GET /api/encuesta/categorias
══════════════════════════════════════════════════════════════ */
app.get("/api/encuesta/categorias", authMiddleware, async (req, res) => {
  try {
    const categorias = await executeQuery(`
      SELECT IdCategoria AS id, Nombre, Orden, Activa
      FROM eval.Categoria
      WHERE Activa = 1
      ORDER BY Orden
    `);
    
    res.json({ categorias });
  } catch (err) {
    console.error("Error en /api/encuesta/categorias:", err);
    res.status(500).json({ error: "Error interno." });
  }
});

/* ══════════════════════════════════════════════════════════════
   ENCUESTA — GET /api/encuesta/rubrica
══════════════════════════════════════════════════════════════ */
app.get("/api/encuesta/rubrica", authMiddleware, async (req, res) => {
  try {
    const rubrica = await executeQuery(`
      SELECT IdCategoria AS idCategoria, Valor, Descripcion
      FROM eval.Rubrica
      ORDER BY IdCategoria, Valor
    `);
    
    res.json({ rubrica });
  } catch (err) {
    console.error("Error en /api/encuesta/rubrica:", err);
    res.status(500).json({ error: "Error interno." });
  }
});

/* ══════════════════════════════════════════════════════════════
   ENCUESTA — GET /api/encuesta/escala
══════════════════════════════════════════════════════════════ */
app.get("/api/encuesta/escala", authMiddleware, async (req, res) => {
  try {
    const escala = {
      5: "Excelente",
      4: "Muy bueno",
      3: "Bueno",
      2: "Regular",
      1: "Deficiente"
    };
    
    res.json({ escala });
  } catch (err) {
    console.error("Error en /api/encuesta/escala:", err);
    res.status(500).json({ error: "Error interno." });
  }
});

/* ══════════════════════════════════════════════════════════════
   EVALUACIÓN — POST /api/evaluacion/iniciar
══════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════
   EVALUACIÓN — POST /api/evaluacion/iniciar (CORREGIDO)
══════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════
   EVALUACIÓN — POST /api/evaluacion/iniciar (CORREGIDO)
══════════════════════════════════════════════════════════════ */
app.post("/api/evaluacion/iniciar", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") {
    return res.status(403).json({ error: "Acceso denegado" })
  }
  
  const { idTutor, idGrupo } = req.body
  console.log("📥 POST /api/evaluacion/iniciar - idTutor:", idTutor, "idGrupo:", idGrupo)
  
  if (!idTutor || !idGrupo) {
    return res.status(400).json({ error: "idTutor e idGrupo requeridos." })
  }
  
  try {
    const periodo = await executeQuerySingle(`SELECT IdPerio FROM dbo.PeriodoEscolar WHERE Situación = 1`)
    const encuesta = await executeQuerySingle(`SELECT IdEncuesta FROM eval.Encuesta WHERE IdTipoEncuesta = 1 AND Activa = 1`)
    
    if (!periodo || !encuesta) {
      return res.status(409).json({ error: "No hay encuesta o periodo activo." })
    }
    
    // Verificar que el grupo pertenezca al docente
    const grupo = await executeQuerySingle(`
      SELECT IdGrupo, IdDoce FROM dbo.Grupo WHERE IdGrupo = ? AND IdDoce = ?
    `, [idGrupo, idTutor])
    
    if (!grupo) {
      console.log("❌ El grupo no pertenece al docente")
      return res.status(400).json({ error: "El grupo no pertenece al docente especificado." })
    }
    
    // Buscar evaluación existente
    const existente = await executeQuerySingle(`
      SELECT IdEvaluacion, Estado FROM eval.EvaluacionDocente 
      WHERE NumControl = ? AND IdDoce = ? AND IdPerio = ?
    `, [req.user.id, idTutor, periodo.IdPerio])
    
    // Si ya existe una evaluación COMPLETADA, no permitir
    if (existente && existente.Estado === 3) {
      return res.status(409).json({ error: "Ya completaste esta evaluación." })
    }
    
    // Si ya existe una evaluación INICIADA, devolverla
    if (existente && existente.Estado === 1) {
      return res.json({ 
        idEvaluacion: existente.IdEvaluacion, 
        idEncuesta: encuesta.IdEncuesta, 
        mensaje: "Evaluación ya iniciada" 
      })
    }
    
    // Crear nueva evaluación
    const insertResult = await executeQuery(`
      INSERT INTO eval.EvaluacionDocente (IdEncuesta, NumControl, IdDoce, IdGrupo, IdPerio, Estado, IpOrigen)
      OUTPUT INSERTED.IdEvaluacion
      VALUES (?, ?, ?, ?, ?, 1, ?)
    `, [encuesta.IdEncuesta, req.user.id, idTutor, idGrupo, periodo.IdPerio, req.ip || 'unknown'])
    
    const idEvaluacion = insertResult[0]?.IdEvaluacion
    console.log("✅ Evaluación creada con ID:", idEvaluacion, "IdDoce:", idTutor)
    
    return res.json({ idEvaluacion, idEncuesta: encuesta.IdEncuesta, mensaje: "Evaluación iniciada correctamente" })
  } catch (err) {
    console.error("Error en /api/evaluacion/iniciar:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   EVALUACIÓN — POST /api/evaluacion/responder (CORREGIDO)
══════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════
   EVALUACIÓN — POST /api/evaluacion/responder (CORREGIDO)
══════════════════════════════════════════════════════════════ */
app.post("/api/evaluacion/responder", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") {
    return res.status(403).json({ error: "Acceso denegado" })
  }
  
  const { idEvaluacion, respuestas } = req.body
  if (!idEvaluacion || !Array.isArray(respuestas) || !respuestas.length) {
    return res.status(400).json({ error: "Datos incompletos." })
  }
  
  try {
    // Verificar si la evaluación existe
    let ev = await executeQuerySingle(`
      SELECT IdEvaluacion, Estado, NumControl, IdEncuesta, IdPerio, IdDoce, IdGrupo
      FROM eval.EvaluacionDocente WHERE IdEvaluacion = ?
    `, [idEvaluacion])
    
    // Si no existe la evaluación, crearla
    if (!ev) {
      console.log(`⚠️ Evaluación ${idEvaluacion} no encontrada, creando...`)
      
      // Obtener datos necesarios para crear la evaluación
      const periodo = await executeQuerySingle(`SELECT IdPerio FROM dbo.PeriodoEscolar WHERE Situación = 1`)
      const encuesta = await executeQuerySingle(`SELECT IdEncuesta FROM eval.Encuesta WHERE IdTipoEncuesta = 1 AND Activa = 1`)
      
      // Obtener el docente de las respuestas (asumiendo que todas son para el mismo docente)
      // Necesitas pasar idDocente en el body o almacenarlo
      
      // Por ahora, buscamos el IdDoce desde el grupo
      const grupo = await executeQuerySingle(`
        SELECT IdDoce FROM dbo.Grupo WHERE IdGrupo = (SELECT IdGrupo FROM eval.EvaluacionDocente WHERE IdEvaluacion = ?)
      `, [idEvaluacion])
      
      // Crear la evaluación
      const insertResult = await executeQuery(`
        INSERT INTO eval.EvaluacionDocente (IdEncuesta, NumControl, IdDoce, IdGrupo, IdPerio, Estado, FechaInicio)
        OUTPUT INSERTED.IdEvaluacion
        VALUES (?, ?, ?, ?, ?, 1, GETDATE())
      `, [encuesta.IdEncuesta, req.user.id, grupo?.IdDoce, idGrupo, periodo.IdPerio])
      
      ev = await executeQuerySingle(`
        SELECT IdEvaluacion, Estado, NumControl, IdEncuesta, IdPerio, IdDoce, IdGrupo
        FROM eval.EvaluacionDocente WHERE IdEvaluacion = ?
      `, [insertResult[0]?.IdEvaluacion])
    }
    
    if (!ev) return res.status(404).json({ error: "Evaluación no encontrada." })
    if (ev.NumControl !== req.user.id) return res.status(403).json({ error: "No es tu evaluación." })
    
    // Insertar respuestas
    for (const r of respuestas) {
      await executeQuery(`
        IF EXISTS (SELECT 1 FROM eval.RespuestaEvaluacion WHERE IdEvaluacion = ? AND IdPregunta = ?)
          UPDATE eval.RespuestaEvaluacion SET Calificacion = ?, FechaResp = GETDATE() 
          WHERE IdEvaluacion = ? AND IdPregunta = ?
        ELSE
          INSERT INTO eval.RespuestaEvaluacion (IdEvaluacion, IdPregunta, Calificacion, FechaResp)
          VALUES (?, ?, ?, GETDATE())
      `, [idEvaluacion, r.idPregunta, r.calificacion, idEvaluacion, r.idPregunta, idEvaluacion, r.idPregunta, r.calificacion])
    }
    
    // Verificar si todas las preguntas están respondidas
    const totalRequeridas = await executeQuerySingle(`
      SELECT COUNT(*) AS total FROM eval.Pregunta 
      WHERE IdEncuesta = ? AND Requerida = 1 AND Activa = 1
    `, [ev.IdEncuesta])
    
    const totalRespondidas = await executeQuerySingle(`
      SELECT COUNT(*) AS total FROM eval.RespuestaEvaluacion re
      JOIN eval.Pregunta p ON p.IdPregunta = re.IdPregunta
      WHERE re.IdEvaluacion = ? AND p.Requerida = 1
    `, [idEvaluacion])
    
    if (totalRespondidas.total >= totalRequeridas.total) {
      await executeQuery(`
        UPDATE eval.EvaluacionDocente SET Estado = 3, FechaFin = GETDATE() 
        WHERE IdEvaluacion = ?
      `, [idEvaluacion])
      return res.json({ success: true, mensaje: "Evaluación completada correctamente." })
    }
    
    return res.json({ success: true, mensaje: "Respuestas guardadas correctamente." })
    
  } catch (err) {
    console.error("Error en /api/evaluacion/responder:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})




/* ══════════════════════════════════════════════════════════════
   EVALUACIÓN — POST /api/evaluacion/comentario
══════════════════════════════════════════════════════════════ */
app.post("/api/evaluacion/comentario", authMiddleware, async (req, res) => {
  if (req.user.tipo !== "alumno") {
    return res.status(403).json({ error: "Acceso denegado" })
  }

  const { idEvaluacion, idDocente, comentario } = req.body

  if (!idEvaluacion || !idDocente || !comentario) {
    return res.status(400).json({ error: "idEvaluacion, idDocente y comentario son requeridos." })
  }

  const texto = String(comentario).trim()
  if (texto.length < 10) return res.status(400).json({ error: "El comentario debe tener al menos 10 caracteres." })
  if (texto.length > 1000) return res.status(400).json({ error: "El comentario no puede superar los 1000 caracteres." })

  try {
    const evaluacion = await executeQuerySingle(`
      SELECT IdEvaluacion, NumControl FROM eval.EvaluacionDocente WHERE IdEvaluacion = ?
    `, [idEvaluacion])

    if (!evaluacion) return res.status(404).json({ error: "Evaluación no encontrada." })
    if (evaluacion.NumControl !== req.user.id) return res.status(403).json({ error: "No tienes permiso." })

    await executeQuery(`
      IF EXISTS (SELECT 1 FROM eval.ComentarioEvaluacion WHERE IdEvaluacion = ?)
        UPDATE eval.ComentarioEvaluacion SET Comentario = ?, FechaCreacion = GETDATE(), Visible = 1
        WHERE IdEvaluacion = ?
      ELSE
        INSERT INTO eval.ComentarioEvaluacion (IdEvaluacion, NumControl, IdDoce, Comentario, FechaCreacion, Visible)
        VALUES (?, ?, ?, ?, GETDATE(), 1)
    `, [idEvaluacion, texto, idEvaluacion, idEvaluacion, req.user.id, idDocente, texto])

    return res.json({ success: true, mensaje: "Comentario guardado correctamente." })
  } catch (err) {
    console.error("❌ Error en POST /api/evaluacion/comentario:", err)
    return res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/docentes
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/docentes", authMiddleware, soloAdmin, async (req, res) => {
  try {
    const rows = await executeQuery(`
      SELECT d.IdDoce AS id,
             d.Grado + ' ' + d.Nombre + ' ' + d.Apellidos AS nombre,
             ISNULL(dep.Nombre, 'Sin Departamento') AS departamento
      FROM dbo.Docente d
      LEFT JOIN dbo.Departamento dep ON dep.IdDepa = d.IdDepa
      WHERE d.Vigente = 1
      ORDER BY dep.Nombre, d.Apellidos
    `)
    res.json({ docentes: rows })
  } catch (err) {
    console.error("Error en /api/dashboard/docentes:", err)
    res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/periodos
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/periodos", authMiddleware, soloAdmin, async (req, res) => {
  try {
    const rows = await executeQuery(`
      SELECT 
        IdPerio AS id, 
        Nombre, 
        NombreCorto,
        Situación AS activo,
        Inicio,
        Fin,
        CASE 
          WHEN Situación = 1 THEN 'Activo'
          WHEN Inicio > GETDATE() THEN 'Próximo'
          WHEN Fin < GETDATE() THEN 'Finalizado'
          ELSE 'En curso'
        END AS estado
      FROM dbo.PeriodoEscolar 
      ORDER BY IdPerio DESC
    `)
    res.json({ periodos: rows })
  } catch (err) {
    console.error("Error en /api/dashboard/periodos:", err)
    res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/periodo-activo
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/periodo-activo", authMiddleware, soloAdmin, async (req, res) => {
  try {
    const periodo = await executeQuerySingle(`
      SELECT 
        IdPerio AS id, 
        Nombre, 
        NombreCorto,
        Situación AS activo,
        Inicio,
        Fin
      FROM dbo.PeriodoEscolar 
      WHERE Situación = 1
    `)
    
    if (!periodo) {
      return res.json({ existe: false, mensaje: "No hay periodo activo configurado" })
    }
    
    res.json({ existe: true, periodo })
  } catch (err) {
    console.error("Error en /api/dashboard/periodo-activo:", err)
    res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — POST /api/dashboard/periodo-activo
══════════════════════════════════════════════════════════════ */
app.post("/api/dashboard/periodo-activo", authMiddleware, soloAdmin, async (req, res) => {
  const { idPeriodo } = req.body
  
  if (!idPeriodo) {
    return res.status(400).json({ error: "idPeriodo requerido." })
  }
  
  const periodoId = parseInt(idPeriodo)
  if (isNaN(periodoId)) {
    return res.status(400).json({ error: "idPeriodo inválido." })
  }
  
  try {
    const periodoExiste = await executeQuerySingle(`
      SELECT IdPerio FROM dbo.PeriodoEscolar WHERE IdPerio = ?
    `, [periodoId])
    
    if (!periodoExiste) {
      return res.status(404).json({ error: "Periodo no encontrado." })
    }
    
    await executeQuery(`UPDATE dbo.PeriodoEscolar SET Situación = 0`)
    await executeQuery(`UPDATE dbo.PeriodoEscolar SET Situación = 1 WHERE IdPerio = ?`, [periodoId])
    
    const nuevoActivo = await executeQuerySingle(`
      SELECT IdPerio AS id, Nombre, NombreCorto, Inicio, Fin
      FROM dbo.PeriodoEscolar WHERE IdPerio = ?
    `, [periodoId])
    
    res.json({ 
      success: true, 
      mensaje: `Periodo ${nuevoActivo.Nombre} activado correctamente`,
      periodo: nuevoActivo
    })
  } catch (err) {
    console.error("Error en POST /api/dashboard/periodo-activo:", err)
    res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/docentes/:idDocente/periodos/:idPeriodo/grupos
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/docentes/:idDocente/periodos/:idPeriodo/grupos", authMiddleware, soloAdmin, async (req, res) => {
  const { idDocente, idPeriodo } = req.params
  try {
    const rows = await executeQuery(`
      SELECT g.IdGrupo AS id, g.Clave, m.Nombre AS materia
      FROM dbo.Grupo g
      LEFT JOIN dbo.Materia m ON m.IdMate = g.IdMate
      WHERE g.IdDoce = ? AND g.IdPerio = ?
      ORDER BY g.Clave
    `, [parseInt(idDocente), parseInt(idPeriodo)])
    res.json({ grupos: rows })
  } catch (err) {
    console.error("Error en /api/dashboard/grupos:", err)
    res.status(500).json({ error: "Error interno." })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/docente/:idDocente/alumnos
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/docente/:idDocente/alumnos", authMiddleware, soloAdmin, async (req, res) => {
  const { idDocente } = req.params
  const { idPeriodo } = req.query

  if (!idPeriodo) {
    return res.status(400).json({ error: "idPeriodo requerido." })
  }

  const docenteId = parseInt(idDocente)
  const periodoId = parseInt(idPeriodo)

  if (isNaN(docenteId) || isNaN(periodoId)) {
    return res.status(400).json({ error: "IDs inválidos." })
  }

  try {
    const alumnos = await executeQuery(`
      SELECT 
        a.NumControl AS numControl,
        a.NombreCompleto AS nombre,
        a.CorreoE AS correo,
        a.Semestre AS semestreAlumno,
        ca.SemestreAlumno AS semestreCarga,
        g.IdGrupo AS idGrupo,
        g.Clave AS grupo,
        m.Nombre AS materia,
        m.NombreCorto AS materiaCorto,
        ca.CalFinal AS calificacion,
        ca.FaltasTotales AS faltas,
        ca.Desertor AS desertor,
        CASE 
          WHEN ed.Estado = 3 THEN 'completada'
          WHEN ed.Estado IS NOT NULL THEN 'en_proceso'
          ELSE 'pendiente'
        END AS estadoEvaluacion,
        ed.FechaInicio,
        ed.FechaFin
      FROM dbo.CargaAlumno ca
      INNER JOIN dbo.Grupo g ON g.IdGrupo = ca.IdGrupo
      INNER JOIN dbo.Alumno a ON a.NumControl = ca.NumControl
      INNER JOIN dbo.Materia m ON m.IdMate = g.IdMate
      LEFT JOIN eval.EvaluacionDocente ed ON 
        ed.NumControl = ca.NumControl 
        AND ed.IdDoce = g.IdDoce 
        AND ed.IdGrupo = g.IdGrupo
        AND ed.IdPerio = g.IdPerio
      WHERE g.IdDoce = ?
        AND g.IdPerio = ?
        AND ca.Desertor = 0
      ORDER BY a.NombreCompleto, m.Nombre
    `, [docenteId, periodoId])

    res.json({ alumnos })
  } catch (err) {
    console.error("❌ Error en /api/dashboard/docente/:id/alumnos:", err)
    res.status(500).json({ error: "Error interno: " + err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/departamentos
══════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/departamentos (VERSIÓN COMPLETA)
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/departamentos", authMiddleware, soloAdmin, async (req, res) => {
  const { idPeriodo } = req.query
  if (!idPeriodo) {
    return res.status(400).json({ error: "idPeriodo requerido." })
  }

  const periodoId = parseInt(idPeriodo)
  if (isNaN(periodoId)) {
    return res.status(400).json({ error: "idPeriodo inválido." })
  }

  try {
    console.log(`📊 GET /api/dashboard/departamentos - Periodo: ${periodoId}`)
    
    // 1. Obtener departamentos con docentes que tienen grupos en el periodo
    const departamentos = await executeQuery(`
      SELECT DISTINCT
        dep.IdDepa AS id,
        dep.Nombre AS nombre
      FROM dbo.Departamento dep
      INNER JOIN dbo.Docente d ON d.IdDepa = dep.IdDepa AND d.Vigente = 1
      INNER JOIN dbo.Grupo g ON g.IdDoce = d.IdDoce AND g.IdPerio = ?
      ORDER BY dep.Nombre
    `, [periodoId])

    console.log(`📊 Departamentos encontrados: ${departamentos.length}`)

    if (!departamentos.length) {
      return res.json({ departamentos: [] })
    }

    const resultado = []

    for (const depto of departamentos) {
      // 2. Obtener docentes del departamento
      const docentesDepto = await executeQuery(`
        SELECT 
          d.IdDoce AS id,
          d.Grado + ' ' + d.Nombre + ' ' + d.Apellidos AS nombre
        FROM dbo.Docente d
        INNER JOIN dbo.Grupo g ON g.IdDoce = d.IdDoce AND g.IdPerio = ?
        WHERE d.IdDepa = ? AND d.Vigente = 1
        GROUP BY d.IdDoce, d.Grado, d.Nombre, d.Apellidos
        ORDER BY d.Apellidos
      `, [periodoId, depto.id])

      const totalDocentes = docentesDepto.length
      if (totalDocentes === 0) continue

      const docenteIds = docentesDepto.map(d => d.id)
      
      // 3. Contar alumnos por departamento
      let alumnosQuery = `
        SELECT
          COUNT(DISTINCT i.NumControl) AS total_alumnos,
          COUNT(DISTINCT CASE WHEN e.Estado = 3 THEN i.NumControl END) AS alumnos_completaron
        FROM eval.Inscripcion i
        JOIN dbo.Grupo g ON g.IdGrupo = i.IdGrupo
          AND g.IdDoce IN (${docenteIds.map(() => '?').join(',')})
          AND g.IdPerio = ?
        LEFT JOIN eval.EvaluacionDocente e ON e.NumControl = i.NumControl
          AND e.IdDoce = g.IdDoce
          AND e.IdPerio = ?
          AND e.Estado = 3
        WHERE i.Activa = 1
      `
      const alumnosParams = [...docenteIds, periodoId, periodoId]
      const alumnosCounts = await executeQuerySingle(alumnosQuery, alumnosParams)

      const totalAlumnos = alumnosCounts?.total_alumnos ?? 0
      const alumnosCompletaron = alumnosCounts?.alumnos_completaron ?? 0
      const participacion = totalAlumnos > 0
        ? parseFloat(((alumnosCompletaron / totalAlumnos) * 100).toFixed(1))
        : 0

      // 4. Contar docentes evaluados
      const evCounts = await executeQuerySingle(`
        SELECT COUNT(DISTINCT IdDoce) AS evaluados
        FROM eval.EvaluacionDocente
        WHERE IdDoce IN (${docenteIds.map(() => '?').join(',')})
          AND IdPerio = ?
          AND Estado = 3
      `, [...docenteIds, periodoId])

      const docentesEvaluados = evCounts?.evaluados ?? 0

      // 5. Obtener promedios por docente
      const promediosDocentes = await executeQuery(`
        SELECT
          e.IdDoce,
          ROUND(AVG(CAST(r.Calificacion AS FLOAT)), 2) AS promedio
        FROM eval.EvaluacionDocente e
        JOIN eval.RespuestaEvaluacion r ON r.IdEvaluacion = e.IdEvaluacion
        WHERE e.IdDoce IN (${docenteIds.map(() => '?').join(',')})
          AND e.IdPerio = ?
          AND e.Estado = 3
        GROUP BY e.IdDoce
      `, [...docenteIds, periodoId])

      const promedioGeneral = promediosDocentes.length
        ? parseFloat((promediosDocentes.reduce((s, d) => s + Number(d.promedio), 0) / promediosDocentes.length).toFixed(2))
        : 0

      const clasificacion = promedioGeneral >= 4.5 ? "EXCELENTE"
        : promedioGeneral >= 3.5 ? "MUY BUENO"
        : promedioGeneral >= 2.5 ? "BUENO"
        : promedioGeneral >= 1.5 ? "REGULAR"
        : promedioGeneral > 0 ? "DEFICIENTE"
        : "SIN DATOS"

      // 6. Obtener estadísticas por docente
      const docentesConStats = []
      for (const doc of docentesDepto) {
        const docProm = await executeQuerySingle(`
          SELECT COALESCE(ROUND(AVG(CAST(r.Calificacion AS FLOAT)), 2), 0) AS promedio
          FROM eval.EvaluacionDocente e
          JOIN eval.RespuestaEvaluacion r ON r.IdEvaluacion = e.IdEvaluacion
          WHERE e.IdDoce = ? AND e.IdPerio = ? AND e.Estado = 3
        `, [doc.id, periodoId])

        const docAlumnos = await executeQuerySingle(`
          SELECT
            COUNT(DISTINCT i.NumControl) AS total,
            COUNT(DISTINCT CASE WHEN e.Estado = 3 THEN i.NumControl END) AS completaron
          FROM eval.Inscripcion i
          JOIN dbo.Grupo g ON g.IdGrupo = i.IdGrupo AND g.IdDoce = ? AND g.IdPerio = ?
          LEFT JOIN eval.EvaluacionDocente e ON e.NumControl = i.NumControl
            AND e.IdDoce = ? AND e.IdPerio = ? AND e.Estado = 3
          WHERE i.Activa = 1
        `, [doc.id, periodoId, doc.id, periodoId])

        const promedio = Number(docProm?.promedio || 0)
        const docClasif = promedio >= 4.5 ? "EXCELENTE"
          : promedio >= 3.5 ? "MUY BUENO"
          : promedio >= 2.5 ? "BUENO"
          : promedio >= 1.5 ? "REGULAR"
          : promedio > 0 ? "DEFICIENTE"
          : "SIN DATOS"

        docentesConStats.push({
          id: doc.id,
          nombre: doc.nombre,
          promedio,
          clasificacion: docClasif,
          totalAlumnos: docAlumnos?.total ?? 0,
          alumnosCompletaron: docAlumnos?.completaron ?? 0,
        })
      }

      resultado.push({
        id: depto.id,
        nombre: depto.nombre,
        totalDocentes,
        docentesEvaluados,
        promedioGeneral,
        participacionAlumnos: participacion,
        clasificacion,
        docentes: docentesConStats,
      })
    }

    resultado.sort((a, b) => b.promedioGeneral - a.promedioGeneral)
    console.log(`✅ Departamentos procesados: ${resultado.length}`)
    res.json({ departamentos: resultado })

  } catch (err) {
    console.error("❌ Error en /api/dashboard/departamentos:", err)
    res.status(500).json({ error: "Error interno: " + err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/resultados
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/resultados", authMiddleware, soloAdmin, async (req, res) => {
  const { idDocente, idPeriodo, idGrupo } = req.query
  if (!idDocente || !idPeriodo) {
    return res.status(400).json({ error: "idDocente e idPeriodo requeridos." })
  }

  try {
    const docenteId = parseInt(idDocente)
    const periodoId = parseInt(idPeriodo)
    if (isNaN(docenteId) || isNaN(periodoId)) {
      return res.status(400).json({ error: "IDs inválidos" })
    }

    const grupoId = idGrupo ? parseInt(idGrupo) : null

    const docente = await executeQuerySingle(`
      SELECT IdDoce, Grado + ' ' + Nombre + ' ' + Apellidos AS nombre
      FROM dbo.Docente WHERE IdDoce = ?
    `, [docenteId])

    if (!docente) {
      return res.status(404).json({ error: "Docente no encontrado." })
    }

    const periodo = await executeQuerySingle(`
      SELECT IdPerio, Nombre FROM dbo.PeriodoEscolar WHERE IdPerio = ?
    `, [periodoId])

    let promediosCatQuery = `
      SELECT c.IdCategoria, c.Nombre,
             COALESCE(ROUND(AVG(CAST(r.Calificacion AS FLOAT)), 2), 0) AS promedio
      FROM eval.Categoria c
      LEFT JOIN eval.Pregunta p ON p.IdCategoria = c.IdCategoria
        AND p.IdEncuesta = (SELECT TOP 1 IdEncuesta FROM eval.Encuesta WHERE IdTipoEncuesta = 1 AND Activa = 1)
      LEFT JOIN eval.RespuestaEvaluacion r ON r.IdPregunta = p.IdPregunta
      LEFT JOIN eval.EvaluacionDocente e ON e.IdEvaluacion = r.IdEvaluacion
        AND e.IdDoce = ? AND e.IdPerio = ? AND e.Estado = 3
    `
    const promediosParams = [docenteId, periodoId]
    if (grupoId) {
      promediosCatQuery += ` AND e.IdGrupo = ?`
      promediosParams.push(grupoId)
    }
    promediosCatQuery += ` GROUP BY c.IdCategoria, c.Nombre ORDER BY c.IdCategoria`

    const promediosCat = await executeQuery(promediosCatQuery, promediosParams)

    let countsQuery = `
      SELECT
        COUNT(DISTINCT i.NumControl) AS total_alumnos,
        COUNT(DISTINCT CASE WHEN e.Estado = 3 THEN e.NumControl END) AS completaron
      FROM eval.Inscripcion i
      JOIN dbo.Grupo g ON g.IdGrupo = i.IdGrupo AND g.IdDoce = ? AND g.IdPerio = ?
      LEFT JOIN eval.EvaluacionDocente e ON e.NumControl = i.NumControl
        AND e.IdDoce = ? AND e.IdPerio = ? AND e.Estado = 3
      WHERE i.Activa = 1
    `
    const countsParams = [docenteId, periodoId, docenteId, periodoId]
    if (grupoId) {
      countsQuery += ` AND g.IdGrupo = ?`
      countsParams.push(grupoId)
    }

    const counts = await executeQuerySingle(countsQuery, countsParams)

    let completaronQuery = `
      SELECT a.NumControl AS numControl, a.NombreCompleto AS nombre,
             c.NombreCorto AS carrera, g.Clave AS grupo
      FROM eval.EvaluacionDocente e
      JOIN dbo.Alumno a ON a.NumControl = e.NumControl
      JOIN dbo.Carrera c ON c.IdCarre = a.IdCarre
      JOIN dbo.Grupo g ON g.IdGrupo = e.IdGrupo
      WHERE e.IdDoce = ? AND e.IdPerio = ? AND e.Estado = 3
    `
    const completaronParams = [docenteId, periodoId]
    if (grupoId) {
      completaronQuery += ` AND e.IdGrupo = ?`
      completaronParams.push(grupoId)
    }
    completaronQuery += ` ORDER BY a.APaterno, a.AMaterno`

    const completaron = await executeQuery(completaronQuery, completaronParams)

    let faltantesQuery = `
      SELECT a.NumControl AS numControl, a.NombreCompleto AS nombre,
             c.NombreCorto AS carrera, g.Clave AS grupo
      FROM eval.Inscripcion i
      JOIN dbo.Grupo g ON g.IdGrupo = i.IdGrupo AND g.IdDoce = ? AND g.IdPerio = ?
      JOIN dbo.Alumno a ON a.NumControl = i.NumControl
      JOIN dbo.Carrera c ON c.IdCarre = a.IdCarre
      WHERE i.Activa = 1
        AND NOT EXISTS (
          SELECT 1 FROM eval.EvaluacionDocente e
          WHERE e.NumControl = i.NumControl AND e.IdDoce = ? AND e.IdPerio = ? AND e.Estado = 3
        )
    `
    const faltantesParams = [docenteId, periodoId, docenteId, periodoId]
    if (grupoId) {
      faltantesQuery += ` AND g.IdGrupo = ?`
      faltantesParams.push(grupoId)
    }
    faltantesQuery += ` ORDER BY a.APaterno, a.AMaterno`

    const faltantes = await executeQuery(faltantesQuery, faltantesParams)

    const promediosMap = {}
    promediosCat.forEach(p => { promediosMap[p.IdCategoria] = Number(p.promedio) })
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

    res.json({
      docente: { id: docente.IdDoce, nombre: docente.nombre },
      periodo,
      totalAlumnos: counts?.total_alumnos ?? 0,
      totalCompletaron: completaron.length,
      totalFaltantes: faltantes.length,
      completaron,
      faltantes,
      promediosCat: promediosMap,
      promedioGeneral,
      clasificacion,
    })

  } catch (err) {
    console.error("❌ Error en /api/dashboard/resultados:", err)
    res.status(500).json({ error: "Error interno: " + err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   DASHBOARD — GET /api/dashboard/docentes/:idDocente/comentarios
══════════════════════════════════════════════════════════════ */
app.get("/api/dashboard/docentes/:idDocente/comentarios", authMiddleware, soloAdmin, async (req, res) => {
  const { idDocente } = req.params
  const { idPeriodo } = req.query

  if (!idDocente || !idPeriodo) {
    return res.status(400).json({ error: "idDocente e idPeriodo requeridos." })
  }

  const docenteId = parseInt(idDocente)
  const periodoId = parseInt(idPeriodo)

  if (isNaN(docenteId) || isNaN(periodoId)) {
    return res.status(400).json({ error: "IDs inválidos." })
  }

  try {
    const comentarios = await executeQuery(`
      SELECT
        ce.id_comentario,
        ce.comentario,
        ce.fecha_creacion,
        a.nombre_completo AS alumno
      FROM eval.ComentarioEvaluacion ce
      INNER JOIN eval.EvaluacionDocente ed ON ed.id_evaluacion = ce.id_evaluacion
      INNER JOIN dbo.Alumno a ON a.num_control = ce.num_control
      WHERE ce.id_doce = ?
        AND ed.id_perio = ?
        AND ce.visible = 1
        AND ce.comentario IS NOT NULL
        AND LTRIM(RTRIM(ce.comentario)) != ''
      ORDER BY ce.fecha_creacion DESC
    `, [docenteId, periodoId])

    res.json({
      idDocente: docenteId,
      idPeriodo: periodoId,
      total: comentarios.length,
      comentarios,
    })
  } catch (err) {
    console.error("❌ Error en /api/dashboard/docentes/:id/comentarios:", err)
    res.status(500).json({ error: "Error interno: " + err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   ARRANCAR SERVIDOR
══════════════════════════════════════════════════════════════ */
app.listen(PORT, '0.0.0.0', async () => {
  console.log("=======================================")
  console.log("🚀 SICOT API CORRIENDO")
  console.log("=======================================")
  console.log(`🌐 Puerto: ${PORT}`)
  console.log(`📡 Entorno: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🗄️  Base de datos: ${dbConfig.server}/${dbConfig.database}`)
  console.log("=======================================")
  
  try {
    await getConnection()
    console.log("✅ Conexión a Azure SQL establecida")
  } catch (err) {
    console.error("⚠️ No se pudo conectar a Azure SQL:", err.message)
  }
})