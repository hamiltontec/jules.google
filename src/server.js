// Import required modules
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// Initialize Express app
const app = express();
const prisma = new PrismaClient();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Basic health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Apartment Hosting API' });
});

// Mount authentication routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// TODO: Mount property routes
// TODO: Mount booking routes

// TODO: Global error handler

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown for Prisma Client
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
