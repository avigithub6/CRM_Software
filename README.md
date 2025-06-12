# Rakshak Securitas CRM

A comprehensive Customer Relationship Management (CRM) system for Rakshak Securitas Pvt. Ltd., designed to manage security operations efficiently.

## Features

- User Authentication & Authorization
- Dashboard with Real-time Statistics
- Client Management
- Guard Management
- Incident Reporting & Tracking
- Training Management
- Audit Management
- Alert System
- Dark Mode Support
- Role-based Access Control

## Tech Stack

### Frontend
- Next.js 13+
- Tailwind CSS
- TypeScript
- Context API for State Management

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/avigithub6/CRM_Software.git
cd CRM_Software
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create environment variables:
   - Backend (.env):
     ```
     MONGODB_URI=mongodb://localhost:27017/rakshak_crm
     JWT_SECRET=your-secret-key-here
     PORT=5001
     ```
   - Frontend (.env.local):
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5001
     ```

5. Start the servers:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```

6. Access the application at `http://localhost:3000`

## Project Structure

```
CRM_Software/
├── backend/              # Backend server
│   ├── controllers/      # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Server entry point
│
└── frontend/            # Frontend application
    ├── src/
    │   ├── app/        # Next.js pages
    │   ├── components/ # React components
    │   ├── context/    # Context providers
    │   └── styles/     # Global styles
    └── public/         # Static assets
```

## Available Scripts

### Backend
- `npm start`: Start the server
- `npm run dev`: Start the server in development mode

### Frontend
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server

## Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5001)

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: Backend API URL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 