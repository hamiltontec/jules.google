const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Or your global Prisma instance

// Create a new Property Listing
const createProperty = async (req, res, next) => {
  const { title, description, address, city, country, pricePerNight, maxGuests } = req.body;
  const ownerId = req.user.id; // From authMiddleware (protect)

  try {
    // Basic validation
    if (!title || !description || !address || !city || !country || pricePerNight == null || maxGuests == null) {
      return res.status(400).json({
        message: 'Missing required fields: title, description, address, city, country, pricePerNight, maxGuests are required.',
      });
    }

    // Type validation/conversion (Prisma will also validate types, but good to be explicit)
    const parsedPrice = parseFloat(pricePerNight);
    const parsedMaxGuests = parseInt(maxGuests, 10);

    if (isNaN(parsedPrice) || isNaN(parsedMaxGuests)) {
        return res.status(400).json({ message: 'pricePerNight must be a number and maxGuests must be an integer.' });
    }
    if (parsedPrice <= 0 || parsedMaxGuests <= 0) {
        return res.status(400).json({ message: 'pricePerNight and maxGuests must be positive values.' });
    }


    const property = await prisma.property.create({
      data: {
        title,
        description,
        address,
        city,
        country,
        pricePerNight: parsedPrice,
        maxGuests: parsedMaxGuests,
        ownerId, // Link to the authenticated user
      },
    });

    res.status(201).json({ message: 'Property created successfully', property });
  } catch (error) {
    console.error('Error creating property:', error);
    // Consider more specific error handling, e.g., Prisma validation errors
    // if (error instanceof Prisma.PrismaClientValidationError) {
    //   return res.status(400).json({ message: 'Invalid data provided for property.', details: error.message });
    // }
    res.status(500).json({ message: 'Internal server error while creating property' });
    // next(error); // For a global error handler
  }
};

module.exports = {
  createProperty,
};

// Get properties listed by the authenticated host
const getMyProperties = async (req, res, next) => {
  const ownerId = req.user.id; // From authMiddleware

  try {
    const properties = await prisma.property.findMany({
      where: {
        ownerId: ownerId,
      },
      orderBy: {
        createdAt: 'desc', // Show newest first, for example
      },
    });

    res.status(200).json({ properties });
  } catch (error) {
    console.error('Error fetching user properties:', error);
    res.status(500).json({ message: 'Internal server error while fetching properties' });
    // next(error); // For a global error handler
  }
};

module.exports = {
  createProperty,
  getMyProperties,
};

// Get all properties (publicly accessible), with optional city filter
const getAllProperties = async (req, res, next) => {
  const { city } = req.query; // Check for city query parameter

  try {
    let queryOptions = {
      orderBy: {
        createdAt: 'desc', // Show newest first
      },
      // Optionally, include owner information but select only non-sensitive fields
      // include: {
      //   owner: {
      //     select: { id: true, name: true, email: true } // Example: adjust as needed
      //   }
      // }
    };

    if (city) {
      queryOptions.where = {
        city: {
          // Using 'contains' for a partial match, and 'mode: "insensitive"' for case-insensitivity
          // Adjust 'contains' to 'equals' if an exact match is preferred.
          contains: city,
          mode: 'insensitive', // This makes the search case-insensitive (for PostgreSQL and MongoDB)
        },
      };
    }

    const properties = await prisma.property.findMany(queryOptions);
    res.status(200).json({ properties });
  } catch (error) {
    console.error('Error fetching all properties:', error);
    // Log the city if it was part of the query for better debugging
    if (city) console.error('City filter was:', city);
    res.status(500).json({ message: 'Internal server error while fetching properties' });
    // next(error);
  }
};

module.exports = {
  createProperty,
  getMyProperties,
  getAllProperties,
};

// Get a single property by ID (publicly accessible)
const getPropertyById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const propertyId = parseInt(id, 10);
    if (isNaN(propertyId)) {
      return res.status(400).json({ message: 'Invalid property ID format.' });
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      // Optionally, include owner information but select only non-sensitive fields
      // include: {
      //   owner: {
      //     select: { id: true, name: true, email: true } // Example: adjust as needed
      //   }
      // }
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ property });
  } catch (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    res.status(500).json({ message: 'Internal server error while fetching property details' });
    // next(error);
  }
};

module.exports = {
  createProperty,
  getMyProperties,
  getAllProperties,
  getPropertyById,
};
