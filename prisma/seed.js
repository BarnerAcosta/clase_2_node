import prisma from '../src/config/database.js';

async function main() {
    console.log('🌱 Iniciando el proceso de siembra...');

    // Limpiar datos existentes
    await prisma.productCategory.deleteMany();
    await prisma.productDetail.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.brand.deleteMany();

    // Crear marcas
    const brands = await Promise.all([
        prisma.brand.create({
            data: {
                name: 'Samsung',
                country: 'Corea del Sur'
            }
        }),
        prisma.brand.create({
            data: {
                name: 'Apple',
                country: 'Estados Unidos'
            }
        }),
        prisma.brand.create({
            data: {
                name: 'Sony',
                country: 'Japón'
            }
        }),
        prisma.brand.create({
            data: {
                name: 'Nike',
                country: 'Estados Unidos'
            }
        })
    ]);

    console.log('✅ Marcas creadas:', brands.length);

    // Crear categorías
    const categories = await Promise.all([
        prisma.category.create({
            data: {
                name: 'Electrónicos',
                description: 'Dispositivos electrónicos y tecnología'
            }
        }),
        prisma.category.create({
            data: {
                name: 'Smartphones',
                description: 'Teléfonos inteligentes'
            }
        }),
        prisma.category.create({
            data: {
                name: 'Audio',
                description: 'Dispositivos de audio y sonido'
            }
        }),
        prisma.category.create({
            data: {
                name: 'Deportes',
                description: 'Artículos deportivos'
            }
        })
    ]);

    console.log('✅ Categorías creadas:', categories.length);

    // Crear productos
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Samsung Galaxy S24',
                description: 'Smartphone flagship de Samsung',
                price: 999.99,
                stock: 50,
                brandId: brands[0].id // Samsung
            }
        }),
        prisma.product.create({
            data: {
                name: 'iPhone 15 Pro',
                description: 'Smartphone premium de Apple',
                price: 1199.99,
                stock: 30,
                brandId: brands[1].id // Apple
            }
        }),
        prisma.product.create({
            data: {
                name: 'Sony WH-1000XM5',
                description: 'Auriculares con cancelación de ruido',
                price: 399.99,
                stock: 25,
                brandId: brands[2].id // Sony
            }
        }),
        prisma.product.create({
            data: {
                name: 'Nike Air Max 270',
                description: 'Zapatillas deportivas Nike',
                price: 149.99,
                stock: 100,
                brandId: brands[3].id // Nike
            }
        })
    ]);

    console.log('✅ Productos creados:', products.length);

    // Crear detalles de productos (OneToOne)
    const productDetails = await Promise.all([
        prisma.productDetail.create({
            data: {
                productId: products[0].id,
                warranty: '2 años',
                weight: 168.0,
                dimensions: '147 x 70.6 x 7.6 mm',
                material: 'Aluminio y vidrio'
            }
        }),
        prisma.productDetail.create({
            data: {
                productId: products[1].id,
                warranty: '1 año',
                weight: 187.0,
                dimensions: '146.6 x 70.6 x 8.25 mm',
                material: 'Titanio'
            }
        }),
        prisma.productDetail.create({
            data: {
                productId: products[2].id,
                warranty: '2 años',
                weight: 250.0,
                dimensions: '254 x 220 x 32 mm',
                material: 'Plástico ABS'
            }
        }),
        prisma.productDetail.create({
            data: {
                productId: products[3].id,
                warranty: '6 meses',
                weight: 300.0,
                dimensions: '28 x 15 x 10 cm',
                material: 'Cuero sintético y malla'
            }
        })
    ]);

    console.log('✅ Detalles de productos creados:', productDetails.length);

    // Crear relaciones ManyToMany (ProductCategory)
    const productCategories = await Promise.all([
        // Samsung Galaxy S24 - Electrónicos y Smartphones
        prisma.productCategory.create({
            data: {
                productId: products[0].id,
                categoryId: categories[0].id
            }
        }),
        prisma.productCategory.create({
            data: {
                productId: products[0].id,
                categoryId: categories[1].id
            }
        }),
        // iPhone 15 Pro - Electrónicos y Smartphones
        prisma.productCategory.create({
            data: {
                productId: products[1].id,
                categoryId: categories[0].id
            }
        }),
        prisma.productCategory.create({
            data: {
                productId: products[1].id,
                categoryId: categories[1].id
            }
        }),
        // Sony WH-1000XM5 - Electrónicos y Audio
        prisma.productCategory.create({
            data: {
                productId: products[2].id,
                categoryId: categories[0].id
            }
        }),
        prisma.productCategory.create({
            data: {
                productId: products[2].id,
                categoryId: categories[2].id
            }
        }),
        // Nike Air Max 270 - Deportes
        prisma.productCategory.create({
            data: {
                productId: products[3].id,
                categoryId: categories[3].id
            }
        })
    ]);

    console.log('✅ Relaciones producto-categoría creadas:', productCategories.length);

    console.log('🎉 ¡Siembra completada exitosamente!');
    console.log(`
📊 Resumen de datos creados:
   - ${brands.length} marcas
   - ${categories.length} categorías
   - ${products.length} productos
   - ${productDetails.length} detalles de productos
   - ${productCategories.length} relaciones producto-categoría

🔗 Tipos de relaciones implementadas:
   ✅ OneToMany: Brand → Products
   ✅ ManyToOne: Products → Brand
   ✅ OneToOne: Product ↔ ProductDetail
   ✅ ManyToMany: Products ↔ Categories
    `);
}

main()
    .catch((e) => {
        console.error('❌ Error durante la siembra:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
