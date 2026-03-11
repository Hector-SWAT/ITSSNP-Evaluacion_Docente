/**
 * Evaluacion.jsx — versión corregida
 *
 * Causa raíz del salto de preguntas:
 *   El auto-avance anterior usaba setTimeout dentro de setRespuestas(),
 *   capturando `esUltima` y `pagina` en un closure obsoleto. Si React
 *   agrupaba renders, el setTimeout se disparaba dos veces o con el
 *   índice equivocado, saltando preguntas.
 *
 * Solución:
 *   • Un solo estado `fase` controla el flujo: "respondiendo" | "avanzando" | "enviando"
 *   • El useEffect reacciona al cambio de fase — no hay closures en setTimeout
 *   • El setTimeout solo llama a funciones que leen el estado ACTUAL del ref
 *   • `preguntaActualRef` es la única fuente de verdad para el índice
 */

import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  getPreguntasOrdenadas,
  CATEGORIAS,
  RUBRICA,
  marcarEvaluacionCompletada,
  yaEvaluado,
} from "../services/evaluacionData"

/* ── Opciones Likert ────────────────────────────────────────── */
const OPCIONES = [
  { valor: 5, label: "Excelente",  color: "#15803d", bg: "#f0fdf4", border: "#86efac" },
  { valor: 4, label: "Muy bueno",  color: "#0369a1", bg: "#f0f9ff", border: "#7dd3fc" },
  { valor: 3, label: "Bueno",      color: "#b45309", bg: "#fffbeb", border: "#fcd34d" },
  { valor: 2, label: "Regular",    color: "#c2410c", bg: "#fff7ed", border: "#fdba74" },
  { valor: 1, label: "Deficiente", color: "#b91c1c", bg: "#fef2f2", border: "#fca5a5" },
]

