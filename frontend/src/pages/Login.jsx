import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const navigate  = useNavigate()
  const { login } = useAuth()

  const [usuario,     setUsuario]     = useState("")
  const [password,    setPassword]    = useState("")
  const [error,       setError]       = useState("")
  const [cargando,    setCargando]    = useState(false)
  const [verPassword, setVerPassword] = useState(false)

  /* ─── Submit ─────────────────────────────────────────────── */
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
      // login() lanza Error si falla, si llega aquí es éxito
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

        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shake  { 10%,90%{transform:translateX(-3px)} 30%,70%{transform:translateX(-5px)} 50%{transform:translateX(5px)} }
        @keyframes spin   { to { transform: rotate(360deg); } }

        .lp-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100dvh;
          display: grid;
          grid-template-columns: 55% 45%;
        }

        /* ── Panel izquierdo azul ── */
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
          background: radial-gradient(circle at 30% 70%, rgba(255,255,255,.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .lp-logos { display: flex; align-items: center; gap: 24px; }
        .lp-logo  { height: 72px; object-fit: contain; filter: brightness(0) invert(1); opacity: .93; }
        .lp-divider { width: 1px; height: 60px; background: rgba(255,255,255,.3); }
        .lp-brand-text { text-align: center; }
        .lp-inst  { font-size: 13px; font-weight: 600; color: rgba(255,255,255,.65); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 8px; }
        .lp-title { font-size: clamp(22px,2.4vw,30px); font-weight: 800; color: #fff; line-height: 1.25; }
        .lp-title span { color: #7dd3fc; }
        .lp-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.22);
          border-radius: 20px; padding: 7px 18px;
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,.85);
        }

        /* ── Panel derecho blanco ── */
        .lp-form-side {
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          padding: 40px clamp(24px, 5vw, 64px);
        }
        .lp-card {
          width: 100%; max-width: 400px;
          animation: fadeUp .45s ease both;
        }
        .lp-card-title {
          font-size: 26px; font-weight: 800; color: #0f172a;
          margin-bottom: 6px;
        }
        .lp-card-sub {
          font-size: 14px; color: #64748b; margin-bottom: 32px;
        }

        /* Campos */
        .lp-field { margin-bottom: 20px; }
        .lp-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 7px; }
        .lp-input-wrap { position: relative; }
        .lp-input {
          width: 100%; padding: 13px 16px 13px 44px;
          border: 1.5px solid #e2e8f0; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 15px; color: #0f172a;
          background: #f8fafc; outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .lp-input:focus {
          border-color: #2563eb; background: #fff;
          box-shadow: 0 0 0 3px rgba(37,99,235,.12);
        }
        .lp-input-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          font-size: 17px; pointer-events: none; opacity: .5;
        }
        .lp-eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; font-size: 17px;
          opacity: .5; padding: 0; transition: opacity .15s;
        }
        .lp-eye:hover { opacity: 1; }

        /* Error */
        .lp-error {
          display: flex; align-items: center; gap: 8px;
          background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px;
          padding: 11px 14px; margin-bottom: 20px;
          font-size: 13.5px; font-weight: 500; color: #dc2626;
          animation: shake .4s ease;
        }

        /* Botón */
        .lp-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #1648b8, #2563eb);
          border: none; border-radius: 12px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          font-weight: 700; color: #fff; letter-spacing: .02em;
          transition: opacity .2s, transform .15s, box-shadow .2s;
          box-shadow: 0 4px 18px rgba(37,99,235,.35);
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .lp-btn:hover:not(:disabled) { opacity: .92; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(37,99,235,.45); }
        .lp-btn:active:not(:disabled) { transform: translateY(0); }
        .lp-btn:disabled { opacity: .65; cursor: not-allowed; }
        .lp-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,.35);
          border-top-color: #fff; border-radius: 50%;
          animation: spin .7s linear infinite;
        }

        /* Footer */
        .lp-footer { margin-top: 28px; text-align: center; font-size: 12px; color: #94a3b8; }

        /* ── Responsive: móvil ── */
        @media (max-width: 800px) {
          .lp-root { grid-template-columns: 1fr; background: linear-gradient(155deg,#0b1f4a,#1648b8 60%,#0b7ec9); }
          .lp-brand { display: none; }
          .lp-form-side { background: transparent; padding: 24px 20px; align-items: flex-start; padding-top: 60px; }
          .lp-card {
            background: #fff; border-radius: 20px;
            padding: 32px 24px; box-shadow: 0 20px 60px rgba(0,0,0,.3);
          }
        }
      `}</style>

      <div className="lp-root">

        {/* ── Panel izquierdo — marca ITSSNP ── */}
        <div className="lp-brand">
          <div className="lp-logos">
            <img src="/logo-itssnp.png" alt="ITSSNP" className="lp-logo"
              onError={e => { e.target.style.display="none" }} />
            <div className="lp-divider" />
            <img src="/logo-tecnm.png" alt="TecNM" className="lp-logo"
              onError={e => { e.target.style.display="none" }} />
          </div>
          <div className="lp-brand-text">
            <p className="lp-inst">ITSSNP — TecNM</p>
            <h1 className="lp-title">
              Sistema de<br />
              <span>Evaluación Docente</span><br />
              y Tutoría
            </h1>
          </div>
          <div className="lp-badge">
            <span>📋</span> SICOT — Periodo ENE-JUN/26
          </div>
        </div>

        {/* ── Panel derecho — formulario ── */}
        <div className="lp-form-side">
          <div className="lp-card">

            <h2 className="lp-card-title">Iniciar sesión</h2>
            <p className="lp-card-sub">Ingresa tu número de control o usuario administrador</p>

            {/* Error */}
            {error && (
              <div className="lp-error">
                <span>⚠️</span>{error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

              {/* Usuario */}
              <div className="lp-field">
                <label className="lp-label">Usuario / No. de control</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">👤</span>
                  <input
                    className="lp-input"
                    type="text"
                    placeholder="Ej: 25100019 o admin"
                    value={usuario}
                    onChange={e => { setUsuario(e.target.value); setError("") }}
                    autoComplete="username"
                    autoFocus
                    disabled={cargando}
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="lp-field">
                <label className="lp-label">Contraseña</label>
                <div className="lp-input-wrap">
                  <span className="lp-input-icon">🔒</span>
                  <input
                    className="lp-input"
                    type={verPassword ? "text" : "password"}
                    placeholder="Tu contraseña SICOT"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError("") }}
                    autoComplete="current-password"
                    disabled={cargando}
                    style={{ paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    className="lp-eye"
                    onClick={() => setVerPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {verPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Botón */}
              <button type="submit" className="lp-btn" disabled={cargando}>
                {cargando
                  ? <><div className="lp-spinner" /> Verificando…</>
                  : "Ingresar →"
                }
              </button>

            </form>

            <p className="lp-footer">
              Instituto Tecnológico Superior de la Sierra Norte de Puebla · TecNM<br />
              Si tienes problemas para acceder, contacta a Control Escolar.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
