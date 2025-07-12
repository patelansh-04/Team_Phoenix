# ReWear Server

Backend API server for the ReWear community clothing exchange platform.

## Environment Setup

Create a `.env` file in the server directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/rewear

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration (optional - will use defaults if not set)
CLIENT_ORIGIN=http://localhost:5173,http://localhost:3000
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Database Seeding

```bash
npm run seed
```

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

## Models

### User
- `email` (String, required, unique)
- `password` (String, required)
- `name` (String, required)
- `role` (String, enum: ['user', 'admin'], default: 'user')
- `points` (Number, default: 0)
- `profileImage` (String)
- `location` (String)
- `bio` (String)
- `rating` (Number, default: 0)
- `totalSwaps` (Number, default: 0)

### Item
- `owner` (ObjectId, ref: 'User', required)
- `title` (String, required)
- `description` (String, required)
- `category` (String, required)
- `type` (String, required)
- `size` (String, required)
- `condition` (String, enum: ['New', 'Like New', 'Good', 'Fair', 'Poor'], required)
- `points` (Number, required)
- `tags` ([String])
- `images` ([String], required)
- `status` (String, enum: ['PENDING_APPROVAL', 'AVAILABLE', 'PENDING_SWAP', 'SWAPPED', 'REMOVED'], default: 'PENDING_APPROVAL')
- `views` (Number, default: 0)
- `likes` ([ObjectId], ref: 'User')
- `approvedBy` (ObjectId, ref: 'User')
- `approvedAt` (Date)
- `reasonForRemoval` (String)
- `removedBy` (ObjectId, ref: 'User')
- `removedAt` (Date)