import {NavLink} from 'react-router-dom';
import './css/style.css'
export default function Navbar(){
    return(
        <>
             <nav className="navbar navbar-expand-lg navbar-primary bg-primary fixed-top shadow mb-5">
            <div className="container-fluid">
                <h1 className="navbar-brand text-light">MyShop</h1>
                <button className="navbar-toggler" data-bs-toggle = "collapse" data-bs-target = "#navbarNav" aria-controls = "navbarNav"
                aria-expanded ="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item mx-4 ">
                        <NavLink to='/Dashboard' className='text-light a'>Dashboard</NavLink>
                    </li>
                    <li className="nav-item mx-4 ">
                        <NavLink to='/Sale' className='text-light a'>Sale</NavLink>
                    </li>
                    <li className="nav-item mx-4 ">
                        <NavLink to='/Management' className='text-light a'>Management</NavLink>
                    </li>
                    <li className="nav-item mx-4 ">
                        <NavLink to='/History' className='text-light a'>History</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        </>
    )
}