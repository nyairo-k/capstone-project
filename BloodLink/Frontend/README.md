BloodLink — Frontend Progress Notes

# BloodLink System Implementation Report
## Backend Implementation

The backend was built using Flask with SQLAlchemy as the ORM layer and PostgreSQL as the database.

The backend is responsible for:

- Managing database models
- Handling application logic
- Receiving frontend requests
- Returning JSON responses
- Connecting the frontend with stored data


The backend structure separates responsibilities into:

- Application setup
- Database configuration
- Models
- Routes


---

# Flask Application Setup

## app.py

The `app.py` file is the main entry point of the backend.

It is responsible for:

- Creating the Flask application instance
- Initializing extensions
- Registering route blueprints
- Enabling CORS communication with React frontend
- Running the server


The application flow is:


React Frontend

    |

    |

Flask Application (app.py)

    |

    |

Routes

    |

    |

Database Models

    |

    |

PostgreSQL



---

# Database Configuration

## extensions.py

The database connection is separated into its own file.

The SQLAlchemy instance is created here:


db = SQLAlchemy()



This allows all models and routes to use the same database connection without creating multiple instances.


The connection flow is:


extensions.py

  |

  |

models.py

  |

  |

routes

  |

  |

PostgreSQL Database



---

# Database Models

## models.py

All database tables are represented as Python classes.

SQLAlchemy converts these classes into database tables.


The main models created are:


## Hospital Model

Represents registered hospitals.

Stored information includes:

- Hospital name
- Email
- Password hash
- Contact information
- Location
- User role


The model contains timestamps:

- created_at
- updated_at


These automatically record when a hospital record is created or modified.


---

## BloodRequest Model

Represents blood requests created by hospitals.


The request stores:

- requester name
- hospital name
- blood type required
- number of units
- urgency level
- request status
- donor assignment
- contact information
- location


Currently, the relationship between Hospital and BloodRequest is handled using the hospital name field.


The current database structure:


Hospital

|
|

BloodRequest

|
|

hospital_name



The hospital name is stored directly in the blood request table.


This was implemented to avoid dependency on hospital IDs before the authentication/profile system was connected.


---

# Database Relationship Handling

Initially the system was designed to use:


Hospital.id

  |

  |

BloodRequest.hospital_id



using a foreign key relationship.


However, this caused issues because the frontend was not yet retrieving the logged-in hospital profile.

The implementation was changed to:


BloodRequest

hospital_name



This allows the request process to work independently while the authentication flow is being developed.


---

# Route Handling

Backend routes are separated into blueprint files.


Example:


routes/

requests.py


The blueprint allows Flask to organize different system features separately.


The request route file handles:

- Creating blood requests
- Retrieving requests
- Updating requests
- Deleting requests


The route receives JSON data from React, processes it, interacts with SQLAlchemy models, and returns JSON responses.


---

# Frontend Implementation


The frontend is built using React.

The structure separates:

- Reusable components
- Pages
- API configuration


The frontend communicates with Flask using Axios.


---

# API Configuration

## api.js / api.jsx

The Axios configuration is centralized in one location.


Instead of writing:


axios.post(
"http://127.0.0.1:5000/requests"
)



in every component, the application uses:



api.post("/requests")



The API file contains:

- Backend base URL
- Axios instance configuration


The communication flow:



React Component

    |

    |

api.js

    |

    |

Flask Backend

    |

    |

Database



This prevents repeated backend URLs throughout the project.


---

# Navbar Implementation


## Navbar.jsx


The Navbar was designed to support multiple user roles.


The component accepts a role property:


Example:

<Navbar role="hospital"/> ```

The role determines which navigation links are displayed.

The purpose is to allow separate navigation experiences for:

Hospitals
Donors
Other users

The structure:

Navbar

    |

    |

Check role

    |

    |

Display correct navigation

The hospital side navigation contains hospital-specific pages.

The donor side will use a different navigation structure.

Routing Handling

The application routing is handled through React Router.

Routes connect URLs to components.

The flow:

Browser URL

      |

      |

React Router

      |

      |

Component

Example:

/hospital/profile/:id

loads the hospital profile component.

Blood Request Form Implementation

The blood request form uses React state management.

The form data is stored inside:

useState()

The state object contains:

requester_name

hospital_name

blood_type_needed

units_needed

urgency_level

contact_phone

location

When the user types:

Input

 |

 |

handleChange()

 |

 |

Update formData

The updated data is submitted to the backend using Axios.

Form Validation

Validation is performed before sending data.

The form checks:

Required fields
Valid number of units
Valid phone number

If validation fails:

React Hot Toast displays an error message.

If successful:

A success toast is shown after the request is created.

Toast Notification Handling

The project uses:

react-hot-toast

Purpose:

Provide user feedback without redirecting pages.

Examples:

Success:

Blood request created successfully

Errors:

Failed to create request
Current Data Flow

Creating a blood request:

Hospital User

      |

      |

BloodRequestForm.jsx

      |

      |

api.js Axios Request

      |

      |

Flask Route

      |

      |

SQLAlchemy Model

      |

      |

PostgreSQL Database

Retrieving requests follows the reverse process:

Database

      |

      |

Flask Route

      |

      |

Axios

      |

      |

React Component
Development Structure Rules

Backend changes:

Models
        |
        |
models.py


Application logic
        |
        |
routes/

Frontend changes:

Reusable UI

        |

components/


Complete screens

        |

pages/

API communication:

Always through api.js

Navigation:

Controlled through Navbar role

## How to run it

bashcd BloodLink
npm install
npm run dev

Then open the local URL shown in the terminal (e.g. http://localhost:5173).