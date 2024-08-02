import React,{Component} from "react";
import { Link } from "react-router-dom";

class Signup extends Component{
    constructor(){
        super()
        this.state={

        }
    }

    render(){
        return(
            <div className="bg-light">
                <div className="row p-2 rounded  my-5 mx-auto col-11 col-md-8  shadow">
                 <div className="p-4   my-3 mx-auto col-md-6 ">
                   <h1 className="text-primary text-center">Create an account</h1>
                    <div className="text-center">
                      <img src="../img/add-user.png" alt="" className="mx-auto w-75 my-3"/>
                    </div>
                  </div>
                     <div className="form-signup  p-4  my-3 mx-auto col-md-6 ">

                       <form className="p-4">
                         <div className=" my-2">
                           <label htmlFor="email" className="form-label">Email:</label>
                           <input type="email" className="form-control" id="email" required/>
                         </div>
                         <div className=" my-2">
                           <label htmlFor="name" className="form-label">Name:</label>
                           <input type="text" className="form-control" id="name" required/>
                         </div>
                         <div className=" my-2">
                           <label htmlFor="password" className="form-label">Password:</label>
                           <input type="password" className="form-control" id="password" required/>
                         </div>
                         <div className=" my-2">
                           <label htmlFor="confirmPassword" className="form-label">Confirm password:</label>
                           <input type="password" className="form-control" id="confirmPassword" required/>
                         </div>
                         <button type="submit" className="btn btn-primary w-100 my-3 p-2 shadow">Signup</button>
                         <p className="text-center">Already have an account?  <Link to="/Login">Login</Link> </p>
                       </form>
                     </div>
                </div>
            </div>
        )
    }
}

export default Signup;