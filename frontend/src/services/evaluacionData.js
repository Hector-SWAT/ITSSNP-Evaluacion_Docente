/* ================================================================
   evaluacionData.js  →  src/services/evaluacionData.js
   VERSIÓN CONECTADA A AZURE SQL - CORREGIDA CON EXPORTS
   ================================================================ */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ============================================================
//  FUNCIONES DE AUTENTICACIÓN Y TOKEN
// ============================================================

function getToken() {
  return localStorage.getItem('token');
}

function getHeaders() {
  return {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
  };
}

// ============================================================
//  CATEGORÍAS Y RÚBRICA (FALLBACK estáticos)
// ============================================================

export const CATEGORIAS_FALLBACK = [
  { id: 1, nombre: "Detección y diagnóstico oportuno de necesidades" },
  { id: 2, nombre: "Monitoreo del rendimiento académico" },
  { id: 3, nombre: "Seguimiento y retroalimentación continua" },
  { id: 4, nombre: "Comunicación y relación con los tutorados" },
  { id: 5, nombre: "Compromiso y responsabilidad" },
  { id: 6, nombre: "Capacidad para motivar y acompañar en el desarrollo personal y profesional" },
  { id: 7, nombre: "Impacto en la reducción de reprobación y deserción" },
  { id: 8, nombre: "Aplicación de estrategias de rescate académico" },
  { id: 9, nombre: "Satisfacción general del tutor o la tutora" },
];

export const RUBRICA_FALLBACK = {
  1: {
    5: "Detectó completamente mis necesidades y ofreció un apoyo excelente.",
    4: "Detectó bien mis necesidades y ofreció un apoyo adecuado.",
    3: "Detectó mis necesidades de forma general y ofreció apoyo limitado.",
    2: "Detectó algunas de mis necesidades, pero no ofreció apoyo adecuado.",
    1: "No detectó mis necesidades ni ofreció apoyo."
  },
  2: {
    5: "Realizó un seguimiento constante y me brindó apoyo eficaz en todo momento.",
    4: "Realizó un buen seguimiento y me apoyó en las materias problemáticas.",
    3: "Realizó seguimiento regular pero no siempre me apoyó en mis problemáticas.",
    2: "Hizo un seguimiento ocasional pero no constante.",
    1: "Nunca realizó seguimiento de mi desempeño."
  },
  3: {
    5: "Siempre hizo un seguimiento constante y su retroalimentación fue muy valiosa.",
    4: "Hizo un buen seguimiento y me dio retroalimentación útil.",
    3: "Hizo un seguimiento irregular con retroalimentación limitada.",
    2: "Hizo un seguimiento mínimo y su retroalimentación fue escasa.",
    1: "Nunca hizo seguimiento ni dio retroalimentación."
  },
  4: {
    5: "La comunicación fue excelente y siempre me sentí en confianza.",
    4: "La comunicación fue buena y generó confianza en muchas ocasiones.",
    3: "La comunicación fue irregular, aunque a veces me sentí en confianza.",
    2: "La comunicación fue escasa y no generó confianza.",
    1: "No hubo comunicación ni confianza."
  },
  5: {
    5: "Siempre asistió y demostró un alto nivel de compromiso con mi desarrollo.",
    4: "Asistió a las sesiones y demostró un buen nivel de compromiso.",
    3: "Asistió a la mayoría de las sesiones, pero su compromiso fue irregular.",
    2: "Asistió a pocas sesiones y su compromiso fue mínimo.",
    1: "No asistió ni mostró compromiso."
  },
  6: {
    5: "Me motivó siempre y me dio una excelente orientación para mi desarrollo.",
    4: "Me motivó constantemente y me ofreció una buena orientación.",
    3: "Me motivó algunas veces y la orientación fue general.",
    2: "Me motivó de manera limitada y no me brindó mucha orientación.",
    1: "No me motivó ni me ofreció orientación."
  },
  7: {
    5: "Su impacto fue muy positivo, ayudándome a evitar la reprobación y el abandono.",
    4: "Su impacto fue positivo y me ayudó a mejorar mi rendimiento.",
    3: "Su impacto fue moderado, pero no evitó todas las dificultades.",
    2: "Tuvo un impacto muy limitado en mi desempeño.",
    1: "No tuvo ningún impacto positivo."
  },
  8: {
    5: "Aplicó estrategias excelentes y me ayudó a superar todas mis dificultades.",
    4: "Aplicó buenas estrategias y me ayudó a superar algunas dificultades.",
    3: "Aplicó algunas estrategias, pero no siempre resultaron efectivas.",
    2: "Aplicó estrategias mínimas o ineficaces.",
    1: "No aplicó ninguna estrategia de rescate."
  },
  9: {
    5: "Muy alta satisfacción con el acompañamiento de mi tutor(a).",
    4: "Alta satisfacción con el acompañamiento de mi tutor(a).",
    3: "Satisfacción regular con el acompañamiento de mi tutor(a).",
    2: "Baja satisfacción con el acompañamiento de mi tutor(a).",
    1: "Muy baja satisfacción con el acompañamiento de mi tutor(a)."
  },
};

