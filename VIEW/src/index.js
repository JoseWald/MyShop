import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router,Routes , Route} from "react-router-dom";//Switch became deprecated so ,I used Routes instead
import "./Bootstrap/css/bootstrap.min.css";

import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";



const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div>
        <Router>
            <Routes>
                <Route path="/Login" Component={Login}/>
                <Route path="/Signup" Component={Signup}/>
                <Route path="/Dashboard" Component={Dashboard}/>
            </Routes>
        </Router>
  </div>
   
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
