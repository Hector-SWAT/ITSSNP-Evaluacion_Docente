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
  const [loading, setLoading] = useState(true)

  /* Restaurar sesión al cargar la app */
  useEffect(() => {
    try {
      // Buscar usuario en cualquiera de las dos claves
      const savedUser = localStorage.getItem("sicot_user") || localStorage.getItem("user")
      const token = localStorage.getItem("sicot_token") || localStorage.getItem("token")
      
      if (savedUser && token) {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        console.log("✅ Sesión restaurada:", userData)
        
        // Asegurar consistencia guardando en ambas claves
        localStorage.setItem("sicot_user", JSON.stringify(userData))
        localStorage.setItem("user", JSON.stringify(userData))
      } else {
        // Limpiar cualquier dato inconsistente
        localStorage.removeItem("sicot_user")
        localStorage.removeItem("user")
        localStorage.removeItem("sicot_token")
        localStorage.removeItem("token")
      }
    } catch (error) {
      console.error("Error restaurando sesión:", error)
      localStorage.clear()
    }
    setLoading(false)
  }, [])

  const login = async (usuario, password) => {
    try {
      const data = await apiLogin(usuario, password)
      
      const userObj = {
        id: data.num_control ?? data.id ?? usuario,
        nombre: data.nombre_completo,
        tipo: data.tipo_usuario,
        idPeriodo: data.id_perio ?? null,
      }

      // Guardar en ambas claves para compatibilidad
      localStorage.setItem("sicot_user", JSON.stringify(userObj))
      localStorage.setItem("user", JSON.stringify(userObj))
      
      console.log("✅ Login exitoso:", userObj)
      console.log("🔑 Token presente:", !!localStorage.getItem("token"))
      
      setUser(userObj)
      return userObj
    } catch (error) {
      console.error("❌ Error en login:", error)
      throw error
    }
  }

  const logout = () => {
    apiLogout()
    // Limpiar todo
    localStorage.removeItem("sicot_user")
    localStorage.removeItem("user")
    localStorage.removeItem("sicot_token")
    localStorage.removeItem("token")
    setUser(null)
    console.log("👋 Sesión cerrada")
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAlumno: user?.tipo === "alumno",
    isAdmin: user?.tipo === "admin",
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
