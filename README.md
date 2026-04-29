# Crowdback - Crowdsourced Public Feedback & Issue Management System

![Crowdback](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![React](https://img.shields.io/badge/React-19+-blue)

## 📋 Project Overview

Crowdback is a crowdsourced feedback and issue management system designed for public transportation and services. It enables citizens to report issues, provide feedback, and earn rewards for participation, while empowering officials and authorities to manage, track, and respond to feedback in real-time.

### Key Value Propositions
- 🚌 **Issue Reporting**: Citizens can report transit issues (bus, subway, train, etc.)
- 📊 **Real-time Dashboard**: Officials can track and manage feedback efficiently
- 🎮 **Gamification**: Users earn points for reporting issues and participation
- 📧 **Notifications**: Email alerts for feedback updates and status changes
- 📍 **Location-based Tracking**: Organize feedback by transport mode and location

## ✨ Features

### For Citizens/Users
- ✅ User registration and JWT-based authentication
- ✅ Report issues with title, description, location, and photo uploads
- ✅ Track reported tickets and their status (New, In Progress, Urgent)
- ✅ Earn points for each issue reported (10 points per issue)
- ✅ View personal profile and points history
- ✅ Receive email notifications for feedback updates
- ✅ Filter and categorize issues by transport mode (Bus, Subway, Train)

### For Authorities/Officials
- ✅ Dedicated authority login system
- ✅ Real-time feedback management dashboard
- ✅ View all reported issues with status tracking
- ✅ Update feedback status and assign priority
- ✅ Analytics and feedback count tracking
- ✅ Image preview of reported issues
- ✅ Respond to and manage user feedback

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + bcryptjs password hashing
- **File Upload**: Multer
- **Email Service**: Nodemailer
- **Cors**: Cross-Origin Resource Sharing enabled

### Frontend
- **Library**: React 19
- **Build Tool**: Vite
- **State Management**: React Context API
- **Routing**: React Router
- **HTTP Client**: Axios
- **UI Frameworks**: Bootstrap, React Bootstrap
- **Icons**: Lucide React, React Icons
- **Styling**: Tailwind CSS, Bootstrap CSS
- **Linting**: ESLint

### Development
- **Version Control**: Git
- **Package Manager**: npm/yarn

## 📦 Project Structure

```
Crowdback/
├── backend/
│   ├── server.js                 # Main Express server
│   ├── package.json
│   ├── seedAuthorities.js        # Database seed script
│   ├── config/
│   │   └── multerConfig.js       # Multer file upload configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── feedbackController.js # Feedback management
│   │   └── userController.js     # User management
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification middleware
│   ├── models/
│   │   ├── user.js               # User schema
│   │   ├── authority.js          # Authority/Official schema
│   │   └── feedback.js           # Feedback/Issue schema
│   ├── routes/
│   │   ├── auth.js
│   │   ├── userroutes.js
│   │   ├── authorityroutes.js
│   │   └── feedbackRoutes.js
│   └── uploads/                  # User-uploaded images
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx              # React entry point
│   │   ├── App.jsx               # Main App component
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── context/
│   │   │   └── AuthContext.js    # Authentication context
│   │   ├── Components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── FeedbackManagement.jsx
│   │   │   ├── ReportIssue.jsx
│   │   │   ├── Practice.jsx
│   │   │   ├── AuthoritiesDashboard.jsx
│   │   │   ├── AuthoritiesSidebar.jsx
│   │   │   ├── Authentication/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── AuthoritiesLogin.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── Publics/
│   │   │       ├── UserHome.jsx
│   │   │       ├── UserProfile.jsx
│   │   │       ├── TicketStatus.jsx
│   │   │       └── Sidebar.jsx
│   │   ├── assets/
│   │   └── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
├── practice/                     # Practice/test files
│   ├── practice.js
│   ├── practice.py
│   └── envprac/                  # Python virtual environment
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Git**

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/crowdback.git
cd crowdback
```

#### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crowdback
JWT_SECRET=your_jwt_secret_key_here
NODEMAILER_USER=your_email@gmail.com
NODEMAILER_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

**Note**: For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

#### 3. Frontend Setup

In a new terminal, navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Create a `.env.local` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

#### 4. Seed Database (Optional)

To seed the database with initial authority/official accounts:
```bash
cd backend
node seedAuthorities.js
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/authority-login` - Authority login

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/tickets` - Get user's reported tickets

### Feedback
- `POST /api/feedback` - Create new feedback/issue
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/:id` - Get specific feedback
- `PUT /api/feedback/:id` - Update feedback status
- `DELETE /api/feedback/:id` - Delete feedback

### Authorities
- `GET /api/authorities/dashboard` - Authority dashboard data
- `GET /api/authorities/feedback` - Get all feedback for authorities

## 🔐 Environment Variables

### Backend (.env)
```env
PORT                 # Server port (default: 5000)
MONGODB_URI         # MongoDB connection string
JWT_SECRET          # Secret key for JWT tokens
NODEMAILER_USER     # Email address for sending notifications
NODEMAILER_PASS     # Email password or app-specific password
FRONTEND_URL        # Frontend application URL
```

### Frontend (.env.local)
```env
VITE_API_BASE_URL   # Backend API base URL
```

## 🎮 Usage

### For Users
1. **Register/Login**: Create an account or sign in
2. **Report Issue**: Navigate to "Report Issue" and fill in details
3. **Upload Photo**: Attach images of the issue (optional)
4. **Track Status**: Check your tickets and their current status
5. **Earn Points**: Get points for each reported issue
6. **View Profile**: Check your points and submission history

### For Authorities
1. **Login**: Use authority credentials to access the dashboard
2. **View Feedback**: See all reported issues in the dashboard
3. **Update Status**: Change feedback status (New, In Progress, Urgent)
4. **Manage Issues**: Track and respond to citizen feedback

## 🧪 Testing

To run tests:
```bash
cd backend
npm test

cd ../frontend
npm test
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or your cloud instance is accessible
- Check connection string in `.env` file
- Verify firewall settings if using MongoDB Atlas

### Email Notifications Not Sending
- Verify NODEMAILER_USER and NODEMAILER_PASS are correct
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833)
- Check spam/trash folders

### CORS Errors
- Ensure FRONTEND_URL in backend `.env` matches your frontend URL
- Clear browser cache and restart dev server

### Port Already in Use
- Change PORT in `.env` to an available port
- Or kill the process using the port:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - macOS/Linux: `lsof -i :5000` then `kill -9 <PID>`

## 📝 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  points: Number (default: 0),
  isAdmin: Boolean
}
```

### Authority Model
```javascript
{
  email: String (unique),
  password: String (hashed)
}
```

### Feedback Model
```javascript
{
  title: String,
  image: String (URL),
  date: Date,
  location: String,
  description: String,
  mode: String (Bus/Subway/Train),
  reporter: ObjectId (User reference),
  type: String (suggestion/feedback/issue),
  status: String (New/In Progress/Urgent),
  email: String,
  pointsAllocated: Number
}
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors & Maintainers

- **Your Name** - Initial work

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js community
- React team for the UI library
- All contributors and testers

## 📞 Support

For support, email support@crowdback.com or open an issue on GitHub.

---

**Last Updated**: April 2026