export const ESCALA_LABELS_FALLBACK = { 
  5: "Excelente", 
  4: "Muy bueno", 
  3: "Bueno", 
  2: "Regular", 
  1: "Deficiente" 
};

// Exportar como CATEGORIAS, RUBRICA, ESCALA_LABELS para compatibilidad con componentes existentes
export const CATEGORIAS = CATEGORIAS_FALLBACK;
export const RUBRICA = RUBRICA_FALLBACK;
export const ESCALA_LABELS = ESCALA_LABELS_FALLBACK;

// Variables para cache
let categoriasCache = null;
let rubricaCache = null;
let escalaCache = null;

// ============================================================
//  FUNCIONES PARA OBTENER DATOS DESDE BD CON CACHE
// ============================================================

/**
 * Obtener categorías desde la base de datos (con cache)
 */
export async function getCategoriasAPI(forceRefresh = false) {
  if (!forceRefresh && categoriasCache) {
    return categoriasCache;
  }
  
  try {
    const response = await fetch(`${API_URL}/api/encuesta/categorias`, {
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener categorías');
    }
    
    const data = await response.json();
    categoriasCache = data.categorias || [];
    return categoriasCache;
  } catch (error) {
    console.error('❌ Error en getCategoriasAPI:', error);
    console.warn('⚠️ Usando categorías de fallback');
    return CATEGORIAS_FALLBACK;
  }
}

/**
 * Obtener rúbrica desde la base de datos (con cache)
 */
export async function getRubricaAPI(forceRefresh = false) {
  if (!forceRefresh && rubricaCache) {
    return rubricaCache;
  }
  
  try {
    const response = await fetch(`${API_URL}/api/encuesta/rubrica`, {
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener rúbrica');
    }
    
    const data = await response.json();
    
    // Convertir array a objeto anidado
    const rubricaObj = {};
    (data.rubrica || []).forEach(item => {
      if (!rubricaObj[item.idCategoria]) {
        rubricaObj[item.idCategoria] = {};
      }
      rubricaObj[item.idCategoria][item.Valor] = item.Descripcion;
    });
    
    rubricaCache = rubricaObj;
    return rubricaCache;
  } catch (error) {
    console.error('❌ Error en getRubricaAPI:', error);
    console.warn('⚠️ Usando rúbrica de fallback');
    return RUBRICA_FALLBACK;
  }
}

/**
 * Obtener escala desde la base de datos (con cache)
 */
export async function getEscalaAPI(forceRefresh = false) {
  if (!forceRefresh && escalaCache) {
    return escalaCache;
  }
  
  try {
    const response = await fetch(`${API_URL}/api/encuesta/escala`, {
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener escala');
    }
    
    const data = await response.json();
    escalaCache = data.escala || ESCALA_LABELS_FALLBACK;
    return escalaCache;
  } catch (error) {
    console.error('❌ Error en getEscalaAPI:', error);
    return ESCALA_LABELS_FALLBACK;
  }
}

// ============================================================
//  FUNCIONES REALES CONECTADAS A LA BASE DE DATOS
// ============================================================

/**
 * Obtener perfil del alumno desde la BD
 * GET /api/alumno/perfil
 */
export async function getPerfilAlumnoAPI() {
  try {
    const response = await fetch(`${API_URL}/api/alumno/perfil`, {
      headers: getHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al obtener perfil');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error en getPerfilAlumnoAPI:', error);
    throw error;
  }
}

/**
 * Obtener carga académica del alumno (docentes a evaluar)
 * GET /api/alumno/carga-academica
 */
export async function getCargaAcademicaAPI() {
  try {
    const response = await fetch(`${API_URL}/api/alumno/carga-academica`, {
      headers: getHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al obtener carga académica');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error en getCargaAcademicaAPI:', error);
    throw error;
  }
}

/**
 * Obtener evaluaciones del alumno
 * GET /api/alumno/evaluaciones
 */
export async function getEvaluacionesAlumnoAPI() {
  try {
    const response = await fetch(`${API_URL}/api/alumno/evaluaciones`, {
      headers: getHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al obtener evaluaciones');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error en getEvaluacionesAlumnoAPI:', error);
    throw error;
  }
}

/**
 * Obtener preguntas de la encuesta activa
 * GET /api/encuesta/preguntas
 */
export async function getPreguntasAPI() {
  try {
    const response = await fetch(`${API_URL}/api/encuesta/preguntas`, {
      headers: getHeaders()
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al obtener preguntas');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error en getPreguntasAPI:', error);
    throw error;
  }
}

/**
 * Iniciar una nueva evaluación
 * POST /api/evaluacion/iniciar
 */
export async function iniciarEvaluacionAPI(idTutor, idGrupo) {
  try {
    const response = await fetch(`${API_URL}/api/evaluacion/iniciar`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        idTutor,
        idGrupo
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error al iniciar evaluación');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error en iniciarEvaluacionAPI:', error);
    throw error;
  }
}

/**
 * Guardar respuestas de una evaluación
 * POST /api/evaluacion/responder
 */
/**
 * Guardar respuestas de una evaluación
 * POST /api/evaluacion/responder
 */
export async function guardarRespuestasAPI(idEvaluacion, respuestas) {
  try {
    console.log("💾 Guardando respuestas:", { idEvaluacion, respuestas })
    
    const response = await fetch(`${API_URL}/api/evaluacion/responder`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        idEvaluacion,
        respuestas
      })
    })
    
    const data = await response.json()
    console.log("📡 Respuesta del servidor:", data)
    
    if (!response.ok) {
      throw new Error(data.error || 'Error al guardar respuestas')
    }
    
    return data
  } catch (error) {
    console.error('❌ Error en guardarRespuestasAPI:', error)
    throw error
  }
}

/**
 * Guardar comentario del alumno sobre el docente
 * POST /api/evaluacion/comentario
 */
export async function guardarComentarioAPI(
  idEvaluacion,
  idDocente,
  comentario
) {
  try {
    // Asegurar que comentario sea string y limpiarlo
    const texto = String(comentario).trim()
    
    console.log("💬 Guardando comentario:", { idEvaluacion, idDocente, texto })
    
    if (!texto) {
      throw new Error('El comentario no puede estar vacío')
    }
    
    if (texto.length < 10) {
      throw new Error('El comentario debe tener al menos 10 caracteres.')
    }
    
    if (texto.length > 1000) {
      throw new Error('El comentario no puede superar los 1000 caracteres.')
    }
    
    const token = getToken()
    if (!token) {
      throw new Error('No hay token de autenticación')
    }
    
    const response = await fetch(`${API_URL}/api/evaluacion/comentario`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idEvaluacion,
        idDocente,
        comentario: texto
      })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Error al guardar el comentario')
    }
    
    console.log("✅ Comentario guardado correctamente:", data)
    return data
  } catch (error) {
    console.error('❌ Error en guardarComentarioAPI:', error)
    throw error
  }
}

// ============================================================
//  FUNCIONES PARA ADMIN / DASHBOARD
// ============================================================

/**
 * Obtener lista de docentes
 * GET /api/dashboard/docentes
 */
export async function getDocentesAPI() {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_URL}/api/dashboard/docentes`, {
      headers: getHeaders()
    });
    
    if (response.status === 401) {
      throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Error al obtener docentes');
    }
    
    const data = await response.json();
    console.log('✅ Docentes cargados:', data.docentes?.length || 0);
    return data.docentes || [];
  } catch (error) {
    console.error('❌ Error en getDocentesAPI:', error);
    throw error;
  }
}

/**
 * Obtener lista de periodos
 * GET /api/dashboard/periodos
 */
export async function getPeriodosAPI() {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_URL}/api/dashboard/periodos`, {
      headers: getHeaders()
    });
    
    if (response.status === 401) {
      throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Error al obtener periodos');
    }
    
    const data = await response.json();
    console.log('✅ Periodos cargados:', data.periodos?.length || 0);
    return data.periodos || [];
  } catch (error) {
    console.error('❌ Error en getPeriodosAPI:', error);
    throw error;
  }
}

