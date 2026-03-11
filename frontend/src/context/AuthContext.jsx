/**
 * AuthContext.jsx
 * Conectado al backend real en Railway.
 * Guarda sesión en localStorage con token JWT.
 */
import { createContext, useContext, useState, useEffect } from "react"
import { login as apiLogin, logout as apiLogout } from "../services/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)   // true mientras lee localStorage

  /* Restaurar sesión al cargar la app */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sicot_user")
      if (saved) setUser(JSON.parse(saved))
    } catch { /* JSON corrupto — ignorar */ }
    setLoading(false)
  }, [])

  /* ── Login ─────────────────────────────────────────────────
     Llama al backend, guarda token + datos del usuario.
     Lanza error si las credenciales son incorrectas.
  ── */
  const login = async (usuario, password) => {
    const data = await apiLogin(usuario, password)
    // data = { tipo_usuario, num_control, nombre_completo, token, ... }

    const userObj = {
      id:     data.num_control ?? data.id,
      nombre: data.nombre_completo,
      tipo:   data.tipo_usuario,      // "alumno" | "admin"
      // Periodo activo (útil para alumnos)
      idPeriodo: data.id_perio ?? null,
    }

    localStorage.setItem("sicot_user", JSON.stringify(userObj))
    // El token ya lo guarda api.js → localStorage "sicot_token"
    setUser(userObj)
    return userObj
  }

  /* ── Logout ─────────────────────────────────────────────── */
  const logout = () => {
    apiLogout()
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAlumno:        user?.tipo === "alumno",
    isAdmin:         user?.tipo === "admin",
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>")
  return ctx
}
