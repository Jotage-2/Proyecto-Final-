import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Product from './models/Product';
import Coupon from './models/Coupon';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ Conectado a MongoDB');

    // Limpiar datos existentes
    await User.deleteMany({});
    await Product.deleteMany({});
    await Coupon.deleteMany({});

    // Crear usuarios
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'admin'
    });

    const user = await User.create({
      name: 'Usuario Test',
      email: 'user@test.com',
      password: 'user123',
      role: 'user'
    });

    console.log('✅ Usuarios creados');

    // Crear productos
    const products = await Product.insertMany([
      {
        name: 'Laptop Gaming HP',
        description: 'Laptop de alto rendimiento con RTX 3060, 16GB RAM',
        price: 1299.99,
        category: 'Electrónica',
        stock: 10,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'
      },
      {
        name: 'iPhone 15 Pro',
        description: 'Smartphone Apple con chip A17 Pro, 256GB',
        price: 999.99,
        category: 'Electrónica',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1592286927505-c0d6c9f0e7b4?w=400'
      },
      {
        name: 'Auriculares Sony WH-1000XM5',
        description: 'Cancelación de ruido activa, 30hrs batería',
        price: 349.99,
        category: 'Audio',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400'
      },
      {
        name: 'Teclado Mecánico RGB',
        description: 'Switches Cherry MX Blue, iluminación RGB',
        price: 129.99,
        category: 'Accesorios',
        stock: 30,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'
      },
      {
        name: 'Monitor 4K 27"',
        description: 'Panel IPS, 144Hz, HDR10',
        price: 449.99,
        category: 'Electrónica',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400'
      },
      {
        name: 'Mouse Logitech MX Master 3',
        description: 'Ergonómico, conexión Bluetooth, 4000 DPI',
        price: 99.99,
        category: 'Accesorios',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'
      }
    ]);

    console.log('✅ Productos creados');

    // Crear cupones
    const coupons = await Coupon.insertMany([
      {
        code: 'DESCUENTO10',
        discount: 10,
        expiresAt: new Date('2026-12-31'),
        isActive: true
      },
      {
        code: 'PROMO20',
        discount: 20,
        expiresAt: new Date('2026-12-31'),
        isActive: true
      },
      {
        code: 'VERANO50',
        discount: 50,
        expiresAt: new Date('2026-03-31'),
        isActive: true
      }
    ]);

    console.log('✅ Cupones creados');

    console.log('\n🎉 Base de datos poblada exitosamente!');
    console.log('\n📧 Credenciales de prueba:');
    console.log('   Admin: admin@test.com / admin123');
    console.log('   User:  user@test.com / user123');
    console.log('\n🎟️  Cupones disponibles:');
    console.log('   DESCUENTO10 (10% desc)');
    console.log('   PROMO20 (20% desc)');
    console.log('   VERANO50 (50% desc)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedData();