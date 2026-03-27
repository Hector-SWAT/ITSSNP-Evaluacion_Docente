/**
 * api.js — Cliente HTTP centralizado para el SICOT
 *
 * En desarrollo (localhost):  apunta a http://localhost:3001
 * En producción (Vercel):     apunta a la misma URL (backend y frontend juntos)
 */

/* ── URL base del backend ────────────────────────────────────── */
const getBaseUrl = () => {
  if (import.meta.env.DEV) {
    return "http://localhost:3001"
  }
  return window.location.origin
}
const BASE_URL = getBaseUrl()

/* ── Helper interno: fetch con JWT automático ────────────────── */
async function request(method, endpoint, body = null) {
  // Buscar token en cualquiera de las dos claves
  let token = localStorage.getItem("sicot_token") || localStorage.getItem("token")
  
  // ✅ NO logs de tokens ni peticiones en producción
  if (import.meta.env.DEV) {
    console.log(`📡 ${method} ${endpoint}`)
  }

  const headers = { "Content-Type": "application/json" }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const options = { method, headers }
  if (body) options.body = JSON.stringify(body)

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options)

    // Si el token expiró, limpiar sesión
    if (res.status === 401) {
      // ✅ Solo log de error básico en desarrollo
      if (import.meta.env.DEV) {
        console.warn("⚠️ Token expirado")
      }
      
      localStorage.removeItem("sicot_user")
      localStorage.removeItem("sicot_token")
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.error || "Sesión expirada")
    }

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || `Error ${res.status}`)
    }

    return data
  } catch (error) {
    // ✅ Solo error en consola, no detalles sensibles
    if (import.meta.env.DEV) {
      console.error(`❌ Error en ${method} ${endpoint}:`, error.message)
    }
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
    // ✅ Solo log en desarrollo
    if (import.meta.env.DEV) {
      console.log("🔐 Intentando login")
    }
    
    const data = await request("POST", "/api/auth/login", { usuario, password })
    
    if (data.token) {
      localStorage.setItem("sicot_token", data.token)
      localStorage.setItem("token", data.token)
      // ✅ Sin logs del token en producción
      if (import.meta.env.DEV) {
        console.log("✅ Token guardado")
      }
    }
    
    return data
  } catch (error) {
    // ✅ Solo error genérico
    if (import.meta.env.DEV) {
      console.error("❌ Error en login:", error.message)
    }
    throw error
  }
}

export function logout() {
  // ✅ Sin logs en producción
  if (import.meta.env.DEV) {
    console.log("👋 Cerrando sesión")
  }
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
