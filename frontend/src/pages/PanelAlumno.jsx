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
  iconCalendar: "https://i.postimg.cc/9fZ7qW8y/icon-calendar.png",
  iconClock: "https://i.postimg.cc/0QxRfL3z/icon-clock.png"
}

export default function PanelAlumno() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [perfil, setPerfil] = useState(null)
  const [evaluaciones, setEvaluaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [refresc, setRefresc] = useState(0)
  const [activeTab, setActiveTab] = useState("docentes") // "tutor" o "docentes"

  // Fallbacks para assets
  const [logoITSSNPFail, setLogoITSSNPFail] = useState(false)
  const [logoTECNMFail, setLogoTECNMFail] = useState(false)

  // Verificar si una evaluación ya fue completada
  const yaEvaluado = (idDocente) => {
    return evaluaciones.some(e => e.idTutor === idDocente && e.completada === true)
  }

  // Verificar si la evaluación está disponible según fechas
  const estaDisponible = (fechaInicio, fechaFin) => {
    if (!fechaInicio || !fechaFin) return false
    const ahora = new Date()
    const inicio = new Date(fechaInicio)
    const fin = new Date(fechaFin)
    return ahora >= inicio && ahora <= fin
  }

  // Formatear fecha para mostrar
  const formatearFecha = (fecha) => {
    if (!fecha) return ""
    return new Date(fecha).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  /* Carga perfil del alumno desde la API */
  useEffect(() => {
    if (!user) return

    const cargarDatos = async () => {
      setLoading(true)
      try {
        console.log("🔍 Cargando perfil del alumno...")
        const datosPerfil = await getPerfilAlumnoAPI()
        setPerfil(datosPerfil)
        console.log("✅ Perfil cargado:", datosPerfil)

        const datosEval = await getEvaluacionesAlumnoAPI()
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

  // Obtener datos del perfil
  const tutor = perfil?.tutor || null
  const docentes = perfil?.docentes || []
  const configuracion = perfil?.configuracion || {}
  const periodo = perfil?.periodo || ""

  // Contadores de evaluación
  const tutorCompletado = tutor ? yaEvaluado(tutor.id) : false
  const docentesCompletados = docentes.filter(d => yaEvaluado(d.id)).length
  const totalDocentes = docentes.length
  const pctDocentes = totalDocentes === 0 ? 0 : Math.round((docentesCompletados / totalDocentes) * 100)

  // Verificar disponibilidad de fechas
  const tutorDisponible = tutor ? estaDisponible(configuracion.fechaInicioTutor, configuracion.fechaFinTutor) : false
  const docenteDisponible = estaDisponible(configuracion.fechaInicioDocente, configuracion.fechaFinDocente)

  // Determinar si hay evaluaciones activas
  const hayEvaluacionesActivas = (configuracion.tutorActivo && tutor && tutorDisponible) ||
    (configuracion.docenteActivo && docentes.length > 0 && docenteDisponible)

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
          <p style={{ fontSize: '16px', color: '#0f172a', fontWeight: 500 }}>Cargando tus evaluaciones...</p>
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

        .pa-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100dvh;
          background: #f8fafc;
          display: flex; flex-direction: column;
        }

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

        .pa-tabs {
          display: flex;
          gap: 12px;
          background: #fff;
          border-radius: 16px;
          padding: 8px;
          border: 1.5px solid #e2e8f0;
        }
        .pa-tab {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #64748b;
        }
        .pa-tab.active {
          background: linear-gradient(135deg, #1648b8, #2563eb);
          color: #fff;
          box-shadow: 0 4px 12px rgba(37,99,235,0.3);
        }
        .pa-tab:hover:not(.active) {
          background: #f1f5f9;
        }

        .pa-section {
          background: #fff;
          border-radius: 24px;
          border: 1.5px solid #e2e8f0;
          overflow: hidden;
          animation: fadeUp 0.4s ease both;
        }
        .pa-section-header {
          padding: 20px 24px;
          background: #f8fafc;
          border-bottom: 1.5px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .pa-section-header h2 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pa-fechas {
          font-size: 12px;
          color: #64748b;
          background: #f1f5f9;
          padding: 6px 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pa-fechas img {
          width: 14px;
          height: 14px;
          opacity: 0.6;
        }
        .pa-section-content {
          padding: 24px;
        }

        .pa-card-tutor {
          background: linear-gradient(135deg, #fef3c7, #fffbeb);
          border: 1.5px solid #fcd34d;
        }
        .pa-card-tutor .pa-avatar {
          background: linear-gradient(135deg, #fed7aa, #fdba74);
          color: #b45309;
        }

        .pa-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .pa-card {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 20px;
          padding: 20px;
          transition: all 0.2s ease;
        }
        .pa-card:hover:not(.pa-card-disabled) {
          border-color: #2563eb;
          box-shadow: 0 8px 24px rgba(37,99,235,0.12);
          transform: translateY(-2px);
        }
        .pa-card-disabled {
          opacity: 0.7;
          background: #f8fafc;
        }
        .pa-card-completada {
          background: #f0fdf4;
          border-color: #86efac;
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
        .pa-card-completada .pa-avatar {
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
        }
        .pa-card-materia {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 8px;
        }
        .pa-card-grupo {
          font-size: 12px;
          font-weight: 600;
          color: #7c3aed;
          background: #f5f3ff;
          display: inline-block;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .pa-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }
        .pa-badge-success {
          background: #dcfce7;
          color: #166534;
        }
        .pa-badge-warning {
          background: #fef3c7;
          color: #b45309;
        }
        .pa-badge-info {
          background: #dbeafe;
          color: #1e40af;
        }
        .pa-badge-disabled {
          background: #f1f5f9;
          color: #94a3b8;
        }

        .pa-btn {
          width: 100%;
          margin-top: 16px;
          padding: 12px;
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
        .pa-btn-primary {
          background: linear-gradient(135deg, #1648b8, #2563eb);
          color: #fff;
        }
        .pa-btn-primary:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }
        .pa-btn-disabled {
          background: #e2e8f0;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .pa-empty {
          text-align: center;
          padding: 48px;
          color: #94a3b8;
        }
        .pa-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .pa-footer {
          margin-top: 32px;
          padding: 24px 0;
          text-align: center;
          font-size: 12px;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
        }

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
          .pa-section-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .pa-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="pa-root">

        {/* Navbar */}
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
              <img src={ASSETS.iconUser} alt="" className="pa-nav-user-icon" />
              <span className="pa-nav-user-name">{user?.nombre || 'Usuario'}</span>
            </div>
            <button className="pa-btn-logout" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </nav>

        <div className="pa-body">

          {/* Hero con información del alumno */}
          <div className="pa-hero">
            <div className="pa-hero-content">
              <div className="pa-hero-info">
                <h1>Evaluación Docente</h1>
                <div className="pa-hero-badges">
                  <span className="pa-hero-badge">
                    <img src={ASSETS.iconUser} alt="" style={{ width: '14px', height: '14px', filter: 'brightness(0) invert(1)' }} />
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
                  <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: '12px', fontSize: '14px' }}>
                    {perfil.carrera}
                  </p>
                )}
              </div>
              <div className="pa-hero-stats">
                <div>
                  <span className="pa-stats-number">{tutorCompletado ? 1 : 0}</span>
                  <span className="pa-stats-divider">/</span>
                  <span className="pa-stats-number" style={{ opacity: 0.5 }}>1</span>
                </div>
                <div className="pa-stats-label">Tutor evaluado</div>
                <div style={{ marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 12 }}>
                  <div>
                    <span className="pa-stats-number">{docentesCompletados}</span>
                    <span className="pa-stats-divider">/</span>
                    <span className="pa-stats-number" style={{ opacity: 0.5 }}>{totalDocentes}</span>
                  </div>
                  <div className="pa-stats-label">Docentes evaluados</div>
                </div>
              </div>
            </div>

            {/* Barra de progreso general */}
            <div className="pa-progress" style={{ marginTop: 24 }}>
              <div className="pa-progress-header">
                <span>Progreso general</span>
                <span className="pa-progress-percent">
                  {totalDocentes === 0 ? 0 : Math.round(((tutorCompletado ? 1 : 0) + docentesCompletados) / (1 + totalDocentes) * 100)}%
                </span>
              </div>
              <div className="pa-progress-track">
                <div className="pa-progress-fill" style={{ width: `${((tutorCompletado ? 1 : 0) + docentesCompletados) / (1 + totalDocentes) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Mensaje si no hay evaluaciones activas */}
          {!hayEvaluacionesActivas && (
            <div className="pa-empty" style={{ background: '#fff', borderRadius: 20, border: '2px dashed #cbd5e1' }}>
              <div className="pa-empty-icon">📅</div>
              <p>No hay evaluaciones activas en este momento.</p>
              <p style={{ fontSize: 13, marginTop: 8, color: '#94a3b8' }}>
                Las evaluaciones estarán disponibles durante el periodo establecido por la administración.
              </p>
            </div>
          )}

          {/* Tabs para alternar entre Tutor y Docentes */}
          {hayEvaluacionesActivas && (
            <div className="pa-tabs">
              {configuracion.tutorActivo && tutor && (
                <button
                  className={`pa-tab ${activeTab === "tutor" ? "active" : ""}`}
                  onClick={() => setActiveTab("tutor")}
                >
                  👨‍🏫 Evaluación de Tutor
                </button>
              )}
              {configuracion.docenteActivo && docentes.length > 0 && (
                <button
                  className={`pa-tab ${activeTab === "docentes" ? "active" : ""}`}
                  onClick={() => setActiveTab("docentes")}
                >
                  📚 Evaluación de Docentes ({docentesCompletados}/{totalDocentes})
                </button>
              )}
            </div>
          )}

          {/* Sección de TUTOR */}
          {activeTab === "tutor" && configuracion.tutorActivo && tutor && (
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
                    <div className="pa-avatar">
                      {tutor.nombre.charAt(0)}
                    </div>
                    <div className="pa-card-info">
                      <div className="pa-card-name">{tutor.nombre}</div>
                      <div className="pa-card-materia">{tutor.materia || 'Tutoría Académica'}</div>
                      <span className="pa-card-grupo">Grupo {tutor.grupo}</span>
                    </div>
                  </div>

                  <div className="pa-badges" style={{ marginTop: 12 }}>
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
                      onClick={() =>
                        navigate(`/evaluacion/${tutor.id}`, {
                          state: {
                            tutor,
                            numControl: user?.id,
                            idGrupo: tutor.id_grupo,
                            tipo: "tutor"
                          }
                        })
                      }
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

          {/* Sección de DOCENTES */}
          {activeTab === "docentes" && configuracion.docenteActivo && docentes.length > 0 && (
            <div className="pa-section">
              <div className="pa-section-header">
                <h2>📚 Tus Docentes</h2>
                <div className="pa-fechas">
                  <img src={ASSETS.iconCalendar} alt="" />
                  {formatearFecha(configuracion.fechaInicioDocente)} - {formatearFecha(configuracion.fechaFinDocente)}
                </div>
              </div>
              <div className="pa-section-content">
                <div className="pa-grid">
                  {docentes.map((docente, i) => {
                    const completado = yaEvaluado(docente.id)
                    const disponible = docenteDisponible

                    return (
                      <div
                        key={docente.id}
                        className={`pa-card ${completado ? "pa-card-completada" : ""} ${!disponible ? "pa-card-disabled" : ""}`}
                        style={{ animationDelay: `${i * 0.05}s` }}
                      >
                        <div className="pa-card-header">
                          <div className="pa-avatar">
                            {docente.nombre.charAt(0)}
                          </div>
                          <div className="pa-card-info">
                            <div className="pa-card-name">{docente.nombre}</div>
                            <div className="pa-card-materia">{docente.materia}</div>
                            <span className="pa-card-grupo">Grupo {docente.grupo}</span>
                          </div>
                        </div>

                        <div className="pa-badges" style={{ marginTop: 12 }}>
                          {completado ? (
                            <span className="pa-badge pa-badge-success">✓ Evaluación completada</span>
                          ) : !disponible ? (
                            <span className="pa-badge pa-badge-warning">⏰ Periodo de evaluación cerrado</span>
                          ) : (
                            <span className="pa-badge pa-badge-info">⏳ Pendiente de evaluar</span>
                          )}
                        </div>

                        {!completado && disponible && (
                          <button
                            className="pa-btn pa-btn-primary"
                            onClick={() =>
                              navigate(`/evaluacion/${docente.id}`, {
                                state: {
                                  tutor: docente,
                                  numControl: user?.id,
                                  idGrupo: docente.id_grupo,
                                  tipo: "docente"
                                }
                              })
                            }
                          >
                            Evaluar Docente →
                          </button>
                        )}
                        {completado && (
                          <button className="pa-btn pa-btn-disabled" disabled>
                            ✓ Evaluación ya realizada
                          </button>
                        )}
                        {!disponible && !completado && (
                          <button className="pa-btn pa-btn-disabled" disabled>
                            📅 Evaluación no disponible
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Mensaje cuando no hay docentes */}
          {configuracion.docenteActivo && docentes.length === 0 && (
            <div className="pa-empty">
              <div className="pa-empty-icon">📚</div>
              <p>No tienes docentes asignados en este periodo.</p>
              <p style={{ fontSize: 13, marginTop: 8, color: '#94a3b8' }}>
                Esto puede deberse a que aún no tienes carga académica asignada.
              </p>
            </div>
          )}
        </div>

        <footer className="pa-footer">
          <p>© 2026 · ITSSNP · Sistema de Evaluación Docente · TecNM</p>
          <p style={{ marginTop: '4px' }}>Instituto Tecnológico Superior de la Sierra Norte de Puebla</p>
        </footer>
      </div>
    </>
  )
}