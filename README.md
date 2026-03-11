# SICOT — Sistema de Evaluación Docente y Tutoría
### Instituto Tecnológico Superior de la Sierra Norte de Puebla · TecNM

---

## Estructura del proyecto

```
/
├── backend/          → API Node.js + Express (deploy en Railway)
├── frontend/         → App React + Vite     (deploy en Vercel)
└── sql/
    ├── evaluacion_docente_v3.sql    → Esquema completo de la BD
    └── sicot_datos_iniciales.sql    → Datos iniciales (carreras, admin, alumno prueba)
```

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + React Router |
| Backend | Node.js + Express |
| Base de datos | MySQL 8 (Railway) |
| Auth | JWT + SHA-256 |
| Deploy frontend | Vercel |
| Deploy backend | Railway |

---

## Credenciales de prueba

| Rol | Usuario | Contraseña |
|-----|---------|------------|
| Administrador | `admin` | `admin` |
| Alumno | `25100019` | `1234` |

---

## Instalación local

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edita .env con tu DATABASE_URL de Railway
node server.js
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Edita .env.local: VITE_API_URL=http://localhost:3001
npm run dev
```

---

## Deploy

Ver guía completa en `sql/README_DEPLOY.md`

**Resumen:**
1. Backend → Railway (Root Directory: `backend`)
2. Frontend → Vercel (Root Directory: `frontend`)
3. Configura `VITE_API_URL` en Vercel y `FRONTEND_URL` en Railway
