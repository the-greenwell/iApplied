import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout.hook'
import { AuthContext } from '../context/auth.context'
export const Navbar = ({loggedIn, setLoggedIn}) => {
    const {logout} = useLogout()
    const { user } = useContext(AuthContext);
    const logoutHandler = () => {
        logout()
    }
    return (
        <nav className='navbar navbar-expand-md border-bottom mb-4'>
            <div className="container-fluid ps-5 pe-5 d-flex align-items-center">
                <Link to='/' className="navbar-brand" href="#">iApplied</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbar-collapse" 
                    aria-controls="navbar-collapse" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div 
                    className="collapse navbar-collapse align-right" 
                    id="navbar-collapse">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {user ?
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>All Job Apps</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/new' className='nav-link'>New Application</Link>
                            </li>
                            <li className="nav-item">
                                <a 
                                    className="nav-link" 
                                    href="#" 
                                    onClick={logoutHandler}>Log Out</a>
                            </li>   
                        </>
                    :
                        <li className="nav-item">
                            <Link className="nav-link" to="/auth">Log In/Sign Up</Link>
                        </li>
                    }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
