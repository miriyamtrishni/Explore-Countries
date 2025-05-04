[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# Countries Explorer App

A full-stack web application that allows users to explore countries around the world, view detailed information about each country, and manage their favorites list. The app includes user authentication and responsive design for seamless use on both desktop and mobile devices.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)  
  - [Backend](#backend)  
  - [Frontend](#frontend)  
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Explore Countries**: Search countries by name or filter by region.  
- **Detailed Information**: View demographics, geography, politics & society, economy, and practical info.  
- **User Authentication**: Register, login, and maintain user sessions with JWT and HTTP-only cookies.  
- **Favorites System**: Save and manage your favorite countries.  
- **Responsive Design**: Optimized for desktop and mobile via Tailwind CSS.  



## Technologies Used

### Frontend  
- React.js  
- React Router  
- Tailwind CSS  
- Axios  
- Lucide React  
- Jest  

### Backend  
- Node.js & Express  
- MongoDB & Mongoose  
- JWT  
- bcryptjs  
- cookie-session  

## Prerequisites

- Node.js (v14+) & npm  
- MongoDB (local or Atlas)  

---

## Installation & Setup

### Backend

```bash
# 1. Clone repo & install dependencies
git clone replace with your url
cd .../backend
npm install

# 2. Create .env file in backend/
cat > .env << EOF
PORT=...
NODE_ENV=development
MONGODB_URI=...
JWT_SECRET=...
COOKIE_SECRET=your_cookie_secret
CLIENT_URL=http://localhost:3000
EOF

# 3. (Optional) Seed roles
node -r dotenv/config scripts/seedRoles.js

# 4. Start server
npm run dev
```

### Frontend

```bash
# 1. Navigate & install
cd ../frontend
npm install

# 2. (Optional) Set API URL
cat > .env << EOF
REACT_APP_API_URL=http://localhost:8080/api/auth/
EOF

# 3. Start client
npm start
```

---

## Usage

1. Open browser at `http://localhost:3000`.  
2. Register or login.  
3. Search or filter countries.  
4. Click a country card for details.  
5. Add/remove favorites.  
6. View & manage favorites on your Profile.

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/signup`   | Register a new user      |
| POST   | `/api/auth/signin`   | Login & start session    |
| POST   | `/api/auth/signout`  | Logout & clear session   |

### User & Favorites

| Method | Endpoint                    | Description                      |
| ------ | --------------------------- | -------------------------------- |
| GET    | `/api/test/user`            | Protected user content           |
| GET    | `/api/favorites`            | Get current user’s favorites     |
| POST   | `/api/favorites/toggle`     | Toggle a country in favorites    |

---

## Project Structure

```text
countries-app/
├── backend/                  # Express API server
│   ├── config/               # Env, CORS, JWT settings
│   ├── controllers/          # Route handlers
│   ├── middlewares/          # Auth & validation
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── scripts/              # Utilities (e.g., seedRoles)
│   └── server.js             # Entry point
└── frontend/                 # React client
    ├── public/               # Static assets & index.html
    └── src/
        ├── components/       # React components
        ├── services/         # API service modules
        ├── App.js            # Routes & layout
        └── index.js          # Client entry point
```

---

## Contributing

1. **Fork** the repo.  
2. **Branch**: `git checkout -b feature/cool-feature`  
3. **Commit**: `git commit -m "Add cool feature"`  
4. **Push**: `git push origin feature/cool-feature`  
5. Open a **Pull Request**.

 -

 
 
