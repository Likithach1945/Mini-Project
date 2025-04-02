import React, { useState, useEffect } from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import DNavbar from "./Course_components/DNavbar";
import CoursePage from "./Course_components/CoursePage/CoursePage";
import CourseCard from "./pages/courses/CourseCard";
import CourseDetail from "./pages/courses/CourseDetails";
// import Languages from "./pages/Dashboard/Languages";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseDetailsWrapper = () => {
  const { id } = useParams();
  return <CourseDetail courseId={id} />;
};

const App = () => {
  const [courses, setCourses] = useState([]);
  const [login, setLogin] = useState(false);
  const location = useLocation();
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const isHomePage = location.pathname === "/";
  const isDashboardPage = location.pathname === "/dashboard";
  const isCourseDetailPage = location.pathname.startsWith("/courses/");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      {login && <Login setLogin={setLogin} />}
      <div className="container">
        <div className="app">
          <Navbar setLogin={setLogin} isHomePage={isHomePage} />
        </div>
        {!isHomePage && <DNavbar />}
      </div>
      <Routes>
        <Route path="/" element={<Home setLogin={setLogin} />} />
        <Route
          path="/dashboard"
          element={
            <div>
              <Dashboard />
              {/* <Languages /> */}
            </div>
          }
        />
        <Route path="/courses/:id" element={<CourseDetailsWrapper />} />
        <Route path="/courses/:language" element={<CoursePage />} />
        <Route path="/about" element={<h2>About Page</h2>} />
        <Route path="/contact" element={<h2>Contact Page</h2>} />
      </Routes>
      {selectedCourseId && (
        <div className="course-detail-container">
          <button
            onClick={() => setSelectedCourseId(null)}
            className="close-btn"
          >
            ❌ Close Course
          </button>
          <CourseDetail courseId={selectedCourseId} />
        </div>
      )}
      {!isCourseDetailPage && <Footer login={login} />}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default App;

// Run Command Prompt as Administrator
// net start MongoDB
