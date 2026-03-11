import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getPerfilAlumnoAPI, getEvaluacionesAlumnoAPI } from "../services/evaluacionData"

// URLs de PostImages para todos los assets
const ASSETS = {
  logoITSSNP: "https://i.postimg.cc/YhqbKr76/logo-itssnp.png",
  logoITSSNP2: "https://i.postimg.cc/Xp7QSjW9/logo-itssnp2.png",
  logoTECNM: "https://i.postimg.cc/ykYv41K5/logo-tecnm.png",
  logoTECNM2: "https://i.postimg.cc/QHx0G8Dz/logo-tecnm2.png",
  iconUser: "https://i.postimg.cc/hh0p5Jkx/icon-user.png",
  iconLock: "https://i.postimg.cc/kDyfpV0b/icon-lock.png",
  logoInfo: "https://i.postimg.cc/D8yBkvhW/Logo-Info.jpg",
  logoInfo2: "https://i.postimg.cc/BXQM9S35/Logo-Info2.png"
}

export default function PanelAlumno() {
  const navigate         = useNavigate()
  const { user, logout } = useAuth()

  const [perfil,    setPerfil]    = useState(null)
  const [evaluaciones, setEvaluaciones] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [refresc,   setRefresc]   = useState(0)

  // Fallbacks para assets
  const [logoITSSNPFail, setLogoITSSNPFail] = useState(false)
  const [logoTECNMFail,  setLogoTECNMFail]  = useState(false)

  /* Carga perfil del alumno desde la API REAL */
  useEffect(() => {
    if (!user?.id) return
    
    const cargarDatos = async () => {
      setLoading(true)
      try {
        // Obtener perfil del alumno
        const datosPerfil = await getPerfilAlumnoAPI(user.id)
        setPerfil(datosPerfil)
        
        // Obtener estado de evaluaciones
        const datosEval = await getEvaluacionesAlumnoAPI(user.id)
        setEvaluaciones(datosEval.evaluaciones || [])
        
        console.log("✅ Datos cargados:", { 
          perfil: datosPerfil,
          evaluaciones: datosEval 
        })
      } catch (error) {
        console.error("❌ Error cargando datos:", error)
      } finally {
        setLoading(false)
      }
    }
    
    cargarDatos()
  }, [user, refresc])

  /* Refresca al volver a la pestaña */
  useEffect(() => {
    const fn = () => setRefresc(r => r + 1)
    window.addEventListener("focus", fn)
    return () => window.removeEventListener("focus", fn)
  }, [])

  // Verificar si un tutor ya fue evaluado
  const yaEvaluado = (tutorId) => {
    return evaluaciones.some(e => e.idTutor === tutorId && e.completada === true)
  }

  const tutores     = perfil?.tutores ?? []
  const completadas = tutores.filter(t => yaEvaluado(t.id)).length
  const total       = tutores.length
  const pct         = total === 0 ? 0 : Math.round((completadas / total) * 100)
  const todoListo   = total > 0 && completadas === total

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #0b1f4a 0%, #1648b8 55%, #0b7ec9 100%)'
      }}>
        <div style={{ textAlign: 'center', background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '5px solid #e2e8f0', 
            borderTop: '5px solid #2563eb', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ fontSize: '16px', color: '#0f172a', fontWeight: 500 }}>Cargando tus tutores...</p>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap" rel="stylesheet" />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }

        @keyframes fadeUp { 
          from { opacity:0; transform:translateY(20px); } 
          to { opacity:1; transform:translateY(0); } 
        }
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
        @keyframes barFill {
          from { width: 0; }
          to { width: var(--pct); }
        }

        /* ══ Raíz ══ */
        .pa-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100dvh;
          background: #f8fafc;
          display: flex; flex-direction: column;
        }

        /* ══ Navbar con logos ══ */
        .pa-nav {
          background: linear-gradient(135deg, #0b1f4a 0%, #1648b8 55%, #0b7ec9 100%);
          height: 80px; 
          padding: 0 clamp(16px,4vw,48px);
          display: flex; 
          align-items: center; 
          justify-content: space-between;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          position: sticky; 
          top: 0; 
          z-index: 10;
        }
        .pa-nav-brand {
          display: flex; 
          align-items: center; 
          gap: 24px;
        }
        .pa-nav-logos {
          display: flex; 
          align-items: center; 
          gap: 20px;
        }
        .pa-nav-logo {
          height: 50px;
          width: auto;
          object-fit: contain;
          filter: brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.2));
          transition: transform 0.2s ease;
        }
        .pa-nav-logo:hover {
          transform: scale(1.05);
        }
        .pa-nav-divider {
          width: 2px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent);
        }
        .pa-nav-title {
          font-size: 16px; 
          font-weight: 600; 
          color: rgba(255,255,255,0.95);
          letter-spacing: 0.3px;
          border-left: 2px solid rgba(255,255,255,0.3);
          padding-left: 20px;
        }
        .pa-nav-user-section {
          display: flex; 
          align-items: center; 
          gap: 16px;
        }
        .pa-nav-user-info {
          display: flex; 
          align-items: center; 
          gap: 10px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 30px; 
          padding: 8px 20px 8px 16px;
        }
        .pa-nav-user-icon {
          width: 18px; 
          height: 18px;
          opacity: 0.8;
          filter: brightness(0) invert(1);
        }
        .pa-nav-user-name {
          font-size: 14px; 
          font-weight: 500; 
          color: #fff;
        }
        .pa-btn-logout {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 30px; 
          padding: 8px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; 
          font-weight: 600; 
          color: #fff;
          cursor: pointer; 
          transition: all 0.2s;
        }
        .pa-btn-logout:hover {
          background: rgba(255,255,255,0.24);
          transform: translateY(-1px);
        }

        /* ══ Cuerpo ══ */
        .pa-body {
          flex: 1;
          padding: clamp(24px,4vw,48px) clamp(16px,4vw,48px);
          max-width: 1200px; 
          width: 100%; 
          margin: 0 auto;
          display: flex; 
          flex-direction: column; 
          gap: 24px;
        }

        /* ══ Hero card ══ */
        .pa-hero {
          background: linear-gradient(135deg, #0b1f4a 0%, #1648b8 55%, #0b7ec9 100%);
          border-radius: 24px; 
          padding: 32px 36px;
          position: relative; 
          overflow: hidden;
          animation: fadeUp 0.45s ease both;
          box-shadow: 0 20px 40px rgba(11,31,74,0.25);
        }
        .pa-hero::before {
          content: '';
          position: absolute; 
          inset: 0;
          background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .pa-hero-content {
          position: relative; 
          z-index: 1;
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start;
          flex-wrap: wrap; 
          gap: 24px;
        }
        .pa-hero-info h1 {
          font-size: clamp(24px, 3vw, 32px); 
          font-weight: 800; 
          color: #fff;
          line-height: 1.2; 
          margin-bottom: 12px;
        }
        .pa-hero-badges {
          display: flex; 
          flex-wrap: wrap; 
          gap: 10px;
        }
        .pa-hero-badge {
          display: inline-flex; 
          align-items: center; 
          gap: 8px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 30px; 
          padding: 8px 18px;
          font-size: 13px; 
          font-weight: 500; 
          color: rgba(255,255,255,0.95);
        }
        .pa-hero-stats {
          background: rgba(255,255,255,0.10);
          border: 1.5px solid rgba(255,255,255,0.20);
          border-radius: 18px; 
          padding: 20px 28px;
          text-align: center;
        }
        .pa-stats-number {
          font-size: 36px; 
          font-weight: 800; 
          color: #fff;
          line-height: 1;
        }
        .pa-stats-label {
          font-size: 12px; 
          color: rgba(255,255,255,0.65);
          text-transform: uppercase; 
          letter-spacing: 0.5px;
          margin-top: 6px;
        }
        .pa-stats-divider {
          font-size: 24px; 
          color: rgba(255,255,255,0.3);
          margin: 0 4px;
        }

        /* Barra de progreso */
        .pa-progress {
          margin-top: 28px;
        }
        .pa-progress-header {
          display: flex; 
          justify-content: space-between;
          font-size: 14px; 
          color: rgba(255,255,255,0.75);
          margin-bottom: 8px;
        }
        .pa-progress-percent {
          font-weight: 700; 
          color: #7dd3fc;
        }
        .pa-progress-track {
          height: 10px; 
          background: rgba(255,255,255,0.15);
          border-radius: 99px; 
          overflow: hidden;
        }
        .pa-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #7dd3fc, #38bdf8);
          border-radius: 99px;
          width: var(--pct);
          animation: barFill 1s cubic-bezier(0.16,1,0.3,1) both;
        }

        /* Banner completado */
        .pa-completed {
          display: flex; 
          align-items: center; 
          gap: 20px;
          background: #f0fdf4; 
          border: 2px solid #86efac;
          border-radius: 20px; 
          padding: 24px 28px;
          animation: fadeUp 0.4s ease both;
        }
        .pa-completed-icon { 
          font-size: 36px; 
        }
        .pa-completed-text h3 {
          font-size: 18px; 
          font-weight: 800; 
          color: #166534;
          margin-bottom: 4px;
        }
        .pa-completed-text p {
          font-size: 14px; 
          color: #16a34a;
        }

        /* Sección de tutores */
        .pa-section-title {
          display: flex; 
          align-items: center; 
          gap: 12px;
          margin-bottom: 20px;
        }
        .pa-section-title h2 {
          font-size: 20px; 
          font-weight: 700; 
          color: #0f172a;
        }
        .pa-section-count {
          background: #e2e8f0; 
          border-radius: 30px;
          padding: 4px 12px; 
          font-size: 13px; 
          font-weight: 600;
          color: #475569;
        }

        /* Grid de tutores */
        .pa-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        /* Card de tutor */
        .pa-card {
          background: #fff; 
          border: 1.5px solid #e2e8f0;
          border-radius: 20px; 
          padding: 24px;
          transition: all 0.2s ease;
          animation: fadeUp 0.4s ease both;
        }
        .pa-card:hover:not(.pa-card--done) {
          border-color: #2563eb; 
          box-shadow: 0 12px 30px rgba(37,99,235,0.12);
          transform: translateY(-2px);
        }
        .pa-card--done {
          background: #f8fafc; 
          border-color: #86efac;
          opacity: 0.9;
        }

        .pa-card-header {
          display: flex; 
          align-items: flex-start; 
          gap: 16px;
          margin-bottom: 16px;
        }
        .pa-avatar {
          width: 56px; 
          height: 56px; 
          border-radius: 16px;
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 20px; 
          font-weight: 700; 
          color: #1e40af;
          flex-shrink: 0;
        }
        .pa-avatar--done {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #166534;
        }
        .pa-card-info {
          flex: 1; 
          min-width: 0;
        }
        .pa-card-name {
          font-size: 16px; 
          font-weight: 700; 
          color: #0f172a;
          margin-bottom: 4px; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis;
        }
        .pa-card-materia {
          font-size: 14px; 
          color: #64748b;
        }

        .pa-card-tags {
          display: flex; 
          flex-wrap: wrap; 
          gap: 8px;
          margin-bottom: 18px;
        }
        .pa-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f1f5f9; 
          border-radius: 8px;
          padding: 6px 12px; 
          font-size: 12px; 
          font-weight: 600;
          color: #475569;
        }
        .pa-tag img {
          width: 14px;
          height: 14px;
          opacity: 0.6;
        }
        .pa-tag--green {
          background: #dcfce7; 
          color: #166534;
        }

        .pa-card-btn {
          width: 100%; 
          height: 48px; 
          border: none; 
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif; 
          font-size: 14px; 
          font-weight: 700;
          cursor: pointer; 
          transition: all 0.2s;
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 8px;
        }
        .pa-card-btn--pending {
          background: linear-gradient(135deg, #1648b8, #2563eb);
          color: #fff; 
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
        }
        .pa-card-btn--pending:hover {
          opacity: 0.95; 
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(37,99,235,0.4);
        }
        .pa-card-btn--done {
          background: #f0fdf4; 
          color: #166534;
          border: 2px solid #86efac; 
          cursor: default;
        }

        /* Mensaje sin tutores */
        .pa-empty {
          background: #fff; 
          border: 2px dashed #cbd5e1;
          border-radius: 24px; 
          padding: 48px; 
          text-align: center;
        }
        .pa-empty p {
          font-size: 16px; 
          color: #64748b;
        }

        /* Footer */
        .pa-footer {
          margin-top: 32px; 
          padding: 24px 0;
          text-align: center; 
          font-size: 12px; 
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
        }

        /* Responsive */
        @media (max-width: 700px) {
          .pa-nav { 
            height: auto; 
            padding: 16px; 
            flex-direction: column; 
            gap: 12px; 
          }
          .pa-nav-brand { 
            width: 100%; 
            justify-content: center; 
          }
          .pa-nav-user-section { 
            width: 100%; 
            justify-content: center; 
            flex-wrap: wrap; 
          }
          .pa-hero-content { 
            flex-direction: column; 
            align-items: stretch; 
          }
          .pa-hero-stats { 
            align-self: flex-start; 
          }
        }
      `}</style>

      <div className="pa-root">

        {/* ── Navbar con logos de PostImages ── */}
        <nav className="pa-nav">
          <div className="pa-nav-brand">
            <div className="pa-nav-logos">
              <img 
                src={logoITSSNPFail ? ASSETS.logoITSSNP2 : ASSETS.logoITSSNP}
                alt="ITSSNP" 
                className="pa-nav-logo"
                onError={() => setLogoITSSNPFail(true)}
              />
              <div className="pa-nav-divider" />
              <img 
                src={logoTECNMFail ? ASSETS.logoTECNM2 : ASSETS.logoTECNM}
                alt="TecNM" 
                className="pa-nav-logo"
                onError={() => setLogoTECNMFail(true)}
              />
            </div>
            <span className="pa-nav-title">SICOT · Evaluación Docente</span>
          </div>

          <div className="pa-nav-user-section">
            <div className="pa-nav-user-info">
              <img 
                src={ASSETS.iconUser} 
                alt="" 
                className="pa-nav-user-icon"
              />
              <span className="pa-nav-user-name">{user?.nombre || 'Usuario'}</span>
            </div>
            <button className="pa-btn-logout" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </nav>

        <div className="pa-body">

          {/* ── Hero con información del alumno ── */}
          <div className="pa-hero" style={{ "--pct": `${pct}%` }}>
            <div className="pa-hero-content">
              <div className="pa-hero-info">
                <h1>Evaluación de Docentes</h1>
                <div className="pa-hero-badges">
                  <span className="pa-hero-badge">
                    <img src={ASSETS.iconUser} alt="" style={{width:'14px', height:'14px', filter:'brightness(0) invert(1)'}} />
                    No. Control: <strong>{user?.id}</strong>
                  </span>
                  {perfil && (
                    <>
                      <span className="pa-hero-badge">
                        <span>📚</span> {perfil.siglas} · Semestre {perfil.semestre}
                      </span>
                      <span className="pa-hero-badge">
                        <img src={ASSETS.iconLock} alt="" style={{width:'14px', height:'14px', filter:'brightness(0) invert(1)'}} />
                        {total} tutor{total !== 1 ? 'es' : ''}
                      </span>
                    </>
                  )}
                </div>
                {perfil && (
                  <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '12px', fontSize: '14px' }}>
                    {perfil.carrera}
                  </p>
                )}
              </div>
              <div className="pa-hero-stats">
                <div>
                  <span className="pa-stats-number">{completadas}</span>
                  <span className="pa-stats-divider">/</span>
                  <span className="pa-stats-number" style={{ opacity: 0.5 }}>{total}</span>
                </div>
                <div className="pa-stats-label">Evaluaciones completadas</div>
              </div>
            </div>

            <div className="pa-progress">
              <div className="pa-progress-header">
                <span>Progreso general</span>
                <span className="pa-progress-percent">{pct}%</span>
              </div>
              <div className="pa-progress-track">
                <div className="pa-progress-fill" />
              </div>
            </div>
          </div>

          {/* ── Banner cuando completa todo ── */}
          {todoListo && (
            <div className="pa-completed">
              <span className="pa-completed-icon">🎉</span>
              <div className="pa-completed-text">
                <h3>¡Felicidades! Completaste todas las evaluaciones</h3>
                <p>Gracias por tu participación. Tus respuestas son anónimas y confidenciales.</p>
              </div>
            </div>
          )}

          {/* ── Lista de tutores ── */}
          <div>
            <div className="pa-section-title">
              <h2>Tus Docentes asignados</h2>
              <span className="pa-section-count">{total}</span>
            </div>

            {total === 0 ? (
              <div className="pa-empty">
                <p>No tienes Docentes asignados en este periodo.</p>
                <p style={{ fontSize: '13px', marginTop: '8px', color: '#94a3b8' }}>
                  Si crees que esto es un error, contacta a tu coordinador académico.
                </p>
              </div>
            ) : (
              <div className="pa-grid">
                {tutores.map((tutor, i) => {
                  const hecho = yaEvaluado(tutor.id)
                  const inicial = tutor.nombre
                    .replace(/^(Dr\.|M\.C\.|Ing\.|Mtra?\.|Lic\.)?\s*/i, "")
                    .trim()[0] || "T"
                  
                  return (
                    <div
                      key={tutor.id}
                      className={`pa-card${hecho ? " pa-card--done" : ""}`}
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <div className="pa-card-header">
                        <div className={`pa-avatar${hecho ? " pa-avatar--done" : ""}`}>
                          {inicial}
                        </div>
                        <div className="pa-card-info">
                          <div className="pa-card-name">{tutor.nombre}</div>
                          <div className="pa-card-materia">{tutor.materia || 'Sin materia'}</div>
                        </div>
                      </div>

                      <div className="pa-card-tags">
                        <span className="pa-tag">
                          <img src={ASSETS.iconLock} alt="" />
                          Grupo {tutor.grupo}
                        </span>
                        {hecho && (
                          <span className="pa-tag pa-tag--green">
                            ✓ Completada
                          </span>
                        )}
                      </div>

                      <button
                        className={`pa-card-btn pa-card-btn--${hecho ? "done" : "pending"}`}
                        disabled={hecho}
                        onClick={() =>
                          navigate(`/evaluacion/${tutor.id}`, {
                            state: { 
                              tutor, 
                              numControl: user?.id,
                              idGrupo: tutor.id_grupo 
                            },
                          })
                        }
                      >
                        {hecho ? "✓ Evaluación completada" : "Iniciar evaluación →"}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <footer className="pa-footer">
          <p>© 2026 · ITSSNP · Sistema de Evaluación Docente · TecNM</p>
          <p style={{ marginTop: '4px' }}>Instituto Tecnológico Superior de la Sierra Norte de Puebla</p>
        </footer>
      </div>
    </>
  )
}
