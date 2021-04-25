import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Header() {
    const auth = useSelector(state => state.auth);
    
    const { user, isLogged } = auth;

    const handleLogout = async () => {
        try {
            await axios.get('/user/logout');
            localStorage.removeItem('firstLogin');
            window.localtion.href = "/";
        } catch(err) {
            window.location.href = "/";
        }
    };

    const userLink = () => {
        return (
            <li className="drop-nav">
                <Link to="#">
                    <img src={user.avatar} className="avatar" /> {user.name} <i className="fas fa-angle-down"></i>
                </Link>

                <ul className="dropdown">
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>

                    <li>
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </li>
        );
    };

    const transformStyle = {
        transform: isLogged ? "translateY(-5px)" : 0
    };

    return (
        <header>
            <div className="logo">
                <h1>    
                    MERN Auth BP
                </h1>
            </div>

            <ul style={transformStyle}>
                <li>
                    <Link to="/">
                        <i className="fas fa-home"></i>
                        Home Page
                    </Link>
                </li>

                {
                    isLogged ? userLink() :
                    (
                        <li>
                            <Link to="/login">
                                <i className="fas fa-user"></i>
                                Sign In
                            </Link>
                        </li>
                    )
                }
            </ul>
        </header>
    );
};

export default Header;