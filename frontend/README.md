# Notes & Bookmarks Manager - Frontend

A modern, responsive frontend for managing personal notes and bookmarks built with Next.js and Tailwind CSS.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **react-hot-toast** - Toast notifications
- **react-icons** - Icon library

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page (redirects)
│   ├── login/
│   │   └── page.tsx         # Login page
│   ├── register/
│   │   └── page.tsx         # Register page
│   ├── notes/
│   │   └── page.tsx         # Notes management page
│   └── bookmarks/
│       └── page.tsx         # Bookmarks management page
├── components/
│   ├── Navbar.tsx           # Navigation bar
│   ├── ProtectedRoute.tsx   # Auth guard component
│   ├── NoteForm.tsx         # Note create/edit form
│   ├── NoteCard.tsx         # Note display card
│   ├── BookmarkForm.tsx     # Bookmark create/edit form
│   ├── BookmarkCard.tsx     # Bookmark display card
│   ├── SearchBar.tsx        # Search input component
│   ├── TagFilter.tsx        # Tag filtering component
│   ├── Modal.tsx            # Reusable modal component
│   └── index.ts             # Component exports
├── context/
│   └── AuthContext.tsx      # Authentication context
├── services/
│   ├── api.ts               # Axios instance with interceptors
│   ├── noteService.ts       # Notes API service
│   ├── bookmarkService.ts   # Bookmarks API service
│   └── index.ts             # Service exports
├── styles/
│   └── globals.css          # Global styles & Tailwind
├── types/
│   └── index.ts             # TypeScript interfaces
├── .env.local               # Environment variables
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Backend API running (see backend README)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Authentication
- User registration with email and password
- User login with JWT authentication
- Protected routes for authenticated users
- Automatic token refresh and logout on expiration

### Notes Management
- Create, read, update, and delete notes
- Add tags to organize notes
- Mark notes as favorites
- Search notes by title or content
- Filter notes by tags
- Filter to show only favorites

### Bookmarks Management
- Create, read, update, and delete bookmarks
- Auto-fetch page title from URL (handled by backend)
- Add description and tags
- Mark bookmarks as favorites
- Search bookmarks by title, URL, or description
- Filter bookmarks by tags
- Open bookmarks in new tab

### UI Features
- Responsive design for mobile and desktop
- Clean, modern interface with Tailwind CSS
- Toast notifications for user feedback
- Loading states and spinners
- Modal forms for create/edit operations
- Hover effects and transitions

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:5000/api |

## Pages

### `/login`
Login page for existing users.

### `/register`
Registration page for new users.

### `/notes`
Notes management page with:
- Grid view of all notes
- Create new note button
- Search bar
- Tag filter dropdown
- Favorites filter
- Edit and delete actions

### `/bookmarks`
Bookmarks management page with:
- Grid view of all bookmarks
- Create new bookmark button
- Search bar
- Tag filter dropdown
- Favorites filter
- Edit, delete, and open link actions

## State Management

The application uses React Context for authentication state:

```typescript
const { user, token, login, register, logout, isLoading } = useAuth();
```

## API Integration

All API calls are made through the centralized Axios instance with:
- Base URL configuration
- Authorization header injection
- Automatic redirect on 401 errors

## Styling

The application uses Tailwind CSS with custom utility classes:

```css
.btn-primary    /* Primary action buttons */
.btn-secondary  /* Secondary buttons */
.btn-danger     /* Destructive action buttons */
.input-field    /* Form input styling */
.card           /* Card container styling */
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
