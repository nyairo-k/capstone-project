# BloodLink Backend
## Overview

The backend of **BloodLink** is built with **Flask** and exposes a REST API that powers the BloodLink web application. It manages authentication, donor information, hospital profiles, and blood donation requests while storing all data in a PostgreSQL database through SQLAlchemy.

The project follows a simple modular structure where each resource has its own route file while sharing a common database connection and configuration.

# Project Structure
Backend
│
├── app.py
├── config.py
├── extensions.py
├── models.py
├── Pipfile
├── Pipfile.lock
├── Procfile
├── render.yaml
├── requirements.txt
├── README.md
│
├── migrations/
│
├── routes/
│   ├── auth.py
│   ├── donors.py
│   ├── hospitals.py
│   └── requests.py
│
└── __pycache__/
# File Responsibilities

## app.py

The application's entry point.

Responsibilities include:

- Creating the Flask application
- Loading configuration values
- Initializing SQLAlchemy
- Initializing Flask-Migrate
- Configuring CORS
- Registering all API blueprints
- Providing the root API endpoint

Every request sent from the frontend passes through this application.

## config.py
Contains all application configuration.

This includes:

- Database connection
- Secret key
- Environment variable loading
- SQLAlchemy configuration

The application reads configuration from environment variables, making it suitable for both local development and deployment.

## extensions.py
Contains shared Flask extensions.

Currently manages:

- SQLAlchemy database instance
- Flask-Migrate instance

Keeping these objects separate prevents circular imports across the project.

## models.py
Contains all database models.

The project currently includes models for:

- Donors
- Hospitals
- Blood Requests

Each model represents a database table and defines relationships, fields, timestamps, and constraints.

# Routes

Each resource has its own route file responsible for handling its API endpoints.

## auth.py

Handles user authentication.

Features include:

- User login
- User registration
- Password hashing
- Password verification
- Hospital authentication
- Donor authentication

The login endpoint returns the authenticated user's details and role, allowing the frontend to determine which interface should be displayed.

## donors.py
Handles donor-related operations.

Current functionality includes:

- Retrieve all donors
- Retrieve an individual donor profile
- Update donor profile information

These endpoints power the donor profile pages within the frontend.

## hospitals.py
Handles hospital-related functionality.

Current functionality includes:

- Retrieve all hospitals
- Retrieve a hospital profile
- Update hospital information

Hospital dashboards and profile pages consume these endpoints.

## requests.py
Handles blood request management.

Current functionality includes:

- Create blood requests
- Retrieve all requests
- Retrieve individual requests
- Update request status
- Accept or decline requests
- Associate accepted requests with donors

These endpoints are used by both hospitals and donors throughout the application.

# migrations/
Stores all Flask-Migrate migration files.

These migration scripts maintain the database schema as the application evolves without requiring manual table creation.

# requirements.txt
Lists all Python dependencies required by the backend.

This file is used during deployment to automatically install the correct packages.

# Pipfile & Pipfile.lock
Dependency management files used by Pipenv.

They provide an alternative way of managing project packages and ensure consistent package versions across environments.


# Procfile
Defines how the production server starts the application.

Render uses this file to launch Gunicorn when deploying the backend.

# render.yaml
Contains deployment configuration for Render.

It defines how the backend service is built and started in production.

# Overall Backend Flow
Frontend
      │
      ▼
HTTP Request
      │
      ▼
Flask Routes
      │
      ▼
Business Logic
      │
      ▼
SQLAlchemy Models
      │
      ▼
PostgreSQL Database
      │
      ▼
JSON Response
      │
      ▼
Frontend

# Current Features
The backend currently supports:

- User authentication
- Donor registration
- Hospital registration
- Secure password hashing
- Donor profile management
- Hospital profile management
- Blood request creation
- Blood request retrieval
- Blood request status updates
- Donor acceptance and decline of requests
- PostgreSQL database persistence
- Database migrations
- Cross-Origin Resource Sharing (CORS) configuration
- Deployment on Render using Gunicorn
