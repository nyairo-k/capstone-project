# BloodLink: Blood Donation & Emergency Matching System

## Table of Contents
- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Run Instructions](#run-instructions)
- [Pages & Routes](#pages--routes)
- [API Used](#api-used)
- [Folder Structure](#folder-structure)
- [Author](#author)

## Project Description
BloodLink is a web-based application designed to help users find potential blood donors quickly and efficiently. The system allows users to browse donor information, filter donors by blood group, and view donor details including location on a map.

This phase focuses on a React frontend integrated with the DummyJSON Users API, demonstrating component-based architecture, routing, state management, and external API integration.

## Technologies Used
- React
- React Router DOM
- Tailwind CSS
- Leaflet / React-Leaflet
- React Hot Toast
- Vite
- DummyJSON Users API

## Setup Instructions

1. Clone the repository - 
2. Navigate into the project folder - cd BloodLink
3. Install dependencies - npm install
   
## Run Instructions
npm run dev

The app will be available at: http://localhost:5173

## Pages & Routes

| Route | Description |
|-------|-------------|
| / | Home page |
| /about | About page |
| /login | Login page |
| /signup | Signup page |
| /donors | Donor Directory — search and filter donors by blood group |
| /donors/:id | Donor Details — full donor info and location map |

## API Used

DummyJSON Users API
URL: https://dummyjson.com/users
Documentation: https://dummyjson.com/docs/users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | Retrieve all donor records |
| GET | /users/:id | Retrieve a single donor's details |
| GET | /users/search?q= | Search donors by name |

## Folder Structure
BloodLink/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchBar.jsx
│   │   ├── BloodGroupFilter.jsx
│   │   └── DonorCard.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   └── donors/
│   │       ├── DonorDirectoryPage.jsx
│   │       └── DonorDetailsPage.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md

## Authors
Agnes Ng'ang'a
GitHub: https://github.com/Mwihaki112
Muthomi Kaburu
GitHub: https://github.com/MuthomiKaburu
Bathsheba Nyairo
GitHub: https://github.com/nyairo-k
