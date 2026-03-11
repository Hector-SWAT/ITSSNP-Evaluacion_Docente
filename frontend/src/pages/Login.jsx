import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

// ── Imágenes desde frontend/public/assets/ ──────────────────
const ASSETS = {
  logoITSSNP: "/assets/logo_itssnp2.png",
  logoTECNM:  "/assets/logo-tecnm.png",
  iconUser:   "/assets/icon-user.png",
  iconLock:   "/assets/icon-lock.png",
  iconEye:    "/assets/icon-eye.png",
  iconEyeOff: "/assets/icon-eye-off.png",
}

export default function Login() {
  const navigate  = useNavigate()
  const { login } = useAuth()

  const [usuario,     setUsuario]     = useState("")
  const [password,    setPassword]    = useState("")
  const [error,       setError]       = useState("")
  const [cargando,    setCargando]    = useState(false)
  const [verPassword, setVerPassword] = useState(false)

  // Fallbacks por si alguna imagen no carga
  const [logoITSSNPError, setLogoITSSNPError] = useState(false)
  const [logoTECNMError,  setLogoTECNMError]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!usuario.trim() || !password) {
      setError("Por favor completa todos los campos.")
      return
    }
    setError("")
    setCargando(true)
    try {
      const user = await login(usuario.trim(), password)
      navigate(user.tipo === "admin" ? "/dashboard" : "/panel-alumno", { replace: true })
    } catch (err) {
      setError(err.message || "Credenciales incorrectas. Intenta de nuevo.")
    } finally {
      setCargando(false)
    }
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
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shake {
          10%,90%{transform:translateX(-3px)}
          30%,70%{transform:translateX(-5px)}
          50%    {transform:translateX(5px)}
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .lp-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100dvh;
          display: grid;
          grid-template-columns: 55% 45%;
        }

        .lp-brand {
          background: linear-gradient(155deg, #0b1f4a 0%, #1648b8 60%, #0b7ec9 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 48px 40px; gap: 32px;
          position: relative; overflow: hidden;
        }
        .lp-brand::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 30% 70%, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .lp-logos {
          display: flex; align-items: center; gap: 32px;
          position: relative; z-index: 2;
        }
        .lp-logo-container {
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.95);
          border-radius: 16px;
          padding: 16px 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .lp-logo {
          height: 70px; width: auto; object-fit: contain;
          transition: transform 0.2s ease;
        }
        .lp-logo:hover { transform: scale(1.05); }
        .lp-divider {
          width: 2px; height: 50px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent);
        }

        .lp-brand-text { text-align: center; position: relative; z-index: 2; }
        .lp-inst {
          font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8);
          letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px;
        }
        .lp-title {
          font-size: clamp(24px, 3vw, 34px); font-weight: 800;
          color: #fff; line-height: 1.25;
        }
        .lp-title span { color: #7dd3fc; font-weight: 800; }

        .lp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 30px; padding: 8px 20px;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.95); margin-top: 16px;
        }

        .lp-form-side {
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          padding: 40px clamp(24px, 5vw, 64px);
        }
        .lp-card {
          width: 100%; max-width: 400px;
          animation: fadeUp 0.45s ease both;
        }
        .lp-card-title { font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
        .lp-card-sub   { font-size: 14px; color: #64748b; margin-bottom: 32px; line-height: 1.6; }

        .lp-field  { margin-bottom: 22px; }
        .lp-label  { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; }
        .lp-input-wrap { position: relative; }

        .lp-input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
        }
        .lp-input-icon img {
          width: 100%; height: 100%; object-fit: contain;
          opacity: 0.5; filter: brightness(0);
        }

        .lp-input {
          width: 100%; padding: 14px 16px 14px 48px;
          border: 1.5px solid #e2e8f0; border-radius: 14px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; color: #0f172a;
          background: #f8fafc; outline: none; transition: all 0.2s ease;
        }
        .lp-input:focus {
          border-color: #2563eb; background: #fff;
          box-shadow: 0 0 0 4px rgba(37,99,235,0.12);
        }
        .lp-input.with-padding { padding-right: 48px; }

        .lp-eye-btn {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          width: 24px; height: 24px; padding: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0.5; transition: opacity 0.15s;
        }
        .lp-eye-btn:hover { opacity: 0.9; }
        .lp-eye-btn img { width: 100%; height: 100%; object-fit: contain; filter: brightness(0); }

        .lp-error {
          display: flex; align-items: center; gap: 10px;
          background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px;
          padding: 14px 16px; margin-bottom: 24px;
          font-size: 14px; font-weight: 500; color: #dc2626;
          animation: shake 0.4s ease;
        }

        .lp-btn {
          width: 100%; padding: 16px;
          background: linear-gradient(135deg, #1648b8, #2563eb);
          border: none; border-radius: 14px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          font-weight: 700; color: #fff; letter-spacing: 0.3px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 18px rgba(37,99,235,0.35);
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .lp-btn:hover:not(:disabled) {
          opacity: 0.95; transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.45);
        }
        .lp-btn:active:not(:disabled) { transform: translateY(0); }
        .lp-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .lp-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .lp-footer { margin-top: 32px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.6; }

        .lp-mobile-logos { display: none; }

        @media (max-width: 800px) {
          .lp-root {
            grid-template-columns: 1fr;
            background: linear-gradient(155deg,#0b1f4a,#1648b8 60%,#0b7ec9);
          }
          .lp-brand { display: none; }
          .lp-form-side {
            background: transparent; padding: 24px 20px;
            align-items: flex-start; padding-top: 40px;
          }
          .lp-card {
            background: #fff; border-radius: 24px;
            padding: 36px 28px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          }
          .lp-mobile-logos {
            display: flex; align-items: center;
            justify-content: center; gap: 24px; margin-bottom: 32px;
          }
          .lp-mobile-logo {
            background: #fff; border-radius: 12px;
            padding: 12px 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .lp-mobile-logo img { height: 40px; width: auto; object-fit: contain; }
          .lp-mobile-divider {
            width: 2px; height: 40px;
            background: linear-gradient(to bottom, transparent, #e2e8f0, transparent);
          }
        }
      `}</style>

      <div className="lp-root">

        {/* ── Panel izquierdo ── */}
        <div className="lp-brand">
          <div className="lp-logos">
            <div className="lp-logo-container">
              {!logoITSSNPError
                ? <img src={ASSETS.logoITSSNP} alt="ITSSNP" className="lp-logo" onError={() => setLogoITSSNPError(true)} />
                : <span style={{ fontSize:"40px" }}>🏫</span>
              }
            </div>
            <div className="lp-divider" />
            <div className="lp-logo-container">
              {!logoTECNMError
                ? <img src={ASSETS.logoTECNM} alt="TecNM" className="lp-logo" onError={() => setLogoTECNMError(true)} />
                : <span style={{ fontSize:"40px" }}>🎓</span>
              }
            </div>
          </div>

          <div className="lp-brand-text">
            <p className="lp-inst">ITSSNP — TecNM</p>
            <h1 className="lp-title">
              Sistema de<br />
              <span>Evaluación Docente</span>
            </h1>
          </div>

          <div className="lp-badge">
            <span>📋</span> SICOT — Periodo ENE-JUN/26
          </div>
        </div>

        {/* ── Panel derecho ── */}
        <div className="lp-form-side">
          <div className="lp-card">

            {/* Logos móvil */}
            <div className="lp-mobile-logos">
              <div className="lp-mobile-logo">
                {!logoITSSNPError
                  ? <img src={ASSETS.logoITSSNP} alt="ITSSNP" onError={() => setLogoITSSNPError(true)} />
                  : <span style={{ fontSize:"32px" }}>🏫</span>
                }
              </div>
              <div className="lp-mobile-divider" />
              <div className="lp-mobile-logo">
                {!logoTECNMError
                  ? <img src={ASSETS.logoTECNM} alt="TecNM" onError={() => setLogoTECNMError(true)} />
                  : <span style={{ fontSize:"32px" }}>🎓</span>
                }
              </div>
            </div>

            <h2 className="lp-card-title">Iniciar sesión</h2>
            <p className="lp-card-sub">
              Ingresa tu número de control o usuario administrador para acceder al sistema
            </p>

            {error && (
              <div className="lp-error">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

              <div className="lp-field">
                <label className="lp-label">Usuario / No. de control</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">
                    <img src={ASSETS.iconUser} alt="" />
                  </span>
                  <input
                    className="lp-input"
                    type="text"
                    placeholder="Ej: 22100067 o admin"
                    value={usuario}
                    onChange={e => { setUsuario(e.target.value); setError("") }}
                    autoComplete="username"
                    autoFocus
                    disabled={cargando}
                  />
                </div>
              </div>

              <div className="lp-field">
                <label className="lp-label">Contraseña</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">
                    <img src={ASSETS.iconLock} alt="" />
                  </span>
                  <input
                    className="lp-input with-padding"
                    type={verPassword ? "text" : "password"}
                    placeholder="Tu contraseña SICOT"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError("") }}
                    autoComplete="current-password"
                    disabled={cargando}
                  />
                  <button
                    type="button"
                    className="lp-eye-btn"
                    onClick={() => setVerPassword(v => !v)}
                    tabIndex={-1}
                  >
                    <img
                      src={verPassword ? ASSETS.iconEyeOff : ASSETS.iconEye}
                      alt={verPassword ? "ocultar" : "mostrar"}
                    />
                  </button>
                </div>
              </div>

              <button type="submit" className="lp-btn" disabled={cargando}>
                {cargando ? (
                  <><div className="lp-spinner" /><span>Verificando…</span></>
                ) : (
                  "Ingresar al sistema →"
                )}
              </button>

            </form>

            <p className="lp-footer">
              Instituto Tecnológico Superior de la Sierra Norte de Puebla · TecNM<br />
              ¿Problemas para acceder? Contacta a Control Escolar
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
