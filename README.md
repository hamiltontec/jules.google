# Full-Stack Apartment Hosting Platform

This project is a full-stack application for an apartment hosting management system, similar to Airbnb. It features a Node.js backend API and a Remix frontend.

## Project Structure

This repository contains two main parts:

*   **Backend API (Node.js/Express/Prisma):** Located in the project root. It handles business logic, database interactions, and user authentication.
*   **Frontend Application (Remix):** Located in the `frontend-remix/` directory. This is a server-rendered React application that consumes the backend API.

---

## Backend API (Node.js / Express / Prisma)

This is the backend API service.

### Prerequisites (Backend)

*   [Node.js](https://nodejs.org/) (v16.x or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   A running instance of [PostgreSQL](https://www.postgresql.org/)

### Environment Variables (Backend)

Create a `.env` file in the **project root** (where the backend `package.json` is located) with the following:

```env
# PostgreSQL Connection URL
# Replace with your actual database connection string
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public
DATABASE_URL="postgresql://your_db_user:your_db_password@localhost:5432/your_db_name?schema=public"

# JWT Secret Key
# Replace with a strong, random string for token signing
JWT_SECRET="your-very-strong-and-secret-jwt-key-please-replace-me"

# Server Port (optional, defaults to 3000 in src/server.js if not set)
# PORT=3000
```
**Important:** Replace placeholder values with your actual database credentials and a secure JWT secret. Ensure the database exists in PostgreSQL.

### Setup & Installation (Backend)

1.  **Navigate to Project Root** (if not already there).
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Set up the Database:**
    *   Ensure your PostgreSQL server is running.
    *   Manually create a database in PostgreSQL that matches the `DATABASE_NAME` from your `.env` file.
4.  **Run Database Migrations:**
    ```bash
    npx prisma migrate dev
    ```
    *(This applies migrations and generates Prisma Client. If prompted for a migration name, you can use "init" or similar.)*

### Running the Backend API

*   **Development Mode (with auto-restart):**
    ```bash
    npm run dev
    ```
    The API server will typically start on `http://localhost:3000` (or the `PORT` in `.env`).

*   **Production Mode:**
    ```bash
    npm start
    ```

### Backend API Endpoints Summary

(Refer to the backend code or use an API client like Postman/Insomnia for full details. Key endpoints include:)
*   **Auth:** `POST /api/auth/register`, `POST /api/auth/login`
*   **Properties (Host):** `POST /api/properties` (create), `GET /api/properties/my-listings` (view own)
*   **Properties (Public):** `GET /api/properties` (view all, filter by city), `GET /api/properties/:id` (view detail)
*   **Bookings:** `POST /api/bookings` (request booking), `GET /api/bookings/requests` (host view), `GET /api/bookings/my-bookings` (guest view)

---

## Frontend Application (Remix)

This is the user-facing web application built with Remix.

### Prerequisites (Frontend)

*   [Node.js](https://nodejs.org/) (v16.x or later recommended, for running Remix dev server and build tools)
*   [npm](https://www.npmjs.com/)

### Environment Variables (Frontend)

Create a `.env` file inside the `frontend-remix/` directory with the following:

```env
# Base URL for the backend API
API_BASE_URL="http://localhost:3000/api"
```
**Note:** Ensure `API_BASE_URL` correctly points to where your backend API is running.

### Setup & Installation (Frontend)

1.  **Navigate to the Frontend Directory:**
    ```bash
    cd frontend-remix
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```

### Running the Frontend Application

1.  **Ensure the Backend API is running first.**
2.  **Navigate to the Frontend Directory** (if not already there from the previous step):
    ```bash
    cd frontend-remix
    ```
3.  **Start the Remix Development Server:**
    ```bash
    npm run dev
    ```
    The frontend application will typically be accessible at `http://localhost:5173` (Remix's default dev port, but check your terminal output).

### Frontend Pages (Initial)

*   Homepage (`/`)
*   Login (`/login`)
*   Register (`/register`)
*   Properties List (`/properties`)
*   Property Detail (`/properties/:propertyId`)
    *(Further development will add more pages and functionality.)*

---
This project is being developed with the assistance of Jules, an AI software engineer.
