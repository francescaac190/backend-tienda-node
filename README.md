# 🛍️ Node.js Store API  
API REST construida con **Node.js, Express y TypeScript**, diseñada como parte de mi portafolio backend.  
Actualmente utiliza almacenamiento en **archivo JSON** para entender las capas del backend  
y posteriormente será migrada a **Prisma + MySQL**.

---

## 🚀 Características principales

- API REST con Express + TypeScript  
- Arquitectura por capas (Routes → Controllers → Services → Repository → Data)  
- CRUD completo de productos  
- Manejo de errores centralizado  
- Variables de entorno con dotenv  
- Persistencia en archivo JSON (simulación de BD)  
- Scripts para desarrollo y producción  

---

## 📁 Estructura del proyecto
```bash
src/
├─ routes/
├─ controllers/
├─ services/
├─ models/
├─ middlewares/
├─ config/
data/
.gitignore
package.json
tsconfig.json
README.md
```

---

## ⚙️ Instalación

```bash
git clone https://github.com/<tu-usuario>/nodejs-store-api.git
cd nodejs-store-api
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
- ts-node-dev
- dotenv
- Git + GitHub

---

## 🔮 Próximas mejoras

- Migración completa a Prisma + MySQL
- Autenticación con JWT
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

