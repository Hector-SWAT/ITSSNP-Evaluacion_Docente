import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getPerfilAlumno, yaEvaluado } from "../services/evaluacionData"

export default function Gracias() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { user }  = useAuth()

  const tutor         = location.state?.tutor ?? null
  const totalPreguntas = location.state?.totalPreguntas ?? 17

  /* Cuenta cuántas evaluaciones quedan por hacer */
  const [pendientes, setPendientes] = useState(0)
  useEffect(() => {
    if (!user?.id) return
    const perfil  = getPerfilAlumno(user.id)
    const quedan  = perfil.tutores.filter(t => !yaEvaluado(user.id, t.id)).length
    setPendientes(quedan)
  }, [user])

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap" rel="stylesheet" />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }

        @keyframes _fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes _pop      { 0%{transform:scale(.6);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
        @keyframes _confetti {
          0%   { transform: translateY(-10px) rotate(0deg);   opacity:1; }
          100% { transform: translateY(120px) rotate(540deg); opacity:0; }
        }

        .gr-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100dvh;
          background: linear-gradient(145deg, #0d2660 0%, #1648b8 50%, #0b7ec9 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 32px 20px;
          position: relative; overflow: hidden;
        }

        /* Malla de puntos decorativa */
        .gr-root::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px);
          background-size: 26px 26px; pointer-events: none;
        }

        /* Círculos decorativos */
        .gr-ring1 {
          position: absolute; width: 500px; height: 500px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.07);
          right: -160px; top: -160px; pointer-events: none;
        }
        .gr-ring2 {
          position: absolute; width: 360px; height: 360px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.05);
          left: -100px; bottom: -100px; pointer-events: none;
        }

        /* Confetti items */
        .gr-confetti {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; overflow: hidden;
        }
        .gr-c {
          position: absolute; width: 8px; height: 8px; border-radius: 2px;
          animation: _confetti linear forwards;
          top: -12px;
        }

        /* Card central */
        .gr-card {
          background: #fff; border-radius: 28px;
          padding: clamp(32px,5vw,56px) clamp(28px,5vw,56px);
          max-width: 520px; width: 100%;
          text-align: center;
          box-shadow: 0 32px 80px rgba(0,0,0,.35);
          position: relative; z-index: 1;
          animation: _fadeUp .45s cubic-bezier(.16,1,.3,1) both;
        }

        /* Ícono */
        .gr-icon-wrap {
          width: 88px; height: 88px; border-radius: 50%; margin: 0 auto 24px;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border: 3px solid #86efac;
          display: flex; align-items: center; justify-content: center;
          font-size: 40px;
          animation: _pop .5s cubic-bezier(.16,1,.3,1) .1s both;
        }

        .gr-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #f0fdf4; border: 1.5px solid #86efac;
          border-radius: 20px; padding: 5px 14px;
          font-size: 11.5px; font-weight: 700; color: #15803d;
          letter-spacing: .04em; text-transform: uppercase;
          margin-bottom: 16px;
        }

        .gr-title {
          font-size: clamp(24px,3vw,34px); font-weight: 800;
          color: #0f172a; letter-spacing: -.03em; line-height: 1.2;
          margin-bottom: 10px;
        }
        .gr-sub {
          font-size: 15px; color: #475569; line-height: 1.65;
          margin-bottom: 28px;
        }

        /* Info del tutor evaluado */
        .gr-tutor-box {
          background: #f8faff; border: 1.5px solid #e8eeff;
          border-radius: 14px; padding: 14px 18px;
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 24px; text-align: left;
        }
        .gr-t-avatar {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          background: linear-gradient(135deg, #e8eeff, #c7d7ff);
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; font-weight: 800; color: #1e40af;
        }
        .gr-t-name { font-size: 14px; font-weight: 700; color: #0f172a; }
        .gr-t-mat  { font-size: 12px; color: #64748b; margin-top: 2px; }
        .gr-t-qs   {
          display: inline-flex; align-items: center; gap: 5px;
          background: #dcfce7; border-radius: 6px;
          padding: 2px 8px; font-size: 11px; font-weight: 700; color: #15803d;
          margin-top: 5px;
        }

        /* Chips de garantías */
        .gr-chips {
          display: flex; flex-wrap: wrap; gap: 8px;
          justify-content: center; margin-bottom: 28px;
        }
        .gr-chip {
          display: flex; align-items: center; gap: 6px;
          background: #f1f5ff; border: 1px solid #c7d2fe;
          border-radius: 8px; padding: 6px 12px;
          font-size: 12px; font-weight: 600; color: #3730a3;
        }

        /* Botones */
        .gr-btns { display: flex; flex-direction: column; gap: 10px; }
        .gr-btn-primary {
          width: 100%; height: 52px; border-radius: 13px; border: none;
          background: linear-gradient(135deg, #1e40af, #2563eb 55%, #0891b2);
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
          color: #fff; cursor: pointer;
          box-shadow: 0 4px 18px rgba(37,99,235,.32);
          transition: all .18s; position: relative; overflow: hidden;
        }
        .gr-btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(rgba(255,255,255,.10), transparent);
          pointer-events: none;
        }
        .gr-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 7px 24px rgba(37,99,235,.40); }
        .gr-btn-secondary {
          width: 100%; height: 48px; border-radius: 13px;
          background: #f1f5f9; border: 1.5px solid #e2e8f0;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700;
          color: #475569; cursor: pointer; transition: all .18s;
        }
        .gr-btn-secondary:hover { background: #e2e8f0; }

        .gr-footer {
          margin-top: 22px; font-size: 11.5px; color: rgba(255,255,255,.45);
          position: relative; z-index: 1; text-align: center;
        }
      `}</style>

      {/* Partículas de confetti */}
      <div className="gr-confetti">
        {Array.from({length: 22}).map((_, i) => (
          <div
            key={i}
            className="gr-c"
            style={{
              left:             `${(i * 4.7) % 100}%`,
              background:       ["#22c55e","#3b82f6","#f59e0b","#ec4899","#8b5cf6","#06b6d4"][i % 6],
              animationDelay:   `${(i * 0.13) % 1.4}s`,
              animationDuration:`${1.2 + (i % 5) * 0.3}s`,
              width:            `${6 + (i % 4) * 3}px`,
              height:           `${6 + (i % 3) * 3}px`,
            }}
          />
        ))}
      </div>

      <div className="gr-ring1" />
      <div className="gr-ring2" />

      <div className="gr-card">

        {/* Ícono */}
        <div className="gr-icon-wrap">✅</div>

        {/* Badge */}
        <div className="gr-badge">
          <span>★</span> Evaluación completada
        </div>

        <h1 className="gr-title">¡Gracias por tu participación!</h1>
        <p className="gr-sub">
          Tu evaluación ha sido registrada exitosamente.<br/>
          Tus respuestas son <strong>anónimas y confidenciales</strong>.
        </p>

        {/* Tutor evaluado */}
        {tutor && (
          <div className="gr-tutor-box">
            <div className="gr-t-avatar">
              {tutor.nombre.replace(/^(Dr\.|M\.C\.|Ing\.|Mtra?\.|Lic\.)?\s*/i,"").trim()[0] ?? "T"}
            </div>
            <div>
              <p className="gr-t-name">{tutor.nombre}</p>
              <p className="gr-t-mat">{tutor.materia}</p>
              <span className="gr-t-qs">✓ {totalPreguntas} preguntas respondidas</span>
            </div>
          </div>
        )}

        {/* Chips informativos */}
        <div className="gr-chips">
          <span className="gr-chip">🔒 Respuestas anónimas</span>
          <span className="gr-chip">📊 Datos protegidos</span>
          <span className="gr-chip">✓ Sin modificaciones</span>
        </div>

        {/* Botones */}
        <div className="gr-btns">
          {pendientes > 0 ? (
            <button className="gr-btn-primary" onClick={() => navigate("/panel-alumno")}>
              Continuar ({pendientes} evaluación{pendientes > 1 ? "es" : ""} pendiente{pendientes > 1 ? "s" : ""}) →
            </button>
          ) : (
            <button className="gr-btn-primary" onClick={() => navigate("/panel-alumno")}>
              Ver resumen de mis evaluaciones →
            </button>
          )}
          <button className="gr-btn-secondary" onClick={() => navigate("/panel-alumno")}>
            Volver al panel
          </button>
        </div>
      </div>

      <p className="gr-footer">
        © 2026 · ITSSNP · Sistema de Evaluación Docente · SWATCorps
      </p>
    </>
  )
}
