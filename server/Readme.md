# ReWear Backend Server

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the server directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/rewear
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   NODE_ENV=development
   ```

3. **Database Setup**
   - Make sure MongoDB is running locally
   - The database will be created automatically when you first run the server

4. **Seed the Database (Optional)**
   ```bash
   npm run seed
   ```
   This will create test users and items for development.

5. **Run the Server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)

### Items
- `GET /api/items` - Get all available items
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item (protected)

### Users
- `GET /api/users` - Get user profile (protected)
- `PUT /api/users` - Update user profile (protected)

## Models

### User Model
- email (unique)
- password (hashed)
- name
- role (user/admin)
- points
- profileImage
- location
- bio
- rating
- totalSwaps

### Item Model
- owner (ref to User)
- title
- description
- category
- type
- size
- condition
- points
- images
- status
- views
- likes
- approvedBy
- approvedAt

## Security Features
- JWT authentication with HTTP-only cookies
- Password hashing with bcrypt
- CORS enabled for frontend communication
- Role-based access control