/**
 * Obtener grupos de un docente en un período
 * GET /api/dashboard/docentes/:idDocente/periodos/:idPeriodo/grupos
 */
export async function getGruposAPI(idDocente, idPeriodo) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(
      `${API_URL}/api/dashboard/docentes/${idDocente}/periodos/${idPeriodo}/grupos`,
      { headers: getHeaders() }
    );
    
    if (response.status === 401) {
      throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Error al obtener grupos');
    }
    
    const data = await response.json();
    console.log('✅ Grupos cargados:', data.grupos?.length || 0);
    return data.grupos || [];
  } catch (error) {
    console.error('❌ Error en getGruposAPI:', error);
    throw error;
  }
}

/**
 * Obtener resultados de evaluaciones por docente, periodo y grupo (opcional)
 * GET /api/dashboard/resultados?idDocente=X&idPeriodo=Y&idGrupo=Z (opcional)
 */
export async function getResultadosDocenteAPI(idDocente, idPeriodo, idGrupo = null) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    let url = `${API_URL}/api/dashboard/resultados?idDocente=${idDocente}&idPeriodo=${idPeriodo}`;
    if (idGrupo) {
      url += `&idGrupo=${idGrupo}`;
    }

    const response = await fetch(url, { headers: getHeaders() });
    
    if (response.status === 401) {
      throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Error al obtener resultados');
    }
    
    const data = await response.json();
    console.log('✅ Resultados cargados para docente:', idDocente);
    
    return {
      ...data,
      completaron: (data.completaron || []).map(a => ({
        ...a,
        grupo: a.grupo || a.grupo_clave || "",
      })),
      faltantes: (data.faltantes || []).map(a => ({
        ...a,
        grupo: a.grupo || a.grupo_clave || "",
      })),
    };
  } catch (error) {
    console.error('❌ Error en getResultadosDocenteAPI:', error);
    throw error;
  }
}

