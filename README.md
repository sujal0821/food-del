# Food Delivery Application

A full-stack food delivery application with features for browsing restaurants, ordering food, and tracking deliveries. Built with React, Redux, Node.js, Express, and MongoDB.

![Food Delivery App](![image](https://github.com/user-attachments/assets/1bb790e3-e448-451d-9f0f-9d5ec2ae3fdb))

## 🌟 Live Demo

- **Frontend:** [Your Frontend URL](https://food-del-frontend-a6or.onrender.com/)
- **Backend API:** [https://food-del-backend-hjel.onrender.com](https://food-del-backend-hjel.onrender.com)

## ✨ Features

- **User Authentication:** Sign up, login, and profile management
- **Food Browsing:** Browse food items by category
- **Cart Management:** Add, remove items and checkout
- **Responsive Design:** Works on desktop and mobile devices
- **Redux State Management:** Centralized state management across the application

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **Axios** - API requests
- **React Router** - Navigation
- **CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

#### Clone the repository
```bash
git clone https://github.com/yourusername/food-delivery-app.git
cd food-delivery-app
```

#### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
```

Start the backend server:
```bash
npm start
```

#### Frontend Setup
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

## 📂 Project Structure

```
food-del/
├── frontend/               # React application
│   ├── src/
│   │   ├── assets/         # Static assets
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── redux/          # Redux state management
│   │   │   ├── slices/     # Redux slices
│   │   │   └── hooks.js    # Custom React-Redux hooks
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   └── public/             # Public assets
│
├── backend/                # Express application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── utils/              # Utility functions
│   ├── uploads/            # Uploaded files
│   └── server.js           # Entry point
│
└── README.md               # Project documentation
```

## 🔧 Environment Configuration

The application uses a configuration system to automatically detect and use the appropriate API URL based on the environment:

- In development mode, it connects to `http://localhost:4000`
- In production mode, it connects to `https://food-del-backend-hjel.onrender.com`

## 🔒 Authentication

The application uses JWT for authentication:

1. User registers or logs in
2. Backend validates credentials and issues a JWT token
3. Frontend stores the token in localStorage
4. Token is included in requests to authenticated endpoints

## 📱 Responsive Design

The application is designed to work on all device sizes:

- Desktop: Full layout with sidebar
- Tablet: Adapted layout with collapsible navigation
- Mobile: Mobile-first design with bottom navigation

## 🚢 Deployment

### Backend Deployment (Render)

The backend is deployed on Render with the following configuration:

```yaml
services:
  - type: web
    name: food-delivery-backend
    env: node
    buildCommand: |
      cd backend
      npm install
      npm install bcryptjs
    startCommand: cd backend && node server.js
    envVars:
      - key: NODE_VERSION
        value: 16
      - key: NODE_ENV
        value: production
```

### Frontend Deployment

For static hosting (Netlify, Vercel, GitHub Pages), remember to:

1. Build the frontend: `npm run build`
2. Set up redirects for SPA routing (already included in `_redirects` file)
3. Ensure CORS is properly configured on the backend

## 🔍 Troubleshooting

### Frontend Not Getting Data from Backend

If your static frontend deployment is not receiving data from the backend, try these solutions:

#### 1. Check CORS Configuration
The backend is configured to allow requests from all origins with:

```javascript
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
```

If you're still having CORS issues, check browser's console for specific errors.

#### 2. API Health Check
The application includes a built-in API health check component to diagnose connectivity issues:

1. The health check appears in the bottom-right corner of the app
2. It tries to connect to both the root endpoint and the food list endpoint
3. It shows detailed error information if the connection fails

#### 3. Network Request Debugging
Enable verbose network request logging:

```javascript
// In browser console
localStorage.setItem('debug_api', 'true');
// Refresh the page
```

#### 4. Check Mixed Content Issues
If your frontend is on HTTPS but trying to access HTTP backend, browsers will block requests. Ensure both use HTTPS.

#### 5. Test API Endpoints Directly
Use tools like Postman or curl to test API endpoints:

```bash
curl https://food-del-backend-hjel.onrender.com/api/food/list
```

#### 6. Clear Cache and Local Storage
Sometimes cached data can cause issues:

```javascript
// In browser console
localStorage.clear();
// Then refresh the page
```

#### 7. Check for Path Issues
Ensure your API calls use the correct paths. All backend routes should be prefixed with:
- `/api/food` for food-related endpoints
- `/api/user` for authentication endpoints
- `/api/cart` for cart endpoints

## 🛡️ API Security

The API implements several security measures:

- CORS protection (configured for your frontend domain)
- JWT authentication for protected routes
- Password hashing with bcrypt
- Input validation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Your Name - [Your GitHub Profile](https://github.com/sujal0821)

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Render](https://render.com/) 
