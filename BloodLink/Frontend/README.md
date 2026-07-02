# BloodLink Frontend
## Overview

The frontend is built using **React** with **Vite** and communicates with the Flask backend through a centralized Axios API client.

The application provides two primary user experiences:

- **Donor Portal**
- **Hospital Portal**

Authentication determines which interface is presented after login.

# Project Structure
Frontend
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │     └── api.js
│   │
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │     ├── auth/
│   │     ├── donors/
│   │     ├── hospitals/
│   │     └── requests/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── package.json
└── vite.config.js

# api/
Contains the Axios configuration used throughout the application.

### api.js
Creates a reusable Axios instance with the backend API URL.

All pages import this instance instead of making raw fetch requests.

Responsibilities include:

- Central API endpoint configuration
- Simplified HTTP requests
- Easy switching between development and production servers

# assets
Stores static resources used by the application.
Examples include:

- Images
- Logos
- Decorative graphics
- Background illustrations

# components/
Reusable UI components shared across multiple pages.

### Navbar.jsx
Provides navigation throughout the application.

Navigation changes depending on whether the current user is a donor or hospital.

### Footer.jsx
Shared footer displayed across most pages.

### BloodGroupFilter.jsx
Reusable filter component used when displaying blood requests.
Allows filtering requests by blood group.

### SearchBar.jsx
Search component used for filtering displayed information.

### DonorCard.jsx
Displays donor information in a reusable card layout.

### ProtectedRoute.jsx
Protects authenticated pages.

Checks for the logged-in user stored in Local Storage before allowing access.

Redirects unauthenticated users to the login page.

# pages/
Contains the application's main screens.

Pages are grouped by functionality.

## auth/
Authentication screens.

### LoginPage.jsx
Handles:

- User login
- Authentication requests
- Local storage of authenticated user
- Navigation based on user role

### SignupPage.jsx
Handles account registration for:

- Donors
- Hospitals

Validates user input before submitting to the backend.

## donors/
Pages available to donor users.

### DonorDirectoryPage.jsx
Displays registered donors.

Supports searching and browsing donor information.

### DonorDetailsPage.jsx
Displays detailed information about a selected donor.


### DonorProfilePage.jsx
Allows donors to:

- View their profile
- Edit personal information
- Update profile details

Changes are synchronized with the backend.

### IncomingRequestsPage.jsx
Displays active blood requests available for donors.

Donors can:

- View request information
- Accept requests
- Decline requests

Updates request status through backend API endpoints.

## hospitals/
Pages available to hospitals.

# HospitalDashboard.jsx

Main dashboard after hospital login.

Provides quick access to hospital features.

### HospitalProfilePage.jsx
Displays hospital profile information.

Supports editing and updating hospital details.

## requests/

Blood  request management.

### BloodRequestForm.jsx
\
Allows hospitals to create new blood requests.

Captures:

- Blood type
- Units required
- Urgency
- Location
- Contact information


### RequestListPage.jsx
Displays blood requests created by hospitals.

Supports viewing current request status and updates.

## General Pages
### HomePage.jsx

Landing page for the BloodLink platform.

Introduces the project and provides navigation to core features.

### AboutPage.jsx
Provides general information about BloodLink, its purpose, and the importance of blood donation.


# App.jsx
Defines the application's routing structure.

Responsible for:

- Route definitions
- Protected routes
- Navigation between pages

# main.jsx
Application entry point.

Initializes:

- React
- Router
- Global styling

Renders the application into the browser.

--
# Styling
Styling is primarily implemented using:

- Tailwind CSS utility classes
- Global styles in:
  - App.css
  - index.css

Pages combine reusable components with responsive layouts to provide a consistent user experience.
# Authentication Flow
Authentication is handled by the backend API.

After a successful login:

- User information is stored in Local Storage.
- The stored role determines which dashboard or interface is displayed.
- Protected routes prevent unauthenticated access to secured pages.

# Backend Communication

All communication with the backend is performed through the centralized Axios instance.

Current functionality includes:

- User registration
- User login
- Profile retrieval
- Profile updates
- Donor retrieval
- Hospital retrieval
- Blood request creation
- Blood request retrieval
- Blood request updates
