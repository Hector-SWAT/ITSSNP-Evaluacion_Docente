/**
 * Comentario.jsx — Formulario de comentarios OBLIGATORIOS
 * 
 * Cambios:
 * - Comentarios OBLIGATORIOS (mínimo 10 caracteres)
 * - Sin botón "Saltar comentario"
 * - Solo botón "Finalizar evaluación"
 * - Validación en tiempo real
 */

import { useState } from "react"

export default function Comentario({
  tutor,
  onEnviar,
  cargando = false,
  error = null,
}) {
  const [comentario, setComentario] = useState("")
  const [haMostrado, setHaMostrado] = useState(false)

  const caracteres = comentario.length
  const maximo = 1000
  const minimo = 10
  const porcentaje = (caracteres / maximo) * 100
  const esValido = caracteres >= minimo && caracteres <= maximo

  // Mostrar animación solo la primera vez
  if (!haMostrado) {
    setHaMostrado(true)
  }

  const handleEnviar = () => {
    if (esValido) {
      onEnviar(comentario)
    }
  }

  const inicial = tutor.nombre
    .replace(/^(Dr\.|Dra\.|M\.C\.|Ing\.|Mtra?\.|Lic\.)?\s*/i, "")
    .trim()[0] ?? "T"

  return (
    <>
      <style>{`
        @keyframes _fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes _pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .com-container {
          animation: _fadeInUp 0.4s ease both;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .com-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 1.5px solid #bae6fd;
          border-radius: 16px;
        }

        .com-av {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #dbeafe, #7dd3fc);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 800;
          color: #0369a1;
          flex-shrink: 0;
        }

        .com-info h3 {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .com-info p {
          font-size: 13px;
          color: #64748b;
          margin: 4px 0 0 0;
        }

        .com-card {
          background: #fff;
          border: 1.5px solid #e8edf5;
          border-radius: 16px;
          padding: clamp(20px, 4vw, 28px);
          box-shadow: 0 4px 28px rgba(30, 64, 175, 0.07);
        }

        .com-label {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
          display: block;
        }

        .com-label-sub {
          font-size: 12px;
          font-weight: 500;
          color: #ef4444;
          margin-top: 2px;
        }

        .com-textarea-wrapper {
          position: relative;
          margin-bottom: 12px;
        }

        .com-textarea {
          width: 100%;
          min-height: 160px;
          padding: 14px 16px;
          border: 2px solid #e8edf5;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #0f172a;
          resize: vertical;
          max-height: 280px;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fafbff;
        }

        .com-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          background: #fff;
        }

        .com-textarea::placeholder {
          color: #cbd5e1;
        }

        .com-textarea:disabled {
          background: #f1f5f9;
          color: #94a3b8;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .com-counter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .com-counter-text {
          font-size: 12px;
          font-weight: 500;
          color: #64748b;
        }

        .com-counter-text.warning {
          color: #c2410c;
          font-weight: 600;
        }

        .com-counter-text.error {
          color: #b91c1c;
          font-weight: 600;
        }

        .com-counter-bar {
          flex: 1;
          height: 4px;
          background: #e8edf5;
          border-radius: 2px;
          overflow: hidden;
        }

        .com-counter-fill {
          height: 100%;
          background: linear-gradient(90deg, #16a34a, #86efac);
          border-radius: 2px;
          transition: background 0.3s, width 0.3s;
        }

        .com-counter-fill.warning {
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
        }

        .com-counter-fill.error {
          background: linear-gradient(90deg, #ef4444, #fca5a5);
        }

        .com-hints {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          border-radius: 10px;
          padding: 12px 14px;
          margin-bottom: 16px;
          font-size: 13px;
          color: #b91c1c;
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }

        .com-hints.valid {
          background: #f0fdf4;
          border-color: #86efac;
          color: #15803d;
        }

        .com-hints-icon {
          font-size: 16px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .com-hints-text {
          flex: 1;
          line-height: 1.4;
        }

        .com-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .com-btn {
          flex: 1;
          min-width: 140px;
          padding: 13px 20px;
          border: none;
          border-radius: 10px;
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

        .com-btn-primary {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: #fff;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .com-btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }

        .com-btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .com-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .com-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: _spin 0.7s linear infinite;
        }

        .com-error-box {
          background: #fef2f2;
          border: 1.5px solid #fca5a5;
          border-radius: 12px;
          padding: 12px 14px;
          color: #b91c1c;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          gap: 8px;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .com-error-icon {
          font-size: 16px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .com-required {
          color: #ef4444;
          font-weight: 700;
        }

        .com-note {
          margin-top: 16px;
          padding: 12px;
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 8px;
          font-size: 12px;
          color: #0369a1;
          font-weight: 500;
          line-height: 1.6;
        }

        @keyframes _spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .com-card {
            padding: 16px 14px;
          }

          .com-textarea {
            min-height: 140px;
          }

          .com-actions {
            flex-direction: column;
          }

          .com-btn {
            min-width: auto;
          }
        }
      `}</style>

      <div className="com-container">
        {/* Encabezado con tutor */}
        <div className="com-header">
          <div className="com-av">{inicial}</div>
          <div className="com-info">
            <h3>¡Última etapa de la evaluación!</h3>
            <p>Tu comentario es muy importante para {tutor.nombre}</p>
          </div>
        </div>

        {/* Card de comentario */}
        <div className="com-card">
          <label className="com-label">
            Comentarios sobre el docente
            <span className="com-label-sub">
              <span className="com-required">* Obligatorio</span> — Mínimo 10 caracteres
            </span>
          </label>

          {/* Textarea */}
          <div className="com-textarea-wrapper">
            <textarea
              className="com-textarea"
              placeholder="Comparte tu experiencia, sugerencias o comentarios constructivos sobre cómo fue tu clase con este docente. Sé respetuoso y detallado..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              disabled={cargando}
              maxLength={maximo}
            />
          </div>

          {/* Contador */}
          <div className="com-counter">
            <span
              className={`com-counter-text ${
                caracteres > maximo * 0.9
                  ? "error"
                  : caracteres > maximo * 0.7
                  ? "warning"
                  : ""
              }`}
            >
              {caracteres} / {maximo} caracteres
            </span>
            <div className="com-counter-bar">
              <div
                className={`com-counter-fill ${
                  caracteres > maximo * 0.9
                    ? "error"
                    : caracteres > maximo * 0.7
                    ? "warning"
                    : ""
                }`}
                style={{ width: `${Math.min(porcentaje, 100)}%` }}
              />
            </div>
          </div>

          {/* Errores */}
          {error && (
            <div className="com-error-box">
              <span className="com-error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Hints dinámicos */}
          {comentario.length === 0 && (
            <div className="com-hints">
              <span className="com-hints-icon">✏️</span>
              <span className="com-hints-text">
                Este campo es <span style={{ fontWeight: 700 }}>obligatorio</span>. 
                Por favor escribe tus comentarios sobre el docente evaluado.
              </span>
            </div>
          )}

          {comentario.length > 0 && comentario.length < minimo && (
            <div className="com-hints">
              <span className="com-hints-icon">⚠️</span>
              <span className="com-hints-text">
                Necesitas al menos {minimo} caracteres. 
                Faltan {minimo - comentario.length} caracteres.
              </span>
            </div>
          )}

          {esValido && (
            <div className="com-hints valid">
              <span className="com-hints-icon">✅</span>
              <span className="com-hints-text">
                Tu comentario está listo para ser enviado.
              </span>
            </div>
          )}

          {caracteres > maximo * 0.9 && (
            <div className="com-hints">
              <span className="com-hints-icon">⚠️</span>
              <span className="com-hints-text">
                Estás cerca del límite de caracteres ({maximo} máximo).
              </span>
            </div>
          )}

          {/* Botón único: Finalizar */}
          <div className="com-actions">
            <button
              className="com-btn com-btn-primary"
              onClick={handleEnviar}
              disabled={!esValido || cargando}
              title={!esValido ? "Completa el comentario para continuar" : ""}
            >
              {cargando ? (
                <>
                  <div className="com-spinner" />
                  Finalizando...
                </>
              ) : (
                <>
                  ✓ Finalizar Evaluación
                </>
              )}
            </button>
          </div>

          {/* Nota adicional */}
          <div className="com-note">
            📌 Al finalizar, tu evaluación se completará y serás redirigido a tu panel de control 
            donde podrás evaluar a otros docentes.
          </div>
        </div>
      </div>
    </>
  )
}
