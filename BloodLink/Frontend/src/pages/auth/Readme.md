# Authentication Module

## Overview

The BloodLink authentication module provides secure authentication and authorization using **JSON Web Tokens (JWT)**. It supports two user roles:

- **Donor**
- **Hospital**

Users authenticate with their email and password. Upon successful login, the backend generates a JWT access token that is used to authorize subsequent requests to protected endpoints.

---

# Authentication Flow

The authentication process follows the sequence below:

```
User
   │
   │ Login
   ▼
React Frontend
   │
   │ POST /login
   ▼
Flask Backend
   │
   │ Validate credentials
   │
   │ Check hashed password
   ▼
JWT Generated
   │
   ▼
Frontend stores:
    • token
    • currentUser
   │
   ▼
Axios Interceptor
   │
   ▼
Authorization Header

Bearer <JWT Token>

   │
   ▼
Protected Flask Routes
```

---

# Password Security

Passwords are **never stored as plain text**.

The application uses Werkzeug's password hashing utilities.

During signup:

```python
generate_password_hash(password)
```

During login:

```python
check_password_hash(...)
```

Only password hashes are stored in the PostgreSQL database.

---

# JSON Web Tokens (JWT)

After successful login, the backend generates a JWT access token.

Example:

```python
access_token = create_access_token(
    identity=str(user.id),
    additional_claims={
        "role": user.role,
        "name": name,
        "email": user.email
    }
)
```

The token contains:

- User ID
- Role
- Name
- Email
- Expiration time

The token is returned together with the authenticated user's information.

Example response:

```json
{
    "access_token": "...",
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "donor"
    }
}
```

---

# Frontend Storage

After login, the frontend stores:

```javascript
localStorage.setItem("token", access_token);

localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
);
```

The token is later used to authenticate API requests.

---

# Axios Interceptor

Instead of manually attaching the JWT to every request, Axios automatically adds it using a request interceptor.

Example:

```javascript
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});
```

Every authenticated request therefore includes:

```
Authorization: Bearer <JWT Token>
```

without requiring additional frontend code.

---

# Backend Route Protection

Protected routes use the JWT decorator:

```python
@jwt_required()
```

Example:

```python
@hospital_routes.route("/hospitals/<int:id>")
@jwt_required()
def get_hospital(id):
```

If a request does not contain a valid JWT, Flask automatically returns:

```
401 Unauthorized
```

---

# User Authorization

Authentication confirms **who the user is**.

Authorization determines **what the user is allowed to do**.

The application prevents users from accessing or modifying resources that do not belong to them.

Example:

```python
current_user = int(get_jwt_identity())

if current_user != id:

    return jsonify({
        "message":
        "You are not allowed to access this profile."
    }),403
```

This ensures users can only view or update their own profile.

---

# JWT Claims

Additional user information is embedded within the JWT.

Example:

```python
claims = get_jwt()
```

Available claims include:

- role
- name
- email

These claims can be used for future role-based permissions without requiring additional database queries.

---

# Protected Frontend Routes

React uses a reusable `ProtectedRoute` component.

Protected donor pages include:

- Donor Dashboard
- Donor Directory
- Donor Details
- Donor Profile
- Incoming Blood Requests

Protected hospital pages include:

- Hospital Dashboard
- Hospital Profile
- Blood Request Management
- Create Blood Request

Public pages remain accessible without authentication:

- Landing Page
- About
- Login
- Signup

---

# ProtectedRoute Behaviour

The component checks:

1. Is a JWT stored?
2. Is a user stored?
3. Does the user's role match the required role?

If any validation fails, the user is redirected to the login page.

Example usage:

```jsx
<ProtectedRoute role="hospital">

    <HospitalDashboard />

</ProtectedRoute>
```

---

# Login Behaviour

After successful login:

Hospital users are redirected to:

```
/hospital/dashboard
```

Donor users are redirected to:

```
/donor/dashboard
```

---

# Logout

Logging out performs the following operations:

```javascript
localStorage.removeItem("token");

localStorage.removeItem("currentUser");

navigate("/");
```

This removes all authentication information and redirects the user to the landing page.

---

# Security Measures Implemented

The authentication module currently provides:

- Password hashing
- JWT authentication
- Stateless authentication
- Automatic token handling
- Route protection
- User ownership verification
- Role-based frontend routing
- Secure logout
- Protected API endpoints

---

# Technologies Used

Backend

- Flask
- Flask-JWT-Extended
- Flask-SQLAlchemy
- Werkzeug
- PostgreSQL

Frontend

- React
- React Router
- Axios
- Local Storage

---

# Authentication Endpoints

## Signup

```
POST /signup
```

Registers a new donor or hospital account.

---

## Login

```
POST /login
```

Authenticates the user and returns:

- JWT Access Token
- User Information

---

# Current Authentication Architecture

```
Frontend
│
├── Login
├── Signup
├── ProtectedRoute
├── Axios Interceptor
└── Local Storage
        │
        ▼
Flask API
│
├── Login Route
├── Signup Route
├── JWT Manager
├── Protected Routes
└── PostgreSQL Database
```

---

# Future Improvements

The current implementation provides secure authentication suitable for the project requirements. Future enhancements could include:

- Refresh Tokens
- Email Verification
- Password Reset
- Token Revocation (Blacklist)
- Account Lockout after repeated failed logins
- Role-based permissions for additional user types
- Session expiration notifications
- Multi-factor authentication (MFA)

These enhancements can be integrated without significantly altering the existing authentication architecture.