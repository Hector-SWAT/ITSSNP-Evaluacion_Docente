import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getPerfilAlumnoAPI, getEvaluacionesAlumnoAPI } from "../services/evaluacionData"

const ASSETS = {
  logoITSSNP: "https://i.postimg.cc/YhqbKr76/logo-itssnp.png",
  logoITSSNP2: "https://i.postimg.cc/Xp7QSjW9/logo-itssnp2.png",
  logoTECNM: "https://i.postimg.cc/ykYv41K5/logo-tecnm.png",
  logoTECNM2: "https://i.postimg.cc/QHx0G8Dz/logo-tecnm2.png",
  iconUser: "https://i.postimg.cc/hh0p5Jkx/icon-user.png",
  iconLock: "https://i.postimg.cc/kDyfpV0b/icon-lock.png",
  iconCalendar: "https://i.postimg.cc/9fZ7qW8y/icon-calendar.png",
  iconClock: "https://i.postimg.cc/0QxRfL3z/icon-clock.png"
}

const LOADING_ASSETS = {
  logoITSSNP: "https://i.postimg.cc/k62JgqyJ/Logo-ITSSNP.jpg",
  logoITSSNPCompleto: "https://i.postimg.cc/9RDmQCBC/Logo-ITSSNP-Completo.jpg",
  logoTecNM: "https://i.postimg.cc/2b1kSrxm/Logo-Completo-TECNACIONAL.png",
  logoUltimate: "https://i.ibb.co/1YqB1k5W/logo-ultimate.png"
}

