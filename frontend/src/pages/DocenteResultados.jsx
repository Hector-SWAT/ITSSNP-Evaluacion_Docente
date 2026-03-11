import { useNavigate, useParams } from "react-router-dom"

export default function DocenteResultados() {
  const navigate = useNavigate()
  const { idDoce } = useParams()

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100dvh",
      background: "#eef2ff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        padding: "32px 40px",
        textAlign: "center",
        boxShadow: "0 4px 24px rgba(30,64,175,.08)",
      }}>
        <p style={{ fontSize: 40, marginBottom: 12 }}>📊</p>
        <h2 style={{ color: "#0f172a", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
          Detalle del Docente #{idDoce}
        </h2>
        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
          Esta sección está en desarrollo.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "#1e40af", color: "#fff",
            border: "none", borderRadius: 10,
            padding: "10px 24px", cursor: "pointer",
            fontFamily: "inherit", fontSize: 14, fontWeight: 600,
          }}
        >
          ← Volver al Dashboard
        </button>
      </div>
    </div>
  )
}
