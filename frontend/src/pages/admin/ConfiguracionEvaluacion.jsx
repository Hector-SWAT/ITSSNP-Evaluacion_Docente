// src/pages/admin/ConfiguracionEvaluacion.jsx
import { useState, useEffect } from "react"

const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:3001'
  }
  return window.location.origin
}
const API_URL = getApiUrl()


function getToken() {
  return localStorage.getItem('token')
}

function getHeaders() {
  return {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
  }
}

export default function ConfiguracionEvaluacion({ onConfigChange }) {
  const [periodos, setPeriodos] = useState([])
  const [periodoActivo, setPeriodoActivo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState(null)
  const [mensajeTipo, setMensajeTipo] = useState('success') // 'success' o 'error'
  const [config, setConfig] = useState({
    fechaInicioTutor: '',
    fechaFinTutor: '',
    fechaInicioDocente: '',
    fechaFinDocente: '',
    tutorActivo: false,
    docenteActivo: false
  })

  useEffect(() => {
    cargarConfiguracion()
  }, [])

  const cargarConfiguracion = async () => {
    setLoading(true)
    try {
      console.log("🔍 Cargando configuración...")
      const res = await fetch(`${API_URL}/api/admin/configuracion`, {
        headers: getHeaders()
      })
      
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
      }
      
      const data = await res.json()
      console.log("📊 Datos recibidos:", data)
      
      setPeriodos(data.periodos || [])
      setPeriodoActivo(data.periodoActivo)
      
      if (data.encuesta) {
        // Convertir fechas de ISO a formato datetime-local (YYYY-MM-DDThh:mm)
        const formatFechaLocal = (fechaISO) => {
          if (!fechaISO) return ''
          const fecha = new Date(fechaISO)
          const year = fecha.getFullYear()
          const month = String(fecha.getMonth() + 1).padStart(2, '0')
          const day = String(fecha.getDate()).padStart(2, '0')
          const hours = String(fecha.getHours()).padStart(2, '0')
          const minutes = String(fecha.getMinutes()).padStart(2, '0')
          return `${year}-${month}-${day}T${hours}:${minutes}`
        }
        
        setConfig({
          fechaInicioTutor: formatFechaLocal(data.encuesta.FechaInicioTutor),
          fechaFinTutor: formatFechaLocal(data.encuesta.FechaFinTutor),
          fechaInicioDocente: formatFechaLocal(data.encuesta.FechaInicioDocente),
          fechaFinDocente: formatFechaLocal(data.encuesta.FechaFinDocente),
          tutorActivo: data.encuesta.TutorActivo === 1 || data.encuesta.TutorActivo === true,
          docenteActivo: data.encuesta.DocenteActivo === 1 || data.encuesta.DocenteActivo === true
        })
        
        console.log("⚙️ Configuración cargada:", {
          tutorActivo: config.tutorActivo,
          docenteActivo: config.docenteActivo,
          fechaInicioTutor: config.fechaInicioTutor,
          fechaFinTutor: config.fechaFinTutor
        })
      }
      
      mostrarMensaje("Configuración cargada correctamente", "success")
    } catch (error) {
      console.error("❌ Error cargando configuración:", error)
      mostrarMensaje("Error al cargar configuración: " + error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto)
    setMensajeTipo(tipo)
    setTimeout(() => setMensaje(null), 5000)
  }

  const activarPeriodo = async (idPeriodo) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/admin/activar-periodo`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ idPeriodo })
      })
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Error al activar periodo')
      }
      
      mostrarMensaje(data.mensaje, "success")
      cargarConfiguracion()
      if (onConfigChange) onConfigChange()
    } catch (error) {
      console.error("Error activando periodo:", error)
      mostrarMensaje("Error al activar periodo: " + error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  const guardarConfiguracion = async () => {
    setLoading(true)
    try {
      console.log("💾 Guardando configuración:", config)
      
      // Convertir fecha de datetime-local a formato SQL Server
      const convertirFechaSQL = (fechaStr) => {
        if (!fechaStr) return null
        // Reemplazar T por espacio y agregar segundos
        return fechaStr.replace('T', ' ') + ':00'
      }
      
      const payload = {
        fechaInicioTutor: convertirFechaSQL(config.fechaInicioTutor),
        fechaFinTutor: convertirFechaSQL(config.fechaFinTutor),
        fechaInicioDocente: convertirFechaSQL(config.fechaInicioDocente),
        fechaFinDocente: convertirFechaSQL(config.fechaFinDocente),
        tutorActivo: config.tutorActivo,
        docenteActivo: config.docenteActivo
      }
      
      console.log("📤 Payload a enviar:", payload)
      
      const res = await fetch(`${API_URL}/api/admin/configurar-evaluacion`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      })
      
      const data = await res.json()
      console.log("📡 Respuesta guardar:", data)
      
      if (!res.ok) {
        throw new Error(data.error || 'Error al guardar configuración')
      }
      
      mostrarMensaje(data.mensaje, "success")
      if (onConfigChange) onConfigChange()
    } catch (error) {
      console.error("Error guardando configuración:", error)
      mostrarMensaje("Error al guardar configuración: " + error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '24px', maxWidth: '100%', margin: '0 auto' }}>
      {/* Mensaje de estado */}
      {mensaje && (
        <div style={{
          background: mensajeTipo === 'success' ? '#dbeafe' : '#fee2e2',
          border: mensajeTipo === 'success' ? '1px solid #3b82f6' : '1px solid #ef4444',
          borderRadius: '12px',
          padding: '12px 20px',
          marginBottom: '24px',
          color: mensajeTipo === 'success' ? '#1e40af' : '#b91c1c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>{mensaje}</span>
          <button
            onClick={() => setMensaje(null)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: mensajeTipo === 'success' ? '#1e40af' : '#b91c1c'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Selección de Periodo */}
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        border: '1.5px solid #e2e8f0',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📅 Periodo Escolar
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
          Selecciona el periodo que los alumnos verán para evaluar a sus docentes
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          {periodos.map(p => (
            <button
              key={p.IdPerio}
              onClick={() => activarPeriodo(p.IdPerio)}
              disabled={loading}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: periodoActivo?.IdPerio === p.IdPerio ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                background: periodoActivo?.IdPerio === p.IdPerio ? '#eff6ff' : '#fff',
                color: periodoActivo?.IdPerio === p.IdPerio ? '#1e40af' : '#64748b',
                fontWeight: periodoActivo?.IdPerio === p.IdPerio ? '700' : '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: loading ? 0.6 : 1
              }}
            >
              {p.NombreCorto || p.nombre_corto || p.Nombre || `Periodo ${p.IdPerio}`}
              {p.Situación === 1 && ' ✓ Activo'}
            </button>
          ))}
        </div>
        {periodoActivo && (
          <div style={{
            background: '#f1f5f9',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '14px',
            color: '#334155'
          }}>
            <strong>Periodo activo:</strong> {periodoActivo.Nombre || periodoActivo.nombre} ({periodoActivo.NombreCorto || periodoActivo.nombre_corto})
          </div>
        )}
      </div>

      {/* Configuración Tutor */}
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        border: '1.5px solid #e2e8f0',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          👨‍🏫 Evaluación de Tutor
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
          Configura la evaluación del tutor académico de cada alumno
        </p>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={config.tutorActivo}
            onChange={(e) => setConfig({ ...config, tutorActivo: e.target.checked })}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <span style={{ fontWeight: '500' }}>Activar evaluación de tutor</span>
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>
              Fecha de inicio
            </label>
            <input
              type="datetime-local"
              value={config.fechaInicioTutor}
              onChange={(e) => setConfig({ ...config, fechaInicioTutor: e.target.value })}
              disabled={!config.tutorActivo}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                fontFamily: 'inherit',
                fontSize: '14px',
                background: config.tutorActivo ? '#fff' : '#f8fafc'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>
              Fecha de fin
            </label>
            <input
              type="datetime-local"
              value={config.fechaFinTutor}
              onChange={(e) => setConfig({ ...config, fechaFinTutor: e.target.value })}
              disabled={!config.tutorActivo}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                fontFamily: 'inherit',
                fontSize: '14px',
                background: config.tutorActivo ? '#fff' : '#f8fafc'
              }}
            />
          </div>
        </div>
      </div>

      {/* Configuración Docentes */}
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        border: '1.5px solid #e2e8f0',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📚 Evaluación de Docentes
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
          Configura la evaluación de todos los docentes que imparten clase al alumno
        </p>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={config.docenteActivo}
            onChange={(e) => setConfig({ ...config, docenteActivo: e.target.checked })}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <span style={{ fontWeight: '500' }}>Activar evaluación de docentes</span>
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>
              Fecha de inicio
            </label>
            <input
              type="datetime-local"
              value={config.fechaInicioDocente}
              onChange={(e) => setConfig({ ...config, fechaInicioDocente: e.target.value })}
              disabled={!config.docenteActivo}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                fontFamily: 'inherit',
                fontSize: '14px',
                background: config.docenteActivo ? '#fff' : '#f8fafc'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>
              Fecha de fin
            </label>
            <input
              type="datetime-local"
              value={config.fechaFinDocente}
              onChange={(e) => setConfig({ ...config, fechaFinDocente: e.target.value })}
              disabled={!config.docenteActivo}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                fontFamily: 'inherit',
                fontSize: '14px',
                background: config.docenteActivo ? '#fff' : '#f8fafc'
              }}
            />
          </div>
        </div>
      </div>

      {/* Botones */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <button
          onClick={guardarConfiguracion}
          disabled={loading}
          style={{
            flex: 2,
            padding: '14px',
            background: 'linear-gradient(135deg, #1648b8, #2563eb)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '700',
            color: '#fff',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Guardando...' : '💾 Guardar configuración'}
        </button>
        <button
          onClick={cargarConfiguracion}
          disabled={loading}
          style={{
            flex: 1,
            padding: '14px',
            background: '#f1f5f9',
            border: '1.5px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#475569',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          🔄 Recargar
        </button>
      </div>

      {/* Resumen de configuración actual */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
          📋 Resumen de configuración
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
          <div>
            <span style={{ color: '#64748b' }}>Evaluación de Tutor:</span>{' '}
            <span style={{ fontWeight: '600', color: config.tutorActivo ? '#15803d' : '#dc2626' }}>
              {config.tutorActivo ? '✓ Activa' : '✗ Inactiva'}
            </span>
          </div>
          <div>
            <span style={{ color: '#64748b' }}>Evaluación de Docentes:</span>{' '}
            <span style={{ fontWeight: '600', color: config.docenteActivo ? '#15803d' : '#dc2626' }}>
              {config.docenteActivo ? '✓ Activa' : '✗ Inactiva'}
            </span>
          </div>
          {config.tutorActivo && (
            <>
              <div>
                <span style={{ color: '#64748b' }}>Inicio Tutor:</span>{' '}
                <span style={{ fontWeight: '500' }}>{config.fechaInicioTutor?.replace('T', ' ') || 'No configurado'}</span>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Fin Tutor:</span>{' '}
                <span style={{ fontWeight: '500' }}>{config.fechaFinTutor?.replace('T', ' ') || 'No configurado'}</span>
              </div>
            </>
          )}
          {config.docenteActivo && (
            <>
              <div>
                <span style={{ color: '#64748b' }}>Inicio Docentes:</span>{' '}
                <span style={{ fontWeight: '500' }}>{config.fechaInicioDocente?.replace('T', ' ') || 'No configurado'}</span>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Fin Docentes:</span>{' '}
                <span style={{ fontWeight: '500' }}>{config.fechaFinDocente?.replace('T', ' ') || 'No configurado'}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
