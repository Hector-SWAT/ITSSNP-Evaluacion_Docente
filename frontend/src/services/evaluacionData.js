/* ================================================================
   evaluacionData.js  →  src/services/evaluacionData.js
   VERSIÓN REAL CONECTADA A BASE DE DATOS - CORREGIDA
   ================================================================ */

const API_URL = import.meta.env.VITE_API_URL || 'https://itssnp-evaluaciondocente-production.up.railway.app';

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
//  CATEGORÍAS Y RÚBRICA (datos estáticos de tu BD)
// ============================================================

export const CATEGORIAS = [
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

export const RUBRICA = {
  1:{
    5:"Detectó completamente mis necesidades y ofreció un apoyo excelente.",
    4:"Detectó bien mis necesidades y ofreció un apoyo adecuado.",
    3:"Detectó mis necesidades de forma general y ofreció apoyo limitado.",
    2:"Detectó algunas de mis necesidades, pero no ofreció apoyo adecuado.",
    1:"No detectó mis necesidades ni ofreció apoyo."
  },
  2:{
    5:"Realizó un seguimiento constante y me brindó apoyo eficaz en todo momento.",
    4:"Realizó un buen seguimiento y me apoyó en las materias problemáticas.",
    3:"Realizó seguimiento regular pero no siempre me apoyó en mis problemáticas.",
    2:"Hizo un seguimiento ocasional pero no constante.",
    1:"Nunca realizó seguimiento de mi desempeño."
  },
  3:{
    5:"Siempre hizo un seguimiento constante y su retroalimentación fue muy valiosa.",
    4:"Hizo un buen seguimiento y me dio retroalimentación útil.",
    3:"Hizo un seguimiento irregular con retroalimentación limitada.",
    2:"Hizo un seguimiento mínimo y su retroalimentación fue escasa.",
    1:"Nunca hizo seguimiento ni dio retroalimentación."
  },
  4:{
    5:"La comunicación fue excelente y siempre me sentí en confianza.",
    4:"La comunicación fue buena y generó confianza en muchas ocasiones.",
    3:"La comunicación fue irregular, aunque a veces me sentí en confianza.",
    2:"La comunicación fue escasa y no generó confianza.",
    1:"No hubo comunicación ni confianza."
  },
  5:{
    5:"Siempre asistió y demostró un alto nivel de compromiso con mi desarrollo.",
    4:"Asistió a las sesiones y demostró un buen nivel de compromiso.",
    3:"Asistió a la mayoría de las sesiones, pero su compromiso fue irregular.",
    2:"Asistió a pocas sesiones y su compromiso fue mínimo.",
    1:"No asistió ni mostró compromiso."
  },
  6:{
    5:"Me motivó siempre y me dio una excelente orientación para mi desarrollo.",
    4:"Me motivó constantemente y me ofreció una buena orientación.",
    3:"Me motivó algunas veces y la orientación fue general.",
    2:"Me motivó de manera limitada y no me brindó mucha orientación.",
    1:"No me motivó ni me ofreció orientación."
  },
  7:{
    5:"Su impacto fue muy positivo, ayudándome a evitar la reprobación y el abandono.",
    4:"Su impacto fue positivo y me ayudó a mejorar mi rendimiento.",
    3:"Su impacto fue moderado, pero no evitó todas las dificultades.",
    2:"Tuvo un impacto muy limitado en mi desempeño.",
    1:"No tuvo ningún impacto positivo."
  },
  8:{
    5:"Aplicó estrategias excelentes y me ayudó a superar todas mis dificultades.",
    4:"Aplicó buenas estrategias y me ayudó a superar algunas dificultades.",
    3:"Aplicó algunas estrategias, pero no siempre resultaron efectivas.",
    2:"Aplicó estrategias mínimas o ineficaces.",
    1:"No aplicó ninguna estrategia de rescate."
  },
  9:{
    5:"Muy alta satisfacción con el acompañamiento de mi tutor(a).",
    4:"Alta satisfacción con el acompañamiento de mi tutor(a).",
    3:"Satisfacción regular con el acompañamiento de mi tutor(a).",
    2:"Baja satisfacción con el acompañamiento de mi tutor(a).",
    1:"Muy baja satisfacción con el acompañamiento de mi tutor(a)."
  },
};

export const ESCALA_LABELS = { 
  5: "Excelente", 
  4: "Muy bueno", 
  3: "Bueno", 
  2: "Regular", 
  1: "Deficiente" 
};

// ============================================================
//  FUNCIONES REALES CONECTADAS A LA BASE DE DATOS
// ============================================================

/**
 * Obtener perfil del alumno desde la BD
 * GET /api/alumno/perfil
 */
export async function getPerfilAlumnoAPI(numControl) {
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
 * Obtener evaluaciones del alumno
 * GET /api/alumno/evaluaciones
 */
export async function getEvaluacionesAlumnoAPI(numControl) {
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
    // En lugar de return vacío, lanzamos error para manejarlo en el componente
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
export async function iniciarEvaluacionAPI(numControl, idTutor, idGrupo) {
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
export async function guardarRespuestasAPI(idEvaluacion, respuestas) {
  try {
    const response = await fetch(`${API_URL}/api/evaluacion/responder`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        idEvaluacion,
        respuestas
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error al guardar respuestas');
    }
    
    return data;
  } catch (error) {
    console.error('❌ Error en guardarRespuestasAPI:', error);
    throw error;
  }
}

// ============================================================
//  FUNCIONES PARA ADMIN / DASHBOARD (CORREGIDAS)
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
    console.log('✅ Docentes cargados:', data);
    return data.docentes || [];
  } catch (error) {
    console.error('❌ Error en getDocentesAPI:', error);
    throw error; // Lanzamos el error para manejarlo en el componente
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
    console.log('✅ Periodos cargados:', data);
    return data.periodos || [];
  } catch (error) {
    console.error('❌ Error en getPeriodosAPI:', error);
    throw error; // Lanzamos el error para manejarlo en el componente
  }
}

/**
 * Obtener resultados de evaluaciones por docente y periodo
 * GET /api/dashboard/resultados?idDocente=X&idPeriodo=Y
 */
export async function getResultadosDocenteAPI(idDocente, idPeriodo) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(
      `${API_URL}/api/dashboard/resultados?idDocente=${idDocente}&idPeriodo=${idPeriodo}`,
      { headers: getHeaders() }
    );
    
    if (response.status === 401) {
      throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Error al obtener resultados');
    }
    
    const data = await response.json();
    console.log('✅ Resultados cargados:', data);
    return data;
  } catch (error) {
    console.error('❌ Error en getResultadosDocenteAPI:', error);
    throw error;
  }
}

