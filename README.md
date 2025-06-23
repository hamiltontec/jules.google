# Apartment Hosting Management System

This is a Django-based web application for managing apartment hosting, similar to an Airbnb-style platform. This project is currently under development.

## Prerequisites

*   Python 3.8+
*   pip (Python package installer)

## Setup Instructions

1.  **Clone the Repository** (if you are setting this up from a Git repository):
    ```bash
    git clone <repository-url>
    cd name-of-the-project-directory
    ```
    *(Note: If you are working with Jules in the sandbox, the project root is where `manage.py` is located, e.g., `apartment_hosting_project` if that was the name chosen during `django-admin startproject .`)*

2.  **Create and Activate a Virtual Environment** (recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  **Install Dependencies**:
    Currently, the main dependency is Django.
    ```bash
    pip install django
    ```
    *(In the future, if a `requirements.txt` file is provided, use `pip install -r requirements.txt`)*

4.  **Apply Database Migrations**:
    This will set up the necessary database tables based on the models defined in the project.
    ```bash
    python manage.py migrate
    ```

5.  **Create a Superuser**:
    This will allow you to access the Django admin panel. You will be prompted to create a username, email, and password.
    ```bash
    python manage.py createsuperuser
    ```

6.  **Run the Development Server**:
    ```bash
    python manage.py runserver
    ```
    By default, the server will be accessible at `http://127.0.0.1:8000/`.

## Accessing the Admin Panel

Once the development server is running:

1.  Open your web browser and go to `http://127.0.0.1:8000/admin/`.
2.  Log in with the superuser credentials you created in step 5.
3.  You should be able to see and manage `Properties` and `Bookings` via the admin interface.

---
This project is being developed with the assistance of Jules, an AI software engineer.
