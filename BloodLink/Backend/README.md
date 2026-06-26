# BloodLink Backend Setup Guide

## Overview

This README explains how to continue development from the current backend state.

The backend has already been implemented with:

* Flask
* PostgreSQL
* SQLAlchemy
* Flask-Migrate
* Flask-CORS

Completed setup:

* PostgreSQL database connection
* Flask environment setup
* Database models
* Database migrations
* Hospital functionality
* Blood request functionality

The next developer should continue from the existing structure and avoid restructuring unless necessary.

---

# 1. Clone Repository

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the backend:

```bash
cd BloodLink/Backend
```

---

# 2. Install PostgreSQL

Download PostgreSQL:

https://www.postgresql.org/download/

During installation:

Use the default settings:

```
Port: 5432
Username: postgres
```

Set a password.

The current project database configuration uses:

```
Username:
postgres

Password:
12345
```

If using a different password, update:

```
Backend/config.py
```

Example:

```python
SQLALCHEMY_DATABASE_URI = (
    "postgresql://postgres:YOUR_PASSWORD@localhost/bloodlink"
)
```

---

# 3. Create Database

Open:

```
SQL Shell (psql)
```

Login using:

```
Server:
localhost

Database:
postgres

Port:
5432

Username:
postgres

Password:
your password
```

Create the project database:

```sql
CREATE DATABASE bloodlink;
```

Connect to it:

```sql
\c bloodlink
```

Check databases:

```sql
\l
```

---

# 4. Create Python Virtual Environment

Inside:

```
BloodLink/Backend
```

Create environment:

Windows:

```bash
python -m venv venv
```

Activate:

```bash
venv\Scripts\activate
```

You should see:

```
(venv)
```

in your terminal.

---

# 5. Install Python Dependencies

With the virtual environment active:

```bash
pip install flask
pip install flask-sqlalchemy
pip install flask-migrate
pip install flask-cors
pip install psycopg2-binary
```


# 6. Backend Structure

Current structure:

```
Backend
│
├── app.py
├── config.py
├── extensions.py
├── models.py
│
├── migrations/
│
└── routes/
    │
    ├── hospitals.py
    └── requests.py
```

Do not remove `extensions.py`.

It contains the shared database instance and prevents circular imports.

---

# 7. Database Migration Setup

If migrations already exist:

Run:

```bash
flask db upgrade
```

If setting up for the first time:

Initialize:

```bash
flask db init
```

Create migration:

```bash
flask db migrate -m "initial migration"
```

Apply:

```bash
flask db upgrade
```

---

# 8. Running the Backend

Activate environment:

```bash
venv\Scripts\activate
```

Start Flask:

```bash
python app.py
```

Expected output:

```
Running on http://127.0.0.1:5000
```

Test:

Open browser:

```
http://127.0.0.1:5000
```

Expected:

```json
{
"message":"BloodLink API running"
}
```

---

# 9. Important Configuration Notes

Database connection is located in:

```
config.py
```

Current database:

```
bloodlink
```

Current PostgreSQL connection:

```
postgresql://postgres:12345@localhost/bloodlink
```

Change only if your local PostgreSQL credentials differ.

---

# 10. Before Continuing Development

Confirm:

* PostgreSQL service is running
* Virtual environment is active
* Database exists
* Flask server starts successfully
* Migrations are applied

Then continue development from the existing routes and models.

---

# Current Backend Status

Completed:

* Flask setup
* PostgreSQL integration
* SQLAlchemy configuration
* Database migrations
* Hospital module
* Blood request module

Future work can continue with:

* Frontend API integration
* Authentication
* User roles
* Donor functionality
* Deployment
