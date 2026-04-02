import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/auth/dashboard";
import Tasks from "../pages/auth/Tasks";
import Goals from "../pages/auth/goals/Goals";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Goals" element={<Goals />} />
        

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;