// ============================================================
//  FUNCIONES DE UTILIDAD
// ============================================================

/**
 * Verificar si un tutor ya fue evaluado por el alumno
 */
export async function yaEvaluadoAPI(numControl, idTutor) {
  try {
    const evaluaciones = await getEvaluacionesAlumnoAPI(numControl);
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
    const periodos = await getPeriodosAPI();
    return periodos.find(p => p.activo === 1 || p.activo === true) || periodos[0] || null;
  } catch (error) {
    console.error('❌ Error en getPeriodoActivoAPI:', error);
    return null;
  }
}

// ============================================================
//  MOCKS PARA DESARROLLO LOCAL (comentados)
// ============================================================

/*
export const PERIODOS_MOCK = [
  { id: 20251, nombre: "Enero–Junio 2025", activo: false },
  { id: 20252, nombre: "Agosto–Diciembre 2025", activo: false },
  { id: 20261, nombre: "Enero–Junio 2026", activo: true },
];

export const DOCENTES_MOCK = [
  { id: 101, nombre: "Dr. Carlos Méndez Ríos", grado: "Dr.", departamento: "ISC" },
  { id: 102, nombre: "M.C. Laura Pérez Sánchez", grado: "M.C.", departamento: "ISC" },
  { id: 103, nombre: "M.D.E. Miriam Leguizamo Hernández", grado: "M.D.E.", departamento: "INF" },
];

export function getPerfilAlumnoMock(numControl) {
  return {
    num_control: numControl,
    nombre_completo: "HECTOR DELFINO HERNANDEZ PEREZ",
    carrera: "Ingeniería Informática",
    siglas: "INF",
    semestre: 8,
    tutores: [
      {
        id: 103,
        nombre: "M.D.E. Miriam Leguizamo Hernández",
        materia: "Tutoría Grupal",
        grupo: "IN8A",
        id_grupo: 1
      }
    ]
  };
}

export function getEvaluacionesAlumnoMock(numControl) {
  return {
    evaluaciones: [],
    tutoresPendientes: [],
    totalCompletadas: 0,
    totalPendientes: 1
  };
}

export function getResultadosDocenteMock(idDocente, idPeriodo) {
  return {
    docente: { id: idDocente, nombre: "Dr. Carlos Méndez Ríos" },
    periodo: { id: idPeriodo, nombre: "Enero–Junio 2026" },
    totalAlumnos: 45,
    completaron: [
      { numControl: 12345678, nombre: "Juan Pérez", carrera: "ISC" },
      { numControl: 12345679, nombre: "María García", carrera: "ISC" }
    ],
    faltantes: [
      { numControl: 12345680, nombre: "Luis Sánchez", carrera: "ISC" }
    ],
    promediosCat: { 1: 4.5, 2: 4.2, 3: 4.0, 4: 4.8, 5: 4.3, 6: 4.1, 7: 3.9, 8: 4.4, 9: 4.6 },
    promedioGeneral: 4.3,
    clasificacion: "MUY BUENO"
  };
}
*/

// ============================================================
//  EXPORTS
// ============================================================

// Exportar funciones reales (descomentar para usar API)
export const getPerfilAlumno = getPerfilAlumnoAPI;
export const getEvaluacionesAlumno = getEvaluacionesAlumnoAPI;
export const getPreguntas = getPreguntasAPI;
export const iniciarEvaluacion = iniciarEvaluacionAPI;
export const guardarRespuestas = guardarRespuestasAPI;
export const getDocentes = getDocentesAPI;
export const getPeriodos = getPeriodosAPI;
export const getResultadosDocente = getResultadosDocenteAPI;
export const yaEvaluado = yaEvaluadoAPI;
export const getPeriodoActivo = getPeriodoActivoAPI;

// Para usar mocks en desarrollo, comenta las líneas de arriba
// y descomenta estas:
/*
export const getPerfilAlumno = getPerfilAlumnoMock;
export const getEvaluacionesAlumno = getEvaluacionesAlumnoMock;
export const getDocentes = () => Promise.resolve(DOCENTES_MOCK);
export const getPeriodos = () => Promise.resolve(PERIODOS_MOCK);
export const getResultadosDocente = getResultadosDocenteMock;
export const yaEvaluado = () => Promise.resolve(false);
export const getPeriodoActivo = () => Promise.resolve(PERIODOS_MOCK[2]);
*/
