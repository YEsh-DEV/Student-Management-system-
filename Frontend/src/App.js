import "./App.css";
import Sidebar from "./Components/Sidebar";
import AddStudent from "./Pages/AddStudent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Students from "./Pages/Students";
import Subjects from "./Pages/Subjects";
import Attendance from "./Pages/Attendance";
import Marks from "./Pages/Marks";
import Calendar from "./Pages/Calendar";
import ShowOne from "./Components/ShowOne";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";
import CustomCursor from "./Components/CustomCursor";

function App() {
  return (
    <Router>
      <CustomCursor />
      <Sidebar />
      <div className="app-container">
        <div className="app-content">
          <Routes>
            <Route path="/" exact Component={Landing} />
            <Route path="/students" exact Component={Students} />
            <Route path="/add-student" exact Component={AddStudent} />
            <Route path="/subjects" exact Component={Subjects} />
            <Route path="/attendance" exact Component={Attendance} />
            <Route path="/marks" exact Component={Marks} />
            <Route path="/calendar" exact Component={Calendar} />
            <Route path="/edit/:id" exact Component={ShowOne} />
            <Route path="*" exact Component={NotFound} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
