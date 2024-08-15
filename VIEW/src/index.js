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

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); 

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/Login" />;
};

export default PrivateRoute;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Dashboard" element={<PrivateRoute element={Dashboard} />} />
      <Route path="/Sale" element={<PrivateRoute element={Sale} />} />
      <Route path="/History" element={<PrivateRoute element={History} />} />
      <Route path="/Management" element={<PrivateRoute element={Management} />} />
      <Route path="/recentSale" element={<PrivateRoute element={RecentSale} />} />
    </Routes>
  </Router>
);

