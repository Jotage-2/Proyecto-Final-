# 🛒 E-Commerce Fullstack - TypeScript + MongoDB

Sistema de e-commerce profesional desarrollado con arquitectura limpia, POO y tecnologías modernas.

## 🚀 Tecnologías

- **Backend**: Node.js + Express + TypeScript
- **Base de Datos**: MongoDB Atlas + Mongoose
- **Autenticación**: JWT + Cookies
- **Frontend**: HTML5 + CSS3 + JavaScript (Vanilla)
- **Pago**: Culqi (Simulado)

---

## 📂 Estructura del Proyecto
```
├── src/
│   ├── config/         # Configuración de BD
│   ├── models/         # Schemas Mongoose
│   ├── controllers/    # Lógica de negocio
│   ├── routes/         # Endpoints API
│   ├── middleware/     # Autenticación JWT
│   └── app.ts          # Servidor principal
├── public/             # Frontend
│   ├── index.html
│   └── script.js
└── .env                # Variables de entorno
```

---

## ⚙️ Instalación

### 1. Clonar repositorio
```bash
git clone <URL_DEL_REPO>
cd hackaton18-final
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz con:
```env
PORT=3000
MONGO_URI=mongodb+srv://admin:admin1234@cluster0.vjaegrp.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_super_seguro_12345
NODE_ENV=development
```

### 4. Poblar base de datos (datos de ejemplo)
```bash
npm run seed
```

### 5. Iniciar servidor
```bash
npm run dev
```

El servidor estará corriendo en: **http://localhost:3000**

---

## 🧪 Testing con Postman

### 1️⃣ Registro de Usuario
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@test.com",
  "password": "123456"
}
```

### 2️⃣ Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "admin123"
}
```
**Respuesta**: Copia el `token` para las siguientes peticiones.

---

### 3️⃣ Listar Productos
```http
GET http://localhost:3000/api/products
```

**Con filtros**:
```http
GET http://localhost:3000/api/products?category=Electrónica&search=laptop
```

---

### 4️⃣ Crear Producto (Solo Admin)
```http
POST http://localhost:3000/api/products
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json

{
  "name": "PlayStation 5",
  "description": "Consola de videojuegos de nueva generación",
  "price": 499.99,
  "category": "Gaming",
  "stock": 5,
  "image": "https://via.placeholder.com/300"
}
```

---

### 5️⃣ Aplicar Cupón
```http
POST http://localhost:3000/api/cart/apply-coupon
Content-Type: application/json

{
  "code": "DESCUENTO10",
  "total": 1500
}
```

---

### 6️⃣ Checkout
```http
POST http://localhost:3000/api/orders/checkout
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json

{
  "items": [
    {
      "product": "ID_DEL_PRODUCTO",
      "quantity": 2,
      "price": 999.99
    }
  ],
  "total": 1999.98,
  "discount": 0,
  "culqiToken": "fake_token_123"
}
```

---

### 7️⃣ Ver Mis Órdenes
```http
GET http://localhost:3000/api/orders/me
Authorization: Bearer TU_TOKEN_AQUI
```

---

## 👥 Credenciales de Prueba

| Usuario | Email | Password | Rol |
|---------|-------|----------|-----|
| Admin | admin@test.com | admin123 | admin |
| Usuario | user@test.com | user123 | user |

**Cupones disponibles**:
- `DESCUENTO10` (10% descuento)
- `PROMO20` (20% descuento)
- `VERANO50` (50% descuento)

---

## 🌐 Deploy en Render

### 1. Crear cuenta en [Render](https://render.com)

### 2. Configurar variables de entorno en Render:
- `MONGO_URI`: Tu URI de MongoDB Atlas
- `JWT_SECRET`: Tu secreto JWT
- `NODE_ENV`: production

### 3. Comando de inicio:
```bash
npm run build && npm start
```

---

## 📋 Features Implementadas

✅ Autenticación con JWT  
✅ Roles de usuario (admin/user)  
✅ CRUD de productos  
✅ Carrito con LocalStorage  
✅ Sistema de cupones de descuento  
✅ Checkout con Culqi (simulado)  
✅ Historial de órdenes  
✅ Búsqueda y filtros de productos  
✅ Responsive Design  

---

## 👨‍💻 Autor

**Jhandel** - Hackaton 18 Final  
📅 Fecha: Enero 2026

---

## 📝 Licencia

MIT License