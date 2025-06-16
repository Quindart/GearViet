# GearViet - E-commerce Platform

GearViet is a full-stack e-commerce platform built with modern web technologies. The project consists of three main components: a client-facing storefront, an admin dashboard, and a backend server.

## Project Structure

```
GearViet/
├── client/     # Customer-facing Next.js storefront
├── admin/      # React admin dashboard
└── server/     # Express.js backend server
```

## Technology Stack

### Client (Next.js Storefront)
- Next.js 15.3.3
- React 19
- TypeScript
- Tailwind CSS
- Class Variance Authority for component variants
- Lucide React for icons

### Admin Dashboard (React)
- React 18
- TypeScript
- Material UI (MUI)
- Redux Toolkit for state management
- Formik & Yup for form handling
- Jodit React for rich text editing
- Tailwind CSS

### Server (Express.js)
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Redis for caching
- Nodemailer for email handling
- Cloudinary for image uploads
- Jest & Supertest for testing

## Getting Started

### Server Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with necessary environment variables
4. Start the development server:
   ```bash
   npm run start
   ```
5. To run the database seeder (if available):
   ```bash
   npm run seeder
   ```

### Client Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

### Admin Setup
1. Navigate to the admin directory:
   ```bash
   cd admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. For production build:
   ```bash
   npm run build
   ```

## Environment Variables

### Server
Required environment variables for the server:
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `REDIS_URL`: Redis connection URL
- `CLOUDINARY_*`: Cloudinary credentials
- `SMTP_*`: Email service credentials

### Client
Required environment variables for the client:
- `NEXT_PUBLIC_API_URL`: Backend API URL

### Admin
Required environment variables for the admin dashboard:
- `REACT_APP_API_URL`: Backend API URL

## Development

- The client runs on `http://localhost:3000` by default
- The admin dashboard runs on `http://localhost:3001`
- The server runs on `http://localhost:5000`

## Features

- Modern, responsive UI for the storefront
- Comprehensive admin dashboard for product management
- RESTful API backend with MongoDB
- User authentication and authorization
- Product catalog management
- Shopping cart functionality
- Order processing
- Image upload and management
- Email notifications
- Caching with Redis