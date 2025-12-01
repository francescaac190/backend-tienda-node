# 🛍️ Node.js Store API  

API REST construida con **Node.js, Express y TypeScript**, diseñada como parte de mi portafolio backend.  
Actualmente utiliza almacenamiento en **archivos JSON** para entender bien las capas de un backend  
y posteriormente será migrada a **Prisma + MySQL**.

---

## 🚀 Características principales

- API REST con **Express + TypeScript**
- Arquitectura por capas:  
  **Routes → Controllers → Services → Repositories → Data**
- CRUD completo de productos
- Persistencia en **archivo JSON** (simulación de BD)
- Manejo de errores centralizado (middlewares)
- Variables de entorno con **dotenv**
- Módulo de **usuarios + autenticación con JWT** (registro, login, /me)
- Rutas de productos **protegidas por token**
- Scripts separados para desarrollo y producción

---

## 📁 Estructura del proyecto

```bash
src/
├─ config/          # Configuración (env, prisma en el futuro, etc.)
├─ controllers/     # Capa que maneja req/res HTTP
├─ helpers/         # Utilidades (por ejemplo, helpers de JWT)
├─ middlewares/     # Middlewares de Express: auth, errores, 404, etc.
├─ models/          # Interfaces/Tipos (Product, User, DTOs)
├─ repositories/    # Acceso a datos (lectura/escritura JSON; luego DB)
├─ routes/          # Definición de endpoints y montaje de controladores
├─ services/        # Lógica de negocio (reglas de la app)
├─ app.ts           # Configuración de la app de Express
└─ server.ts        # Punto de entrada: levanta el servidor

data/
├─ products.json    # "Base de datos" de productos
└─ users.json       # "Base de datos" de usuarios

.gitignore
package.json
tsconfig.json
README.md
```
---

## ⚙️ Instalación

```bash
git clone https://github.com/francescaac190/backend-tienda-node.git
cd backend-tienda-node
npm install
```

Crea un archivo .env:
```bash
PORT=3000
```
---

## ▶️ Ejecutar el proyecto
**Modo desarrollo (recomendado)**
```bash
npm run dev
```

**Modo producción**
```bash
npm run build
npm start
```

La API se ejecutará en:
http://localhost:3000/api

---

## 🧪 Endpoints principales

## 🔹 Health Check

GET /api/health
Devuelve el estado del servidor.

## 🔹 Auth (Usuarios)
Registro

POST /api/auth/register

Body:
```bash
{
  "name": "Francesca",
  "email": "fran@example.com",
  "password": "123456"
}
```

## 🔹 Login

POST /api/auth/login

Body:
```bash

{
  "email": "fran@example.com",
  "password": "123456"
}
```

Devuelve: datos básicos del usuario + token JWT.

## 🔹 Perfil (/me)

GET /api/auth/me

Header: Authorization: Bearer <token>

## 🔹 Productos
Método	Endpoint	Descripción
GET	/api/products	Listar todos los productos
GET	/api/products/:id	Obtener producto por ID
POST	/api/products	Crear un producto
PUT	/api/products/:id	Actualizar producto
DELETE	/api/products/:id	Eliminar producto

**Ejemplo de creación:**
```bash
{
  "name": "Café en grano 1kg",
  "price": 80,
  "description": "Café de especialidad",
  "category": "bebidas",
  "stock": 10
}
```

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- File System (fs)
- jsonwebtoken (JWT)
- bcryptjs para hash de contraseñas
- ts-node-dev
- dotenv
- Git + GitHub

---

## 🔮 Próximas mejoras

- Migración completa a Prisma + MySQL
- Roles de usuario (admin / cliente)
- Validaciones con Zod
- Documentación Swagger
- Pruebas unitarias con Jest
- Deploy en Railway / Render

---

## 👩‍💻 Autora

Francesca Antelo

Desarrolladora Full Stack • Flutter • Backend Node.js

📍 Santa Cruz, Bolivia

💼 Portafolio y proyectos: en construcción

