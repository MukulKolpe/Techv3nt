import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddEvent from "./pages/AddEvent/AddEvent";
import Admin from "./pages/Admin/Admin";
import Events from "./pages/Events/Events";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Admin />} path="/admin" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<AddEvent />} path="/add-event" />
          <Route element={<Events />} path="/events" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
