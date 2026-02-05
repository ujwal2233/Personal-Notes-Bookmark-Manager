# Notes & Bookmarks Manager - Backend API

A RESTful API for managing personal notes and bookmarks with JWT authentication.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **axios & cheerio** - Auto-fetch page titles

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── index.js      # Configuration variables
│   │   └── db.js         # Database connection
│   ├── models/
│   │   ├── User.js       # User model
│   │   ├── Note.js       # Note model
│   │   ├── Bookmark.js   # Bookmark model
│   │   └── index.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── noteController.js
│   │   ├── bookmarkController.js
│   │   └── index.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── noteRoutes.js
│   │   ├── bookmarkRoutes.js
│   │   └── index.js
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication
│   │   ├── errorHandler.js  # Centralized error handling
│   │   ├── validate.js      # Validation middleware
│   │   └── index.js
│   ├── utils/
│   │   ├── urlUtils.js      # URL title fetching
│   │   ├── tokenUtils.js    # JWT generation
│   │   └── index.js
│   ├── app.js               # Express app setup
│   └── server.js            # Server entry point
├── .env                     # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/notes_bookmarks_db
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the server:
   ```bash
   # Development mode (with hot reload)
   npm run dev

   # Production mode
   npm start
   ```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Notes

#### Create Note
```
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content here",
  "tags": ["work", "important"],
  "isFavorite": false
}
```

#### Get All Notes
```
GET /api/notes
GET /api/notes?q=search_term
GET /api/notes?tags=work,important
GET /api/notes?favorite=true
Authorization: Bearer <token>
```

#### Get Single Note
```
GET /api/notes/:id
Authorization: Bearer <token>
```

#### Update Note
```
PUT /api/notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "isFavorite": true
}
```

#### Delete Note
```
DELETE /api/notes/:id
Authorization: Bearer <token>
```

### Bookmarks

#### Create Bookmark
```
POST /api/bookmarks
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://example.com",
  "title": "Example Site",      // Optional - auto-fetched if empty
  "description": "A great website",
  "tags": ["reference"],
  "isFavorite": false
}
```

#### Get All Bookmarks
```
GET /api/bookmarks
GET /api/bookmarks?q=search_term
GET /api/bookmarks?tags=reference
GET /api/bookmarks?favorite=true
Authorization: Bearer <token>
```

#### Get Single Bookmark
```
GET /api/bookmarks/:id
Authorization: Bearer <token>
```

#### Update Bookmark
```
PUT /api/bookmarks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "isFavorite": true
}
```

#### Delete Bookmark
```
DELETE /api/bookmarks/:id
Authorization: Bearer <token>
```

## Sample cURL Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Create Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title": "My First Note", "content": "Hello World!", "tags": ["test"]}'
```

### Get Notes
```bash
curl http://localhost:5000/api/notes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Bookmark
```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"url": "https://github.com", "tags": ["dev", "code"]}'
```

### Search Notes
```bash
curl "http://localhost:5000/api/notes?q=hello&tags=test" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Status Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request / Validation Error |
| 401  | Unauthorized |
| 404  | Not Found |
| 500  | Server Error |

## Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation
- ✅ Centralized error handling
- ✅ CORS configured for frontend
- ✅ Search and filter notes/bookmarks
- ✅ Favorite marking
- ✅ Auto-fetch page title for bookmarks
- ✅ User data isolation (users can only access their own data)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/notes_bookmarks_db |
| JWT_SECRET | Secret key for JWT | - |
| JWT_EXPIRE | Token expiration | 7d |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |
