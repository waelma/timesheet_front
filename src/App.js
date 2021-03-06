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
import EmployeHome from "./pages/Employe/EmployeHome";
import Kanban from "./pages/Employe/Project/Kanban/Kanban";
import Calendar from "./pages/Employe/Calendar/EmployeCalendar";
import TaskModel from "./pages/Employe/Project/Kanban/Task/TaskModel";
import MessageBox from "./pages/Employe/Messages/MessageBox";
import Archive from "./pages/Employe/Archive/Archive";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TaskModel />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashbord" element={<AdminDashbord />} />
          </Route>

          {/* User route */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register step={0} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<EmployeHome />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/messages" element={<MessageBox />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/messages/:id" element={<MessageBox />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/archive" element={<Archive />} />
          </Route>
          <Route
            path="/ForgetPwdCodeConfirmation"
            element={<ForgetPwdCodeConfirmation />}
          />
          <Route path="/updatePwd" element={<UpdatePwd />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/project/kanbanTable/:id" element={<Kanban />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/calendar" element={<Calendar />} />
          </Route>
          <Route path="*" element={<NotFound />} />
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
