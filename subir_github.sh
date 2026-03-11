#!/bin/bash
# ============================================================
#  SICOT — Script para subir el proyecto a GitHub
#  Ejecuta desde la RAÍZ del proyecto (donde está este script)
#
#  USO:
#    bash subir_github.sh
# ============================================================

set -e   # detener si cualquier comando falla

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   SICOT — Subir proyecto a GitHub            ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── 1. Inicializar git si no existe ─────────────────────────
if [ ! -d ".git" ]; then
  echo "📁  Inicializando repositorio git..."
  git init
  git branch -M main
else
  echo "✅  Repositorio git ya existe"
fi

# ── 2. Configurar el remote ──────────────────────────────────
REMOTE_URL="https://github.com/Hector-SWAT/Proyecto-Evaluaci-n_Docente_ITSSNP.git"

if git remote | grep -q "origin"; then
  echo "🔗  Remote 'origin' ya configurado"
else
  echo "🔗  Agregando remote origin..."
  git remote add origin "$REMOTE_URL"
fi

# ── 3. Agregar todos los archivos ───────────────────────────
echo ""
echo "📦  Agregando archivos..."
git add .

# ── 4. Commit ───────────────────────────────────────────────
echo "💾  Creando commit..."
git commit -m "🎓 SICOT v1.0 — Sistema de Evaluación Docente ITSSNP

- Frontend: React + Vite (Login, Panel Alumno, Encuesta, Dashboard)
- Backend: Node.js + Express + MySQL2 (Railway-ready)
- Base de datos: MySQL con 11 carreras, SP, vistas
- Auth: JWT + SHA-256
- Deploy: Railway (backend) + Vercel (frontend)"

# ── 5. Push ─────────────────────────────────────────────────
echo ""
echo "🚀  Subiendo a GitHub..."
git push -u origin main

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   ✅  ¡Proyecto subido exitosamente!         ║"
echo "║                                              ║"
echo "║   Repositorio:                               ║"
echo "║   github.com/Hector-SWAT/                    ║"
echo "║   Proyecto-Evaluaci-n_Docente_ITSSNP         ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "Próximos pasos:"
echo "  1. Railway  → New Project → Deploy from GitHub"
echo "     Root Directory: backend"
echo "     Variable: DATABASE_URL=mysql://root:cdFLRU...@trolley..."
echo ""
echo "  2. Vercel → New Project → importar el repo"
echo "     Root Directory: frontend"
echo "     Variable: VITE_API_URL=https://tu-backend.up.railway.app"
echo ""
