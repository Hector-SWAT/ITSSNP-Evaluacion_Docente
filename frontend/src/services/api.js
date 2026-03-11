/**
 * api.js — Cliente HTTP centralizado para el SICOT
 *
 * En desarrollo (localhost):  apunta a http://localhost:3001
 * En producción (Vercel):     apunta a la variable VITE_API_URL
 *
 * Cómo configurar la URL del backend en Vercel:
 *   Vercel Dashboard → tu proyecto → Settings → Environment Variables
 *   VITE_API_URL = https://itssnp-evaluaciondocente-production.up.railway.app
 */

/* ── URL base del backend ────────────────────────────────────── */
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

/* ── Helper interno: fetch con JWT automático ────────────────── */
async function request(method, endpoint, body = null) {
  // Buscar token en cualquiera de las dos claves (para compatibilidad)
  let token = localStorage.getItem("sicot_token") || localStorage.getItem("token")
  
  console.log(`📡 ${method} ${endpoint} - Token:`, token ? '✅ Presente' : '❌ No hay token')

  const headers = { "Content-Type": "application/json" }
  if (token) headers["Authorization"] = `Bearer ${token}`

  const options = { method, headers }
  if (body) options.body = JSON.stringify(body)

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options)

    // Si el token expiró, limpiar sesión
    if (res.status === 401) {
      console.warn("⚠️ Token expirado o inválido")
      localStorage.removeItem("sicot_user")
      localStorage.removeItem("sicot_token")
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      // No redirigimos automáticamente, dejamos que el componente maneje el error
      throw new Error("Sesión expirada")
    }

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || `Error ${res.status}`)
    }

    return data
  } catch (error) {
    console.error(`❌ Error en ${method} ${endpoint}:`, error)
    throw error
  }
}

/* ═══════════════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════════════ */

/**
 * Login — devuelve { tipo_usuario, num_control, nombre_completo, token }
 * Guarda el token en AMBAS claves para compatibilidad.
 */
export async function login(usuario, password) {
  try {
    console.log("🔐 Intentando login para:", usuario)
    
    const data = await request("POST", "/api/auth/login", { usuario, password })
    
    // Guardar token en AMBAS claves para compatibilidad con todo el código
    if (data.token) {
      localStorage.setItem("sicot_token", data.token)
      localStorage.setItem("token", data.token)
      console.log("✅ Token guardado correctamente")
    }
    
    return data
  } catch (error) {
    console.error("❌ Error en login:", error)
    throw error
  }
}

export function logout() {
  console.log("👋 Cerrando sesión")
  localStorage.removeItem("sicot_user")
  localStorage.removeItem("sicot_token")
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

/* ═══════════════════════════════════════════════════════════
   ALUMNO
═══════════════════════════════════════════════════════════ */

/** Datos del alumno logueado + lista de tutores asignados */
export async function getPerfil() {
  return request("GET", "/api/alumno/perfil")
}

/** Array de evaluaciones { idTutor, completada } del periodo activo */
export async function getEvaluaciones() {
  return request("GET", "/api/alumno/evaluaciones")
}

/* ═══════════════════════════════════════════════════════════
   ENCUESTA
═══════════════════════════════════════════════════════════ */

/** Preguntas de la encuesta activa */
export async function getPreguntas() {
  return request("GET", "/api/encuesta/preguntas")
}

/** Inicia (o retoma) la evaluación — devuelve { idEvaluacion } */
export async function iniciarEvaluacion(idTutor, idGrupo) {
  return request("POST", "/api/evaluacion/iniciar", { idTutor, idGrupo })
}

/**
 * Envía todas las respuestas y marca la evaluación como completada
 * @param {number} idEvaluacion
 * @param {Array}  respuestas  — [{ idPregunta, calificacion }]
 */
export async function enviarRespuestas(idEvaluacion, respuestas) {
  return request("POST", "/api/evaluacion/responder", { idEvaluacion, respuestas })
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD (solo admin)
═══════════════════════════════════════════════════════════ */

/** Lista de docentes vigentes */
export async function getDocentes() {
  return request("GET", "/api/dashboard/docentes")
}

/** Lista de periodos escolares */
export async function getPeriodos() {
  return request("GET", "/api/dashboard/periodos")
}

/**
 * Resultados de un docente en un periodo
 * @param {number} idDocente
 * @param {number} idPeriodo
 */
export async function getResultados(idDocente, idPeriodo) {
  return request("GET", `/api/dashboard/resultados?idDocente=${idDocente}&idPeriodo=${idPeriodo}`)
}

/* ═══════════════════════════════════════════════════════════
   EXPORTS PARA COMPATIBILIDAD CON evaluacionData.js
═══════════════════════════════════════════════════════════ */

// Re-exportar con los nombres que espera evaluacionData.js
export const getDocentesAPI = getDocentes
export const getPeriodosAPI = getPeriodos
export const getResultadosDocenteAPI = getResultados
export const getPerfilAlumnoAPI = getPerfil
export const getEvaluacionesAlumnoAPI = getEvaluaciones
export const getPreguntasAPI = getPreguntas
export const iniciarEvaluacionAPI = iniciarEvaluacion
export const guardarRespuestasAPI = enviarRespuestas
