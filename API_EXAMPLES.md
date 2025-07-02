# Ejemplos de Pruebas de API

## Archivo de pruebas con curl y ejemplos de uso

### 1. MARCAS (Brands)

#### Obtener todas las marcas
```bash
curl -X GET http://localhost:3000/marca
```

#### Obtener marca por ID
```bash
curl -X GET http://localhost:3000/marca/1
```

#### Crear nueva marca
```bash
curl -X POST http://localhost:3000/marca \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Xiaomi",
    "country": "China"
  }'
```

#### Actualizar marca
```bash
curl -X PUT http://localhost:3000/marca/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Samsung Electronics",
    "country": "Corea del Sur"
  }'
```

#### Eliminar marca
```bash
curl -X DELETE http://localhost:3000/marca/1
```

---

### 2. PRODUCTOS (Products)

#### Obtener todos los productos
```bash
curl -X GET http://localhost:3000/producto
```

#### Obtener producto por ID
```bash
curl -X GET http://localhost:3000/producto/1
```

#### Crear nuevo producto
```bash
curl -X POST http://localhost:3000/producto \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Xiaomi Mi 13",
    "description": "Smartphone con cámara de 50MP",
    "price": 699.99,
    "stock": 75,
    "brandId": 1
  }'
```

#### Actualizar producto
```bash
curl -X PUT http://localhost:3000/producto/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Samsung Galaxy S24 Ultra",
    "price": 1199.99,
    "stock": 40
  }'
```

#### Eliminar producto
```bash
curl -X DELETE http://localhost:3000/producto/1
```

---

### 3. CATEGORÍAS (Categories)

#### Obtener todas las categorías
```bash
curl -X GET http://localhost:3000/categoria
```

#### Obtener categoría por ID
```bash
curl -X GET http://localhost:3000/categoria/1
```

#### Crear nueva categoría
```bash
curl -X POST http://localhost:3000/categoria \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming",
    "description": "Productos para videojuegos"
  }'
```

#### Actualizar categoría
```bash
curl -X PUT http://localhost:3000/categoria/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tecnología",
    "description": "Dispositivos tecnológicos avanzados"
  }'
```

#### Eliminar categoría
```bash
curl -X DELETE http://localhost:3000/categoria/1
```

#### Asignar producto a categoría (ManyToMany)
```bash
curl -X POST http://localhost:3000/categoria/1/products/2
```

#### Quitar producto de categoría
```bash
curl -X DELETE http://localhost:3000/categoria/1/products/2
```

---

### 4. DETALLES DE PRODUCTO (Product Details)

#### Obtener detalle de producto
```bash
curl -X GET http://localhost:3000/detalle/product/1
```

#### Crear detalle de producto (OneToOne)
```bash
curl -X POST http://localhost:3000/detalle/product/1 \
  -H "Content-Type: application/json" \
  -d '{
    "warranty": "3 años",
    "weight": 195.5,
    "dimensions": "163.3 x 78.1 x 8.9 mm",
    "material": "Vidrio Gorilla Glass y marco de aluminio"
  }'
```

#### Actualizar detalle de producto
```bash
curl -X PUT http://localhost:3000/detalle/product/1 \
  -H "Content-Type: application/json" \
  -d '{
    "warranty": "2 años extendida",
    "weight": 200.0
  }'
```

#### Eliminar detalle de producto
```bash
curl -X DELETE http://localhost:3000/detalle/product/1
```

---

## Ejemplos Completos de Flujo de Trabajo

### Flujo 1: Crear marca, producto y asignar a categoría

```bash
# 1. Crear marca
curl -X POST http://localhost:3000/marca \
  -H "Content-Type: application/json" \
  -d '{"name": "OnePlus", "country": "China"}'

# 2. Crear producto asociado a la marca
curl -X POST http://localhost:3000/producto \
  -H "Content-Type: application/json" \
  -d '{
    "name": "OnePlus 12",
    "description": "Flagship con carga rápida",
    "price": 899.99,
    "stock": 30,
    "brandId": 5
  }'

# 3. Crear detalle del producto
curl -X POST http://localhost:3000/detalle/product/5 \
  -H "Content-Type: application/json" \
  -d '{
    "warranty": "2 años",
    "weight": 220.0,
    "dimensions": "164.3 x 75.8 x 9.2 mm",
    "material": "Vidrio y aluminio"
  }'

# 4. Asignar producto a categorías existentes
curl -X POST http://localhost:3000/categoria/1/products/5  # Electrónicos
curl -X POST http://localhost:3000/categoria/2/products/5  # Smartphones
```

### Flujo 2: Consultar datos con relaciones

```bash
# Obtener producto con todas sus relaciones
curl -X GET http://localhost:3000/producto/1

# Obtener marca con todos sus productos
curl -X GET http://localhost:3000/marca/1

# Obtener categoría con todos sus productos
curl -X GET http://localhost:3000/categoria/1
```

---

## Ejemplos con herramientas GUI

### Usando Postman/Insomnia

#### Crear producto completo:
```json
POST /producto
Content-Type: application/json

{
  "name": "MacBook Pro M3",
  "description": "Laptop profesional con chip M3",
  "price": 2499.99,
  "stock": 15,
  "brandId": 2
}
```

#### Respuesta esperada:
```json
{
  "message": "New product created successfully",
  "status": "201",
  "data": {
    "id": 6,
    "name": "MacBook Pro M3",
    "description": "Laptop profesional con chip M3",
    "price": 2499.99,
    "stock": 15,
    "brandId": 2,
    "createdAt": "2025-07-02T03:55:00.000Z",
    "updatedAt": "2025-07-02T03:55:00.000Z",
    "brand": {
      "id": 2,
      "name": "Apple",
      "country": "Estados Unidos"
    },
    "detail": null,
    "categories": []
  }
}
```

---

## Validación de Relaciones

### OneToMany / ManyToOne (Brand → Products)
```bash
# Verificar que el producto tiene referencia a la marca
curl -X GET http://localhost:3000/producto/1

# Verificar que la marca muestra sus productos
curl -X GET http://localhost:3000/marca/1
```

### OneToOne (Product ↔ ProductDetail)
```bash
# Un producto solo puede tener un detalle
curl -X POST http://localhost:3000/detalle/product/1 \
  -H "Content-Type: application/json" \
  -d '{"warranty": "1 año"}'

# Intentar crear otro detalle para el mismo producto debería fallar
curl -X POST http://localhost:3000/detalle/product/1 \
  -H "Content-Type: application/json" \
  -d '{"warranty": "2 años"}'
```

### ManyToMany (Products ↔ Categories)
```bash
# Un producto puede estar en múltiples categorías
curl -X POST http://localhost:3000/categoria/1/products/1  # Electrónicos
curl -X POST http://localhost:3000/categoria/2/products/1  # Smartphones

# Una categoría puede tener múltiples productos
curl -X POST http://localhost:3000/categoria/1/products/2
curl -X POST http://localhost:3000/categoria/1/products/3
```
