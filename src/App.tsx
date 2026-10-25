import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/Register";
import HomePage from "@/pages/HomePage/HomePage";
import RequiredLogin from "./pages/RequiredLogin";

function App() {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Home",
      "/login": "Login",
      "/register": "Register",
    };

    const pageTitle = titles[location.pathname] ?? "Page Not Found";

    document.title = `Leivora | ${pageTitle}`;
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/required-login" element={<RequiredLogin />} />
    </Routes>
  );
}

export default App;
