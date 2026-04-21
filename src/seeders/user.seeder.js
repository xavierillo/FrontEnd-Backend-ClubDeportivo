const { User } = require('../models');

async function seedUsers() {
  const count = await User.count();
  if (count > 0) return;

  await User.bulkCreate(
    [
      {
        full_name: 'Usuario Demo 1',
        email: 'usuario1@demo.cl',
        pass: '12345678',
        role: 'user',
        refresh_pass: false,
        fecha_nacimiento: '2000-01-10',
        otros: { deporte: 'fútbol', practica_deporte: true }
      },
      {
        full_name: 'Coach Demo 1',
        email: 'coach1@demo.cl',
        pass: '12345678',
        role: 'coach',
        refresh_pass: false,
        fecha_nacimiento: '1995-05-18',
        otros: { deporte: 'crossfit', practica_deporte: true }
      },
      {
        full_name: 'Admin Demo 1',
        email: 'admin1@demo.cl',
        pass: '12345678',
        role: 'admin',
        refresh_pass: true,
        fecha_nacimiento: '1990-09-01',
        otros: { cargo: 'coordinador', sede: 'Santiago' }
      }
    ],
    { individualHooks: true }
  );
}

module.exports = { seedUsers };
