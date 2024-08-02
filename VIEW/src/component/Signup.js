import React,{Component} from "react";
import { Link } from "react-router-dom";
import add_user_png from "../IMG/add-user.png";

class Signup extends Component{
    constructor(props){
        super(props)
        this.state={
                username:'',usernameErrMessage:'',
                password:'',passwordErrMessage:'',
                passwordConfirmation:'',passwordConfirmationErrMessage:''
        };
    }

    handleName(event){
        this.setState({username:event.target.value});
        const {username}=this.state;
    };

    handlePassword(event){
        this.setState({password:event.target.value});
    };

    handlePasswordConfirmation(event){
        this.setState({passwordConfirmation:event.target.value});
    };

    handleInscriptionValidation(){

    }

    handleSubmition(event){
        event.preventDefault();
        
    };

    render(){
        const {passwordErrMessage}=this.state;
        return(
            <div className="bg-light">
                <div className="row p-2 rounded  my-5 mx-auto col-11 col-md-8  shadow">
                 <div className="p-4   my-3 mx-auto col-md-6 ">
                   <h1 className="text-primary text-center">Create an account</h1>
                    <div className="text-center">
                      <img src={add_user_png} alt="" className="mx-auto w-75 my-3"/>
                    </div>
                  </div>
                     <div className="form-signup  p-4  my-3 mx-auto col-md-6 ">

                       <form className="p-4">
                         <div className=" my-2">
                         </div>
                         <div className=" my-2">
                           <label htmlFor="name" className="form-label">Username:</label>
                           <input type="text" className="form-control" id="name" required/>
                         </div>
                         <div className=" my-2">
                           <label htmlFor="password" className="form-label">Password:</label>
                           <input 
                                type="password" 
                                className="form-control" 
                                id="password" value={this.state.password} 
                                onChange={this.handlePassword} 
                            required/>
                            {passwordErrMessage && <div  className="text-danger">{passwordErrMessage}</div>}
                         </div>
                         <div className=" my-2">
                           <label htmlFor="confirmPassword" className="form-label">Confirm password:</label>
                           <input 
                                type="password" 
                                className="form-control" 
                                id="confirmPassword" 
                                value={this.state.passwordConfirmation} 
                                onChange={this.handlePasswordConfirmation} 
                            required/>
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