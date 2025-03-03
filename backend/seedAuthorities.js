const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Authority = require('./models/authority');

dotenv.config();

const seedAuthorities = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const authorities = [
      {
        email: 'official1@example.com',
        password: hashedPassword,
      },
      {
        email: 'official2@example.com',
        password: hashedPassword,
      },
    ];

    await Authority.insertMany(authorities);
    console.log('Authorities seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding authorities:', error);
    mongoose.connection.close();
  }
};

seedAuthorities();


// Email: official1@example.com, Password: password123
// Email: official2@example.com, Password: password123