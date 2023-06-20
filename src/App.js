import React from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import { useAuth } from "./providers/AuthProvider";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ContentDetail from "./pages/ContentDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GuardedRoute from "./guards/GuardedRoute";
// import { useContext } from "react";
// import {AuthContext} from...
// usage:
//   const context = useContext(AuthContext)
function App() {
  const { isLoggedIn, login, logout, username } = useAuth();
  return (
    <div className="text-slate-600">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content/:id" element={<ContentDetail />} />
        <Route
          element={
            <GuardedRoute isRouteAccessible={!isLoggedIn} redirectRoute="/" />
          }
        >
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
