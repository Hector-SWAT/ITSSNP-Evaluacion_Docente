import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

import Login             from "../pages/Login"
import PanelAlumno       from "../pages/PanelAlumno"
import Evaluacion        from "../pages/Evaluacion"
import Gracias           from "../pages/Gracias"
import Dashboard         from "../pages/Dashboard"
import DocenteResultados from "../pages/DocenteResultados"

/* ── Redirige si ya tiene sesión ── */
function PublicRoute({ children }) {
  const { user } = useAuth()
  if (!user) return children
  return <Navigate to={user.tipo === "admin" ? "/dashboard" : "/panel-alumno"} replace />
}

/* ── Protege rutas por rol ── */
function PrivateRoute({ children, roles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.tipo))
    return <Navigate to={user.tipo === "admin" ? "/dashboard" : "/panel-alumno"} replace />
  return children
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login único */}
        <Route path="/login" element={
          <PublicRoute><Login /></PublicRoute>
        } />

        {/* Rutas de alumno */}
        <Route path="/panel-alumno" element={
          <PrivateRoute roles={["alumno"]}><PanelAlumno /></PrivateRoute>
        } />
        <Route path="/evaluacion/:idGrupo" element={
          <PrivateRoute roles={["alumno"]}><Evaluacion /></PrivateRoute>
        } />
        <Route path="/gracias" element={
          <PrivateRoute roles={["alumno"]}><Gracias /></PrivateRoute>
        } />

        {/* Rutas de administrador */}
        <Route path="/dashboard" element={
          <PrivateRoute roles={["admin"]}><Dashboard /></PrivateRoute>
        } />
        <Route path="/dashboard/docente/:idDoce" element={
          <PrivateRoute roles={["admin"]}><DocenteResultados /></PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
