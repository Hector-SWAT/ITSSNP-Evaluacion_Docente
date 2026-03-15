import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  CATEGORIAS,
  getDocentesAPI,
  getPeriodosAPI,
  getGruposAPI,
  getResultadosDocenteAPI,
} from "../services/evaluacionData"

/* ─── Colores por clasificación ─────────────────────────────── */
const CLASIF_COLOR = {
  EXCELENTE:   { bg:"#f0fdf4", border:"#86efac", text:"#15803d", badge:"#dcfce7" },
  "MUY BUENO": { bg:"#f0f9ff", border:"#7dd3fc", text:"#0369a1", badge:"#dbeafe" },
  BUENO:       { bg:"#fffbeb", border:"#fcd34d", text:"#b45309", badge:"#fef3c7" },
  REGULAR:     { bg:"#fff7ed", border:"#fdba74", text:"#c2410c", badge:"#ffedd5" },
  DEFICIENTE:  { bg:"#fef2f2", border:"#fca5a5", text:"#b91c1c", badge:"#fee2e2" },
}

const CAT_COLORS = [
  "#2563eb","#7c3aed","#0891b2","#059669","#d97706",
  "#dc2626","#db2777","#16a34a","#9333ea",
]

/* ─── Mini Gráfica de barras horizontal ─────────────────────── */
function BarChart({ datos }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {CATEGORIAS.map((cat, i) => {
        const val = datos[cat.id] ?? 0
        const pct = (val / 5) * 100
        const col = CLASIF_COLOR[
          val >= 4.5 ? "EXCELENTE" :
          val >= 3.5 ? "MUY BUENO" :
          val >= 2.5 ? "BUENO" :
          val >= 1.5 ? "REGULAR" : "DEFICIENTE"
        ]
        return (
          <div key={cat.id}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
              <span style={{ fontSize:11.5, fontWeight:600, color:"#475569", flex:1, minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", paddingRight:8 }}>
                {i + 1}. {cat.nombre}
              </span>
              <span style={{ fontSize:13, fontWeight:800, color:col.text, flexShrink:0 }}>{val.toFixed(1)}</span>
            </div>
            <div style={{ height:8, background:"#f1f5f9", borderRadius:99, overflow:"hidden" }}>
              <div style={{
                height:"100%", width:`${pct}%`,
                background: CAT_COLORS[i],
                borderRadius:99,
                transition:"width .6s cubic-bezier(.16,1,.3,1)",
              }}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Gráfica Radar SVG pura ─────────────────────────────────── */
function RadarChart({ datos, size = 260 }) {
  const cx = size / 2, cy = size / 2
  const R  = size * 0.38
  const n  = CATEGORIAS.length
  const angle = (i) => (i * 2 * Math.PI) / n - Math.PI / 2
  const pt    = (i, r) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  })
  const rings = [1,2,3,4,5]
  const dataPoints = CATEGORIAS.map((cat, i) => {
    const val = datos[cat.id] ?? 0
    return pt(i, (val / 5) * R)
  })
  const polyStr = dataPoints.map(p => `${p.x},${p.y}`).join(" ")

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width:"100%", maxWidth:size, display:"block", margin:"0 auto" }}>
      {rings.map(r => {
        const pts  = CATEGORIAS.map((_, i) => pt(i, (r / 5) * R))
        const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ") + "Z"
        return <path key={r} d={path} fill="none" stroke="#e2e8f0" strokeWidth={1}/>
      })}
      {CATEGORIAS.map((_, i) => {
        const edge = pt(i, R)
        return <line key={i} x1={cx} y1={cy} x2={edge.x} y2={edge.y} stroke="#e2e8f0" strokeWidth={1}/>
      })}
      <polygon points={polyStr} fill="rgba(37,99,235,.18)" stroke="#2563eb" strokeWidth={2.2} strokeLinejoin="round"/>
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#2563eb" stroke="#fff" strokeWidth={1.5}/>
      ))}
      {CATEGORIAS.map((_, i) => {
        const lp = pt(i, R + 20)
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontWeight={700} fill="#475569">
            {i + 1}
          </text>
        )
      })}
    </svg>
  )
}

