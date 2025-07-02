# Proyecto Node.js con Prisma ORM

Este proyecto es una API REST desarrollada con Node.js, Express y Prisma ORM que demuestra diferentes tipos de relaciones de base de datos.

## 🚀 Características

- **API REST** con Express.js
- **ORM Prisma** con base de datos SQLite
- **Relaciones de base de datos**:
  - **OneToMany**: Una marca puede tener muchos productos
  - **ManyToOne**: Muchos productos pertenecen a una marca
  - **OneToOne**: Un producto tiene un detalle único
  - **ManyToMany**: Productos pueden estar en múltiples categorías

## 📊 Modelos de Base de Datos

### Brand (Marca)
- `id`: Identificador único
- `name`: Nombre de la marca
- `country`: País de origen
- `products`: Relación OneToMany con productos

### Product (Producto)
- `id`: Identificador único
- `name`: Nombre del producto
- `description`: Descripción
- `price`: Precio
- `stock`: Cantidad en stock
- `brandId`: ID de la marca (ManyToOne)
- `detail`: Relación OneToOne con ProductDetail
- `categories`: Relación ManyToMany con categorías

### ProductDetail (Detalle de Producto)
- `id`: Identificador único
- `warranty`: Garantía
- `weight`: Peso
- `dimensions`: Dimensiones
- `material`: Material
- `productId`: ID del producto (OneToOne)

### Category (Categoría)
- `id`: Identificador único
- `name`: Nombre de la categoría
- `description`: Descripción
- `products`: Relación ManyToMany con productos

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm

### Pasos de instalación

1. **Clonar e instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar la base de datos**:
   ```bash
   # Generar el cliente de Prisma
   npm run db:generate
   
   # Ejecutar migraciones
   npm run db:migrate
   
   # Poblar la base de datos con datos de ejemplo
   npm run db:seed
   ```

3. **Iniciar el servidor**:
   ```bash
   # Modo desarrollo (con hot reload)
   npm run start:dev
   
   # Modo producción
   npm start
   ```

## 📡 Endpoints de la API

### Marcas (Brands)
- `GET /marca` - Obtener todas las marcas
- `GET /marca/:id` - Obtener marca por ID
- `POST /marca` - Crear nueva marca
- `PUT /marca/:id` - Actualizar marca
- `DELETE /marca/:id` - Eliminar marca

**Ejemplo de creación de marca**:
```json
POST /marca
{
  "name": "Samsung",
  "country": "Corea del Sur"
}
```

### Productos (Products)
- `GET /producto` - Obtener todos los productos
- `GET /producto/:id` - Obtener producto por ID
- `POST /producto` - Crear nuevo producto
- `PUT /producto/:id` - Actualizar producto
- `DELETE /producto/:id` - Eliminar producto

**Ejemplo de creación de producto**:
```json
POST /producto
{
  "name": "Samsung Galaxy S24",
  "description": "Smartphone flagship",
  "price": 999.99,
  "stock": 50,
  "brandId": 1
}
```

### Categorías (Categories)
- `GET /categoria` - Obtener todas las categorías
- `GET /categoria/:id` - Obtener categoría por ID
- `POST /categoria` - Crear nueva categoría
- `PUT /categoria/:id` - Actualizar categoría
- `DELETE /categoria/:id` - Eliminar categoría
- `POST /categoria/:categoryId/products/:productId` - Asignar producto a categoría
- `DELETE /categoria/:categoryId/products/:productId` - Quitar producto de categoría

**Ejemplo de creación de categoría**:
```json
POST /categoria
{
  "name": "Electrónicos",
  "description": "Dispositivos electrónicos y tecnología"
}
```

### Detalles de Producto (Product Details)
- `GET /detalle/product/:productId` - Obtener detalle de producto
- `POST /detalle/product/:productId` - Crear detalle de producto
- `PUT /detalle/product/:productId` - Actualizar detalle de producto
- `DELETE /detalle/product/:productId` - Eliminar detalle de producto

**Ejemplo de creación de detalle**:
```json
POST /detalle/product/1
{
  "warranty": "2 años",
  "weight": 168.0,
  "dimensions": "147 x 70.6 x 7.6 mm",
  "material": "Aluminio y vidrio"
}
```

## 🎯 Ejemplos de Uso

### 1. Relación OneToMany / ManyToOne (Brand → Products)

```bash
# Crear una marca
curl -X POST http://localhost:3000/marca \
  -H "Content-Type: application/json" \
  -d '{"name": "Apple", "country": "Estados Unidos"}'

# Crear un producto asociado a la marca
curl -X POST http://localhost:3000/producto \
  -H "Content-Type: application/json" \
  -d '{"name": "iPhone 15", "price": 999, "brandId": 1}'
```

### 2. Relación OneToOne (Product ↔ ProductDetail)

```bash
# Crear detalle para un producto específico
curl -X POST http://localhost:3000/detalle/product/1 \
  -H "Content-Type: application/json" \
  -d '{"warranty": "1 año", "weight": 174}'
```

### 3. Relación ManyToMany (Products ↔ Categories)

```bash
# Crear una categoría
curl -X POST http://localhost:3000/categoria \
  -H "Content-Type: application/json" \
  -d '{"name": "Smartphones"}'

# Asignar producto a categoría
curl -X POST http://localhost:3000/categoria/1/products/1
```

## 🗄️ Scripts Disponibles

- `npm run start:dev` - Iniciar en modo desarrollo con hot reload
- `npm start` - Iniciar en modo producción
- `npm run db:migrate` - Ejecutar migraciones de base de datos
- `npm run db:generate` - Generar cliente de Prisma
- `npm run db:seed` - Poblar base de datos con datos de ejemplo
- `npm run db:reset` - Resetear base de datos y ejecutar seed
- `npm run db:studio` - Abrir Prisma Studio (interfaz visual)

## 🔧 Herramientas de Desarrollo

### Prisma Studio
Para explorar y editar los datos visualmente:
```bash
npm run db:studio
```

### Estructura del Proyecto
```
clase_2_node - copia/
├── prisma/
│   ├── schema.prisma          # Esquema de base de datos
│   ├── migrations/            # Migraciones
│   └── seed.js               # Datos de ejemplo
├── src/
│   ├── config/
│   │   └── database.js       # Configuración de Prisma
│   ├── brand/                # Módulo de marcas
│   ├── product/              # Módulo de productos
│   ├── category/             # Módulo de categorías
│   ├── productDetail/        # Módulo de detalles
│   └── server.js             # Servidor principal
├── package.json
└── .env                      # Variables de entorno
```

## 🎓 Conceptos Demostrados

### 1. OneToMany / ManyToOne
- **Ejemplo**: Una marca (`Brand`) puede tener muchos productos (`Product`)
- **Implementación**: Campo `brandId` en la tabla `products`

### 2. OneToOne
- **Ejemplo**: Un producto (`Product`) tiene un detalle único (`ProductDetail`)
- **Implementación**: Campo `productId` único en la tabla `product_details`

### 3. ManyToMany
- **Ejemplo**: Un producto puede estar en múltiples categorías y una categoría puede tener múltiples productos
- **Implementación**: Tabla intermedia `product_categories`

## 🚨 Notas Importantes

- La base de datos SQLite se crea automáticamente en `prisma/dev.db`
- Los datos de ejemplo se crean con el comando `npm run db:seed`
- Todas las relaciones incluyen `onDelete: Cascade` para mantener integridad referencial
- Las respuestas de la API incluyen datos relacionados usando `include` de Prisma

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC - ver el archivo `package.json` para detalles.
