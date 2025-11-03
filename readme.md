# MERN Authentication System

Lightweight authentication system built with the MERN stack (Express + MongoDB) providing register/login, protected user/admin routes, and token refresh.

## Features
- User registration and login
- JWT-based access tokens and refresh tokens
- Role-based access (user / admin)
- Example API responses included

## Tech / Dependencies
- express
- cookie-parser
- cors
- dotenv
- bcrypt
- jsonwebtoken
- mongoose
- nodemon

## Environment (.env)
Create a `.env` file in the project root with the following variables:

```
MONGO_URL=
PORT=
JWT_SECRET=
SALT_ROUND=
```

## Installation & Usage
```bash
git clone <repo-url>
cd <project-name>
npm install
npm run dev
```

## API Base
All endpoints are prefixed with:
/api/v1/auth

### Endpoints
1. POST /register — Register a new user
2. POST /login — Login and receive tokens
3. GET /user — Fetch user profile (protected)
4. GET /admin — Admin-only route (protected)
5. POST /refresh-token — Exchange refresh token for new tokens

---

## Sample Responses

### Register — Success (201)
```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "name": "user1",
    "email": "user1@gmail.com",
    "password": "$2b$10$rcOqvxpgCJHJGbYwQvNrd.FXKQLhhMmZ//rFxsbDEISTQTnM6MlAS",
    "role": "user",
    "_id": "690854e425f542323f3a5ab7",
    "__v": 0
  },
  "message": "User registered successfully"
}
```

### Register — Error
```json
{
  "success": false,
  "statusCode": 500,
  "message": "All fields are required"
}
```

### Login — Success (201)
```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "_id": "690854e425f542323f3a5ab7",
    "name": "user1",
    "email": "user1@gmail.com",
    "token": "<access-token>"
  },
  "message": "User logged in successfully"
}
```

### Login — Error
```json
{
  "success": false,
  "statusCode": 500,
  "message": "Invalid credentials"
}
```

### User Profile — Success (200)
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "_id": "690854e425f542323f3a5ab7",
    "name": "user1",
    "email": "user1@gmail.com",
    "role": "user",
    "__v": 0
  },
  "message": "User profile fetched successfully"
}
```

### User Profile — Error
```json
{
  "success": false,
  "statusCode": 500,
  "message": "Un-Authorised"
}
```

### Admin — Error
```json
{
  "success": false,
  "statusCode": 500,
  "message": "Un-Authorized access"
}
```

### Refresh Token — Success (201)
```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "refreshToken": "<refresh-token>",
    "accessToken": "<access-token>"
  },
  "message": "Tokens generated successfully"
}
```

### Refresh Token — Error
```json
{
  "success": false,
  "statusCode": 500,
  "message": "Un-Authorised"
}
```

---

If you need the README tailored for a specific repository name, CI setup, or deployment instructions, provide the details and it will be adjusted accordingly.