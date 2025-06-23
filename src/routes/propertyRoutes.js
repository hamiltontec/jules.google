const express = require('express');
const propertyController = require('../controllers/propertyController');
const { protect } = require('../middlewares/authMiddleware'); // Correctly import protect

const router = express.Router();

// POST /api/properties - Create a new property listing
// Protected route: only authenticated users (hosts) can create properties
router.post('/', protect, propertyController.createProperty);

// GET /api/properties/my-listings - Get properties listed by the authenticated host
// Protected route
router.get('/my-listings', protect, propertyController.getMyProperties);

// GET /api/properties - Get all properties (publicly accessible)
router.get('/', propertyController.getAllProperties);

// GET /api/properties/:id - Get a single property detail (publicly accessible)
router.get('/:id', propertyController.getPropertyById);

// Future routes for properties will go here


module.exports = router;