export default function PanelAlumno() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [perfil, setPerfil] = useState(null)
  const [evaluaciones, setEvaluaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [refresc, setRefresc] = useState(0)
  const [logoITSSNPFail, setLogoITSSNPFail] = useState(false)
  const [logoTECNMFail, setLogoTECNMFail] = useState(false)

  const yaEvaluado = (idDocente) =>
    evaluaciones.some(e => e.idTutor === idDocente && e.completada === true)

  const estaDisponible = (fechaInicio, fechaFin) => {
    if (!fechaInicio || !fechaFin) return false
    const ahora = new Date()
    return ahora >= new Date(fechaInicio) && ahora <= new Date(fechaFin)
  }

  const formatearFecha = (fecha) => {
    if (!fecha) return ""
    return new Date(fecha).toLocaleDateString('es-MX', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  useEffect(() => {
    if (!user) return
    const cargarDatos = async () => {
      setLoading(true)
      try {
        const datosPerfil = await getPerfilAlumnoAPI()
        setPerfil(datosPerfil)
        const datosEval = await getEvaluacionesAlumnoAPI()
        setEvaluaciones(datosEval.evaluaciones || [])
      } catch (error) {
        console.error("❌ Error cargando datos:", error)
      } finally {
        setLoading(false)
      }
    }
    cargarDatos()
  }, [user, refresc])

  useEffect(() => {
    const fn = () => setRefresc(r => r + 1)
    window.addEventListener("focus", fn)
    return () => window.removeEventListener("focus", fn)
  }, [])

  const tutor = perfil?.tutor || null
  const configuracion = perfil?.configuracion || {}
  const periodo = perfil?.periodo || ""
  const tutorCompletado = tutor ? yaEvaluado(tutor.id) : false
  const tutorDisponible = tutor ? estaDisponible(configuracion.fechaInicioTutor, configuracion.fechaFinTutor) : false
  const hayEvaluacionesActivas = configuracion.tutorActivo && tutor && tutorDisponible

  /* ──────────────── PANTALLA DE CARGA ──────────────── */
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0b1f4a 0%, #1648b8 55%, #0b7ec9 100%)',
        position: 'relative'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'white',
          padding: '44px 52px',
          borderRadius: '28px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
          maxWidth: '520px',
          width: '90%'
        }}>

          {/* ── Logos superiores ── */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <img
              src={LOADING_ASSETS.logoITSSNP}
              alt="ITSSNP"
              style={{ height: '70px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div style={{ width: '1px', height: '56px', background: '#e2e8f0', flexShrink: 0 }} />
            <img
              src={LOADING_ASSETS.logoTecNM}
              alt="TecNM"
              style={{ height: '70px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>

          {/* ── Separador ── */}
          <div style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #e2e8f0, transparent)',
            marginBottom: '20px'
          }} />

          {/* ── Logo grande ── */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '22px'
          }}>
            <img
              src={LOADING_ASSETS.logoITSSNPCompleto}
              alt="ITSSNP Completo"
              style={{
                width: '160px',
                height: '160px',
                objectFit: 'contain'
              }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>

          {/* ── Texto institucional ── */}
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{
              color: '#0b1f4a',
              marginBottom: '6px',
              fontSize: '17px',
              fontWeight: 700
            }}>
              Tecnológico Nacional de México
            </h2>
            <h3 style={{
              color: '#1648b8',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 1.4
            }}>
              Instituto Tecnológico Superior de la Sierra Norte de Puebla
            </h3>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '14px' }}>
              Departamento de Desarrollo Académico
            </p>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #0b1f4a, #2563eb)',
              color: 'white',
              padding: '7px 22px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.3px'
            }}>
              Sistema de Evaluación de Tutorías
            </div>
          </div>

          {/* ── Spinner ── */}
          <div style={{
            width: '44px',
            height: '44px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 14px'
          }} />
          <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
            Cargando tu información...
          </p>
        </div>

        {/* ── Logo creador ── */}
        <div style={{
          position: 'fixed',
          bottom: '15px',
          right: '15px',
          opacity: 0.6,
          transition: 'opacity 0.3s ease',
          zIndex: 1000
        }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
        >
          <img
            src={LOADING_ASSETS.logoUltimate}
            alt="Creador"
            style={{ height: '38px', width: 'auto' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>

        <style>{`
          @keyframes spin {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  /* ──────────────── PANEL PRINCIPAL ──────────────── */
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
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .pa-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100dvh;
          background: #f8fafc;
          display: flex; flex-direction: column;
        }

        /* NAV */
        .pa-nav {
          background: linear-gradient(135deg, #0b1f4a 0%, #1648b8 55%, #0b7ec9 100%);
          height: 80px;
          padding: 0 clamp(16px,4vw,48px);
          display: flex; align-items: center; justify-content: space-between;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          position: sticky; top: 0; z-index: 10;
        }
        .pa-nav-brand { display:flex; align-items:center; gap:24px; }
        .pa-nav-logos { display:flex; align-items:center; gap:20px; }
        .pa-nav-logo {
          height: 50px; width: auto; object-fit: contain;
          filter: brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.2));
          transition: transform 0.2s ease;
        }
        .pa-nav-logo:hover { transform: scale(1.05); }
        .pa-nav-divider {
          width: 2px; height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent);
        }
        .pa-nav-title {
          font-size: 16px; font-weight: 600;
          color: rgba(255,255,255,0.95); letter-spacing: 0.3px;
          border-left: 2px solid rgba(255,255,255,0.3); padding-left: 20px;
        }
        .pa-nav-user-section { display:flex; align-items:center; gap:16px; }
        .pa-nav-user-info {
          display:flex; align-items:center; gap:10px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 30px; padding: 8px 20px 8px 16px;
        }
        .pa-nav-user-icon { width:18px; height:18px; opacity:0.8; filter:brightness(0) invert(1); }
        .pa-nav-user-name { font-size:14px; font-weight:500; color:#fff; }
        .pa-btn-logout {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 30px; padding: 8px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600; color: #fff;
          cursor: pointer; transition: all 0.2s;
        }
        .pa-btn-logout:hover { background: rgba(255,255,255,0.24); transform: translateY(-1px); }

        /* BODY */
        .pa-body {
          flex: 1;
          padding: clamp(24px,4vw,48px) clamp(16px,4vw,48px);
          max-width: 1200px; width: 100%; margin: 0 auto;
          display: flex; flex-direction: column; gap: 24px;
        }

        /* HERO */
        .pa-hero {
          background: linear-gradient(135deg, #0b1f4a 0%, #1648b8 55%, #0b7ec9 100%);
          border-radius: 24px; padding: 32px 36px;
          position: relative; overflow: hidden;
          animation: fadeUp 0.45s ease both;
          box-shadow: 0 20px 40px rgba(11,31,74,0.25);
        }
        .pa-hero::before {
          content:''; position:absolute; inset:0;
          background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events:none;
        }
        .pa-hero-content {
          position:relative; z-index:1;
          display:flex; justify-content:space-between; align-items:flex-start;
          flex-wrap:wrap; gap:24px;
        }
        .pa-hero-info h1 {
          font-size: clamp(24px,3vw,32px); font-weight:800;
          color:#fff; line-height:1.2; margin-bottom:12px;
        }
        .pa-hero-badges { display:flex; flex-wrap:wrap; gap:10px; }
        .pa-hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius:30px; padding:8px 18px;
          font-size:13px; font-weight:500; color:rgba(255,255,255,0.95);
        }
        .pa-hero-stats {
          background: rgba(255,255,255,0.10);
          border: 1.5px solid rgba(255,255,255,0.20);
          border-radius:18px; padding:20px 28px; text-align:center;
        }
        .pa-stats-number { font-size:36px; font-weight:800; color:#fff; line-height:1; }
        .pa-stats-label {
          font-size:12px; color:rgba(255,255,255,0.65);
          text-transform:uppercase; letter-spacing:0.5px; margin-top:6px;
        }
        .pa-stats-divider { font-size:24px; color:rgba(255,255,255,0.3); margin:0 4px; }

        .pa-progress { margin-top:24px; }
        .pa-progress-header {
          display:flex; justify-content:space-between; margin-bottom:8px;
          font-size:13px; color:rgba(255,255,255,0.8);
        }
        .pa-progress-track {
          background:rgba(255,255,255,0.2); border-radius:10px; height:8px; overflow:hidden;
        }
        .pa-progress-fill {
          background:#4ade80; border-radius:10px; height:100%; transition:width 0.5s ease;
        }

        /* SECTION */
        .pa-section {
          background:#fff; border-radius:24px;
          border:1.5px solid #e2e8f0; overflow:hidden;
          animation:fadeUp 0.4s ease both;
        }
        .pa-section-header {
          padding:20px 24px; background:#f8fafc;
          border-bottom:1.5px solid #e2e8f0;
          display:flex; justify-content:space-between; align-items:center;
          flex-wrap:wrap; gap:12px;
        }
        .pa-section-header h2 {
          font-size:18px; font-weight:700; color:#0f172a;
          display:flex; align-items:center; gap:8px;
        }
        .pa-fechas {
          font-size:12px; color:#64748b; background:#f1f5f9;
          padding:6px 12px; border-radius:8px;
          display:flex; align-items:center; gap:8px;
        }
        .pa-fechas img { width:14px; height:14px; opacity:0.6; }
        .pa-section-content { padding:24px; }

        /* CARDS */
        .pa-card {
          background:#fff; border:1.5px solid #e2e8f0;
          border-radius:20px; padding:20px; transition:all 0.2s ease;
        }
        .pa-card:hover:not(.pa-card-disabled) {
          border-color:#2563eb;
          box-shadow:0 8px 24px rgba(37,99,235,0.12);
          transform:translateY(-2px);
        }
        .pa-card-disabled { opacity:0.7; background:#f8fafc; }
        .pa-card-completada { background:#f0fdf4; border-color:#86efac; }
        .pa-card-tutor {
          background: linear-gradient(135deg, #fef3c7, #fffbeb);
          border: 1.5px solid #fcd34d;
        }
        .pa-card-tutor .pa-avatar {
          background: linear-gradient(135deg, #fed7aa, #fdba74);
          color: #b45309;
        }
        .pa-card-header { display:flex; align-items:flex-start; gap:16px; margin-bottom:16px; }
        .pa-avatar {
          width:56px; height:56px; border-radius:16px;
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          display:flex; align-items:center; justify-content:center;
          font-size:20px; font-weight:700; color:#1e40af; flex-shrink:0;
        }
        .pa-card-completada .pa-avatar {
          background: linear-gradient(135deg, #dcfce7, #bbf7d0); color:#166534;
        }
        .pa-card-info { flex:1; min-width:0; }
        .pa-card-name { font-size:16px; font-weight:700; color:#0f172a; margin-bottom:4px; }
        .pa-card-materia { font-size:13px; color:#64748b; margin-bottom:8px; }
        .pa-card-grupo {
          font-size:12px; font-weight:600; color:#7c3aed;
          background:#f5f3ff; display:inline-block; padding:2px 8px; border-radius:6px;
        }

        /* BADGES */
        .pa-badge {
          display:inline-flex; align-items:center; gap:6px;
          padding:4px 10px; border-radius:20px; font-size:11px; font-weight:700;
        }
        .pa-badge-success  { background:#dcfce7; color:#166534; }
        .pa-badge-warning  { background:#fef3c7; color:#b45309; }
        .pa-badge-info     { background:#dbeafe; color:#1e40af; }
        .pa-badge-disabled { background:#f1f5f9; color:#94a3b8; }

        /* BUTTONS */
        .pa-btn {
          width:100%; margin-top:16px; padding:12px; border:none;
          border-radius:12px; font-family:'DM Sans',sans-serif;
          font-size:14px; font-weight:700; cursor:pointer; transition:all 0.2s;
          display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .pa-btn-primary { background:linear-gradient(135deg,#1648b8,#2563eb); color:#fff; }
        .pa-btn-primary:hover { opacity:0.95; transform:translateY(-1px); }
        .pa-btn-disabled { background:#e2e8f0; color:#94a3b8; cursor:not-allowed; }

        /* EMPTY */
        .pa-empty { text-align:center; padding:48px; color:#94a3b8; }
        .pa-empty-icon { font-size:48px; margin-bottom:16px; }

        /* FOOTER */
        .pa-footer {
          background:#0f172a; color:#e2e8f0; text-align:center;
          padding:16px 10px; font-family:'Segoe UI',sans-serif;
          border-top:1px solid rgba(255,255,255,0.1);
        }
        .footer-main { font-size:14px; font-weight:600; letter-spacing:0.5px; }
        .footer-sub  { font-size:13px; color:#38bdf8; margin-top:4px; font-weight:500; }
        .footer-desc { font-size:12px; margin-top:6px; opacity:0.7; }

        /* RESPONSIVE */
        @media (max-width:700px) {
          .pa-nav { height:auto; padding:16px; flex-direction:column; gap:12px; }
          .pa-nav-brand { width:100%; justify-content:center; }
          .pa-nav-user-section { width:100%; justify-content:center; flex-wrap:wrap; }
          .pa-hero-content { flex-direction:column; align-items:stretch; }
          .pa-section-header { flex-direction:column; align-items:flex-start; }
        }
      `}</style>

      <div className="pa-root">

        {/* ── Navbar ── */}
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
            <span className="pa-nav-title">SICOT · Evaluación de Tutorías</span>
          </div>
          <div className="pa-nav-user-section">
            <div className="pa-nav-user-info">
              <img src={ASSETS.iconUser} alt="" className="pa-nav-user-icon" />
              <span className="pa-nav-user-name">{user?.nombre || 'Usuario'}</span>
            </div>
            <button className="pa-btn-logout" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </nav>

        <div className="pa-body">

          {/* ── Hero ── */}
          <div className="pa-hero">
            <div className="pa-hero-content">
              <div className="pa-hero-info">
                <h1>Evaluación de Tutorías</h1>
                <div className="pa-hero-badges">
                  <span className="pa-hero-badge">
                    <img src={ASSETS.iconUser} alt="" style={{ width:'14px', height:'14px', filter:'brightness(0) invert(1)' }} />
                    No. Control: <strong>{user?.id}</strong>
                  </span>
                  {perfil && (
                    <>
                      <span className="pa-hero-badge">
                        <span>📚</span> {perfil.siglas} · Semestre {perfil.semestre}
                      </span>
                      <span className="pa-hero-badge">
                        Periodo: <strong>{periodo}</strong>
                      </span>
                    </>
                  )}
                </div>
                {perfil && (
                  <p style={{ color:'rgba(255,255,255,0.65)', marginTop:'12px', fontSize:'14px' }}>
                    {perfil.carrera}
                  </p>
                )}
              </div>
              <div className="pa-hero-stats">
                <div>
                  <span className="pa-stats-number">{tutorCompletado ? 1 : 0}</span>
                  <span className="pa-stats-divider">/</span>
                  <span className="pa-stats-number" style={{ opacity:0.5 }}>1</span>
                </div>
                <div className="pa-stats-label">Tutor evaluado</div>
              </div>
            </div>
            <div className="pa-progress">
              <div className="pa-progress-header">
                <span>Progreso general</span>
                <span>{tutorCompletado ? 100 : 0}%</span>
              </div>
              <div className="pa-progress-track">
                <div className="pa-progress-fill" style={{ width:`${tutorCompletado ? 100 : 0}%` }} />
              </div>
            </div>
          </div>

          {/* ── Sin evaluaciones activas ── */}
          {!hayEvaluacionesActivas && (
            <div className="pa-empty" style={{ background:'#fff', borderRadius:20, border:'2px dashed #cbd5e1' }}>
              <div className="pa-empty-icon">📅</div>
              <p>No hay evaluaciones activas en este momento.</p>
              <p style={{ fontSize:13, marginTop:8, color:'#94a3b8' }}>
                Las evaluaciones estarán disponibles durante el periodo establecido por la administración.
              </p>
            </div>
          )}

          {/* ── Sección Tutor ── */}
          {configuracion.tutorActivo && tutor && (
            <div className="pa-section">
              <div className="pa-section-header">
                <h2>👨‍🏫 Tu Tutor Académico</h2>
                <div className="pa-fechas">
                  <img src={ASSETS.iconCalendar} alt="" />
                  {formatearFecha(configuracion.fechaInicioTutor)} - {formatearFecha(configuracion.fechaFinTutor)}
                </div>
              </div>
              <div className="pa-section-content">
                <div className={`pa-card pa-card-tutor ${tutorCompletado ? "pa-card-completada" : ""} ${!tutorDisponible ? "pa-card-disabled" : ""}`}>
                  <div className="pa-card-header">
                    <div className="pa-avatar">{tutor.nombre.charAt(0)}</div>
                    <div className="pa-card-info">
                      <div className="pa-card-name">{tutor.nombre}</div>
                      <div className="pa-card-materia">{tutor.materia || 'Tutoría Académica'}</div>
                      <span className="pa-card-grupo">Grupo {tutor.grupo}</span>
                    </div>
                  </div>

                  <div style={{ marginTop:12 }}>
                    {tutorCompletado ? (
                      <span className="pa-badge pa-badge-success">✓ Evaluación completada</span>
                    ) : !tutorDisponible ? (
                      <span className="pa-badge pa-badge-warning">⏰ Periodo de evaluación cerrado</span>
                    ) : (
                      <span className="pa-badge pa-badge-info">⏳ Pendiente de evaluar</span>
                    )}
                  </div>

                  {!tutorCompletado && tutorDisponible && (
                    <button
                      className="pa-btn pa-btn-primary"
                      onClick={() => navigate(`/evaluacion/${tutor.id}`, {
                        state: { tutor, numControl: user?.id, idGrupo: tutor.id_grupo, tipo: "tutor" }
                      })}
                    >
                      Evaluar Tutor →
                    </button>
                  )}
                  {tutorCompletado && (
                    <button className="pa-btn pa-btn-disabled" disabled>
                      ✓ Evaluación ya realizada
                    </button>
                  )}
                  {!tutorDisponible && !tutorCompletado && (
                    <button className="pa-btn pa-btn-disabled" disabled>
                      📅 Evaluación no disponible
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <footer className="pa-footer">
          <div className="footer-content">
            <p className="footer-main">© 2026 · ITSSNP · Sistema de Evaluación de Tutorías</p>
            <p className="footer-sub">Tecnológico Nacional de México · SWAT_CORPS</p>
            <p className="footer-desc">
              Instituto Tecnológico Superior de la Sierra Norte de Puebla ·
              Departamento de Desarrollo Académico
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}
