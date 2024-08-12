import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Bootstrap/css/bootstrap.min.css";

import Navbar  from "./component/navbar";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./page/Dashboard";
import Sale from "./page/Sale";
import History from "./page/history";
import Management from "./page/Management";
import RecentSale from "./page/recentSale";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Sale" element={<Sale />} />
      <Route path="/History" element={<History />} />
      <Route path="/Management" element={<Management />} />
      <Route path="recentSale" element={<RecentSale/>} />
    </Routes>
  </Router>
);
