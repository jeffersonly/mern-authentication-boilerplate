import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="logo">
                <h1>    
                    MERN Auth BP
                </h1>
            </div>

            <ul>
                <li>
                    <Link to="/">
                        <i className="fas fa-home"></i>
                        Home Page
                    </Link>
                </li>

                <li>
                    <Link to="/login">
                        <i className="fas fa-user"></i>
                        Sign In
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;