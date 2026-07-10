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

## Candidatos iniciales

- Ana Morales
- Santiago Ruiz

## Requisitos

- Node.js 18 o superior
- npm

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

## Despliegue en la nube (Render)

Este repositorio ya incluye un archivo [render.yaml](render.yaml) para desplegarlo como un solo servicio.

### Cómo funciona en nube

- El backend Express levanta la API en /api.
- En despliegue, el backend también sirve el frontend compilado desde frontend/dist.
- Resultado: una sola URL pública para todo el sistema.

### Pasos rápidos

1. Sube este proyecto a GitHub.
2. En Render, crea un nuevo Blueprint y conecta el repositorio.
3. Render detectará automáticamente render.yaml.
4. Ejecuta el deploy.
5. Abre la URL del servicio y prueba:
   - /api/health
   - Flujo profesor/estudiante completo desde la interfaz.

### Nota sobre SQLite

La base SQLite se guarda en el archivo backend/database.sqlite.
En algunos planes gratuitos la persistencia de disco puede ser limitada; para producción se recomienda una base gestionada (por ejemplo PostgreSQL).

## Despliegue con Netlify (frontend) + backend separado

Sí, se puede usar Netlify. La forma recomendada para esta prueba técnica es:

- Frontend en Netlify.
- Backend en Render (o Railway) para exponer la API.

### 1) Desplegar backend

Puedes usar la sección de Render de este README.

### 2) Desplegar frontend en Netlify

1. Conecta el repositorio en Netlify.
2. Netlify leerá netlify.toml y usará:
   - Base: frontend
   - Build: npm run build
   - Publish: dist
3. En Site settings > Environment variables crea:
   - VITE_API_BASE_URL = https://TU-BACKEND.onrender.com/api
4. Redeploy del sitio.

### 3) Verificación

- Abre el sitio en Netlify.
- Prueba login de profesor, registro/edición y votación.

### Nota

Netlify por sí solo no es la mejor opción para este backend con SQLite persistente; por eso se recomienda frontend en Netlify y API en Render/Railway.

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

## Notas de desarrollo

El proyecto sigue creciendo de forma modular. Actualmente ya incluye gestión completa de candidatos (crear, editar y eliminar) y flujo de estudiantes para registrar y votar con código único.
