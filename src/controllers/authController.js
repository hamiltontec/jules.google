const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient(); // Consider instantiating PrismaClient once and exporting it, e.g., from db.js or prismaClient.js

// User Registration
const register = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    // 1. Validate input (basic check for required fields)
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name, // Optional, can be null
      },
    });

    // 5. Respond (excluding password)
    // In a real app, you might also generate a JWT token here or send a confirmation email
    const { password: _, ...userWithoutPassword } = newUser; // eslint-disable-line no-unused-vars
    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });

  } catch (error) {
    console.error('Registration error:', error);
    // Pass error to a global error handler (to be implemented)
    // For now, just send a generic server error
    res.status(500).json({ message: 'Internal server error during registration' });
    // next(error); // Use this when global error handler is ready
  }
};

// User Login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2. Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials - user not found' });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials - password mismatch' });
    }

    // 4. Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("JWT_SECRET is not defined. Please set it in your .env file.");
        return res.status(500).json({ message: 'Internal server error - JWT configuration missing' });
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      // Add other relevant non-sensitive info if needed
    };

    const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour

    // 5. Respond with token (and potentially user info minus password)
    const { password: _, ...userWithoutPassword } = user; // eslint-disable-line no-unused-vars
    res.status(200).json({
      message: 'Login successful',
      token,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error('Login error:', error);
    // Pass error to a global error handler (to be implemented)
    res.status(500).json({ message: 'Internal server error during login' });
    // next(error); // Use this when global error handler is ready
  }
};

module.exports = {
  register,
  login,
};
