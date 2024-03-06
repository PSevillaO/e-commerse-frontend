import { NavLink } from "react-router-dom";
import { useState } from 'react';
import "./Header.css";
import logo from '../../../assets/image/Logo/logo.png'

import { useUser } from "../../../context/UserContext";
import { useOrder } from "../../../context/OrderContext";
import defaulPicture from "../../../assets/image/DefautProfile.png"
const URL = import.meta.env.VITE_SERVER_URL;
// const URLimg = URL + '/images/users/';

export default function Header() {
    const { user, logout } = useUser();
    const { toggleMenu, TotalItems } = useOrder()
    const isAdmin = user?.role === 'ADMIN_ROLE'

    const [isChecked, setIsChecked] = useState(false);
    // const currentUser = JSON.parse(localStorage.getItem("curretUser"))

    const handleCheckboxChange = () => {
        setIsChecked(prevState => !prevState);
        console.log(isChecked)
    };

    return (
        <header className="main-header">
            <input id="toggle-menu" className="input-check" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <label className="burger-menu" htmlFor="toggle-menu">
                <span className="burger-line"></span>
            </label>

            <a className="logo-link" >
                <img className="nav-logo" src={logo} alt="logo-img" />
            </a>
            <nav className="main-nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink
                            to="/" className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >Principal</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/contact" className="nav-link">Contacto</NavLink>
                    </li>
                    {!user && (
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link">Registro</NavLink>
                        </li>
                    )}

                    <li className="nav-item">
                        <NavLink to="/about-us" className="nav-link">
                            Acerca de
                        </NavLink> </li>

                    {isAdmin && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/admin-product" className="nav-link">
                                    Admin Product
                                </NavLink></li>
                            <li className="nav-item">
                                <NavLink to="/admin-user" className="nav-link">
                                    Admin User
                                </NavLink></li>
                        </>
                    )}

                    {user ? (
                        <li className="nav-item">
                            <button className="nav-link btn-logput" onClick={() => logout()}>Logout</button>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link">
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
            <div className="user-info">
                <div className="icon-container">
                    <i data-count={TotalItems} className="cart-icon fa-solid fa-cart-shopping" onClick={() => toggleMenu()} ></i>
                </div>
                {user ? (
                    <>
                        {/* <div className="icon-container">
                            <i data-count={TotalItems} className="cart-icon fa-solid fa-cart-shopping" onClick={() => toggleMenu()} ></i>
                        </div> */}
                        <div className="dropdown-menu user-avatar">
                            <img src={`${URL}/images/users/${user.image}`} alt={user.name} />

                            <div className="dropdown-links">
                                <NavLink to="/orders" className="nav-orders">
                                    <i className="fa-solid fa-dolly"></i>
                                    Ordenes
                                </NavLink>
                                <a className="nav-logout" onClick={() => logout()}>
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                                    Logout
                                </a>
                            </div>

                        </div>
                    </>
                ) : (
                    <div>

                        <NavLink to="/login" className="nav-default">
                            <img className="user-image-default" src={defaulPicture} />
                            {/* Login */}
                        </NavLink>
                    </div>
                )

                }
            </div>
        </header >
    );
}
