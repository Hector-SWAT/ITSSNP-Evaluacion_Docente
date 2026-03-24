# SICOT — Sistema de Evaluación Docente y Tutoría

<div align="center">

![SICOT Banner](https://img.shields.io/badge/SICOT-Sistema%20de%20Evaluaci%C3%B3n-1e40af?style=for-the-badge&logo=graduation-cap)

**Instituto Tecnológico Superior de la Sierra Norte de Puebla · TecNM**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-latest-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![SQL Server](https://img.shields.io/badge/SQL%20Server-Azure-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white)](https://azure.microsoft.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![Licencia](https://img.shields.io/badge/Licencia-ITSSNP-blue?style=flat-square)](https://www.itssnp.edu.mx)

Sistema completo para la evaluación docente y de tutoría, con panel de administración, dashboard de resultados y experiencia optimizada para alumnos.

</div>

---

## Tabla de contenidos

- [Características](#-características)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Instalación local](#-instalación-local)
- [Deploy en producción](#-deploy-en-producción)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Base de datos](#-base-de-datos)
- [Flujo de evaluación](#-flujo-de-evaluación)
- [Solución de problemas](#-solución-de-problemas)
- [Actualizaciones recientes](#-actualizaciones-recientes)
- [Contacto](#-contacto)

---

## ✨ Características

### 👨‍💼 Panel de Administración

**Configuración de evaluaciones**
- Activar / desactivar evaluación de tutor y docentes por separado
- Configuración de fechas de inicio y fin
- Selección de periodo escolar activo

**Dashboard de resultados**
- Estadísticas por departamento con ranking de docentes
- Visualización por criterio: gráficas de barras y radar
- Listado de alumnos completados / pendientes
- Exportación de resultados a **CSV** y **Excel**
- Filtros por departamento, docente, periodo y grupo

**Comentarios cualitativos**
- Visualización de comentarios por docente
- Análisis de feedback de alumnos

---

### 👨‍🎓 Panel del Alumno

| Función | Detalle |
|---|---|
| 👨‍🏫 Evaluación de Tutor | Materia de tutoría |
| 📚 Evaluación de Docentes | Todas las demás materias |
| 📅 Control de fechas | Solo disponible dentro del periodo configurado |
| 📊 Progreso en tiempo real | Barra de avance + contador de evaluaciones |
| 🏷️ Badges de estado | `Pendiente` / `Completada` |
| 💬 Comentarios | Obligatorios · 10–1000 caracteres · contador en vivo |
| ✨ UX optimizada | Animaciones suaves · rúbrica visible · toast notifications |

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + Vite + React Router |
| Backend | Node.js + Express |
| Base de datos | Microsoft SQL Server (Azure SQL) |
| Autenticación | JWT + SHA-256 |
| Deploy frontend | Vercel |
| Deploy backend | Vercel / Railway |

---

## 📁 Estructura del proyecto

```
ITSSNP-Evaluacion_Docente/
│
├── backend/
│   ├── server.js                 # Servidor principal (Node.js + Express)
│   ├── package.json
│   ├── .env.example              # Plantilla de variables de entorno
│   └── .gitignore
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── src/
│       ├── main.jsx              # Punto de entrada
│       ├── App.jsx               # Componente raíz
│       │
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── PanelAlumno.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Evaluacion.jsx
│       │   ├── Comentario.jsx
│       │   ├── Gracias.jsx
│       │   └── admin/
│       │       └── ConfiguracionEvaluacion.jsx
│       │
│       ├── services/
│       │   └── evaluacionData.js # Llamadas a la API
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── router/
│       │   └── AppRouter.jsx
│       └── assets/
│
└── sql/
    ├── 01_create_schema.sql      # Esquema eval
    ├── 02_create_tables.sql      # Tablas
    ├── 03_insert_data.sql        # Datos iniciales
    └── 04_create_procedures.sql  # Procedimientos almacenados
```

---

## 🚀 Instalación local

### Prerrequisitos

- Node.js 18+
- Microsoft SQL Server (Azure SQL o local)
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/sicot.git
cd sicot
```

### 2. Configurar la base de datos

Ejecuta los scripts SQL **en orden** desde Azure Data Studio o SSMS:

```sql
-- 1. Crear el esquema
01_create_schema.sql

-- 2. Crear las tablas
02_create_tables.sql

-- 3. Insertar datos iniciales
03_insert_data.sql

-- 4. Crear procedimientos almacenados
04_create_procedures.sql
```

> ⚠️ **Importante:** El esquema `eval` debe crearse en un batch separado antes de ejecutar las tablas. Si `eval` no existe al compilar el script de tablas, SQL Server lanzará errores de esquema no encontrado.

### 3. Configurar el backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita `backend/.env`:

```env
# Base de datos
DB_HOST=tu_servidor.database.windows.net
DB_PORT=1433
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=SIE

# JWT
JWT_SECRET=tu_secreto_seguro

# Servidor
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173
```

### 4. Configurar el frontend

```bash
cd ../frontend
npm install
cp .env.example .env.local
```

Edita `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:3001
```

### 5. Iniciar los servidores

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🌐 Deploy en producción

### Backend — Vercel o Railway

1. Conecta el repositorio
2. Configura las variables de entorno:

```
DB_HOST       → servidor.database.windows.net
DB_PORT       → 1433
DB_USER       → usuario
DB_PASSWORD   → contraseña
DB_NAME       → SIE
JWT_SECRET    → secreto_produccion
NODE_ENV      → production
FRONTEND_URL  → https://tu-frontend.vercel.app
```

> 🔥 Si usas Azure SQL: activa **"Allow Azure services and resources to access this server"** en el firewall de Azure para que Vercel/Railway puedan conectarse.

### Frontend — Vercel

1. Conecta el repositorio
2. Configura la variable:

```
VITE_API_URL → https://tu-backend.vercel.app
```

---

## 📋 Endpoints de la API

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/auth/login` | Login de admin o alumno |

### Alumno

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/alumno/perfil` | Perfil del alumno (tutor + docentes) |
| `GET` | `/api/alumno/evaluaciones` | Estado de evaluaciones |

### Encuesta

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/encuesta/preguntas` | Preguntas de la encuesta activa |
| `GET` | `/api/encuesta/categorias` | Categorías de evaluación |
| `GET` | `/api/encuesta/rubrica` | Rúbrica de calificaciones |

### Evaluación

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/evaluacion/iniciar` | Iniciar evaluación |
| `POST` | `/api/evaluacion/responder` | Guardar respuestas |
| `POST` | `/api/evaluacion/comentario` | Guardar comentario |

### Dashboard (Admin)

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/dashboard/docentes` | Lista de docentes |
| `GET` | `/api/dashboard/periodos` | Lista de periodos |
| `GET` | `/api/dashboard/resultados` | Resultados por docente |
| `GET` | `/api/dashboard/departamentos` | Estadísticas por departamento |

### Configuración (Admin)

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/admin/configuracion` | Configuración de evaluaciones |
| `POST` | `/api/admin/activar-periodo` | Activar periodo escolar |
| `POST` | `/api/admin/configurar-evaluacion` | Configurar fechas de evaluación |

---

## 🗄️ Base de datos

### Esquema `dbo` — tablas existentes del SIE

| Tabla | Descripción |
|---|---|
| `Alumno` | Datos de los alumnos |
| `Docente` | Datos de los docentes |
| `Grupo` | Grupos académicos |
| `Materia` | Materias ofertadas |
| `Carrera` | Carreras del instituto |
| `Departamento` | Departamentos académicos |
| `PeriodoEscolar` | Periodos escolares |
| `CargaAlumno` | Carga académica de alumnos |

### Esquema `eval` — módulo de evaluación

| Tabla | Descripción |
|---|---|
| `TipoEncuesta` | Tipos: Docente / Tutoría |
| `Encuesta` | Configuración de encuestas por periodo |
| `Categoria` | 9 criterios de evaluación |
| `Rubrica` | Escala 1–5 por categoría |
| `Pregunta` | 17 reactivos por encuesta |
| `Inscripcion` | Relación alumno ↔ grupo |
| `EvaluacionDocente` | Cabecera de evaluaciones |
| `RespuestaEvaluacion` | Detalle de respuestas por pregunta |
| `ComentarioEvaluacion` | Comentarios cualitativos |
| `UsuarioAdmin` | Usuarios del panel de administración |
| `LogAccesoEncuesta` | Auditoría de accesos |
| `SesionAlumno` | Control de sesión / JWT |

---

## 🔄 Flujo de evaluación

```
┌──────────────────────────────────────────┐
│             ADMINISTRADOR                │
│  1. Configurar periodo activo            │
│  2. Configurar fechas de evaluación      │
│  3. Activar evaluación tutor / docentes  │
└──────────────────┬───────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────┐
│               ALUMNO                     │
│  1. Inicia sesión con NumControl         │
│  2. Visualiza tutor y docentes           │
│  3. Selecciona docente a evaluar         │
│  4. Responde preguntas (escala 1–5)      │
│  5. Escribe comentario (≥ 10 caracteres) │
│  6. Finaliza evaluación                  │
└──────────────────┬───────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────┐
│           GUARDADO EN BD                 │
│  • Respuestas almacenadas por pregunta   │
│  • Estado → Completada                   │
│  • Comentario registrado                 │
└──────────────────┬───────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────┐
│             ADMINISTRADOR                │
│  • Visualiza resultados en dashboard     │
│  • Filtra y exporta (CSV / Excel)        │
│  • Revisa comentarios cualitativos       │
└──────────────────────────────────────────┘
```

---

## 🐛 Solución de problemas

| Problema | Solución |
|---|---|
| `409` — "Ya completaste esta evaluación" | Verificar evaluaciones duplicadas en `eval.EvaluacionDocente` |
| "No hay evaluaciones activas" | Revisar fechas y flags de activación en `eval.Encuesta` |
| Error de conexión a la base de datos | Verificar credenciales en `.env` y reglas de firewall en Azure |
| "El esquema eval no existe" | Ejecutar `01_create_schema.sql` en un batch separado antes del resto |
| Evaluaciones no se guardan | Revisar logs del backend (`npm run dev`) |

---

## 🔄 Actualizaciones recientes

### v2.0 — Marzo 2026

- ✅ Migración de MySQL a **SQL Server (Azure)**
- ✅ Separación de evaluación de tutor y evaluación de docentes
- ✅ Panel de administración con configuración de fechas
- ✅ Control de disponibilidad por fechas de encuesta
- ✅ Comentarios obligatorios con validación de longitud
- ✅ Dashboard con estadísticas por departamento
- ✅ Exportación de resultados a CSV y Excel
- ✅ Gráficas de barras y radar por criterio

---

## 👥 Autores
**Héctor Delfino Hernández Pérez**

**ITSSNP — Departamento de Sistemas y Computación**
Instituto Tecnológico Superior de la Sierra Norte de Puebla · TecNM

---

## 📄 Licencia

Este proyecto es propiedad del ITSSNP. Todos los derechos reservados.

---

## 📞 Contacto

| | |
|---|---|
| 📧 Correo | hectoorhernandez12@gmail.com |
| 🌐 Web | [www.itssnp.edu.mx](https://www.itssnp.edu.mx) |