/**
 * Obtener estadísticas por departamento
 * GET /api/dashboard/departamentos?idPeriodo=XXX
 */
export async function getDepartamentosAPI(idPeriodo) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_URL}/api/dashboard/departamentos?idPeriodo=${idPeriodo}`, {
      headers: getHeaders()
    });
    
    if (response.status === 401) {
      throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Error al obtener departamentos');
    }
    
    const data = await response.json();
    console.log('✅ Departamentos cargados:', data.departamentos?.length || 0);
    return data.departamentos || [];
  } catch (error) {
    console.error('❌ Error en getDepartamentosAPI:', error);
    throw error;
  }
}

/**
 * Obtener comentarios de un docente
 * GET /api/dashboard/docentes/:idDocente/comentarios?idPeriodo=XXX
 */
export async function getComentariosDocenteAPI(idDocente, idPeriodo) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_URL}/api/dashboard/docentes/${idDocente}/comentarios?idPeriodo=${idPeriodo}`, {
      headers: getHeaders()
    });
    
    if (response.status === 401) {
      throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Error al obtener comentarios');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error en getComentariosDocenteAPI:', error);
    throw error;
  }
}

/**
 * Obtener alumnos que evalúan a un docente
 * GET /api/dashboard/docente/:idDocente/alumnos?idPeriodo=XXX
 */
