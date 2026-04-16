/**
 * Gracias.jsx — Pantalla de agradecimiento después de evaluar
 * 
 * Muestra:
 * - Nombre del alumno
 * - Carrera
 * - Fecha de evaluación
 * - Botón para continuar con evaluaciones faltantes
 */

import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"

export default function Gracias() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  
  const [alumnoInfo, setAlumnoInfo] = useState({
    nombre: user?.nombre || "Alumno",
    carrera: location.state?.carrera || "Carrera",
    fecha: new Date().toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  })

  const tutor = location.state?.tutor ?? { nombre: "Tutor(a)" }
  const totalPreguntas = location.state?.totalPreguntas ?? 0

  const handleContinuar = () => {
    navigate("/panel-alumno", { replace: true })
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body, #root {
          height: 100%;
        }

        @keyframes _fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes _slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes _bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .gracias-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100dvh;
          background: linear-gradient(135deg, #0d2660 0%, #1648b8 55%, #0b7ec9 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(20px, 5vw, 40px);
        }

        .gracias-container {
          max-width: 600px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 28px;
          animation: _fadeIn 0.6s ease both;
        }

        .gracias-header {
          text-align: center;
          color: #fff;
        }

        .gracias-icon {
          font-size: 80px;
          margin-bottom: 16px;
          animation: _bounce 2s ease-in-out infinite;
          display: inline-block;
        }

        .gracias-title {
          font-size: clamp(28px, 6vw, 42px);
          font-weight: 800;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }

        .gracias-subtitle {
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
        }

        .gracias-card {
          background: #fff;
          border-radius: 20px;
          padding: clamp(24px, 5vw, 36px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: _slideUp 0.7s ease both;
          animation-delay: 0.1s;
        }

        .gracias-message {
          margin-bottom: 24px;
        }

        .gracias-message-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .gracias-message-text {
          font-size: 15px;
          font-weight: 400;
          color: #475569;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .gracias-info {
          background: #f0f9ff;
          border-left: 4px solid #0369a1;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .gracias-info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }

        .gracias-info-item:last-child {
          margin-bottom: 0;
        }

        .gracias-info-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #0369a1;
          letter-spacing: 0.5px;
        }

        .gracias-info-value {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
        }

        .gracias-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 20px 0;
        }

        .gracias-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 20px 0;
        }

        .gracias-stat {
          background: #f8fafc;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          border: 1px solid #e2e8f0;
        }

        .gracias-stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #0369a1;
          margin-bottom: 4px;
        }

        .gracias-stat-label {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .gracias-cta {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .gracias-btn {
          padding: 14px 24px;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .gracias-btn-primary {
          background: linear-gradient(135deg, #0369a1 0%, #0284c7 100%);
          color: #fff;
          box-shadow: 0 8px 24px rgba(3, 105, 161, 0.3);
        }

        .gracias-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(3, 105, 161, 0.4);
        }

        .gracias-btn-primary:active {
          transform: translateY(0);
        }

        .gracias-btn-secondary {
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #cbd5e1;
        }

        .gracias-btn-secondary:hover {
          background: #e2e8f0;
        }

        .gracias-btn-icon {
          font-size: 18px;
        }

        .gracias-footer {
          text-align: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .gracias-footer-text {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
        }

        .gracias-footer-highlight {
          color: #0369a1;
          font-weight: 600;
        }

        @media (max-width: 480px) {
          .gracias-icon {
            font-size: 60px;
          }

          .gracias-title {
            font-size: 28px;
          }

          .gracias-subtitle {
            font-size: 14px;
          }

          .gracias-stats {
            grid-template-columns: 1fr;
          }

          .gracias-message-text {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="gracias-root">
        <div className="gracias-container">
          {/* Encabezado */}
          <div className="gracias-header">
            <div className="gracias-icon">✅</div>
            <h1 className="gracias-title">¡Evaluación Completada!</h1>
            <p className="gracias-subtitle">
              Gracias por tu tiempo y retroalimentación<br />
              Tu opinión es valiosa para mejorar la calidad educativa
            </p>
          </div>

          {/* Tarjeta principal */}
          <div className="gracias-card">
            {/* Mensaje personalizado */}
            <div className="gracias-message">
              <h2 className="gracias-message-title">
                ¡Agradecemos tu participación!
              </h2>
              <p className="gracias-message-text">
                Hola <span style={{ fontWeight: 700, color: '#0f172a' }}>{alumnoInfo.nombre}</span>,
                hemos recibido tu evaluación del <span style={{ fontWeight: 700, color: '#0f172a' }}>tutor(a) {tutor.nombre}</span>.
                Tu retroalimentación contribuye significativamente a nuestro proceso de mejora continua.
              </p>
            </div>

            {/* Información del alumno */}
            <div className="gracias-info">
              <div className="gracias-info-item">
                <span className="gracias-info-label">👤 Nombre del Alumno</span>
                <span className="gracias-info-value">{alumnoInfo.nombre}</span>
              </div>
              <div className="gracias-info-item">
                <span className="gracias-info-label">🎓 Carrera</span>
                <span className="gracias-info-value">{alumnoInfo.carrera}</span>
              </div>
              <div className="gracias-info-item">
                <span className="gracias-info-label">📅 Fecha de Evaluación</span>
                <span className="gracias-info-value">{alumnoInfo.fecha}</span>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="gracias-stats">
              <div className="gracias-stat">
                <div className="gracias-stat-value">{totalPreguntas}</div>
                <div className="gracias-stat-label">Preguntas respondidas</div>
              </div>
              <div className="gracias-stat">
                <div className="gracias-stat-value">100%</div>
                <div className="gracias-stat-label">Evaluación completada</div>
              </div>
            </div>

            <div className="gracias-divider" />

            {/* Botones de acción */}
            <div className="gracias-cta">
              <button
                className="gracias-btn gracias-btn-primary"
                onClick={handleContinuar}
              >
                <span className="gracias-btn-icon">→</span>
                Continuar con evaluaciones faltantes
              </button>
            </div>

            {/* Pie */}
            <div className="gracias-footer">
              <p className="gracias-footer-text">
                Si aún tienes <span className="gracias-footer-highlight">tutores(as) por evaluar</span>,
                serás redirigido a tu panel de control donde podrás continuar con las evaluaciones pendientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
