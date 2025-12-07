# 🎓 SRM Student Management System

<div align="center">

![SRM Logo](Frontend/src/Assets/LogoSttiss.png)

**A Modern, Feature-Rich Student Management System**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)](https://expressjs.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

SRM Student Management System is a comprehensive, modern web application designed to streamline student data management for educational institutions. Built with the MERN stack, it offers an intuitive interface with powerful features for managing students, tracking attendance, recording marks, and generating insightful analytics.

### ✨ Key Highlights

- 🎨 **Beautiful UI/UX** - Modern design with glassmorphism effects and smooth animations
- 📊 **Real-time Analytics** - Interactive charts and statistics dashboards
- 🔐 **Secure** - Environment-based configuration and data validation
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast** - Optimized performance with React and MongoDB
- 🎯 **Feature-Rich** - Comprehensive student management capabilities

---

## 🚀 Features

### Student Management
- ✅ Add, edit, and delete student records
- ✅ Advanced search and filtering
- ✅ Export data to CSV and JSON formats
- ✅ Detailed student profiles with multiple fields
- ✅ Gender-based statistics

### Academic Tracking
- 📚 **Subjects Management** - Organize courses and subjects
- 📝 **Marks & Grading** - Track student performance with automatic grade calculation
- 📅 **Attendance System** - Mark and monitor attendance with statistics
- 📆 **Academic Calendar** - Manage events, exams, and important dates

### Analytics & Reporting
- 📊 Circular progress indicators for statistics
- 🥧 Pie charts for course distribution and performance
- 📈 Subject-wise and exam-type analysis
- 📉 Attendance percentage tracking
- 🎯 Overall GPA calculation

### User Experience
- 🎨 Glassmorphism design with gradient backgrounds
- ✨ Smooth animations and transitions
- 🖱️ Custom animated cursor
- 🎭 Collapsible sidebar navigation
- 🌊 Animated wave backgrounds
- 🎪 Particle effects on landing page

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.x - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **SweetAlert2** - Beautiful alerts
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Development Tools
- **Nodemon** - Auto-restart server
- **Create React App** - React boilerplate

---

## 📸 Screenshots

### Landing Page
![Landing Page](docs/screenshots/landing.png)
*Modern landing page with animated particles and statistics*

### Student Management
![Students Page](docs/screenshots/students.png)
*Comprehensive student listing with search and filters*

### Add/Edit Student
![Add Student](docs/screenshots/add-student.png)
*Beautiful form with real-time validation*

### Analytics Dashboard
![Analytics](docs/screenshots/analytics.png)
*Interactive charts and performance metrics*

---

## 💻 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/srm-student-management.git
cd srm-student-management
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:

```env
PORT=8070
MONGODB_URL=mongodb://localhost:27017/student-management
```

Start the backend server:

```bash
npm run dev
```

The server will run on `http://localhost:8070`

### Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file in the Frontend directory:

```env
REACT_APP_API_URL=http://localhost:8070
```

Start the frontend development server:

```bash
npm start
```

The app will open at `http://localhost:3000`

---

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=8070                                          # Server port
MONGODB_URL=mongodb://localhost:27017/student-db  # MongoDB connection string
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8070  # Backend API URL
```

### MongoDB Setup

1. **Local MongoDB**:
   ```bash
   mongod --dbpath /path/to/data/directory
   ```

2. **MongoDB Atlas** (Cloud):
   - Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get connection string
   - Update `MONGODB_URL` in backend `.env`

---

## 📖 Usage

### Adding a Student

1. Navigate to **Add Student** from the sidebar
2. Fill in all required fields:
   - Name, Registration Number, Gender
   - Email, Phone, Age
   - Course, Address, Enrollment Date
3. Click **Add Student**
4. Validation ensures data integrity

### Managing Students

1. Go to **Students** page
2. Use search bar to find specific students
3. Filter by gender (All/Male/Female)
4. Click **Edit** to modify student details
5. Click **Delete** to remove a student (with confirmation)

### Exporting Data

1. On **Students** page, hover over **Export** button
2. Choose format: CSV or JSON
3. File downloads automatically with timestamp

### Viewing Analytics

1. Visit the **Landing Page** for overview statistics
2. View circular progress for student distribution
3. Check pie charts for course and performance breakdown

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8070
```

### Endpoints

#### Students

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/student/get` | Get all students |
| GET | `/student/get/:id` | Get student by ID |
| POST | `/student/add` | Add new student |
| PUT | `/student/update/:id` | Update student |
| DELETE | `/student/delete/:id` | Delete student |

#### Subjects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/subject/get` | Get all subjects |
| GET | `/subject/course/:course` | Get subjects by course |
| POST | `/subject/add` | Add new subject |
| PUT | `/subject/update/:id` | Update subject |
| DELETE | `/subject/delete/:id` | Delete subject |

#### Attendance

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/attendance/get` | Get all attendance |
| GET | `/attendance/student/:id` | Get by student |
| GET | `/attendance/stats/:id` | Get statistics |
| POST | `/attendance/mark` | Mark attendance |
| DELETE | `/attendance/delete/:id` | Delete record |

#### Marks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/marks/get` | Get all marks |
| GET | `/marks/student/:id` | Get by student |
| GET | `/marks/stats/:id` | Get statistics |
| POST | `/marks/add` | Add marks |
| PUT | `/marks/update/:id` | Update marks |
| DELETE | `/marks/delete/:id` | Delete marks |

### Sample Request

```javascript
// Add Student
const response = await axios.post('http://localhost:8070/student/add', {
  name: "John Doe",
  regno: "2024001",
  gender: "Male",
  email: "john@example.com",
  phone: "1234567890",
  age: 20,
  course: "Computer Science",
  address: "123 Main St",
  enrollmentDate: "2024-01-15"
});
```

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend**:
   ```bash
   cd Frontend
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Set environment variables** in Vercel dashboard:
   - `REACT_APP_API_URL` = Your backend URL

### Backend Deployment (Heroku/Railway)

1. **Create `Procfile`** in Backend directory:
   ```
   web: node server.js
   ```

2. **Deploy to Heroku**:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URL=your_mongodb_atlas_url
   heroku config:set PORT=8070
   ```

### Database (MongoDB Atlas)

1. Create cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist all IPs (0.0.0.0/0) for deployment
3. Get connection string
4. Update environment variables

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- Use ES6+ features
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Ensure code passes linting

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Naseer**

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- SRM Institute for the inspiration
- React community for excellent documentation
- MongoDB for the powerful database
- All contributors who helped improve this project

---

## 📞 Support

If you have any questions or need help, please:

- Open an [Issue](https://github.com/YOUR_USERNAME/srm-student-management/issues)
- Email: your.email@example.com

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Naseer

</div>
