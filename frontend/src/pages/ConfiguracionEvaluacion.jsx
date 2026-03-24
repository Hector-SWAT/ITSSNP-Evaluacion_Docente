// ConfiguracionEvaluacion.jsx - Componente para admin

import { useState, useEffect } from "react"

export default function ConfiguracionEvaluacion() {
  const [periodos, setPeriodos] = useState([])
  const [periodoActivo, setPeriodoActivo] = useState(null)
  const [config, setConfig] = useState({
    fechaInicioTutor: '',
    fechaFinTutor: '',
    fechaInicioDocente: '',
    fechaFinDocente: '',
    tutorActivo: true,
    docenteActivo: true
  })
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  useEffect(() => {
    cargarConfiguracion()
  }, [])

  const cargarConfiguracion = async () => {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/admin/configuracion', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await res.json()
    setPeriodos(data.periodos)
    setPeriodoActivo(data.periodoActivo)
    if (data.encuesta) {
      setConfig({
        fechaInicioTutor: data.encuesta.FechaInicioTutor?.slice(0, 16) || '',
        fechaFinTutor: data.encuesta.FechaFinTutor?.slice(0, 16) || '',
        fechaInicioDocente: data.encuesta.FechaInicioDocente?.slice(0, 16) || '',
        fechaFinDocente: data.encuesta.FechaFinDocente?.slice(0, 16) || '',
        tutorActivo: data.encuesta.TutorActivo === 1,
        docenteActivo: data.encuesta.DocenteActivo === 1
      })
    }
  }

  const activarPeriodo = async (idPeriodo) => {
    setLoading(true)
    const token = localStorage.getItem('token')
    const res = await fetch('/api/admin/activar-periodo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ idPeriodo })
    })
    const data = await res.json()
    setMensaje(data.mensaje)
    cargarConfiguracion()
    setLoading(false)
  }

  const guardarConfiguracion = async () => {
    setLoading(true)
    const token = localStorage.getItem('token')
    const res = await fetch('/api/admin/configurar-evaluacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(config)
    })
    const data = await res.json()
    setMensaje(data.mensaje)
    setLoading(false)
  }

  return (
    <div className="config-container">
      <h2>⚙️ Configuración de Evaluaciones</h2>
      
      {/* Selección de Periodo */}
      <div className="config-card">
        <h3>📅 Periodo Escolar</h3>
        <div className="periodos-list">
          {periodos.map(p => (
            <button
              key={p.IdPerio}
              className={`periodo-btn ${periodoActivo?.IdPerio === p.IdPerio ? 'active' : ''}`}
              onClick={() => activarPeriodo(p.IdPerio)}
              disabled={loading}
            >
              {p.NombreCorto || p.Nombre}
              {p.Situación === 1 && ' ✓ Activo'}
            </button>
          ))}
        </div>
        {periodoActivo && (
          <p className="periodo-activo">
            Periodo activo: <strong>{periodoActivo.Nombre}</strong>
          </p>
        )}
      </div>

      {/* Configuración de Evaluación de Tutor */}
      <div className="config-card">
        <h3>👨‍🏫 Evaluación de Tutor</h3>
        <label>
          <input
            type="checkbox"
            checked={config.tutorActivo}
            onChange={(e) => setConfig({ ...config, tutorActivo: e.target.checked })}
          />
          Activar evaluación de tutor
        </label>
        <div className="fechas-row">
          <div>
            <label>Fecha de inicio</label>
            <input
              type="datetime-local"
              value={config.fechaInicioTutor}
              onChange={(e) => setConfig({ ...config, fechaInicioTutor: e.target.value })}
              disabled={!config.tutorActivo}
            />
          </div>
          <div>
            <label>Fecha de fin</label>
            <input
              type="datetime-local"
              value={config.fechaFinTutor}
              onChange={(e) => setConfig({ ...config, fechaFinTutor: e.target.value })}
              disabled={!config.tutorActivo}
            />
          </div>
        </div>
      </div>

      {/* Configuración de Evaluación de Docentes */}
      <div className="config-card">
        <h3>📚 Evaluación de Docentes</h3>
        <label>
          <input
            type="checkbox"
            checked={config.docenteActivo}
            onChange={(e) => setConfig({ ...config, docenteActivo: e.target.checked })}
          />
          Activar evaluación de docentes
        </label>
        <div className="fechas-row">
          <div>
            <label>Fecha de inicio</label>
            <input
              type="datetime-local"
              value={config.fechaInicioDocente}
              onChange={(e) => setConfig({ ...config, fechaInicioDocente: e.target.value })}
              disabled={!config.docenteActivo}
            />
          </div>
          <div>
            <label>Fecha de fin</label>
            <input
              type="datetime-local"
              value={config.fechaFinDocente}
              onChange={(e) => setConfig({ ...config, fechaFinDocente: e.target.value })}
              disabled={!config.docenteActivo}
            />
          </div>
        </div>
      </div>

      <button className="save-btn" onClick={guardarConfiguracion} disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar configuración'}
      </button>
      
      {mensaje && <div className="mensaje">{mensaje}</div>}
    </div>
  )
}