/* ─── Exportar CSV ───────────────────────────────────────────── */
function exportarCSV(resultado, grupoSeleccionado) {
  if (!resultado) return
  const { docente, periodo, promediosCat, promedioGeneral, clasificacion, completaron, faltantes } = resultado
  const rows = []
  
  rows.push(["SISTEMA DE EVALUACIÓN DOCENTE — ITSSNP"])
  rows.push([""])
  rows.push(["INFORMACIÓN DEL DOCENTE"])
  rows.push(["Docente:", docente.nombre])
  rows.push(["Periodo:", periodo.nombre])
  if (grupoSeleccionado) rows.push(["Grupo:", grupoSeleccionado])
  rows.push([""])
  
  rows.push(["RESULTADOS GENERALES"])
  rows.push(["Promedio general:", promedioGeneral, "Clasificación:", clasificacion])
  rows.push([])
  
  rows.push(["RESULTADOS POR CRITERIO"])
  rows.push(["#","Criterio","Promedio","Clasificación"])
  CATEGORIAS.forEach((cat, i) => {
    const val = promediosCat[cat.id] ?? 0
    const clasificacionCat = val >= 4.5 ? "EXCELENTE" : val >= 3.5 ? "MUY BUENO" : val >= 2.5 ? "BUENO" : val >= 1.5 ? "REGULAR" : "DEFICIENTE"
    rows.push([i+1, cat.nombre, val.toFixed(2), clasificacionCat])
  })
  rows.push([])
  
  rows.push(["ALUMNOS QUE COMPLETARON LA ENCUESTA", `Total: ${completaron.length}`])
  rows.push(["No. Control","Nombre","Grupo","Carrera"])
  completaron.forEach(a => rows.push([a.numControl, a.nombre, a.grupo || "—", a.carrera]))
  rows.push([])
  
  rows.push(["ALUMNOS PENDIENTES", `Total: ${faltantes.length}`])
  rows.push(["No. Control","Nombre","Grupo","Carrera"])
  faltantes.forEach(a => rows.push([a.numControl, a.nombre, a.grupo || "—", a.carrera]))
  
  const csv  = rows.map(r => r.map(c => `"${String(c ?? "").replace(/"/g,'""')}"`).join(",")).join("\n")
  const blob = new Blob(["\uFEFF" + csv], { type:"text/csv;charset=utf-8;" })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement("a")
  a.href = url
  a.download = `evaluacion_${docente.nombre.replace(/\s+/g,"_")}_${periodo.nombre.replace(/\s+/g,"_")}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

/* ─── Exportar Excel ─────────────────────────────────────────── */
function exportarExcel(resultado, grupoSeleccionado) {
  if (!resultado) return
  const { docente, periodo, promediosCat, promedioGeneral, clasificacion, completaron, faltantes } = resultado
  
  const cell    = (v) => `<Cell><Data ss:Type="String">${String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</Data></Cell>`
  const numCell = (v) => `<Cell><Data ss:Type="Number">${v}</Data></Cell>`
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="Evaluación"><Table>
<Row><Cell><Data ss:Type="String">SISTEMA DE EVALUACIÓN DOCENTE — ITSSNP</Data></Cell></Row>
<Row/>
<Row><Cell><Data ss:Type="String">INFORMACIÓN DEL DOCENTE</Data></Cell></Row>
<Row><Cell><Data ss:Type="String">Docente:</Data></Cell>${cell(docente.nombre)}</Row>
<Row><Cell><Data ss:Type="String">Periodo:</Data></Cell>${cell(periodo.nombre)}</Row>
${grupoSeleccionado ? `<Row><Cell><Data ss:Type="String">Grupo:</Data></Cell>${cell(grupoSeleccionado)}</Row>` : ""}
<Row/>
<Row><Cell><Data ss:Type="String">RESULTADOS GENERALES</Data></Cell></Row>
<Row><Cell><Data ss:Type="String">Promedio general:</Data></Cell>${numCell(promedioGeneral)}<Cell><Data ss:Type="String">Clasificación:</Data></Cell>${cell(clasificacion)}</Row>
<Row/>
<Row><Cell><Data ss:Type="String">RESULTADOS POR CRITERIO</Data></Cell></Row>
<Row><Cell><Data ss:Type="String">#</Data></Cell><Cell><Data ss:Type="String">Criterio</Data></Cell><Cell><Data ss:Type="String">Promedio</Data></Cell><Cell><Data ss:Type="String">Clasificación</Data></Cell></Row>
${CATEGORIAS.map((cat,i) => {
  const val = promediosCat[cat.id] ?? 0
  const clasificacionCat = val >= 4.5 ? "EXCELENTE" : val >= 3.5 ? "MUY BUENO" : val >= 2.5 ? "BUENO" : val >= 1.5 ? "REGULAR" : "DEFICIENTE"
  return `<Row>${numCell(i+1)}${cell(cat.nombre)}${numCell(val.toFixed(2))}${cell(clasificacionCat)}</Row>`
}).join("")}
<Row/>
<Row><Cell><Data ss:Type="String">ALUMNOS QUE COMPLETARON LA ENCUESTA</Data></Cell><Cell><Data ss:Type="String">Total: ${completaron.length}</Data></Cell></Row>
<Row><Cell><Data ss:Type="String">No. Control</Data></Cell><Cell><Data ss:Type="String">Nombre</Data></Cell><Cell><Data ss:Type="String">Grupo</Data></Cell><Cell><Data ss:Type="String">Carrera</Data></Cell></Row>
${completaron.map(a => `<Row>${numCell(a.numControl)}${cell(a.nombre)}${cell(a.grupo || "—")}${cell(a.carrera)}</Row>`).join("")}
<Row/>
<Row><Cell><Data ss:Type="String">ALUMNOS PENDIENTES</Data></Cell><Cell><Data ss:Type="String">Total: ${faltantes.length}</Data></Cell></Row>
<Row><Cell><Data ss:Type="String">No. Control</Data></Cell><Cell><Data ss:Type="String">Nombre</Data></Cell><Cell><Data ss:Type="String">Grupo</Data></Cell><Cell><Data ss:Type="String">Carrera</Data></Cell></Row>
${faltantes.map(a => `<Row>${numCell(a.numControl)}${cell(a.nombre)}${cell(a.grupo || "—")}${cell(a.carrera)}</Row>`).join("")}
</Table></Worksheet></Workbook>`

  const blob = new Blob([xml], { type:"application/vnd.ms-excel;charset=utf-8;" })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement("a")
  a.href = url
  a.download = `evaluacion_${docente.nombre.replace(/\s+/g,"_")}_${periodo.nombre.replace(/\s+/g,"_")}.xls`
  a.click()
  URL.revokeObjectURL(url)
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const navigate         = useNavigate()
  const { user, logout } = useAuth()

  /* ── Listas para los selects ── */
  const [docentes, setDocentes] = useState([])
  const [periodos, setPeriodos] = useState([])
  const [grupos, setGrupos] = useState([])

  /* ── Filtros seleccionados ── */
  const [idDocente, setIdDocente] = useState("")
  const [idPeriodo, setIdPeriodo] = useState("")
  const [idGrupo, setIdGrupo] = useState("")

  /* ── Resultado de la API ── */
  const [resultado, setResultado] = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState(null)

  /* ── Estados de carga para selects ── */
  const [cargandoDocentes, setCargandoDocentes] = useState(true)
  const [cargandoPeriodos, setCargandoPeriodos] = useState(true)
  const [cargandoGrupos, setCargandoGrupos] = useState(false)
  const [errorDocentes, setErrorDocentes] = useState(null)
  const [errorPeriodos, setErrorPeriodos] = useState(null)
  const [errorGrupos, setErrorGrupos] = useState(null)

  /* ── UI ── */
  const [tabAlumnos, setTabAlumnos] = useState("completaron")
  const [vistaGraf,  setVistaGraf]  = useState("barras")

  /* ── Agrupar docentes alfabéticamente (sin departamentos) ── */
  const docentesOrdenados = [...docentes].sort((a, b) => a.nombre.localeCompare(b.nombre))

  /* ── Verificar autenticación al cargar ── */
  useEffect(() => {
    if (!user || user.tipo !== "admin") {
      navigate("/login", { replace: true })
      return
    }
  }, [user, navigate])

  /* ── Cargar docentes y periodos al montar ── */
  useEffect(() => {
    if (!user || user.tipo !== "admin") return

    const cargarDatos = async () => {
      try {
        setCargandoDocentes(true)
        const docs = await getDocentesAPI()
        console.log("✅ Docentes cargados:", docs)
        setDocentes(docs)
        setErrorDocentes(null)
      } catch (err) {
        console.error("❌ Error cargando docentes:", err)
        setErrorDocentes(err.message)
        if (err.message.includes("Token") || err.message.includes("401")) {
          navigate("/login", { replace: true })
        }
      } finally {
        setCargandoDocentes(false)
      }

      try {
        setCargandoPeriodos(true)
        const pers = await getPeriodosAPI()
        console.log("✅ Periodos cargados:", pers)
        setPeriodos(pers)
        setErrorPeriodos(null)
        const activo = pers.find(p => p.activo === 1 || p.activo === true)
        if (activo) setIdPeriodo(String(activo.id))
      } catch (err) {
        console.error("❌ Error cargando periodos:", err)
        setErrorPeriodos(err.message)
        if (err.message.includes("Token") || err.message.includes("401")) {
          navigate("/login", { replace: true })
        }
      } finally {
        setCargandoPeriodos(false)
      }
    }

    cargarDatos()
  }, [user, navigate])

  /* ── Cargar grupos cuando cambian docente y periodo ── */
  useEffect(() => {
    if (!idDocente || !idPeriodo) {
      setGrupos([])
      setIdGrupo("")
      setErrorGrupos(null)
      return
    }

    const cargarGrupos = async () => {
      try {
        setCargandoGrupos(true)
        console.log(`🔄 Cargando grupos para docente ${idDocente}, periodo ${idPeriodo}`)
        const gruposData = await getGruposAPI(Number(idDocente), Number(idPeriodo))
        console.log("✅ Grupos cargados:", gruposData)
        setGrupos(gruposData || [])
        setErrorGrupos(null)
        setIdGrupo("")
      } catch (err) {
        console.error("❌ Error cargando grupos:", err)
        setErrorGrupos(err.message)
        setGrupos([])
        setIdGrupo("")
      } finally {
        setCargandoGrupos(false)
      }
    }

    cargarGrupos()
  }, [idDocente, idPeriodo])

  /* ── Consultar resultados cuando cambian los selects ── */
  useEffect(() => {
    if (!idDocente || !idPeriodo) {
      setResultado(null)
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    setResultado(null)
    
    console.log(`📊 Cargando resultados: docente=${idDocente}, periodo=${idPeriodo}, grupo=${idGrupo || "todos"}`)
    
    getResultadosDocenteAPI(Number(idDocente), Number(idPeriodo), idGrupo ? Number(idGrupo) : undefined)
      .then(data => {
        console.log("✅ Resultados cargados:", data)
        setResultado(data)
      })
      .catch(err => {
        console.error("❌ Error cargando resultados:", err)
        setError(err.message || "Error al obtener resultados")
        if (err.message.includes("Token") || err.message.includes("401")) {
          navigate("/login", { replace: true })
        }
      })
      .finally(() => setLoading(false))
  }, [idDocente, idPeriodo, idGrupo, navigate])

  const clasifStyle = resultado ? (CLASIF_COLOR[resultado.clasificacion] ?? CLASIF_COLOR.REGULAR) : {}
  const pctCompleto = resultado
    ? Math.round((resultado.completaron.length / resultado.totalAlumnos) * 100)
    : 0

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap" rel="stylesheet" />

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{height:100%}
        @keyframes _fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes _barIn {from{width:0}to{width:var(--w)}}
        @keyframes _spin  {to{transform:rotate(360deg)}}

        .db-root{font-family:'DM Sans',sans-serif;min-height:100dvh;background:#f0f4ff;display:flex;flex-direction:column}

        /* ── Navbar ── */
        .db-nav{background:linear-gradient(135deg,#0d2660 0%,#1648b8 55%,#0b7ec9 100%);height:64px;padding:0 clamp(16px,4vw,48px);display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 18px rgba(0,0,0,.28);position:sticky;top:0;z-index:10}
        .db-brand{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:700;color:#fff}
        .db-brand-dot{width:9px;height:9px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e}
        .db-nav-r{display:flex;align-items:center;gap:10px}
        .db-nav-user{font-size:13px;color:rgba(255,255,255,.72)}
        .db-nav-badge{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:4px 10px;font-size:11.5px;font-weight:700;color:#fbbf24;text-transform:uppercase;letter-spacing:.04em}
        .db-btn-logout{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:5px 14px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#fff;cursor:pointer;transition:background .15s}
        .db-btn-logout:hover{background:rgba(255,255,255,.24)}

        /* ── Body ── */
        .db-body{flex:1;padding:clamp(18px,3vw,40px) clamp(14px,4vw,48px);display:flex;flex-direction:column;gap:20px;max-width:1200px;width:100%;margin:0 auto}

        /* ── Filtros ── */
        .db-filters{background:#fff;border:1.5px solid #e8eeff;border-radius:18px;padding:22px 24px;display:flex;flex-wrap:wrap;gap:16px;align-items:flex-end;animation:_fadeUp .35s ease both}
        .db-fgroup{display:flex;flex-direction:column;gap:6px;flex:1;min-width:200px}
        .db-flabel{font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.06em}
        .db-fsel{height:44px;padding:0 14px;background:#f8faff;border:1.5px solid #e2e8f0;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:#0f172a;cursor:pointer;outline:none;transition:border-color .15s}
        .db-fsel:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.12)}
        .db-fsel:disabled{opacity:0.5;cursor:not-allowed}

        /* ── Estado vacío ── */
        .db-empty{background:#fff;border:1.5px dashed #c7d2fe;border-radius:18px;padding:56px 24px;text-align:center;animation:_fadeUp .4s ease both}
        .db-empty-icon{font-size:48px;margin-bottom:14px}
        .db-empty-title{font-size:18px;font-weight:700;color:#334155;margin-bottom:6px}
        .db-empty-sub{font-size:14px;color:#94a3b8}

        /* ── Loading ── */
        .db-loading{background:#fff;border:1.5px solid #e8eeff;border-radius:18px;padding:56px 24px;text-align:center;animation:_fadeUp .3s ease both}
        .db-spinner{width:40px;height:40px;border:3px solid #e8eeff;border-top-color:#2563eb;border-radius:50%;animation:_spin .7s linear infinite;margin:0 auto 16px}
        .db-loading-text{font-size:15px;font-weight:600;color:#64748b}

        /* ── Error ── */
        .db-error{background:#fef2f2;border:1.5px solid #fca5a5;border-radius:18px;padding:32px 24px;text-align:center;animation:_fadeUp .3s ease both}
        .db-error-icon{font-size:40px;margin-bottom:12px}
        .db-error-title{font-size:17px;font-weight:700;color:#b91c1c;margin-bottom:6px}
        .db-error-msg{font-size:13px;color:#ef4444}
        .db-retry-btn{margin-top:16px;padding:9px 22px;background:#b91c1c;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:#fff;cursor:pointer;transition:background .15s}
        .db-retry-btn:hover{background:#991b1b}

        /* ── Grid principal ── */
        .db-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;animation:_fadeUp .35s ease both}
        @media(max-width:900px){.db-grid{grid-template-columns:1fr}}

        /* ── Cards ── */
        .db-card{background:#fff;border:1.5px solid #e8eeff;border-radius:18px;padding:22px 24px}
        .db-card-title{font-size:12px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px;display:flex;align-items:center;gap:8px}
        .db-card-title-icon{font-size:16px}

        /* ── Resumen ── */
        .db-resumen{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
        .db-score-circle{width:86px;height:86px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;border:3px solid;flex-shrink:0}
        .db-score-num{font-size:24px;font-weight:800;line-height:1}
        .db-score-max{font-size:11px;opacity:.6}
        .db-resumen-info{flex:1;min-width:140px}
        .db-resumen-name{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:4px;line-height:1.3}
        .db-resumen-period{font-size:13px;color:#64748b;margin-bottom:10px}
        .db-clasif-badge{display:inline-flex;align-items:center;gap:6px;border-radius:8px;padding:5px 12px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em}

        /* ── Progreso ── */
        .db-prog-info{display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:8px}
        .db-prog-track{height:10px;background:#f1f5f9;border-radius:99px;overflow:hidden}
        .db-prog-fill{height:100%;background:linear-gradient(90deg,#2563eb,#22c55e);border-radius:99px;width:var(--w);animation:_barIn .8s cubic-bezier(.16,1,.3,1) both}

        /* ── Tabs ── */
        .db-tabs{display:flex;gap:2px;background:#f1f5f9;border-radius:10px;padding:3px;margin-bottom:14px}
        .db-tab{flex:1;padding:7px 0;border-radius:8px;border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;background:transparent;color:#64748b}
        .db-tab-active{background:#fff;color:#1e40af;box-shadow:0 1px 6px rgba(0,0,0,.08)}

        /* ── Tabla ── */
        .db-table-wrap{overflow-x:auto;border-radius:10px;border:1.5px solid #e8eeff}
        .db-table{width:100%;border-collapse:collapse;font-size:13px}
        .db-table th{background:#f8faff;padding:10px 14px;text-align:left;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.05em;border-bottom:1.5px solid #e8eeff}
        .db-table td{padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#334155}
        .db-table tr:last-child td{border-bottom:none}
        .db-table tr:hover td{background:#fafbff}
        .db-nc{font-family:monospace;font-weight:700;color:#3b4fd8;font-size:12px}
        .db-chip-carrera{background:#f1f5ff;border-radius:5px;padding:2px 7px;font-size:11px;font-weight:600;color:#3b4fd8}
        .db-chip-grupo{background:#f5f0ff;border-radius:5px;padding:2px 7px;font-size:11px;font-weight:600;color:#7c3aed}
        .db-chip-pend{background:#fff7ed;border-radius:5px;padding:2px 7px;font-size:11px;font-weight:600;color:#c2410c}

        /* ── Exportar ── */
        .db-export-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
        .db-exp-btn{height:42px;padding:0 20px;border-radius:10px;border:1.5px solid;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .16s}
        .db-exp-csv{background:#f0fdf4;border-color:#86efac;color:#15803d}
        .db-exp-csv:hover{background:#dcfce7}
        .db-exp-xls{background:#f0f9ff;border-color:#7dd3fc;color:#0369a1}
        .db-exp-xls:hover{background:#dbeafe}

        /* ── Toggle gráfica ── */
        .db-chart-toggle{display:flex;gap:6px;margin-bottom:16px}
        .db-ctoggle-btn{flex:1;padding:7px 0;border-radius:8px;border:1.5px solid #e2e8f0;font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:700;cursor:pointer;transition:all .15s;background:#f8faff;color:#64748b}
        .db-ctoggle-btn.active{background:#1e40af;border-color:#1e40af;color:#fff}

        /* ── Footer ── */
        .db-footer{text-align:center;padding:18px;font-size:11px;color:#94a3b8}
      `}</style>

      <div className="db-root">

        {/* Navbar */}
        <nav className="db-nav">
          <div className="db-brand">
            <span className="db-brand-dot"/>
            SICOT · Dashboard
          </div>
          <div className="db-nav-r">
            <span className="db-nav-badge">Admin</span>
            <span className="db-nav-user">{user?.nombre || 'Admin'}</span>
            <button className="db-btn-logout" onClick={logout}>Cerrar sesión</button>
          </div>
        </nav>

        <div className="db-body">

          {/* ── Filtros ── */}
          <div className="db-filters">
            <div className="db-fgroup">
              <label className="db-flabel">Docente / Tutor</label>
              <select
                className="db-fsel"
                value={idDocente}
                onChange={e => setIdDocente(e.target.value)}
                disabled={cargandoDocentes || errorDocentes !== null}
              >
                {cargandoDocentes && <option value="">Cargando docentes...</option>}
                {errorDocentes && <option value="">Error al cargar docentes</option>}
                {!cargandoDocentes && !errorDocentes && (
                  <>
                    <option value="">— Selecciona un docente —</option>
                    {docentesOrdenados.map(d => (
                      <option key={d.id} value={d.id}>{d.nombre}</option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div className="db-fgroup">
              <label className="db-flabel">Periodo escolar</label>
              <select
                className="db-fsel"
                value={idPeriodo}
                onChange={e => setIdPeriodo(e.target.value)}
                disabled={cargandoPeriodos || errorPeriodos !== null}
              >
                {cargandoPeriodos && <option value="">Cargando periodos...</option>}
                {errorPeriodos && <option value="">Error al cargar periodos</option>}
                {!cargandoPeriodos && !errorPeriodos && (
                  <>
                    <option value="">— Selecciona un periodo —</option>
                    {periodos.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.nombre}{(p.activo === 1 || p.activo === true) ? " ★ Activo" : ""}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div className="db-fgroup">
              <label className="db-flabel">Grupo (Opcional)</label>
              <select
                className="db-fsel"
                value={idGrupo}
                onChange={e => setIdGrupo(e.target.value)}
                disabled={!idDocente || !idPeriodo || cargandoGrupos || errorGrupos !== null}
              >
                {!idDocente || !idPeriodo ? (
                  <option value="">Selecciona docente y periodo</option>
                ) : cargandoGrupos ? (
                  <option value="">Cargando grupos...</option>
                ) : errorGrupos ? (
                  <option value="">Error al cargar grupos</option>
                ) : grupos.length === 0 ? (
                  <option value="">Sin grupos disponibles</option>
                ) : (
                  <>
                    <option value="">— Todos los grupos —</option>
                    {grupos.map(g => (
                      <option key={g.id} value={g.id}>
                        {g.clave || `Grupo ${g.id}`}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          {/* ── Estado vacío ── */}
          {!loading && !error && !resultado && (
            <div className="db-empty">
              <div className="db-empty-icon">📊</div>
              <p className="db-empty-title">Selecciona un docente y periodo</p>
              <p className="db-empty-sub">Los resultados de la evaluación aparecerán aquí.</p>
            </div>
          )}

          {/* ── Loading ── */}
          {loading && (
            <div className="db-loading">
              <div className="db-spinner"/>
              <p className="db-loading-text">Cargando resultados…</p>
            </div>
          )}

          {/* ── Error ── */}
          {!loading && error && (
            <div className="db-error">
              <div className="db-error-icon">⚠️</div>
              <p className="db-error-title">No se pudieron cargar los resultados</p>
              <p className="db-error-msg">{error}</p>
              <button
                className="db-retry-btn"
                onClick={() => {
                  if (idDocente && idPeriodo) {
                    setLoading(true)
                    getResultadosDocenteAPI(Number(idDocente), Number(idPeriodo), idGrupo ? Number(idGrupo) : undefined)
                      .then(data => setResultado(data))
                      .catch(err => setError(err.message))
                      .finally(() => setLoading(false))
                  }
                }}
              >
                🔄 Reintentar
              </button>
            </div>
          )}

          {/* ── Resultados ── */}
          {!loading && !error && resultado && (() => {
            const cs = clasifStyle
            const grupoNombre = idGrupo ? grupos.find(g => g.id == idGrupo)?.clave : "Todos"
            return (
              <>
                {/* Fila 1: Resumen + Progreso */}
                <div className="db-grid">
                  <div className="db-card" style={{ borderColor:cs.border, background:cs.bg }}>
                    <p className="db-card-title"><span className="db-card-title-icon">🏅</span>Calificación general</p>
                    <div className="db-resumen">
                      <div className="db-score-circle" style={{ borderColor:cs.text, color:cs.text }}>
                        <span className="db-score-num">{resultado.promedioGeneral}</span>
                        <span className="db-score-max">/ 5.00</span>
                      </div>
                      <div className="db-resumen-info">
                        <p className="db-resumen-name">{resultado.docente.nombre}</p>
                        <p className="db-resumen-period">{resultado.periodo.nombre}</p>
                        <div className="db-clasif-badge" style={{ background:cs.badge, color:cs.text }}>
                          ★ {resultado.clasificacion}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="db-card">
                    <p className="db-card-title"><span className="db-card-title-icon">👥</span>Participación de alumnos</p>
                    <div style={{ display:"flex", gap:16, marginBottom:18 }}>
                      {[
                        { lbl:"Total",       val:resultado.totalAlumnos,        col:"#1e40af", bg:"#eff2ff" },
                        { lbl:"Completaron", val:resultado.completaron.length,  col:"#15803d", bg:"#f0fdf4" },
                        { lbl:"Pendientes",  val:resultado.faltantes.length,    col:"#c2410c", bg:"#fff7ed" },
                      ].map(m => (
                        <div key={m.lbl} style={{ flex:1, background:m.bg, borderRadius:12, padding:"12px 14px", textAlign:"center" }}>
                          <div style={{ fontSize:24, fontWeight:800, color:m.col }}>{m.val}</div>
                          <div style={{ fontSize:11, fontWeight:600, color:m.col, opacity:.75, textTransform:"uppercase", letterSpacing:".04em" }}>{m.lbl}</div>
                        </div>
                      ))}
                    </div>
                    <div className="db-prog-info">
                      <span style={{ color:"#15803d", fontWeight:700 }}>Completado</span>
                      <span style={{ color:"#15803d" }}>{pctCompleto}%</span>
                    </div>
                    <div className="db-prog-track">
                      <div className="db-prog-fill" style={{ "--w":`${pctCompleto}%` }}/>
                    </div>
                  </div>
                </div>

                {/* Fila 2: Gráfica + Tabla alumnos */}
                <div className="db-grid">
                  <div className="db-card">
                    <p className="db-card-title"><span className="db-card-title-icon">📈</span>Resultados por criterio</p>
                    <div className="db-chart-toggle">
                      <button className={`db-ctoggle-btn${vistaGraf==="barras"?" active":""}`} onClick={() => setVistaGraf("barras")}>▬ Barras</button>
                      <button className={`db-ctoggle-btn${vistaGraf==="radar"?" active":""}`}  onClick={() => setVistaGraf("radar")}>◉ Radar</button>
                    </div>
                    {vistaGraf === "barras"
                      ? <BarChart datos={resultado.promediosCat}/>
                      : (
                        <div>
                          <RadarChart datos={resultado.promediosCat}/>
                          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:10, justifyContent:"center" }}>
                            {CATEGORIAS.map((cat, i) => (
                              <span key={cat.id} style={{ fontSize:10.5, fontWeight:600, color:"#64748b", background:"#f1f5f9", borderRadius:5, padding:"2px 6px" }}>
                                {i+1}. {cat.nombre.split(" ").slice(0,3).join(" ")}…
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    }
                  </div>

                  <div className="db-card">
                    <p className="db-card-title"><span className="db-card-title-icon">👤</span>Lista de alumnos</p>
                    <div className="db-tabs">
                      <button className={`db-tab${tabAlumnos==="completaron"?" db-tab-active":""}`} onClick={() => setTabAlumnos("completaron")}>
                        ✅ Completaron ({resultado.completaron.length})
                      </button>
                      <button className={`db-tab${tabAlumnos==="faltantes"?" db-tab-active":""}`} onClick={() => setTabAlumnos("faltantes")}>
                        ⏳ Pendientes ({resultado.faltantes.length})
                      </button>
                    </div>
                    <div className="db-table-wrap">
                      <table className="db-table">
                        <thead>
                          <tr>
                            <th>No. Control</th>
                            <th>Nombre</th>
                            <th>Grupo</th>
                            <th>Carrera</th>
                            <th>Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(tabAlumnos === "completaron" ? resultado.completaron : resultado.faltantes).map(a => (
                            <tr key={a.numControl}>
                              <td><span className="db-nc">{a.numControl}</span></td>
                              <td style={{ fontWeight:600 }}>{a.nombre}</td>
                              <td><span className="db-chip-grupo">{a.grupo || "—"}</span></td>
                              <td><span className="db-chip-carrera">{a.carrera}</span></td>
                              <td>
                                {tabAlumnos === "completaron"
                                  ? <span style={{ color:"#15803d", fontWeight:700, fontSize:12 }}>✓ Completada</span>
                                  : <span className="db-chip-pend">⏳ Pendiente</span>
                                }
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="db-export-row">
                      <button className="db-exp-btn db-exp-csv" onClick={() => exportarCSV(resultado, grupoNombre)}>
                        <span>📄</span> Exportar CSV
                      </button>
                      <button className="db-exp-btn db-exp-xls" onClick={() => exportarExcel(resultado, grupoNombre)}>
                        <span>📊</span> Exportar Excel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Fila 3: Detalle por criterio */}
                <div className="db-card">
                  <p className="db-card-title"><span className="db-card-title-icon">📋</span>Detalle por criterio de evaluación</p>
                  <div style={{ overflowX:"auto" }}>
                    <table className="db-table" style={{ minWidth:600 }}>
                      <thead>
                        <tr>
                          <th style={{ width:30 }}>#</th>
                          <th>Criterio</th>
                          <th style={{ width:100, textAlign:"center" }}>Promedio</th>
                          <th style={{ width:130 }}>Clasificación</th>
                          <th style={{ width:160 }}>Nivel</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CATEGORIAS.map((cat, i) => {
                          const val   = resultado.promediosCat[cat.id] ?? 0
                          const cname = val>=4.5?"EXCELENTE":val>=3.5?"MUY BUENO":val>=2.5?"BUENO":val>=1.5?"REGULAR":"DEFICIENTE"
                          const cs2   = CLASIF_COLOR[cname]
                          const pct2  = (val / 5) * 100
                          return (
                            <tr key={cat.id}>
                              <td style={{ fontWeight:800, color:"#94a3b8" }}>{i+1}</td>
                              <td style={{ fontWeight:600, color:"#0f172a" }}>{cat.nombre}</td>
                              <td style={{ textAlign:"center", fontWeight:800, color:cs2.text, fontSize:16 }}>{val.toFixed(1)}</td>
                              <td>
                                <span style={{ background:cs2.badge, color:cs2.text, borderRadius:6, padding:"3px 8px", fontSize:11, fontWeight:800, textTransform:"uppercase" }}>{cname}</span>
                              </td>
                              <td>
                                <div style={{ height:7, background:"#f1f5f9", borderRadius:99, overflow:"hidden" }}>
                                  <div style={{ height:"100%", width:`${pct2}%`, background:CAT_COLORS[i], borderRadius:99, transition:"width .6s ease" }}/>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )
          })()}
        </div>

        <footer className="db-footer">© 2026 · ITSSNP · Sistema de Evaluación Docente · SWATCorps</footer>
      </div>
    </>
  )
}