export async function getAlumnosPorDocenteAPI(idDocente, idPeriodo) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_URL}/api/dashboard/docente/${idDocente}/alumnos?idPeriodo=${idPeriodo}`, {
      headers: getHeaders()
    });
    
    if (response.status === 401) {
      throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Error al obtener alumnos');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error en getAlumnosPorDocenteAPI:', error);
    throw error;
  }
}

// ============================================================
//  FUNCIONES DE UTILIDAD
// ============================================================

/**
 * Verificar si un tutor ya fue evaluado por el alumno
 */
export async function yaEvaluadoAPI(idTutor) {
  try {
    const evaluaciones = await getEvaluacionesAlumnoAPI();
    return evaluaciones.evaluaciones?.some(e => e.idTutor === idTutor && e.completada) || false;
  } catch (error) {
    console.error('❌ Error en yaEvaluadoAPI:', error);
    return false;
  }
}

/**
 * Obtener periodo activo
 */
export async function getPeriodoActivoAPI() {
  try {
    const response = await fetch(`${API_URL}/api/dashboard/periodo-activo`, {
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener periodo activo');
    }
    
    const data = await response.json();
    return data.existe ? data.periodo : null;
  } catch (error) {
    console.error('❌ Error en getPeriodoActivoAPI:', error);
    return null;
  }
}

/**
 * Cambiar periodo activo (solo admin)
 * POST /api/dashboard/periodo-activo
 */
export async function setPeriodoActivoAPI(idPeriodo) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${API_URL}/api/dashboard/periodo-activo`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ idPeriodo })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al cambiar periodo activo');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error en setPeriodoActivoAPI:', error);
    throw error;
  }
}

// ============================================================
//  EXPORTS PARA COMPATIBILIDAD CON COMPONENTES EXISTENTES
// ============================================================

export const getPerfilAlumno = getPerfilAlumnoAPI;
export const getCargaAcademica = getCargaAcademicaAPI;
export const getEvaluacionesAlumno = getEvaluacionesAlumnoAPI;
export const getPreguntas = getPreguntasAPI;
export const iniciarEvaluacion = iniciarEvaluacionAPI;
export const guardarRespuestas = guardarRespuestasAPI;
export const guardarComentario = guardarComentarioAPI;
export const getDocentes = getDocentesAPI;
export const getPeriodos = getPeriodosAPI;
export const getGrupos = getGruposAPI;
export const getResultadosDocente = getResultadosDocenteAPI;
export const getDepartamentos = getDepartamentosAPI;
export const getComentariosDocente = getComentariosDocenteAPI;
export const getAlumnosPorDocente = getAlumnosPorDocenteAPI;
export const getPeriodoActivo = getPeriodoActivoAPI;
export const setPeriodoActivo = setPeriodoActivoAPI;
export const getCategorias = getCategoriasAPI;
export const getRubrica = getRubricaAPI;
export const getEscala = getEscalaAPI;
export const yaEvaluado = yaEvaluadoAPI;