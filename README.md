# Sistema de votación para personero

## Descripción general

Este proyecto consiste en una aplicación web para gestionar una votación estudiantil para personero. La aplicación está dividida en:

- Frontend en React + Vite + Tailwind CSS
- Backend en Node.js + Express + SQLite
- Flujo de votación con roles: inicio, profesor y estudiantes

## Funcionalidades actuales

- Vista de inicio con resultados y estadísticas
- Panel del profesor para validar acceso con código
- Registro de candidatos desde el panel del profesor
- Registro de estudiantes desde el panel del profesor
- Votación desde la vista de estudiantes con un código estudiantil único
- Resultados agregados por candidato

## Usuarios iniciales

### Profesores

- Prof. Ana Gómez — código: profesor123
- Prof. Carlos Ríos — código: profesor456

### Estudiantes creados por defecto

- Laura Díaz — 20241001
- Mateo Pérez — 20241002
- Camila Rojas — 20241003
- Daniel Torres — 20241004
- Valentina Cruz — 20241005
- Juan Esteban López — 20241006
- Paula Ramírez — 20241007
- Sofía Vargas — 20241008
- Andrés Moreno — 20241009
- Mónica Salazar — 20241010
- Tomás Ariza — 20241011
- Natalia Peña — 20241012
- Sebastián Castaño — 20241013
- Isabella Gutiérrez — 20241014
- Felipe Ortega — 20241015

## Instalación

1. Instala las dependencias del backend:
   ```bash
   cd backend
   npm install
   ```
2. Instala las dependencias del frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Ejecución

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run dev
```

## Endpoints principales

- GET /api/health
- GET /api/voters
- POST /api/voters
- PUT /api/voters/:id
- DELETE /api/voters/:id
- GET /api/candidates
- POST /api/candidates
- PUT /api/candidates/:id
- DELETE /api/candidates/:id
- POST /api/professor/validate
- POST /api/vote
- GET /api/results

