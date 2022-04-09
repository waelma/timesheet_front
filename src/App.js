import React from "react";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UpdatePwd from "./pages/login/forgetPwd/UpdatePwd";
import ForgetPwdCodeConfirmation from "./pages/login/forgetPwd/ForgetPwdCodeConfirmation";
import AdminLogin from "./pages/Admin/adminLogin/AdminLogin";
import ComptesToApprouve from "./pages/Admin/adminDashbord/comptesToApprouve/ComptesToApprouve";
import ComptesList from "./pages/Admin/adminDashbord/comptesList/ComptesList";
import AdminDashbord from "./pages/Admin/adminDashbord/AdminDashbord";
import Notifications from "./pages/Admin/adminDashbord/notifications/Notifications";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import { SortableTable } from "./components/DraggableBodyRow";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashbord" element={<AdminDashbord />} />
          </Route>
          {/* <Route path="/admin/comptesToApprouve" element={<ComptesToApprouve/>}/>
          <Route path="/admin/comptesList" element={<ComptesList/>}/>
          <Route path="/admin/notifications" element={<Notifications/>}/> */}
          {/* User route */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route
            path="/ForgetPwdCodeConfirmation"
            element={<ForgetPwdCodeConfirmation />}
          />
          <Route path="/updatePwd" element={<UpdatePwd />} />
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
