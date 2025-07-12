# Team_Phoenix - ReWear

A sustainable community clothing exchange platform where users can swap unused clothing items.

## Team Members
- Patel Ansh Alkeshbhai
- Ghadiya Priyanshu Pravinbhai [Leader]
- Rana Dhruv 
- Maniar Mohammed Ayaz Mohammed Wasim

## Problem Statement
ReWear – Community Clothing Exchange

## Tech Stack

### Frontend (Client)
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Shadcn/ui** components with Radix UI
- **React Router DOM** for routing
- **React Query** for server state management
- **React Hook Form** with Zod validation

### Backend (Server)
- **Node.js** with Express 5
- **MongoDB** with Mongoose ODM
- **JWT** authentication with HTTP-only cookies
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

## Project Structure

```
Team_Phoenix/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and API
│   │   ├── pages/          # Page components
│   │   └── main.tsx        # App entry point
│   └── package.json
├── server/                 # Backend Node.js application
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   └── server.js           # Server entry point
└── package.json            # Root package.json for concurrent running
```

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Team_Phoenix
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client && npm install
   
   # Install server dependencies
   cd ../server && npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `server/` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/rewear
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # From root directory - runs both frontend and backend
   npm run dev
   
   # Or run individually:
   npm run dev:client    # Frontend only (port 5173)
   npm run dev:server    # Backend only (port 5000)
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Features

### Core Functionality
- **User Authentication**: Register, login, logout with JWT
- **Item Management**: List, view, and manage clothing items
- **Points System**: Earn points for listing items, spend on others
- **Admin Panel**: Admin users can manage all items and users
- **Responsive Design**: Works on desktop and mobile devices

### User Roles
- **Regular User**: Can list items, browse, and swap
- **Admin**: Can approve items, manage users, view all data

### Item Status Flow
1. **PENDING_APPROVAL** → New items awaiting admin approval
2. **AVAILABLE** → Approved items ready for swapping
3. **PENDING_SWAP** → Items in swap negotiation
4. **SWAPPED** → Successfully exchanged items
5. **REMOVED** → Items removed from platform

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Items
- `GET /api/items` - Get all available items
- `GET /api/items/:id` - Get specific item
- `POST /api/items` - Create new item (authenticated)

### Users
- `GET /api/users` - Get user profile (authenticated)
- `PUT /api/users` - Update user profile (authenticated)

## Development

### Code Style
- Frontend: TypeScript with strict mode
- Backend: ES6+ with CommonJS modules
- Consistent formatting with Prettier
- ESLint for code quality

### Database Schema
The application uses MongoDB with two main collections:
- **Users**: Authentication and profile data
- **Items**: Clothing items with metadata and status

### Security Features
- JWT tokens stored in HTTP-only cookies
- Password hashing with bcrypt
- CORS configuration for frontend communication
- Role-based access control
- Input validation and sanitization

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is part of the Team_Phoenix collaboration.