const express = require('express');
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/bookings - Create a new booking request
// Protected route: only authenticated users (guests) can create bookings
router.post('/', protect, bookingController.createBooking);

// GET /api/bookings/requests - Get booking requests for properties owned by the authenticated host
// Protected route
router.get('/requests', protect, bookingController.getHostBookingRequests);

// GET /api/bookings/my-bookings - Get bookings made by the authenticated guest
// Protected route
router.get('/my-bookings', protect, bookingController.getGuestBookings);

// Future routes for bookings will go here
// e.g., PATCH /api/bookings/:id/confirm - Host confirms a booking
// e.g., PATCH /api/bookings/:id/cancel - User or Host cancels a booking


module.exports = router;
