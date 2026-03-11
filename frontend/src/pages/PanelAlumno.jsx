import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getPerfilAlumno, yaEvaluado } from "../services/evaluacionData"

export default function PanelAlumno() {
  const navigate         = useNavigate()
  const { user, logout } = useAuth()

  const [perfil,  setPerfil]  = useState(null)
  const [refresc, setRefresc] = useState(0)

  /* Carga perfil del alumno */
  useEffect(() => {
    if (user?.id) setPerfil(getPerfilAlumno(user.id))
  }, [user, refresc])

  /* Refresca al volver a la pestaña */
  useEffect(() => {
    const fn = () => setRefresc(r => r + 1)
    window.addEventListener("focus", fn)
    return () => window.removeEventListener("focus", fn)
  }, [])

  const tutores     = perfil?.tutores ?? []
  const completadas = tutores.filter(t => yaEvaluado(user?.id, t.id)).length
  const total       = tutores.length
  const pct         = total === 0 ? 0 : Math.round((completadas / total) * 100)
  const todoListo   = total > 0 && completadas === total

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap" rel="stylesheet" />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }

        @keyframes _fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes _barIn   { from{width:0} to{width:var(--pct)} }
        @keyframes _pulse   { 0%,100%{opacity:.55} 50%{opacity:1} }

        /* ══ Raíz ══ */
        .pa-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100dvh;
          background: #eef2ff;
          display: flex; flex-direction: column;
        }

        /* ══ Navbar ══ */
        .pa-nav {
          background: linear-gradient(135deg, #0d2660 0%, #1648b8 55%, #0b7ec9 100%);
          height: 62px; padding: 0 clamp(16px,4vw,48px);
          display: flex; align-items: center; justify-content: space-between;
          box-shadow: 0 2px 18px rgba(0,0,0,.28);
          position: sticky; top: 0; z-index: 10;
        }
        .pa-nav-brand {
          display: flex; align-items: center; gap: 10px;
          font-size: 15px; font-weight: 700; color: #fff; letter-spacing: -.01em;
        }
        .pa-nav-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: #22c55e; box-shadow: 0 0 10px #22c55e;
        }
        .pa-nav-right { display: flex; align-items: center; gap: 10px; }
        .pa-nav-user {
          font-size: 13px; color: rgba(255,255,255,.72);
          max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .pa-btn-logout {
          background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.22);
          border-radius: 8px; padding: 5px 14px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
          color: #fff; cursor: pointer; transition: background .15s;
        }
        .pa-btn-logout:hover { background: rgba(255,255,255,.24); }

        /* ══ Cuerpo ══ */
        .pa-body {
          flex: 1;
          padding: clamp(20px,4vw,44px) clamp(16px,4vw,48px);
          max-width: 880px; width: 100%; margin: 0 auto;
          display: flex; flex-direction: column; gap: 22px;
        }

        /* ══ Hero card ══ */
        .pa-hero {
          background: linear-gradient(135deg, #0d2660 0%, #1648b8 55%, #0b7ec9 100%);
          border-radius: 22px; padding: clamp(24px,4vw,40px);
          position: relative; overflow: hidden;
          animation: _fadeUp .35s ease both;
        }
        .pa-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px);
          background-size: 24px 24px; pointer-events: none;
        }
        .pa-hero-ring1 {
          position: absolute; width: 340px; height: 340px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.07);
          right: -100px; top: -120px; pointer-events: none;
        }
        .pa-hero-ring2 {
          position: absolute; width: 220px; height: 220px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.05);
          left: -60px; bottom: -80px; pointer-events: none;
        }

        .pa-hero-top {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 16px; margin-bottom: 26px;
          position: relative; z-index: 1; flex-wrap: wrap;
        }
        .pa-hero-title {
          font-size: clamp(20px,2.5vw,28px); font-weight: 800;
          color: #fff; letter-spacing: -.025em; line-height: 1.2;
          margin-bottom: 6px;
        }
        .pa-hero-meta {
          display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
        }
        .pa-hero-tag {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.18);
          border-radius: 8px; padding: 4px 10px;
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,.88);
        }
        .pa-hero-tag-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #22c55e;
        }
        .pa-hero-score {
          background: rgba(255,255,255,.10); border: 1.5px solid rgba(255,255,255,.20);
          border-radius: 14px; padding: 12px 18px; text-align: center; flex-shrink: 0;
        }
        .pa-score-num  { font-size: 26px; font-weight: 800; color: #fff; line-height: 1; }
        .pa-score-sep  { font-size: 16px; color: rgba(255,255,255,.45); margin: 0 2px; }
        .pa-score-lbl  { font-size: 11px; color: rgba(255,255,255,.55); text-transform: uppercase; letter-spacing: .04em; margin-top: 3px; }

        /* Barra progreso hero */
        .pa-prog { position: relative; z-index: 1; }
        .pa-prog-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12.5px; color: rgba(255,255,255,.65); margin-bottom: 8px;
        }
        .pa-prog-pct  { font-weight: 700; color: #86efac; }
        .pa-prog-track { height: 9px; background: rgba(255,255,255,.15); border-radius: 99px; overflow: hidden; }
        .pa-prog-fill  {
          height: 100%;
          background: linear-gradient(90deg, #22c55e, #86efac);
          border-radius: 99px;
          width: var(--pct);
          animation: _barIn .8s cubic-bezier(.16,1,.3,1) .1s both;
          transition: width .5s ease;
        }

        /* ══ Banner finalizado ══ */
        .pa-done {
          display: flex; align-items: center; gap: 14px;
          background: #f0fdf4; border: 1.5px solid #86efac;
          border-radius: 16px; padding: 18px 22px;
          animation: _fadeUp .3s ease both;
        }
        .pa-done-icon  { font-size: 30px; flex-shrink: 0; }
        .pa-done-title { font-size: 15px; font-weight: 800; color: #14532d; }
        .pa-done-sub   { font-size: 13px; color: #16a34a; margin-top: 3px; line-height: 1.5; }

        /* ══ Sección ══ */
        .pa-section-hdr {
          font-size: 11.5px; font-weight: 800; color: #64748b;
          text-transform: uppercase; letter-spacing: .07em;
          margin-bottom: 12px;
        }

        /* ══ Grid de tutores ══ */
        .pa-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 14px;
        }

        /* Card de tutor */
        .pa-card {
          background: #fff;
          border: 1.5px solid #e8eeff;
          border-radius: 18px; padding: 20px;
          display: flex; flex-direction: column; gap: 14px;
          animation: _fadeUp .4s ease both;
          transition: box-shadow .2s, transform .2s, border-color .2s;
        }
        .pa-card:not(.pa-card--done):hover {
          box-shadow: 0 8px 30px rgba(30,64,175,.11);
          transform: translateY(-2px);
          border-color: #bfcfff;
        }
        .pa-card--done {
          background: #fafffe;
          border-color: #bbf7d0;
          opacity: .84;
        }

        .pa-card-top  { display: flex; align-items: flex-start; gap: 12px; }
        .pa-avatar {
          width: 46px; height: 46px; border-radius: 13px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 800;
          background: linear-gradient(135deg, #e8eeff, #c7d7ff);
          color: #1e40af;
        }
        .pa-avatar--done { background: linear-gradient(135deg, #d1fae5, #6ee7b7); color: #065f46; }

        .pa-card-info  { flex: 1; min-width: 0; }
        .pa-card-name  {
          font-size: 14px; font-weight: 700; color: #0f172a;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .pa-card-mat   { font-size: 12px; color: #64748b; margin-top: 2px; }
        .pa-card-check { font-size: 20px; flex-shrink: 0; }

        .pa-card-tags  { display: flex; flex-wrap: wrap; gap: 6px; }
        .pa-card-tag   {
          background: #f1f5ff; border-radius: 6px; padding: 3px 8px;
          font-size: 11px; font-weight: 600; color: #3b4fd8;
        }
        .pa-card-tag--green {
          background: #dcfce7; color: #166534;
        }

        /* Botón evaluar */
        .pa-card-btn {
          width: 100%; height: 44px; border-radius: 11px; border: none;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 700;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: all .18s;
        }
        .pa-card-btn--pending {
          background: linear-gradient(135deg, #1e40af, #2563eb 55%, #0891b2);
          color: #fff; box-shadow: 0 3px 14px rgba(37,99,235,.28);
        }
        .pa-card-btn--pending:hover {
          transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,.38);
        }
        .pa-card-btn--done {
          background: #f0fdf4; color: #16a34a;
          border: 1.5px solid #86efac; cursor: default;
        }

        /* ══ Footer ══ */
        .pa-footer {
          text-align: center; padding: 18px 0;
          font-size: 11px; color: #94a3b8;
        }

        @media (max-width: 600px) {
          .pa-grid { grid-template-columns: 1fr; }
          .pa-hero-top { flex-direction: column; }
        }
      `}</style>

      <div className="pa-root">

        {/* ── Navbar ── */}
        <nav className="pa-nav">
          <div className="pa-nav-brand">
            <span className="pa-nav-dot" />
            SICOT · Evaluación Docente
          </div>
          <div className="pa-nav-right">
            <span className="pa-nav-user">{user?.nombre}</span>
            <button className="pa-btn-logout" onClick={logout}>Cerrar sesión</button>
          </div>
        </nav>

        <div className="pa-body">

          {/* ── Hero ── */}
          <div className="pa-hero" style={{ "--pct": `${pct}%` }}>
            <div className="pa-hero-ring1" /><div className="pa-hero-ring2" />

            <div className="pa-hero-top">
              <div>
                <h1 className="pa-hero-title">Evaluación de tutores</h1>
                <div className="pa-hero-meta">
                  <span className="pa-hero-tag">
                    <span style={{opacity:.7}}>No. Control:</span>&nbsp;
                    <strong style={{color:"#fff"}}>{user?.id}</strong>
                  </span>
                  {perfil && (
                    <span className="pa-hero-tag">
                      <span className="pa-hero-tag-dot" />
                      {perfil.siglas} · Semestre {perfil.semestre}
                    </span>
                  )}
                  <span className="pa-hero-tag">Periodo activo</span>
                </div>
                {perfil && (
                  <p style={{fontSize:12, color:"rgba(255,255,255,.50)", marginTop:6}}>
                    {perfil.carrera}
                  </p>
                )}
              </div>
              <div className="pa-hero-score">
                <div>
                  <span className="pa-score-num">{completadas}</span>
                  <span className="pa-score-sep">/</span>
                  <span className="pa-score-num" style={{opacity:.5}}>{total}</span>
                </div>
                <p className="pa-score-lbl">Evaluaciones</p>
              </div>
            </div>

            <div className="pa-prog">
              <div className="pa-prog-row">
                <span>Progreso general</span>
                <span className="pa-prog-pct">{pct}%</span>
              </div>
              <div className="pa-prog-track">
                <div className="pa-prog-fill" />
              </div>
            </div>
          </div>

          {/* ── Banner completado ── */}
          {todoListo && (
            <div className="pa-done">
              <span className="pa-done-icon">🎉</span>
              <div>
                <p className="pa-done-title">¡Has completado todas las evaluaciones!</p>
                <p className="pa-done-sub">
                  Gracias por tu participación. Tus respuestas son completamente anónimas y confidenciales.
                </p>
              </div>
            </div>
          )}

          {/* ── Grid de tutores ── */}
          <div>
            <p className="pa-section-hdr">Tutores asignados este periodo</p>
            <div className="pa-grid">
              {tutores.map((tutor, i) => {
                const hecho   = yaEvaluado(user?.id, tutor.id)
                const inicial = tutor.nombre.replace(/^(Dr\.|M\.C\.|Ing\.|Mtra?\.|Lic\.)?\s*/i, "").trim()[0] ?? "T"
                return (
                  <div
                    key={tutor.id}
                    className={`pa-card${hecho ? " pa-card--done" : ""}`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {/* Cabecera */}
                    <div className="pa-card-top">
                      <div className={`pa-avatar${hecho ? " pa-avatar--done" : ""}`}>
                        {inicial}
                      </div>
                      <div className="pa-card-info">
                        <p className="pa-card-name">{tutor.nombre}</p>
                        <p className="pa-card-mat">{tutor.materia}</p>
                      </div>
                      <span className="pa-card-check">{hecho ? "✅" : "📋"}</span>
                    </div>

                    {/* Tags */}
                    <div className="pa-card-tags">
                      <span className="pa-card-tag">{tutor.grupo}</span>
                      {hecho && <span className="pa-card-tag pa-card-tag--green">Completada</span>}
                    </div>

                    {/* Botón */}
                    <button
                      className={`pa-card-btn pa-card-btn--${hecho ? "done" : "pending"}`}
                      disabled={hecho}
                      onClick={() =>
                        navigate(`/evaluacion/${tutor.id}`, {
                          state: { tutor, numControl: user?.id },
                        })
                      }
                    >
                      {hecho ? "✓ Evaluación completada" : "Iniciar evaluación →"}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <footer className="pa-footer">
          © 2026 · ITSSNP · Sistema de Evaluación Docente · SWATCorps
        </footer>
      </div>
    </>
  )
}
