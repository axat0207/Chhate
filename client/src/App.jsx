import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import LayoutLoader from "./components/LayoutLoader";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminChatsManagement from "./pages/admin/AdminChatsManagement";
import AdminUserManagement from "./pages/admin/AdminUserManagement";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));
const NotFound = lazy(() => import("./pages/NotFound"));

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Chat from "./pages/Chat";
// import Groups from "./pages/Groups";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import NotFound from "./pages/NotFound";

const user = false;
function App() {
  return (
    <>
      <div className="h-screen w-screen">
        <BrowserRouter>
          <Toaster />
          <Suspense fallback={<LayoutLoader/>}>
            <Routes>
              <Route element={<ProtectedRoute user />}>
                <Route path="/" element={<Home />} />
                <Route path="/chat/:chatId" element={<Chat />} />
                <Route path="/groups" element={<Groups />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/user-management" element={<AdminUserManagement />} />
              <Route path="/admin/chats-management" element={<AdminChatsManagement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter> 

      </div>
    </>
  );
}

export default App;
