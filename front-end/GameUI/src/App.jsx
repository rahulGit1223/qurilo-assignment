import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./component/Sidebar";
import { FaBars } from "react-icons/fa"; // Import React icon
import Tournaments from "./pages/Tounaments";
import TournamentMaster from "./pages/TournamentMaster";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import ProtectedRoute from "./auth/auth";
import Upcoming from "./pages/Upcoming";
import Ongoing from "./pages/Ongoing";
import Completed from "./pages/Completed";

const AppContent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Determine if the current route is either login or register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex-1 h-screen">
      <div
        className={`fixed top-0 left-0 z-10 h-full bg-gray-900 transition-transform duration-300 ease-in-out ${
          isCollapsed ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onCollapsed={() => setIsCollapsed(false)} />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? "ml-64" : "ml-0"
        } bg-gradient-to-b from-black via-gray-900 to-black p-4`}
      >
        {!isCollapsed && !isAuthPage && (
          <button
            className="text-white bg-gray-700 p-2 rounded mb-4"
            onClick={() => setIsCollapsed(true)}
          >
            <FaBars className="text-2xl" />
          </button>
        )}
        <Routes>
          {/* Sign Up & Sign In */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Protected Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/tournaments/:gameId" element={<ProtectedRoute><Tournaments /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><TournamentMaster /></ProtectedRoute>} />
          <Route path="/upcoming" element={<ProtectedRoute><Upcoming/></ProtectedRoute>}/>
          <Route path="/ongoing" element={<ProtectedRoute><Ongoing/></ProtectedRoute>}/>
          <Route path="/completed" element={<ProtectedRoute><Completed/></ProtectedRoute>}/>

        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
