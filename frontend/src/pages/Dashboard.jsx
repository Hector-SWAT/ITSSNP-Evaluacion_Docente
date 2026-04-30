import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  CATEGORIAS,
  getDocentesAPI,
  getPeriodosAPI,
  getGruposAPI,
  getResultadosDocenteAPI,
} from "../services/evaluacionData"
import ConfiguracionEvaluacion from "./admin/ConfiguracionEvaluacion"
import jsPDF from 'jspdf'
import 'jspdf-autotable'

/* ─── API departamentos ──────────────────────────────────── */
const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:3001'
  }
  return window.location.origin
}
const API_URL = getApiUrl()

function getToken() { return localStorage.getItem('token') }
function getHeaders() { return { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' } }

async function getDepartamentosAPI(idPeriodo) {
  const response = await fetch(`${API_URL}/api/dashboard/departamentos?idPeriodo=${idPeriodo}`, { headers: getHeaders() })
  if (response.status === 401) throw new Error('Sesión expirada')
  if (!response.ok) { const e = await response.json().catch(() => ({})); throw new Error(e.error || 'Error al obtener departamentos') }
  const data = await response.json()
  return data.departamentos || []
}

async function getComentariosTutorAPI(idTutor, idPeriodo) {
  try {
    const response = await fetch(`${API_URL}/api/dashboard/docentes/${idTutor}/comentarios?idPeriodo=${idPeriodo}`, { headers: getHeaders() })
    if (response.ok) {
      const data = await response.json()
      return data.comentarios || []
    }
  } catch (error) {
    console.error('Error obteniendo comentarios:', error)
  }
  return []
}

/* ─── Colores clasificación ──────────────────────────────── */
const CLASIF_COLOR = {
  EXCELENTE:   { bg:"#f0fdf4", border:"#86efac", text:"#15803d", badge:"#dcfce7" },
  "MUY BUENO": { bg:"#f0f9ff", border:"#7dd3fc", text:"#0369a1", badge:"#dbeafe" },
  BUENO:       { bg:"#fffbeb", border:"#fcd34d", text:"#b45309", badge:"#fef3c7" },
  REGULAR:     { bg:"#fff7ed", border:"#fdba74", text:"#c2410c", badge:"#ffedd5" },
  DEFICIENTE:  { bg:"#fef2f2", border:"#fca5a5", text:"#b91c1c", badge:"#fee2e2" },
  "SIN DATOS": { bg:"#f8fafc", border:"#e2e8f0", text:"#94a3b8", badge:"#f1f5f9" },
}

const CAT_COLORS = ["#2563eb","#7c3aed","#0891b2","#059669","#d97706","#dc2626","#db2777","#16a34a","#9333ea"]

function clasifFromVal(val) {
  return val >= 4.5 ? "EXCELENTE" : val >= 3.5 ? "MUY BUENO" : val >= 2.5 ? "BUENO" : val >= 1.5 ? "REGULAR" : val > 0 ? "DEFICIENTE" : "SIN DATOS"
}

/* ─── Bar Chart ──────────────────────────────────────────── */
function BarChart({ datos }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {CATEGORIAS.map((cat, i) => {
        const val = datos[cat.id] ?? 0
        const col = CLASIF_COLOR[clasifFromVal(val)]
        return (
          <div key={cat.id}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
              <span style={{ fontSize:11.5, fontWeight:600, color:"#475569", flex:1, minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", paddingRight:8 }}>
                {i + 1}. {cat.nombre}
              </span>
              <span style={{ fontSize:13, fontWeight:800, color:col.text, flexShrink:0 }}>{val.toFixed(1)}</span>
            </div>
            <div style={{ height:8, background:"#f1f5f9", borderRadius:99, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${(val/5)*100}%`, background:CAT_COLORS[i], borderRadius:99, transition:"width .6s cubic-bezier(.16,1,.3,1)" }}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Radar Chart ────────────────────────────────────────── */
function RadarChart({ datos, size = 260 }) {
  const cx = size / 2, cy = size / 2, R = size * 0.38, n = CATEGORIAS.length
  const angle = (i) => (i * 2 * Math.PI) / n - Math.PI / 2
  const pt = (i, r) => ({ x: cx + r * Math.cos(angle(i)), y: cy + r * Math.sin(angle(i)) })
  const dataPoints = CATEGORIAS.map((cat, i) => pt(i, ((datos[cat.id] ?? 0) / 5) * R))
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width:"100%", maxWidth:size, display:"block", margin:"0 auto" }}>
      {[1,2,3,4,5].map(r => {
        const pts = CATEGORIAS.map((_, i) => pt(i, (r/5)*R))
        return <path key={r} d={pts.map((p,i)=>`${i===0?"M":"L"}${p.x} ${p.y}`).join(" ")+"Z"} fill="none" stroke="#e2e8f0" strokeWidth={1}/>
      })}
      {CATEGORIAS.map((_, i) => { const e = pt(i, R); return <line key={i} x1={cx} y1={cy} x2={e.x} y2={e.y} stroke="#e2e8f0" strokeWidth={1}/> })}
      <polygon points={dataPoints.map(p=>`${p.x},${p.y}`).join(" ")} fill="rgba(37,99,235,.18)" stroke="#2563eb" strokeWidth={2.2} strokeLinejoin="round"/>
      {dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={4} fill="#2563eb" stroke="#fff" strokeWidth={1.5}/>)}
      {CATEGORIAS.map((_, i) => { const lp = pt(i, R+20); return <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontWeight={700} fill="#475569">{i+1}</text> })}
    </svg>
  )
}

/* ─── Export CSV / Excel ─────────────────────────────────── */
function exportarCSV(resultado, grupoLabel) {
  if (!resultado) return
  const { tutor, periodo, promediosCat, promedioGeneral, clasificacion, completaron, faltantes } = resultado
  const rows = [
    ["SISTEMA DE EVALUACIÓN DOCENTE — ITSSNP"], ["Tutor(a):", tutor.nombre], ["Periodo:", periodo.nombre],
    ...(grupoLabel ? [["Grupo:", grupoLabel]] : []),
    ["Promedio:", promedioGeneral, "Clasificación:", clasificacion], [],
    ["#","Criterio","Promedio"], ...CATEGORIAS.map((c,i)=>[i+1,c.nombre,promediosCat[c.id]?.toFixed(2)??"—"]),
    [], ["COMPLETARON"], ["No.Control","Nombre","Grupo","Carrera"],
    ...completaron.map(a=>[a.numControl || a.num_control, a.nombre || a.nombre_completo, a.grupo || a.Clave || a.clave ||"—", a.carrera || a.Carrera || a.carrera_nombre]),
    [], ["PENDIENTES"], ["No.Control","Nombre","Grupo","Carrera"],
    ...faltantes.map(a=>[a.numControl || a.num_control, a.nombre || a.nombre_completo, a.grupo || a.Clave || a.clave ||"—", a.carrera || a.Carrera || a.carrera_nombre]),
  ]
  const a = document.createElement("a")
  a.href = URL.createObjectURL(new Blob(["\uFEFF"+rows.map(r=>r.map(c=>`"${String(c??"").replace(/"/g,'""')}"`).join(",")).join("\n")], { type:"text/csv;charset=utf-8;" }))
  a.download = `evaluacion_${tutor.nombre.replace(/\s+/g,"_")}.csv`; a.click()
}

function exportarExcel(resultado, grupoLabel) {
  if (!resultado) return
  const { tutor, periodo, promediosCat, promedioGeneral, clasificacion, completaron, faltantes } = resultado
  const cell = (v) => `<Cell><Data ss:Type="String">${String(v??"").replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</Data></Cell>`
  const numCell = (v) => `<Cell><Data ss:Type="Number">${v}</Data></Cell>`
  const xml = `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="Resultados"><Table>
<Row><Cell><Data ss:Type="String">Tutor(a): ${tutor.nombre}</Data></Cell></Row>
<Row><Cell><Data ss:Type="String">Periodo: ${periodo.nombre}</Data></Cell></Row>
${grupoLabel?`<Row><Cell><Data ss:Type="String">Grupo: ${grupoLabel}</Data></Cell></Row>`:""}
<Row><Cell><Data ss:Type="String">Promedio: ${promedioGeneral}</Data></Cell><Cell><Data ss:Type="String">Clasificación: ${clasificacion}</Data></Cell></Row>
<Row/>${CATEGORIAS.map((c,i)=>`<Row>${numCell(i+1)}${cell(c.nombre)}${numCell((promediosCat[c.id]??0).toFixed(2))}</Row>`).join("")}
<Row/><Row><Cell><Data ss:Type="String">COMPLETARON</Data></Cell></Row>
${completaron.map(a=>`<Row>${numCell(a.numControl || a.num_control)}${cell(a.nombre || a.nombre_completo)}${cell(a.grupo || a.Clave || a.clave ||"—")}${cell(a.carrera || a.Carrera || a.carrera_nombre)}</Row>`).join("")}
<Row/><Row><Cell><Data ss:Type="String">PENDIENTES</Data></Cell></Row>
${faltantes.map(a=>`<Row>${numCell(a.numControl || a.num_control)}${cell(a.nombre || a.nombre_completo)}${cell(a.grupo || a.Clave || a.clave ||"—")}${cell(a.carrera || a.Carrera || a.carrera_nombre)}</Row>`).join("")}
</Table></Worksheet></Workbook>`
  const a = document.createElement("a")
  a.href = URL.createObjectURL(new Blob([xml], { type:"application/vnd.ms-excel;charset=utf-8;" }))
  a.download = `evaluacion_${tutor.nombre.replace(/\s+/g,"_")}.xls`; a.click()
}
/* ─── Export PDF ─────────────────────────────────────────── 
   INTEGRACIÓN: Logos JPG desde URLs (ITSSNP izquierda, División derecha),
   PORTADA completa, ENCABEZADO institucional con logos,
   GRÁFICA DE BARRAS HORIZONTAL del 1er código (colores originales, izq-der),
   COMENTARIOS, FIRMAS C.c.p., NUMERACIÓN DE PÁGINAS
──────────────────────────────────────────────────────────── */
async function exportarPDF(resultado, grupoLabel, comentarios = []) {
  if (!resultado) return

  const { tutor, periodo, promediosCat, promedioGeneral, clasificacion, completaron, faltantes } = resultado

  // ── Datos dinámicos del tutor ──────────────────────────
  const divisionTutor   = tutor.departamento || tutor.division || tutor.carrera || "Ingeniería"
  const periodoNombre   = periodo.Nombre || periodo.nombre || `Periodo ${periodo.id}`
  const grupoAsignado   = grupoLabel || tutor.grupo || tutor.Grupo || "Todos los grupos"

  // ── Cargar imágenes JPG desde URLs y convertirlas a base64 ──
  const loadImageAsBase64 = async (url) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    } catch (error) {
      console.error('Error cargando imagen:', error)
      return null
    }
  }

  // URLs de las imágenes JPG
  const LOGO_ITSSNP_URL = 'https://i.postimg.cc/tT5YDgZx/Logo-ITSSNP.jpg'
  const LOGO_DIVISION_URL = 'https://i.postimg.cc/HL8DTdsK/logo-DIVIICION-fotor-enhance-2026043071937-fotor-enhance-2026043072020.jpg'

  // Cargar ambas imágenes en paralelo
  const [logoItssnpBase64, logoDivisionBase64] = await Promise.all([
    loadImageAsBase64(LOGO_ITSSNP_URL),
    loadImageAsBase64(LOGO_DIVISION_URL)
  ])

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  })

  const pageWidth  = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin     = 15

  /* ══════════════════════════════════════════════════════════
     ENCABEZADO INSTITUCIONAL CON LOGOS JPG
     [LOGO ITSSNP - IZQUIERDA] | [TEXTO CENTRAL] | [LOGO DIVISIÓN - DERECHA]
  ══════════════════════════════════════════════════════════ */
  const addHeader = (doc) => {
    const w = doc.internal.pageSize.getWidth()
    doc.autoTable({
      startY: 5,
      body: [[
        { content: '', styles: { cellWidth: 22, minCellHeight: 22 } },
        {
          content: 'Instituto Tecnológico Superior de la Sierra Norte de Puebla\nFORMATO: RESULTADOS DE EVALUACIÓN DE PERSONA TUTORA\nPOR ALUMNO',
          styles: { halign: 'center', fontStyle: 'bold', fontSize: 9, cellWidth: 'auto', minCellHeight: 22 }
        },
        { content: '', styles: { cellWidth: 22, minCellHeight: 22 } },
      ]],
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2, valign: 'middle' },
      margin: { left: margin, right: margin },
      tableWidth: w - margin * 2,
      didDrawCell: (data) => {
        // Logo ITSSNP a la izquierda
        if (data.column.index === 0 && data.row.index === 0 && logoItssnpBase64) {
          doc.addImage(logoItssnpBase64, 'JPEG', data.cell.x + 1, data.cell.y + 1, 20, 20)
        }
        // Logo División a la derecha
        if (data.column.index === 2 && data.row.index === 0 && logoDivisionBase64) {
          doc.addImage(logoDivisionBase64, 'JPEG', data.cell.x + 1, data.cell.y + 1, 20, 20)
        }
      }
    })
    const headerBottom = pdf.lastAutoTable.finalY
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text('Rev. 01 (ITSSNP-AC-PA-03-8)', w - margin, headerBottom + 4, { align: 'right' })
    return headerBottom + 8
  }

  /* ── Pie de página ────────────────────────────────────── */
  const addFooter = (doc, pageNum, totalPages) => {
    const w = doc.internal.pageSize.getWidth()
    const h = doc.internal.pageSize.getHeight()
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text('Rev. 01', margin, h - 8)
    doc.text(`(ITSSNP-AC-PA-03-8)`, w - margin, h - 8, { align: 'right' })
    doc.text(`Página ${pageNum} de ${totalPages}`, w / 2, h - 8, { align: 'center' })
  }

  /* ════════════════════════════════════════════════════════
     PORTADA — Primera página del documento
  ════════════════════════════════════════════════════════ */
  pdf.setFontSize(26)
  pdf.setFont('helvetica', 'bold')
  pdf.text('SISTEMA DE EVALUACIÓN', pageWidth / 2, 70, { align: 'center' })
  pdf.setFontSize(24)
  pdf.text('DE TUTORÍAS', pageWidth / 2, 85, { align: 'center' })

  pdf.setFontSize(16)
  pdf.setFont('helvetica', 'normal')
  pdf.text('ITSSNP', pageWidth / 2, 105, { align: 'center' })

  pdf.setFontSize(14)
  pdf.text('Resultados de Evaluación de', pageWidth / 2, 130, { align: 'center' })
  pdf.setFontSize(18)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PERSONA TUTORA', pageWidth / 2, 145, { align: 'center' })

  pdf.setDrawColor(0, 102, 204)
  pdf.setLineWidth(0.8)
  pdf.line(pageWidth / 2 - 60, 158, pageWidth / 2 + 60, 158)

  // ── Datos de portada con valores reales ───────────────
  pdf.setFontSize(11)
  pdf.setFont('helvetica', 'normal')
  const infoY = 175
  pdf.text(`División Académica / Departamento: ${divisionTutor}`, margin, infoY)
  pdf.text(`Periodo a evaluar: ${periodoNombre}`, margin, infoY + 10)
  pdf.text(`Tipo de evaluación: Persona Tutora por Alumno`, margin, infoY + 20)
  pdf.text(`Persona Tutora: ${tutor.nombre}`, margin, infoY + 30)
  pdf.text(`Grupo evaluado: ${grupoAsignado}`, margin, infoY + 40)

  pdf.setFontSize(9)
  pdf.text(
    `Fecha de generación: ${new Date().toLocaleDateString('es-MX')}`,
    pageWidth - margin,
    pageHeight - 25,
    { align: 'right' }
  )

  // ── Pie institucional de portada ───────────────────────
  pdf.setFontSize(8)
  pdf.text(
    'C.c.p. Personal Tutor Evaluado – Jefa de Departamento de Desarrollo Académico – Expediente de material de apoyo',
    pageWidth / 2,
    pageHeight - 15,
    { align: 'center' }
  )

  /* ════════════════════════════════════════════════════════
     PÁGINA 2 — Tabla de criterios + Gráfica de barras HORIZONTAL
  ════════════════════════════════════════════════════════ */
  pdf.addPage()
  let y = addHeader(pdf)

  // Tabla de criterios
  const tableData = CATEGORIAS.map((cat, i) => {
    const val   = promediosCat[cat.id] ?? 0
    const cname = clasifFromVal(val)
    return [cat.nombre, val.toFixed(2), cname]
  })
  // Agregar fila de PROMEDIO al final
  tableData.push([
    { content: 'PROMEDIO', styles: { halign: 'right', fontStyle: 'bold' } },
    promedioGeneral.toFixed(2),
    clasificacion
  ])

  pdf.autoTable({
    startY: y,
    head: [['CRITERIO EVALUADO', 'PUNTAJE', 'CALIFICACIÓN']],
    body: tableData,
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 3, valign: 'middle' },
    headStyles: { fillColor: [13, 71, 161], textColor: [255, 255, 255], fontSize: 9, fontStyle: 'bold', halign: 'center' },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 22, halign: 'center' },
      2: { cellWidth: 38, halign: 'center' }
    },
    didParseCell: (data) => {
      if (data.row.index === tableData.length - 1) {
        data.cell.styles.fontStyle = 'bold'
      }
    },
    margin: { left: margin, right: margin }
  })

  y = pdf.lastAutoTable.finalY + 8

  /* ── GRÁFICA DE BARRAS HORIZONTAL (ESTILO DEL 1ER CÓDIGO) ── 
     Usa los mismos colores y disposición izquierda-derecha  */
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('RESULTADOS REPRESENTADOS CON GRÁFICA', margin, y)
  y += 8

  const chartWidth = pageWidth - margin * 2 - 40 // ancho para las barras
  const barHeight  = 5
  const gap        = 2

  CATEGORIAS.forEach((cat, i) => {
    const val    = promediosCat[cat.id] ?? 0
    const barW   = (val / 5) * chartWidth

    // Control de salto de página
    if (y > pageHeight - 25 && i < CATEGORIAS.length - 1) {
      pdf.addPage()
      y = addHeader(pdf) + 5
    }

    // Número de criterio
    pdf.setFontSize(7)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${i + 1}.`, margin + 2, y + 3)

    // Barra de color (usando CAT_COLORS del código original)
    pdf.setFillColor(CAT_COLORS[i % CAT_COLORS.length])
    pdf.rect(margin + 12, y, barW, barHeight, 'F')

    // Valor numérico
    pdf.setFontSize(7)
    pdf.setFont('helvetica', 'bold')
    pdf.text(val.toFixed(1), margin + 12 + barW + 2, y + 3)

    y += barHeight + gap
  })

  y += 10

  /* ════════════════════════════════════════════════════════
     PÁGINA 3 — Comentarios + Firmas C.c.p.
  ════════════════════════════════════════════════════════ */
  pdf.addPage()
  y = addHeader(pdf)

  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'bold')
  pdf.text('COMENTARIOS DE LA COMUNIDAD ESTUDIANTIL A QUIEN IMPARTIÓ TUTORÍA', margin, y)
  y += 8

  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'normal')

  if (comentarios && comentarios.length > 0) {
    comentarios.forEach((com) => {
      const texto = com.Comentario || com.comentario || ''
      if (!texto.trim()) return
      const text  = `• "${texto}"`
      const lines = pdf.splitTextToSize(text, pageWidth - margin * 2 - 6)
      if (y + lines.length * 5 > pageHeight - 55) {
        pdf.addPage()
        y = addHeader(pdf)
      }
      pdf.text(lines, margin + 3, y)
      y += lines.length * 5 + 2
    })
  } else {
    pdf.text('No hay comentarios registrados para este tutor(a).', margin, y)
    y += 10
  }

  /* ── Bloque de firma ──────────────────────────────────── */
  const firmaMinY = pageHeight - 55
  const firmaY    = Math.max(y + 15, firmaMinY)

  if (firmaY > pageHeight - 45) {
    pdf.addPage()
    addHeader(pdf)
  }

  const fy  = Math.min(firmaY, pageHeight - 48)
  const sigX = pageWidth / 2
  pdf.setDrawColor(150, 150, 150)
  pdf.setLineWidth(0.3)
  pdf.line(sigX - 50, fy, sigX + 50, fy)
  pdf.setFontSize(9)
  pdf.setFont('helvetica', 'bold')
  pdf.text('M.I.A. Liliana Pérez González', sigX, fy + 5, { align: 'center' })
  pdf.setFont('helvetica', 'normal')
  pdf.text('Jefa de Departamento de Desarrollo Académico', sigX, fy + 10, { align: 'center' })

  // C.c.p. estructura
  const ccpY = pageHeight - 24
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'bold')
  pdf.text(`C.c.p. ${tutor.nombre} – Personal Docente Evaluado`, margin, ccpY)
  pdf.setFont('helvetica', 'normal')
  const jefaDivision = tutor.jefeDivision || `Jefe(a) de División de ${divisionTutor}`
  pdf.text(`     ${jefaDivision} – Psc.`, margin, ccpY + 5)
  pdf.text(`     Expediente de material de apoyo de Departamento de Desarrollo Académico`, margin, ccpY + 10)

  /* ── Numeración de páginas ───── */
  const pageCount = pdf.internal.getNumberOfPages()
  for (let i = 2; i <= pageCount; i++) {
    pdf.setPage(i)
    addFooter(pdf, i - 1, pageCount - 1)
  }

  pdf.save(`Evaluacion_Tutor_${tutor.nombre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`)
}
/* ─── Tarjetas de departamentos ──────────────────────────── 
   CORRECCIÓN: se filtra cualquier departamento cuyo nombre sea
   nulo, vacío, o exactamente "SIN NOMBRE" (case-insensitive).
──────────────────────────────────────────────────────────── */
function esDepartamentoValido(nombre) {
  if (!nombre) return false
  const n = String(nombre).trim().toUpperCase()
  return n !== "" && n !== "SIN NOMBRE" && n !== "SIN DEPARTAMENTO"
}

function TarjetasDepartamentos({ idPeriodo, onVerTutor }) {
  const [deptos,   setDeptos]   = useState([])
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    if (!idPeriodo) { setDeptos([]); return }
    setLoading(true); setError(null)
    getDepartamentosAPI(idPeriodo)
      .then(data => {
        // ── Filtrar departamentos sin nombre válido ──────
        const validos = data.filter(d => esDepartamentoValido(d.nombre))
        setDeptos(validos)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [idPeriodo])

  if (!idPeriodo) return null

  if (loading) return (
    <div className="db-depto-wrap">
      <div className="db-depto-header">
        <span className="db-depto-title">🏢 Estadísticas por departamento</span>
        <div className="db-spinner-sm"/>
      </div>
    </div>
  )

  if (error) return (
    <div className="db-depto-wrap">
      <div className="db-depto-header">
        <span className="db-depto-title">🏢 Estadísticas por departamento</span>
        <span style={{ fontSize:12, color:"#ef4444" }}>⚠️ {error}</span>
      </div>
    </div>
  )

  if (!deptos.length) return null

  return (
    <div className="db-depto-wrap">
      <div className="db-depto-header">
        <span className="db-depto-title">🏢 Estadísticas por departamento</span>
        <span className="db-depto-sub">{deptos.length} departamentos · ordenados por promedio</span>
      </div>

      <div className="db-depto-cards">
        {deptos.map((d, idx) => {
          const cs      = CLASIF_COLOR[d.clasificacion] ?? CLASIF_COLOR["SIN DATOS"]
          const pctEval = d.totalDocentes > 0 ? Math.round((d.docentesEvaluados / d.totalDocentes) * 100) : 0
          const isExp   = expanded === d.nombre
          const medalIcon = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : null

          return (
            <div
              key={d.nombre}
              className="db-depto-card"
              style={{ borderColor: isExp ? cs.text : cs.border, background: isExp ? cs.bg : "#fff" }}
            >
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:10 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  {medalIcon && <span style={{ fontSize:14 }}>{medalIcon} </span>}
                  <span style={{ fontSize:12, fontWeight:800, color:"#0f172a", lineHeight:1.3 }}>{d.nombre}</span>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <div style={{ fontSize:22, fontWeight:800, color:cs.text, lineHeight:1 }}>{d.promedioGeneral?.toFixed(2)}</div>
                  <div style={{ fontSize:9, color:cs.text, fontWeight:700, opacity:.7 }}>/ 5.00</div>
                </div>
              </div>

              <div style={{ marginBottom:10 }}>
                <span style={{ background:cs.badge, color:cs.text, borderRadius:5, padding:"2px 7px", fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:".04em" }}>
                  {d.clasificacion}
                </span>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:10 }}>
                {[
                  { lbl:"Tutores",       val:`${d.docentesEvaluados}/${d.totalDocentes}`, sub:`${pctEval}% eval.` },
                  { lbl:"Participación", val:`${d.participacionAlumnos}%`,                sub:"alumnos" },
                ].map(s => (
                  <div key={s.lbl} style={{ background:"#f8faff", borderRadius:8, padding:"6px 8px" }}>
                    <div style={{ fontSize:13, fontWeight:800, color:"#0f172a" }}>{s.val}</div>
                    <div style={{ fontSize:10, color:"#64748b", fontWeight:600 }}>{s.lbl}</div>
                    <div style={{ fontSize:9,  color:"#94a3b8" }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{ height:4, background:"#f1f5f9", borderRadius:99, overflow:"hidden", marginBottom:10 }}>
                <div style={{ height:"100%", width:`${(d.promedioGeneral/5)*100}%`, background:cs.text, borderRadius:99, transition:"width .7s ease" }}/>
              </div>

              <button
                onClick={() => setExpanded(isExp ? null : d.nombre)}
                style={{ width:"100%", padding:"5px 0", background: isExp ? cs.text : "#f1f5ff", border:`1.5px solid ${isExp ? cs.text : "#c7d2fe"}`, borderRadius:7, fontSize:11, fontWeight:700, color: isExp ? "#fff" : "#1e40af", cursor:"pointer", transition:"all .15s" }}
              >
                {isExp ? "▲ Cerrar ranking" : `▼ Ver ranking (${d.docentes?.length ?? 0})`}
              </button>

              {isExp && (
                <div style={{ marginTop:10, borderTop:`1px solid ${cs.border}`, paddingTop:10, display:"flex", flexDirection:"column", gap:6 }}>
                  {[...(d.docentes || [])].sort((a,b) => b.promedio - a.promedio).map((tutor, rank) => {
                    const dcs      = CLASIF_COLOR[tutor.clasificacion] ?? CLASIF_COLOR["SIN DATOS"]
                    const rankIcon = rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : `${rank+1}.`
                    return (
                      <div key={tutor.id} style={{ background:"#fff", border:"1px solid #e8eeff", borderRadius:8, padding:"8px 10px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                          <span style={{ fontSize:rank<3?13:11, fontWeight:800, minWidth:20 }}>{rankIcon}</span>
                          <span style={{ fontSize:11, fontWeight:700, color:"#0f172a", flex:1, minWidth:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{tutor.nombre}</span>
                          <span style={{ fontSize:13, fontWeight:800, color:dcs.text, flexShrink:0 }}>{tutor.promedio?.toFixed(2)}</span>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:6 }}>
                          <span style={{ background:dcs.badge, color:dcs.text, borderRadius:4, padding:"1px 6px", fontSize:9, fontWeight:800, textTransform:"uppercase" }}>{tutor.clasificacion}</span>
                          <span style={{ fontSize:10, color:"#94a3b8" }}>{tutor.alumnosCompletaron}/{tutor.totalAlumnos} alumnos</span>
                          <button
                            onClick={() => onVerTutor(tutor.id)}
                            style={{ background:"#1e40af", border:"none", borderRadius:5, padding:"3px 8px", fontSize:10, fontWeight:700, color:"#fff", cursor:"pointer" }}
                          >
                            Ver →
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const navigate         = useNavigate()
  const { user, logout } = useAuth()

  const [tutores,    setTutores]    = useState([])
  const [periodos,   setPeriodos]   = useState([])
  const [grupos,     setGrupos]     = useState([])
  const [comentarios,setComentarios]= useState([])

  const [idDepartamento, setIdDepartamento] = useState("")
  const [idTutor,        setIdTutor]        = useState("")
  const [idPeriodo,      setIdPeriodo]      = useState("")
  const [idGrupo,        setIdGrupo]        = useState("")

  const [resultado, setResultado] = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState(null)

  const [cargandoTutores,  setCargandoTutores]  = useState(true)
  const [cargandoPeriodos, setCargandoPeriodos] = useState(true)
  const [cargandoGrupos,   setCargandoGrupos]   = useState(false)
  const [errorTutores,     setErrorTutores]     = useState(null)
  const [errorPeriodos,    setErrorPeriodos]    = useState(null)
  const [errorGrupos,      setErrorGrupos]      = useState(null)

  const [tabAlumnos, setTabAlumnos] = useState("completaron")
  const [vistaGraf,  setVistaGraf]  = useState("barras")
  const [tabActivo,  setTabActivo]  = useState("resultados")

  // ── Filtrar tutores sin departamento válido en los selects ──
  const tutoresValidos     = tutores.filter(t => esDepartamentoValido(t.departamento))
  const departamentos      = [...new Set(tutoresValidos.map(t => t.departamento))].sort()
  const tutoresFiltrados   = idDepartamento
    ? tutoresValidos.filter(t => t.departamento === idDepartamento)
    : tutoresValidos
  const tutorSeleccionado  = tutores.find(t => String(t.id) === String(idTutor))

  const grupoLabel = idGrupo ? (() => {
    const grupo = grupos.find(g => String(g.id) === String(idGrupo))
    return grupo ? (grupo.Clave || grupo.clave || `Grupo ${grupo.id}`) : null
  })() : null

  const cargarComentarios = useCallback(async () => {
    if (idTutor && idPeriodo) {
      const comentariosData = await getComentariosTutorAPI(Number(idTutor), Number(idPeriodo))
      setComentarios(comentariosData)
    }
  }, [idTutor, idPeriodo])

  useEffect(() => {
    if (!user || user.tipo !== "admin") navigate("/login", { replace: true })
  }, [user, navigate])

  const recargarDatos = useCallback(async () => {
    try {
      const tutoresData      = await getDocentesAPI()
      setTutores(tutoresData)
      const periodosData     = await getPeriodosAPI()
      const periodosOrdenados = [...periodosData].sort((a, b) => b.id - a.id)
      setPeriodos(periodosOrdenados)
      const activo = periodosOrdenados.find(p => p.activo === 1 || p.activo === true)
      if (activo && !idPeriodo) setIdPeriodo(String(activo.id))
    } catch (err) {
      console.error("Error recargando datos:", err)
    }
  }, [idPeriodo])

  useEffect(() => {
    if (!user || user.tipo !== "admin") return
    const cargar = async () => {
      try {
        setCargandoTutores(true)
        setTutores(await getDocentesAPI())
        setErrorTutores(null)
      } catch (err) {
        setErrorTutores(err.message)
        if (err.message.includes("401")) navigate("/login", { replace: true })
      } finally { setCargandoTutores(false) }

      try {
        setCargandoPeriodos(true)
        const pers = await getPeriodosAPI()
        const periodosOrdenados = [...pers].sort((a, b) => b.id - a.id)
        setPeriodos(periodosOrdenados)
        setErrorPeriodos(null)
        const activo = periodosOrdenados.find(p => p.activo === 1 || p.activo === true)
        if (activo) setIdPeriodo(String(activo.id))
      } catch (err) {
        setErrorPeriodos(err.message)
        if (err.message.includes("401")) navigate("/login", { replace: true })
      } finally { setCargandoPeriodos(false) }
    }
    cargar()
  }, [user, navigate])

  useEffect(() => {
    setIdTutor(""); setIdGrupo(""); setGrupos([]); setResultado(null); setError(null); setComentarios([])
  }, [idDepartamento])

  useEffect(() => {
    if (!idTutor || !idPeriodo) { setGrupos([]); setIdGrupo(""); return }
    setCargandoGrupos(true)
    getGruposAPI(Number(idTutor), Number(idPeriodo))
      .then(g => {
        const gruposConClave = g.map(grupo => ({
          ...grupo,
          Clave: grupo.Clave || grupo.clave || `Grupo ${grupo.id}`
        }))
        setGrupos(gruposConClave)
        setErrorGrupos(null)
        setIdGrupo("")
      })
      .catch(err => { setErrorGrupos(err.message); setGrupos([]); setIdGrupo("") })
      .finally(() => setCargandoGrupos(false))
  }, [idTutor, idPeriodo])

  useEffect(() => {
    if (!idTutor || !idPeriodo) { setResultado(null); setError(null); return }
    setLoading(true); setError(null); setResultado(null)
    getResultadosDocenteAPI(Number(idTutor), Number(idPeriodo), idGrupo ? Number(idGrupo) : undefined)
      .then(async (data) => {
        setResultado({ ...data, tutor: data.docente, docente: undefined })
        const comentariosData = await getComentariosTutorAPI(Number(idTutor), Number(idPeriodo))
        setComentarios(comentariosData)
      })
      .catch(err => { setError(err.message); if (err.message.includes("401")) navigate("/login", { replace: true }) })
      .finally(() => setLoading(false))
  }, [idTutor, idPeriodo, idGrupo, navigate])

  const handleVerTutor = useCallback((tutorId) => {
    setIdTutor(String(tutorId))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const cs          = resultado ? (CLASIF_COLOR[resultado.clasificacion] ?? CLASIF_COLOR["SIN DATOS"]) : {}
  const pctCompleto = resultado ? Math.round((resultado.completaron.length / resultado.totalAlumnos) * 100) : 0

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap" rel="stylesheet" />

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{height:100%}
        @keyframes _fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes _barIn{from{width:0}to{width:var(--w)}}
        @keyframes _spin{to{transform:rotate(360deg)}}
        @keyframes _slideIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}

        .db-root{font-family:'DM Sans',sans-serif;min-height:100dvh;background:#f0f4ff;display:flex;flex-direction:column}

        .db-nav{background:linear-gradient(135deg,#0d2660 0%,#1648b8 55%,#0b7ec9 100%);height:64px;padding:0 clamp(16px,4vw,48px);display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 18px rgba(0,0,0,.28);position:sticky;top:0;z-index:10}
        .db-brand{display:flex;align-items:center;gap:10px;font-size:15px;font-weight:700;color:#fff}
        .db-brand-dot{width:9px;height:9px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e}
        .db-nav-r{display:flex;align-items:center;gap:10px}
        .db-nav-user{font-size:13px;color:rgba(255,255,255,.72)}
        .db-nav-badge{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:4px 10px;font-size:11.5px;font-weight:700;color:#fbbf24;text-transform:uppercase;letter-spacing:.04em}
        .db-btn-logout{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:5px 14px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#fff;cursor:pointer;transition:background .15s}
        .db-btn-logout:hover{background:rgba(255,255,255,.24)}

        .db-body{flex:1;padding:clamp(18px,3vw,40px) clamp(14px,4vw,48px);display:flex;flex-direction:column;gap:20px;max-width:1200px;width:100%;margin:0 auto}

        .db-depto-wrap{background:#fff;border:1.5px solid #e8eeff;border-radius:18px;padding:20px 22px;animation:_fadeUp .35s ease both}
        .db-depto-header{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:16px}
        .db-depto-title{font-size:13px;font-weight:800;color:#0f172a;display:flex;align-items:center;gap:6px}
        .db-depto-sub{font-size:11.5px;color:#94a3b8;font-weight:500}
        .db-spinner-sm{width:18px;height:18px;border:2px solid #e8eeff;border-top-color:#2563eb;border-radius:50%;animation:_spin .7s linear infinite;flex-shrink:0}

        .db-depto-cards{display:flex;gap:14px;overflow-x:auto;padding-bottom:6px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
        .db-depto-cards::-webkit-scrollbar{height:4px}
        .db-depto-cards::-webkit-scrollbar-track{background:#f1f5f9;border-radius:99px}
        .db-depto-cards::-webkit-scrollbar-thumb{background:#c7d2fe;border-radius:99px}
        .db-depto-card{flex:0 0 220px;border:1.5px solid;border-radius:14px;padding:14px 14px;scroll-snap-align:start;transition:box-shadow .2s,transform .2s;animation:_slideIn .3s ease both}
        .db-depto-card:hover{box-shadow:0 4px 20px rgba(37,99,235,.12);transform:translateY(-2px)}

        .db-filters{background:#fff;border:1.5px solid #e8eeff;border-radius:18px;padding:22px 24px;display:flex;flex-wrap:wrap;gap:16px;align-items:flex-end;animation:_fadeUp .35s ease both}
        .db-fgroup{display:flex;flex-direction:column;gap:6px;flex:1;min-width:175px}
        .db-flabel{font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.06em;display:flex;align-items:center;gap:6px}
        .db-flabel-step{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#1e40af;color:#fff;font-size:10px;font-weight:800;flex-shrink:0}
        .db-fsel{height:44px;padding:0 14px;background:#f8faff;border:1.5px solid #e2e8f0;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:#0f172a;cursor:pointer;outline:none;transition:border-color .15s}
        .db-fsel:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.12)}
        .db-fsel:disabled{opacity:0.5;cursor:not-allowed;background:#f1f5f9}
        .db-fsep{display:flex;align-items:center;padding-bottom:8px;color:#cbd5e1;font-size:18px;flex-shrink:0;align-self:flex-end}

        .db-breadcrumb{display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:10px 16px;background:#f0f9ff;border:1.5px solid #bae6fd;border-radius:10px;font-size:12px;font-weight:600;color:#0369a1;animation:_fadeUp .2s ease both}
        .db-breadcrumb-sep{color:#7dd3fc}
        .db-breadcrumb-chip{background:#dbeafe;border-radius:6px;padding:2px 8px;font-weight:700;color:#1e40af}

        .db-empty{background:#fff;border:1.5px dashed #c7d2fe;border-radius:18px;padding:56px 24px;text-align:center;animation:_fadeUp .4s ease both}
        .db-empty-icon{font-size:48px;margin-bottom:14px}
        .db-empty-title{font-size:18px;font-weight:700;color:#334155;margin-bottom:6px}
        .db-empty-sub{font-size:14px;color:#94a3b8}
        .db-empty-steps{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:20px}
        .db-empty-step{display:flex;align-items:center;gap:6px;padding:8px 14px;background:#f8faff;border:1.5px solid #e2e8f0;border-radius:10px;font-size:12px;font-weight:600;color:#64748b}
        .db-empty-step-num{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#e2e8f0;color:#475569;font-size:11px;font-weight:800}
        .db-loading{background:#fff;border:1.5px solid #e8eeff;border-radius:18px;padding:56px 24px;text-align:center;animation:_fadeUp .3s ease both}
        .db-spinner{width:40px;height:40px;border:3px solid #e8eeff;border-top-color:#2563eb;border-radius:50%;animation:_spin .7s linear infinite;margin:0 auto 16px}
        .db-loading-text{font-size:15px;font-weight:600;color:#64748b}
        .db-error{background:#fef2f2;border:1.5px solid #fca5a5;border-radius:18px;padding:32px 24px;text-align:center;animation:_fadeUp .3s ease both}
        .db-error-icon{font-size:40px;margin-bottom:12px}
        .db-error-title{font-size:17px;font-weight:700;color:#b91c1c;margin-bottom:6px}
        .db-error-msg{font-size:13px;color:#ef4444}
        .db-retry-btn{margin-top:16px;padding:9px 22px;background:#b91c1c;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:#fff;cursor:pointer}

        .db-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;animation:_fadeUp .35s ease both}
        @media(max-width:900px){.db-grid{grid-template-columns:1fr}}
        .db-card{background:#fff;border:1.5px solid #e8eeff;border-radius:18px;padding:22px 24px}
        .db-card-title{font-size:12px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px;display:flex;align-items:center;gap:8px}
        .db-card-title-icon{font-size:16px}

        .db-resumen{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
        .db-score-circle{width:86px;height:86px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;border:3px solid;flex-shrink:0}
        .db-score-num{font-size:24px;font-weight:800;line-height:1}
        .db-score-max{font-size:11px;opacity:.6}
        .db-resumen-info{flex:1;min-width:140px}
        .db-resumen-name{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:2px;line-height:1.3}
        .db-resumen-dept{font-size:11px;font-weight:600;color:#7c3aed;background:#f5f3ff;border-radius:5px;padding:2px 7px;display:inline-block;margin-bottom:4px}
        .db-resumen-period{font-size:13px;color:#64748b;margin-bottom:10px}
        .db-clasif-badge{display:inline-flex;align-items:center;gap:6px;border-radius:8px;padding:5px 12px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em}

        .db-prog-info{display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:8px}
        .db-prog-track{height:10px;background:#f1f5f9;border-radius:99px;overflow:hidden}
        .db-prog-fill{height:100%;background:linear-gradient(90deg,#2563eb,#22c55e);border-radius:99px;width:var(--w);animation:_barIn .8s cubic-bezier(.16,1,.3,1) both}

        .db-tabs{display:flex;gap:2px;background:#f1f5f9;border-radius:10px;padding:3px;margin-bottom:14px}
        .db-tab{flex:1;padding:7px 0;border-radius:8px;border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;background:transparent;color:#64748b}
        .db-tab-active{background:#fff;color:#1e40af;box-shadow:0 1px 6px rgba(0,0,0,.08)}

        .db-table-wrap{overflow-x:auto;border-radius:10px;border:1.5px solid #e8eeff}
        .db-table{width:100%;border-collapse:collapse;font-size:13px}
        .db-table th{background:#f8faff;padding:10px 14px;text-align:left;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.05em;border-bottom:1.5px solid #e8eeff}
        .db-table td{padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#334155;vertical-align:middle}
        .db-table tr:last-child td{border-bottom:none}
        .db-table tr:hover td{background:#fafbff}
        .db-nc{font-family:monospace;font-weight:700;color:#3b4fd8;font-size:12px}
        .db-chip-carrera{background:#f1f5ff;border-radius:5px;padding:2px 7px;font-size:11px;font-weight:600;color:#3b4fd8}
        .db-chip-grupo{background:#f5f0ff;border-radius:5px;padding:2px 7px;font-size:11px;font-weight:600;color:#7c3aed}
        .db-chip-pend{background:#fff7ed;border-radius:5px;padding:2px 7px;font-size:11px;font-weight:600;color:#c2410c}

        .db-export-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
        .db-exp-btn{height:42px;padding:0 20px;border-radius:10px;border:1.5px solid;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .16s}
        .db-exp-csv{background:#f0fdf4;border-color:#86efac;color:#15803d}.db-exp-csv:hover{background:#dcfce7}
        .db-exp-xls{background:#f0f9ff;border-color:#7dd3fc;color:#0369a1}.db-exp-xls:hover{background:#dbeafe}
        .db-exp-pdf{background:#fef2f2;border-color:#fca5a5;color:#b91c1c}.db-exp-pdf:hover{background:#fee2e2}

        .db-chart-toggle{display:flex;gap:6px;margin-bottom:16px}
        .db-ctoggle-btn{flex:1;padding:7px 0;border-radius:8px;border:1.5px solid #e2e8f0;font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:700;cursor:pointer;transition:all .15s;background:#f8faff;color:#64748b}
        .db-ctoggle-btn.active{background:#1e40af;border-color:#1e40af;color:#fff}

        .db-footer{text-align:center;padding:18px;font-size:11px;color:#94a3b8}
      `}</style>

      <div className="db-root">
        <nav className="db-nav">
          <div className="db-brand"><span className="db-brand-dot"/>SICOT · Dashboard</div>
          <div className="db-nav-r">
            <span className="db-nav-badge">Admin</span>
            <span className="db-nav-user">{user?.nombre || 'Admin'}</span>
            <button className="db-btn-logout" onClick={logout}>Cerrar sesión</button>
          </div>
        </nav>

        <div className="db-body">
          <div style={{
            display: 'flex', gap: '12px', background: '#fff', borderRadius: '16px',
            padding: '6px', border: '1.5px solid #e2e8f0', marginBottom: '24px'
          }}>
            <button
              onClick={() => setTabActivo("resultados")}
              style={{
                flex: 1, padding: '12px 20px', border: 'none', borderRadius: '12px',
                fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                background: tabActivo === "resultados" ? 'linear-gradient(135deg, #1648b8, #2563eb)' : 'transparent',
                color: tabActivo === "resultados" ? '#fff' : '#64748b'
              }}
            >
              📊 Resultados de Evaluación
            </button>
            <button
              onClick={() => setTabActivo("configuracion")}
              style={{
                flex: 1, padding: '12px 20px', border: 'none', borderRadius: '12px',
                fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                background: tabActivo === "configuracion" ? 'linear-gradient(135deg, #1648b8, #2563eb)' : 'transparent',
                color: tabActivo === "configuracion" ? '#fff' : '#64748b'
              }}
            >
              ⚙️ Configuración de Evaluaciones
            </button>
          </div>

          {tabActivo === "resultados" ? (
            <>
              <TarjetasDepartamentos idPeriodo={idPeriodo} onVerTutor={handleVerTutor} />

              <div className="db-filters">
                <div className="db-fgroup">
                  <label className="db-flabel"><span className="db-flabel-step">1</span>Departamento</label>
                  <select className="db-fsel" value={idDepartamento} onChange={e => setIdDepartamento(e.target.value)} disabled={cargandoTutores || !!errorTutores}>
                    {cargandoTutores ? <option>Cargando…</option> : errorTutores ? <option>Error al cargar</option> : <>
                      <option value="">— Todos los departamentos —</option>
                      {departamentos.map(dept => (
                        <option key={dept} value={dept}>
                          {dept} ({tutoresValidos.filter(t => t.departamento === dept).length})
                        </option>
                      ))}
                    </>}
                  </select>
                </div>

                <div className="db-fsep">›</div>

                <div className="db-fgroup">
                  <label className="db-flabel"><span className="db-flabel-step">2</span>Tutor(a)</label>
                  <select className="db-fsel" value={idTutor} onChange={e => setIdTutor(e.target.value)} disabled={cargandoTutores || !!errorTutores}>
                    {cargandoTutores ? <option>Cargando…</option> : errorTutores ? <option>Error</option> : <>
                      <option value="">{idDepartamento ? `— Tutores (${tutoresFiltrados.length}) —` : "— Selecciona un tutor(a) —"}</option>
                      {tutoresFiltrados.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                    </>}
                  </select>
                </div>

                <div className="db-fsep">›</div>

                <div className="db-fgroup">
                  <label className="db-flabel"><span className="db-flabel-step">3</span>Periodo escolar</label>
                  <select className="db-fsel" value={idPeriodo} onChange={e => setIdPeriodo(e.target.value)} disabled={cargandoPeriodos || !!errorPeriodos}>
                    {cargandoPeriodos ? <option>Cargando…</option> : errorPeriodos ? <option>Error</option> : <>
                      <option value="">— Selecciona un periodo —</option>
                      {periodos.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.Nombre || p.nombre || `Periodo ${p.id}`}
                          {(p.activo === 1 || p.activo === true) ? " ★ Activo" : ""}
                        </option>
                      ))}
                    </>}
                  </select>
                </div>

                <div className="db-fsep">›</div>

                <div className="db-fgroup">
                  <label className="db-flabel"><span className="db-flabel-step">4</span>Grupo <span style={{ fontWeight:400, textTransform:"none", letterSpacing:0, color:"#94a3b8" }}>(opcional)</span></label>
                  <select className="db-fsel" value={idGrupo} onChange={e => setIdGrupo(e.target.value)} disabled={!idTutor||!idPeriodo||cargandoGrupos||!!errorGrupos}>
                    {!idTutor||!idPeriodo ? <option value="">Selecciona tutor(a) y periodo</option>
                      : cargandoGrupos ? <option>Cargando grupos…</option>
                      : errorGrupos ? <option>Error al cargar grupos</option>
                      : <>
                          <option value="">— Todos los grupos —</option>
                          {grupos.map(g => (
                            <option key={g.id} value={g.id}>
                              {g.Clave || g.clave || `Grupo ${g.id}`}
                            </option>
                          ))}
                        </>
                    }
                  </select>
                </div>
              </div>

              {(idDepartamento || idTutor || idGrupo) && (
                <div className="db-breadcrumb">
                  <span>🔍 Filtrando:</span>
                  {idDepartamento && <><span className="db-breadcrumb-sep">›</span><span>Depto. <span className="db-breadcrumb-chip">{idDepartamento}</span></span></>}
                  {tutorSeleccionado && <><span className="db-breadcrumb-sep">›</span><span>Tutor(a) <span className="db-breadcrumb-chip">{tutorSeleccionado.nombre}</span></span></>}
                  {grupoLabel && <><span className="db-breadcrumb-sep">›</span><span>Grupo <span className="db-breadcrumb-chip">{grupoLabel}</span></span></>}
                  <button
                    onClick={() => { setIdDepartamento(""); setIdTutor(""); setIdGrupo(""); setResultado(null); setError(null) }}
                    style={{ marginLeft:"auto", background:"none", border:"1px solid #bae6fd", borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:700, color:"#0369a1", cursor:"pointer" }}
                  >✕ Limpiar</button>
                </div>
              )}

              {!loading && !error && !resultado && (
                <div className="db-empty">
                  <div className="db-empty-icon">📊</div>
                  <p className="db-empty-title">Selecciona un tutor(a) para ver su evaluación</p>
                  <p className="db-empty-sub">Usa los filtros de arriba o haz clic en "Ver →" desde el ranking de cualquier departamento.</p>
                  <div className="db-empty-steps">
                    {["Departamento","Tutor(a)","Periodo","Grupo (opcional)"].map((s,i) => (
                      <div key={s} className="db-empty-step"><span className="db-empty-step-num">{i+1}</span>{s}</div>
                    ))}
                  </div>
                </div>
              )}

              {loading && <div className="db-loading"><div className="db-spinner"/><p className="db-loading-text">Cargando resultados…</p></div>}

              {!loading && error && (
                <div className="db-error">
                  <div className="db-error-icon">⚠️</div>
                  <p className="db-error-title">No se pudieron cargar los resultados</p>
                  <p className="db-error-msg">{error}</p>
                  <button className="db-retry-btn" onClick={() => {
                    if (idTutor && idPeriodo) {
                      setLoading(true)
                      getResultadosDocenteAPI(Number(idTutor), Number(idPeriodo), idGrupo ? Number(idGrupo) : undefined)
                        .then(data => setResultado({ ...data, tutor: data.docente, docente: undefined }))
                        .catch(err => setError(err.message))
                        .finally(() => setLoading(false))
                    }
                  }}>🔄 Reintentar</button>
                </div>
              )}

              {!loading && !error && resultado && (
                <>
                  <div className="db-grid">
                    <div className="db-card" style={{ borderColor:cs.border, background:cs.bg }}>
                      <p className="db-card-title"><span className="db-card-title-icon">🏅</span>Calificación general</p>
                      <div className="db-resumen">
                        <div className="db-score-circle" style={{ borderColor:cs.text, color:cs.text }}>
                          <span className="db-score-num">{resultado.promedioGeneral}</span>
                          <span className="db-score-max">/ 5.00</span>
                        </div>
                        <div className="db-resumen-info">
                          <p className="db-resumen-name">{resultado.tutor.nombre}</p>
                          {idDepartamento && <span className="db-resumen-dept">🏢 {idDepartamento}</span>}
                          <p className="db-resumen-period">{resultado.periodo.Nombre || resultado.periodo.nombre}</p>
                          <div className="db-clasif-badge" style={{ background:cs.badge, color:cs.text }}>★ {resultado.clasificacion}</div>
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
                      <div className="db-prog-track"><div className="db-prog-fill" style={{ "--w":`${pctCompleto}%` }}/></div>
                    </div>
                  </div>

                  <div className="db-grid">
                    <div className="db-card">
                      <p className="db-card-title"><span className="db-card-title-icon">📈</span>Resultados por criterio</p>
                      <div className="db-chart-toggle">
                        <button className={`db-ctoggle-btn${vistaGraf==="barras"?" active":""}`} onClick={() => setVistaGraf("barras")}>▬ Barras</button>
                        <button className={`db-ctoggle-btn${vistaGraf==="radar"?" active":""}`} onClick={() => setVistaGraf("radar")}>◉ Radar</button>
                      </div>
                      {vistaGraf === "barras" ? <BarChart datos={resultado.promediosCat}/> : (
                        <div>
                          <RadarChart datos={resultado.promediosCat}/>
                          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:10, justifyContent:"center" }}>
                            {CATEGORIAS.map((cat,i) => (
                              <span key={cat.id} style={{ fontSize:10.5, fontWeight:600, color:"#64748b", background:"#f1f5f9", borderRadius:5, padding:"2px 6px" }}>
                                {i+1}. {cat.nombre.split(" ").slice(0,3).join(" ")}…
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="db-card">
                      <p className="db-card-title"><span className="db-card-title-icon">👤</span>Lista de alumnos</p>
                      <div className="db-tabs">
                        <button className={`db-tab${tabAlumnos==="completaron"?" db-tab-active":""}`} onClick={() => setTabAlumnos("completaron")}>✅ Completaron ({resultado.completaron.length})</button>
                        <button className={`db-tab${tabAlumnos==="faltantes"?" db-tab-active":""}`} onClick={() => setTabAlumnos("faltantes")}>⏳ Pendientes ({resultado.faltantes.length})</button>
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
                            {(tabAlumnos === "completaron" ? resultado.completaron : resultado.faltantes).map((a, idx) => (
                              <tr key={`${tabAlumnos}-${a.numControl || a.num_control || idx}`}>
                                <td className="db-nc">{a.numControl || a.num_control}</td>
                                <td style={{ fontWeight:600 }}>{a.nombre || a.nombre_completo}</td>
                                <td><span className="db-chip-grupo">{a.grupo || a.Clave || a.clave || "—"}</span></td>
                                <td><span className="db-chip-carrera">{a.carrera || a.Carrera || a.carrera_nombre}</span></td>
                                <td>
                                  {tabAlumnos === "completaron"
                                    ? <span style={{ color:"#15803d", fontWeight:700, fontSize:12 }}>✓ Completada</span>
                                    : <span className="db-chip-pend">⏳ Pendiente</span>
                                  }
                                </td>
                              </tr>
                            ))}
                            {((tabAlumnos === "completaron" && resultado.completaron.length === 0) ||
                              (tabAlumnos === "faltantes"   && resultado.faltantes.length === 0)) && (
                              <tr><td colSpan="5" style={{ textAlign:"center", padding:"32px", color:"#94a3b8" }}>No hay alumnos en esta categoría</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="db-export-row">
                        <button className="db-exp-btn db-exp-csv" onClick={() => exportarCSV(resultado, grupoLabel)}>📄 Exportar CSV</button>
                        <button className="db-exp-btn db-exp-xls" onClick={() => exportarExcel(resultado, grupoLabel)}>📊 Exportar Excel</button>
                        <button className="db-exp-btn db-exp-pdf" onClick={() => exportarPDF(resultado, grupoLabel, comentarios)}>📑 Exportar PDF</button>
                      </div>
                    </div>
                  </div>

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
                            const cname = clasifFromVal(val)
                            const cs2   = CLASIF_COLOR[cname]
                            return (
                              <tr key={cat.id}>
                                <td style={{ fontWeight:800, color:"#94a3b8" }}>{i+1}</td>
                                <td style={{ fontWeight:600, color:"#0f172a" }}>{cat.nombre}</td>
                                <td style={{ textAlign:"center", fontWeight:800, color:cs2.text, fontSize:16 }}>{val.toFixed(1)}</td>
                                <td><span style={{ background:cs2.badge, color:cs2.text, borderRadius:6, padding:"3px 8px", fontSize:11, fontWeight:800, textTransform:"uppercase" }}>{cname}</span></td>
                                <td><div style={{ height:7, background:"#f1f5f9", borderRadius:99, overflow:"hidden" }}><div style={{ height:"100%", width:`${(val/5)*100}%`, background:CAT_COLORS[i], borderRadius:99 }}/></div></td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <ConfiguracionEvaluacion onConfigChange={recargarDatos} />
          )}
        </div>

        <footer className="db-footer">© 2026 · ITSSNP · Sistema de Evaluación Tutorias · SWATCorps</footer>
      </div>
    </>
  )
}
