const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Or your global Prisma instance

// Create a new Booking (Request to Book)
const createBooking = async (req, res, next) => {
  const { propertyId, startDate, endDate } = req.body;
  const guestId = req.user.id; // From authMiddleware (protect)

  try {
    // 1. Validate input
    if (!propertyId || !startDate || !endDate) {
      return res.status(400).json({
        message: 'Missing required fields: propertyId, startDate, and endDate are required.',
      });
    }

    const propertyIdInt = parseInt(propertyId, 10);
    if (isNaN(propertyIdInt)) {
        return res.status(400).json({ message: 'Invalid propertyId format.' });
    }

    // Validate dates
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format for startDate or endDate.' });
    }
    if (parsedEndDate <= parsedStartDate) {
      return res.status(400).json({ message: 'End date must be after start date.' });
    }
    if (parsedStartDate < new Date().setHours(0,0,0,0)) { // Disallow booking past dates
        return res.status(400).json({ message: 'Start date cannot be in the past.' });
    }


    // 2. Check if property exists
    const property = await prisma.property.findUnique({ where: { id: propertyIdInt } });
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    // 3. Check if host is trying to book their own property (optional business rule)
    if (property.ownerId === guestId) {
        return res.status(403).json({ message: 'You cannot book your own property.' });
    }

    // 4. TODO: Advanced - Check for booking conflicts / availability (complex, for future enhancement)
    // For MVP, we'll allow requests and assume manual host approval will handle conflicts.
    // A real system would query existing bookings for the propertyId and check for date overlaps.

    // 5. Create booking
    const booking = await prisma.booking.create({
      data: {
        guestId,
        propertyId: propertyIdInt,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        status: 'PENDING', // Default status
      },
    });

    res.status(201).json({ message: 'Booking request submitted successfully. Awaiting host approval.', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    // if (error instanceof Prisma.PrismaClientValidationError) {
    //   return res.status(400).json({ message: 'Invalid data provided for booking.', details: error.message });
    // }
    res.status(500).json({ message: 'Internal server error while creating booking request.' });
    // next(error);
  }
};

module.exports = {
  createBooking,
};

// Get booking requests for properties owned by the authenticated host
const getHostBookingRequests = async (req, res, next) => {
  const hostId = req.user.id; // From authMiddleware

  try {
    const bookingRequests = await prisma.booking.findMany({
      where: {
        property: {
          ownerId: hostId,
        },
        // Optionally filter by status, e.g., only 'PENDING'
        // status: 'PENDING',
      },
      include: {
        property: { // Include details of the property being booked
          select: { id: true, title: true, city: true },
        },
        guest: { // Include details of the guest who made the booking
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: {
        createdAt: 'desc', // Show newest requests first
      },
    });

    res.status(200).json({ bookingRequests });
  } catch (error) {
    console.error('Error fetching host booking requests:', error);
    res.status(500).json({ message: 'Internal server error while fetching booking requests.' });
    // next(error);
  }
};

module.exports = {
  createBooking,
  getHostBookingRequests,
};

// Get bookings made by the authenticated guest
const getGuestBookings = async (req, res, next) => {
  const guestId = req.user.id; // From authMiddleware

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        guestId: guestId,
      },
      include: {
        property: { // Include details of the property being booked
          select: { id: true, title: true, city: true, pricePerNight: true },
        },
        // Optionally, if you want host info for the guest (less common for guest's own booking list)
        // property: {
        //   include: {
        //     owner: { select: { id: true, name: true } }
        //   }
        // }
      },
      orderBy: {
        createdAt: 'desc', // Show newest bookings first
      },
    });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching guest bookings:', error);
    res.status(500).json({ message: 'Internal server error while fetching your bookings.' });
    // next(error);
  }
};

module.exports = {
  createBooking,
  getHostBookingRequests,
  getGuestBookings,
};
