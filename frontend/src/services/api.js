/**
 * api.js — Cliente HTTP centralizado para el SICOT
 *
 * En desarrollo (localhost):  apunta a http://localhost:3001
 * En producción (Vercel):     apunta a la variable VITE_API_URL
 *
 * Cómo configurar la URL del backend en Vercel:
 *   Vercel Dashboard → tu proyecto → Settings → Environment Variables
 *   VITE_API_URL = https://sicot-backend-production.up.railway.app
 */

/* ── URL base del backend ────────────────────────────────────── */
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"

/* ── Helper interno: fetch con JWT automático ────────────────── */
async function request(method, endpoint, body = null) {
  const token = localStorage.getItem("sicot_token")

  const headers = { "Content-Type": "application/json" }
  if (token) headers["Authorization"] = `Bearer ${token}`

  const options = { method, headers }
  if (body) options.body = JSON.stringify(body)

  const res = await fetch(`${BASE_URL}${endpoint}`, options)

  // Si el token expiró, limpiar sesión y recargar
  if (res.status === 401) {
    localStorage.removeItem("sicot_user")
    localStorage.removeItem("sicot_token")
    window.location.href = "/login"
    throw new Error("Sesión expirada")
  }

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || `Error ${res.status}`)
  }

  return data
}

/* ═══════════════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════════════ */

/**
 * Login — devuelve { tipo_usuario, num_control, nombre_completo, token }
 * Guarda el token en localStorage automáticamente.
 */
export async function login(usuario, password) {
  const data = await request("POST", "/api/auth/login", { usuario, password })
  // Guardar token para las siguientes peticiones
  if (data.token) localStorage.setItem("sicot_token", data.token)
  return data
}

export function logout() {
  localStorage.removeItem("sicot_user")
  localStorage.removeItem("sicot_token")
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

/** Preguntas de la encuesta activa para un tutor */
export async function getPreguntas(idTutor) {
  return request("GET", `/api/encuesta/preguntas?idTutor=${idTutor}`)
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
