# Apartment Hosting Management API - Node.js Version

This is the backend API for an apartment hosting management system, similar to Airbnb. It's built using Node.js, Express.js, Prisma (with PostgreSQL), and JWT for authentication.

## Prerequisites

*   [Node.js](https://nodejs.org/) (v16.x or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   A running instance of [PostgreSQL](https://www.postgresql.org/)

## Environment Configuration

Before running the application, you need to set up your environment variables. Create a `.env` file in the root of the project and add the following variables:

```env
# PostgreSQL Connection URL
# Replace with your actual database connection string
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public
DATABASE_URL="postgresql://your_db_user:your_db_password@localhost:5432/your_db_name?schema=public"

# JWT Secret Key
# Replace with a strong, random string for token signing
JWT_SECRET="your-very-strong-and-secret-jwt-key-please-replace-me"

# Server Port (optional, defaults to 3000 if not set)
# PORT=3000
```

**Important:**
*   Replace placeholder values with your actual database credentials and a secure JWT secret.
*   Ensure the specified database (`your_db_name`) exists in your PostgreSQL instance. Prisma will create the schema and tables within this database.

## Setup and Installation

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory-name>
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the Database:**
    *   Ensure your PostgreSQL server is running.
    *   Manually create a database in PostgreSQL that matches the `DATABASE_NAME` you specified in your `.env` file (e.g., `your_db_name`). Prisma `migrate dev` will handle schema and table creation within this database but usually doesn't create the database itself.

4.  **Run Database Migrations:**
    This command will apply any pending migrations to your database, creating the necessary tables based on your `prisma/schema.prisma` file. It will also generate/update the Prisma Client.
    ```bash
    npx prisma migrate dev
    ```
    *(If prompted, provide a name for the migration, e.g., "init_schema")*

5.  **(Optional) Seed the Database:**
    If a seed script is available (e.g., `prisma/seed.js` and configured in `package.json`), you can populate your database with initial data:
    ```bash
    npx prisma db seed
    ```
    *(Note: A seed script is not yet implemented for this project.)*

## Running the Application

*   **Development Mode (with auto-restart on file changes):**
    ```bash
    npm run dev
    ```
    The server will typically start on `http://localhost:3000` (or the port specified in `.env`).

*   **Production Mode:**
    ```bash
    npm start
    ```

## Available API Endpoints (Current)

All API routes are prefixed with `/api`.

### Authentication (`/auth`)

*   `POST /auth/register`
    *   Registers a new user.
    *   **Body (JSON):** `{ "email": "user@example.com", "password": "yourpassword", "name": "Optional Name" }`
    *   **Response:** User object (excluding password) and success message.

*   `POST /auth/login`
    *   Logs in an existing user.
    *   **Body (JSON):** `{ "email": "user@example.com", "password": "yourpassword" }`
    *   **Response:** User object (excluding password) and a JWT token.

---
This project is being developed with the assistance of Jules, an AI software engineer.