/* ── Toast de aviso ─────────────────────────────────────────── */
function Toast({ visible }) {
  return (
    <div style={{
      position: "fixed", bottom: 28, left: "50%", zIndex: 300,
      transform: `translateX(-50%) translateY(${visible ? 0 : 14}px)`,
      opacity: visible ? 1 : 0,
      transition: "all .25s cubic-bezier(.16,1,.3,1)",
      pointerEvents: "none",
      background: "#1e293b", color: "#fff",
      borderRadius: 14, padding: "13px 24px",
      fontSize: 14, fontWeight: 600,
      display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 10px 40px rgba(0,0,0,.45)",
      whiteSpace: "nowrap",
    }}>
      <span style={{ fontSize: 20 }}>⚠️</span>
      Selecciona una opción para poder continuar
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   COMPONENTE
══════════════════════════════════════════════════════════════ */
export default function Evaluacion() {
  const navigate    = useNavigate()
  const location    = useLocation()
  const { idGrupo } = useParams()
  const { user }    = useAuth()

  const tutor = location.state?.tutor ?? {
    id: Number(idGrupo), nombre: "Tutor", materia: "", grupo: "",
  }
  const numControl = location.state?.numControl ?? user?.id ?? 0

  /* ── Preguntas — generadas una sola vez ── */
  const preguntasRef = useRef(null)
  if (!preguntasRef.current) {
    preguntasRef.current = getPreguntasOrdenadas(numControl)
  }
  const preguntas = preguntasRef.current
  const TOTAL     = preguntas.length

  /* ── Estado principal ──
     `fase` es la máquina de estados:
       "libre"       → esperando que el alumno seleccione
       "transitando" → respuesta guardada, esperando los 700ms antes de avanzar
       "enviando"    → última pregunta respondida, enviando al servidor
  ── */
  const [pagina,        setPagina]        = useState(0)
  const [respuestas,    setRespuestas]    = useState({})   // { [idPregunta]: valor }
  const [fase,          setFase]          = useState("libre")
  const [mostrarRubrica,setMostrarRubrica]= useState(false)
  const [animKey,       setAnimKey]       = useState(0)
  const [toastVisible,  setToastVisible]  = useState(false)

  /* Refs que no provocan re-renders */
  const paginaRef      = useRef(0)   // siempre sincronizado con `pagina`
  const respuestasRef  = useRef({})  // siempre sincronizado con `respuestas`
  const timerRef       = useRef(null)
  const toastRef       = useRef(null)

  /* Mantener refs en sync */
  useEffect(() => { paginaRef.current     = pagina    }, [pagina])
  useEffect(() => { respuestasRef.current = respuestas }, [respuestas])

  /* Redirigir si ya completó esta encuesta */
  useEffect(() => {
    if (user && yaEvaluado(user.id, tutor.id)) {
      navigate("/panel-alumno", { replace: true })
    }
    return () => {
      clearTimeout(timerRef.current)
      clearTimeout(toastRef.current)
    }
  }, []) // eslint-disable-line

  /* ─────────────────────────────────────────────────────────────
     MÁQUINA DE ESTADOS — reacciona cuando `fase` cambia
     "transitando" → espera 700ms → avanza a siguiente pregunta
     "enviando"    → espera 1100ms → llama a la API y navega
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (fase === "transitando") {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        /* Leer el índice ACTUAL desde el ref — nunca un closure obsoleto */
        const siguiente = paginaRef.current + 1
        paginaRef.current = siguiente
        setPagina(siguiente)
        setAnimKey(k => k + 1)
        setMostrarRubrica(false)
        setFase("libre")
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 700)
    }

    if (fase === "enviando") {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(async () => {
        /* ← BACKEND: reemplaza esto con POST /api/evaluacion/responder */
        const payload = Object.entries(respuestasRef.current).map(([idPregunta, calificacion]) => ({
          idPregunta: Number(idPregunta),
          calificacion,
        }))
        console.log("Enviando respuestas:", payload)
        await new Promise(r => setTimeout(r, 800))
        marcarEvaluacionCompletada(user.id, tutor.id)
        navigate("/gracias", { replace: true, state: { tutor, totalPreguntas: TOTAL } })
      }, 1100)
    }
  }, [fase]) // eslint-disable-line — solo reacciona a cambios de fase

  /* ── Derivados del render actual ── */
  const pregActual   = preguntas[pagina]
  const cat          = CATEGORIAS.find(c => c.id === pregActual?.idCategoria)
  const rubrica      = RUBRICA[pregActual?.idCategoria] ?? {}
  const respActual   = respuestas[pregActual?.id]
  const respondidas  = Object.keys(respuestas).length
  const progPct      = Math.round((pagina / TOTAL) * 100)
  const esUltima     = pagina === TOTAL - 1
  const estaLibre    = fase === "libre"

  /* ── Toast ── */
  const mostrarToast = () => {
    setToastVisible(true)
    clearTimeout(toastRef.current)
    toastRef.current = setTimeout(() => setToastVisible(false), 2500)
  }

  /* ── Seleccionar opción ────────────────────────────────────
     Solo actúa si la fase es "libre" (no estamos en medio de
     una transición ni enviando). Esto elimina todos los
     problemas de doble-click y closures obsoletos.
  ── */
  const seleccionar = (valor) => {
    if (!estaLibre) {
      /* Si ya hay respuesta registrada, avisar */
      if (respActual !== undefined) mostrarToast()
      return
    }

    /* Guardar respuesta — actualizar ref inmediatamente */
    const nuevas = { ...respuestasRef.current, [pregActual.id]: valor }
    respuestasRef.current = nuevas
    setRespuestas(nuevas)

    /* Cambiar fase — el useEffect de arriba se encarga del resto */
    setFase(esUltima ? "enviando" : "transitando")
  }

  if (!pregActual) return null

  const inicial = tutor.nombre
    .replace(/^(Dr\.|Dra\.|M\.C\.|Ing\.|Mtra?\.|Lic\.)?\s*/i, "")
    .trim()[0] ?? "T"

  const estaEnviando = fase === "enviando"

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }

        @keyframes _spin   { to { transform: rotate(360deg); } }
        @keyframes _inR    { from { opacity:0; transform: translateX(40px); } to { opacity:1; transform: translateX(0); } }
        @keyframes _rubIn  { from { opacity:0; transform: translateY(-7px); } to { opacity:1; transform: translateY(0); } }
        @keyframes _fadeUp { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }

        .ev-root { font-family: 'DM Sans', sans-serif; min-height: 100dvh; background: #eef2ff; display: flex; flex-direction: column; }

        /* navbar */
        .ev-nav { background: linear-gradient(135deg,#0d2660 0%,#1648b8 55%,#0b7ec9 100%); height: 60px; padding: 0 clamp(16px,4vw,40px); display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 14px rgba(0,0,0,.26); position: sticky; top: 0; z-index: 20; }
        .ev-back { background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.22); border-radius: 8px; padding: 6px 14px; font-family: 'DM Sans',sans-serif; font-size: 13px; font-weight: 600; color: #fff; cursor: pointer; transition: background .15s; }
        .ev-back:hover { background: rgba(255,255,255,.24); }
        .ev-nav-mid { font-size: 13px; font-weight: 700; color: rgba(255,255,255,.85); flex: 1; text-align: center; padding: 0 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ev-nav-num { font-size: 13px; font-weight: 700; color: rgba(255,255,255,.82); background: rgba(255,255,255,.12); border-radius: 8px; padding: 5px 12px; white-space: nowrap; }

        /* barra progreso */
        .ev-prog { height: 5px; background: rgba(14,40,100,.10); position: sticky; top: 60px; z-index: 19; }
        .ev-prog-fill { height: 100%; background: linear-gradient(90deg,#16a34a,#86efac); transition: width .5s ease; }

        /* body */
        .ev-body { flex: 1; padding: clamp(14px,3vw,40px) clamp(14px,4vw,24px) 80px; display: flex; flex-direction: column; align-items: center; gap: 13px; }
        .ev-wrap { width: 100%; max-width: 680px; display: flex; flex-direction: column; gap: 13px; }

        /* tutor card */
        .ev-tcard { background: #fff; border: 1.5px solid #e8eeff; border-radius: 16px; padding: 14px 18px; display: flex; align-items: center; gap: 14px; animation: _fadeUp .3s ease both; }
        .ev-tav { width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0; background: linear-gradient(135deg,#e8eeff,#c7d7ff); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800; color: #1e40af; }
        .ev-tname { font-size: 14px; font-weight: 700; color: #0f172a; }
        .ev-tmat  { font-size: 12px; color: #64748b; margin-top: 2px; }
        .ev-ttags { display: flex; gap: 6px; margin-top: 5px; flex-wrap: wrap; }
        .ev-ttag  { background: #f1f5ff; border-radius: 6px; padding: 2px 8px; font-size: 11px; font-weight: 600; color: #3b4fd8; }
        .ev-ttag-g { background: #dcfce7; color: #15803d; }

        /* dots */
        .ev-dots { display: flex; flex-wrap: wrap; gap: 5px; background: #fff; border: 1.5px solid #e8eeff; border-radius: 14px; padding: 11px 13px; animation: _fadeUp .3s ease .04s both; }
        .ev-d   { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; border: 2px solid transparent; }
        .ev-d-e { background: #f1f5f9; color: #94a3b8; border-color: #e2e8f0; }
        .ev-d-a { background: #dbeafe;  color: #1e40af; border-color: #93c5fd; }
        .ev-d-c { background: #1e40af;  color: #fff;    border-color: #1e40af; }

        /* card pregunta */
        .ev-card { background: #fff; border: 1.5px solid #e8eeff; border-radius: 20px; padding: clamp(20px,4vw,36px); box-shadow: 0 4px 28px rgba(30,64,175,.07); animation: _inR .2s ease both; }

        /* categoría */
        .ev-catrow  { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .ev-catpill { display: inline-flex; align-items: center; gap: 8px; background: #eff2ff; border-radius: 9px; padding: 5px 12px; flex: 1; min-width: 0; }
        .ev-catnum  { background: #1e40af; color: #fff; border-radius: 5px; padding: 1px 6px; font-size: 10px; font-weight: 800; flex-shrink: 0; }
        .ev-catlbl  { font-size: 11.5px; font-weight: 700; color: #3730a3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ev-rtoggle { background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 19px; padding: 0; flex-shrink: 0; transition: color .15s; }
        .ev-rtoggle:hover { color: #3b82f6; }

        /* rúbrica */
        .ev-rub       { background: #0f172a; border-radius: 14px; padding: 14px 16px; margin-bottom: 20px; animation: _rubIn .18s ease; }
        .ev-rubtitle  { font-size: 10.5px; font-weight: 800; color: #93c5fd; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 10px; }
        .ev-rubrow    { display: flex; gap: 10px; align-items: flex-start; padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,.06); }
        .ev-rubrow:last-child { border-bottom: none; padding-bottom: 0; }
        .ev-rubval    { min-width: 28px; height: 22px; border-radius: 6px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: #fff; background: #1e3a8a; }
        .ev-rubtxt    { font-size: 12.5px; color: #cbd5e1; line-height: 1.5; }

        /* pregunta */
        .ev-q { font-size: clamp(16px,2.2vw,20px); font-weight: 700; color: #0f172a; line-height: 1.55; margin-bottom: 24px; }

        /* opciones */
        .ev-opts { display: flex; flex-direction: column; gap: 10px; }
        .ev-opt {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px; border-radius: 13px;
          border: 2px solid #e8edf5; background: #fafbff;
          user-select: none;
          transition: border-color .16s, background .16s, transform .18s, box-shadow .16s, opacity .2s;
        }
        /* En fase "libre": clickeable con hover */
        .ev-opt-libre  { cursor: pointer; }
        .ev-opt-libre:hover:not(.ev-opt-sel) { border-color: #c7d2fe; background: #f4f6ff; transform: translateX(3px); }
        /* En fase "transitando/enviando": bloqueado visualmente */
        .ev-opt-lock   { cursor: not-allowed; }
        .ev-opt-lock:not(.ev-opt-sel) { opacity: .28; }
        /* Seleccionada */
        .ev-opt-sel { border-color: var(--ob); background: var(--obg); transform: translateX(5px); box-shadow: 0 2px 14px rgba(0,0,0,.06); }

        .ev-opnum { width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; background: #f1f5f9; color: #475569; transition: background .16s, color .16s; }
        .ev-opt-sel .ev-opnum { background: var(--oc); color: #fff; }
        .ev-radio { width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0; border: 2px solid #cbd5e1; background: #fff; display: flex; align-items: center; justify-content: center; transition: border-color .15s, background .15s; }
        .ev-opt-sel .ev-radio { border-color: var(--oc); background: var(--oc); }
        .ev-rdot  { width: 8px; height: 8px; border-radius: 50%; background: #fff; transform: scale(0); opacity: 0; transition: all .15s; }
        .ev-opt-sel .ev-rdot { transform: scale(1); opacity: 1; }
        .ev-oplbl { font-size: 13.5px; font-weight: 700; color: var(--oc, #475569); }
        .ev-oprub { font-size: 12px; color: #64748b; margin-top: 2px; line-height: 1.4; }

        /* hints */
        .ev-hint { display: flex; align-items: center; gap: 8px; border-radius: 10px; padding: 11px 14px; margin-top: 14px; font-size: 13px; font-weight: 500; }
        .ev-hint-info { background: #f0f9ff; border: 1px solid #bae6fd; color: #0369a1; }
        .ev-hint-ok   { background: #f0fdf4; border: 1px solid #86efac; color: #15803d; font-weight: 600; }

        /* enviando */
        .ev-sending { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 48px 0; }
        .ev-spinner { width: 46px; height: 46px; border: 4px solid #e8eeff; border-top-color: #2563eb; border-radius: 50%; animation: _spin .7s linear infinite; }
        .ev-stxt    { font-size: 15px; font-weight: 700; color: #1e40af; }

        @media (max-width: 480px) {
          .ev-opt { padding: 11px 12px; gap: 10px; }
          .ev-q   { font-size: 15px; }
        }
      `}</style>

      <Toast visible={toastVisible} />

      <div className="ev-root">

        {/* Navbar */}
        <nav className="ev-nav">
          <button className="ev-back" onClick={() => navigate("/panel-alumno")}>← Volver</button>
          <p className="ev-nav-mid">{tutor.nombre}</p>
          <span className="ev-nav-num">{pagina + 1} / {TOTAL}</span>
        </nav>

        {/* Barra de progreso */}
        <div className="ev-prog">
          <div className="ev-prog-fill" style={{ width: `${progPct}%` }} />
        </div>

        <div className="ev-body">
          <div className="ev-wrap">

            {/* Tutor */}
            <div className="ev-tcard">
              <div className="ev-tav">{inicial}</div>
              <div>
                <p className="ev-tname">{tutor.nombre}</p>
                <p className="ev-tmat">{tutor.materia}</p>
                <div className="ev-ttags">
                  {tutor.grupo && <span className="ev-ttag">{tutor.grupo}</span>}
                  <span className="ev-ttag">Encuesta de tutoría</span>
                  <span className="ev-ttag ev-ttag-g">{respondidas}/{TOTAL} respondidas</span>
                </div>
              </div>
            </div>

            {/* Mapa de dots — solo visual, sin navegación */}
            <div className="ev-dots">
              {preguntas.map((p, i) => {
                const estado = i === pagina ? "ev-d-c"
                             : respuestas[p.id] !== undefined ? "ev-d-a"
                             : "ev-d-e"
                return (
                  <div key={p.id} className={`ev-d ${estado}`} title={`Pregunta ${i + 1}`}>
                    {respuestas[p.id] !== undefined && i !== pagina ? "✓" : i + 1}
                  </div>
                )
              })}
            </div>

            {/* Card de pregunta — key = animKey fuerza re-mount + animación al avanzar */}
            <div key={animKey} className="ev-card">

              {/* Categoría */}
              <div className="ev-catrow">
                <div className="ev-catpill">
                  <span className="ev-catnum">{cat?.id}</span>
                  <span className="ev-catlbl">{cat?.nombre}</span>
                </div>
                <button
                  className="ev-rtoggle"
                  onClick={() => setMostrarRubrica(v => !v)}
                  title="Ver rúbrica de evaluación"
                >
                  {mostrarRubrica ? "✕" : "ℹ"}
                </button>
              </div>

              {/* Rúbrica */}
              {mostrarRubrica && (
                <div className="ev-rub">
                  <p className="ev-rubtitle">Rúbrica — {cat?.nombre}</p>
                  {[5, 4, 3, 2, 1].map(v => (
                    <div className="ev-rubrow" key={v}>
                      <span className="ev-rubval">{v}</span>
                      <span className="ev-rubtxt">{rubrica[v]}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Texto de pregunta */}
              <p className="ev-q">{pregActual.texto}</p>

              {/* Pantalla de envío */}
              {estaEnviando ? (
                <div className="ev-sending">
                  <div className="ev-spinner" />
                  <p className="ev-stxt">Guardando tu evaluación…</p>
                </div>
              ) : (
                <>
                  {/* Opciones */}
                  <div className="ev-opts">
                    {OPCIONES.map(op => {
                      const sel = respActual === op.valor
                      return (
                        <div
                          key={op.valor}
                          className={[
                            "ev-opt",
                            sel        ? "ev-opt-sel"   : "",
                            estaLibre  ? "ev-opt-libre" : "ev-opt-lock",
                          ].filter(Boolean).join(" ")}
                          style={{ "--oc": op.color, "--obg": op.bg, "--ob": op.border }}
                          onClick={() => seleccionar(op.valor)}
                        >
                          <div className="ev-opnum">{op.valor}</div>
                          <div className="ev-radio">
                            <div className="ev-rdot" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <p className="ev-oplbl">{op.label}</p>
                            <p className="ev-oprub">{rubrica[op.valor]}</p>
                          </div>
                          {sel && !estaLibre && (
                            <span style={{ fontSize: 16, flexShrink: 0 }}>🔒</span>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Hint: esperando selección */}
                  {estaLibre && (
                    <div className="ev-hint ev-hint-info">
                      <span>💡</span>
                      {esUltima
                        ? "Al seleccionar, la evaluación se enviará automáticamente."
                        : "Selecciona una opción para avanzar a la siguiente pregunta."}
                    </div>
                  )}

                  {/* Hint: respuesta guardada, esperando avance */}
                  {!estaLibre && !estaEnviando && (
                    <div className="ev-hint ev-hint-ok">
                      <span>✅</span>
                      Respuesta guardada — avanzando a la siguiente pregunta…
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
