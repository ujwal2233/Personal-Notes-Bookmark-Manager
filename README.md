# Personal Notes & Bookmark Manager

A full-stack web application for managing personal notes and bookmarks with user authentication.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## Features

### Authentication
- User registration and login
- Secure password hashing with bcrypt
- Cookie-based session management
- Protected routes for authenticated users

### Notes
- Create, read, update, and delete notes
- Add tags to organize notes
- Mark notes as favorites
- Search notes by title or content
- Filter notes by tags

### Bookmarks
- Create, read, update, and delete bookmarks
- Auto-fetch page title from URL
- Add description and tags
- Mark bookmarks as favorites
- Search and filter bookmarks

### UI/UX
- Modern, responsive design
- Mobile-friendly interface
- Toast notifications
- Loading states and animations

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie handling
- **express-validator** - Input validation
- **axios & cheerio** - URL title fetching

### Frontend
- **Next.js 14** - React framework (App Router)
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **react-hot-toast** - Notifications
- **react-icons** - Icons

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── app/                # Next.js pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── notes/
│   │   └── bookmarks/
│   ├── components/         # React components
│   ├── context/            # Auth context
│   ├── services/           # API services
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript types
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
└── README.md               # This file
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ujwal2233/Personal-Notes-Bookmark-Manager.git
   cd Personal-Notes-Bookmark-Manager
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env.local
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the backend** (in one terminal)
   ```bash
   cd backend
   npm run dev
   ```

6. **Run the frontend** (in another terminal)
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open the app**
   
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/notes_bookmarks_db` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

### Frontend (.env.local)

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000/api` |

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get single note |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

### Bookmarks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookmarks` | Get all bookmarks |
| GET | `/api/bookmarks/:id` | Get single bookmark |
| POST | `/api/bookmarks` | Create bookmark |
| PUT | `/api/bookmarks/:id` | Update bookmark |
| DELETE | `/api/bookmarks/:id` | Delete bookmark |

### Query Parameters

- `q` - Search by text
- `tags` - Filter by tags (comma-separated)
- `favorite` - Filter favorites (`true`)

## Sample API Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Create Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  --cookie "userId=YOUR_USER_ID" \
  -d '{"title": "My Note", "content": "Hello World!", "tags": ["test"]}'
```

### Create Bookmark
```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  --cookie "userId=YOUR_USER_ID" \
  -d '{"url": "https://github.com", "tags": ["dev"]}'
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**Ujwal** - [GitHub](https://github.com/ujwal2233)

---

⭐ Star this repo if you find it helpful!