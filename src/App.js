import React from "react";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdatePwd from "./pages/login/forgetPwd/UpdatePwd";
import ForgetPwdCodeConfirmation from "./pages/login/forgetPwd/ForgetPwdCodeConfirmation";
import AdminLogin from "./pages/Admin/adminLogin/AdminLogin";
import AdminDashbord from "./pages/Admin/adminDashbord/AdminDashbord";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import EmployeHome from "./components/EmployeHome";
import Kanban from "./components/Kanban";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/project" element={<EmployeHome />} />
          <Route path="/home" element={<EmployeHome />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashbord" element={<AdminDashbord />} />
          </Route>

          {/* User route */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register step={0} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route
            path="/ForgetPwdCodeConfirmation"
            element={<ForgetPwdCodeConfirmation />}
          />
          <Route path="/updatePwd" element={<UpdatePwd />} />
          <Route path="/project/kanbanTable" element={<Kanban />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="*" element={<Navigate to="/" replace />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1>Home page</h1>
    </div>
  );
};

export default App;
