import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import defaultImage from "../utils/default-user-image.png";
import useWindowDimensions from "../utils/window-dimensions/windowDimensions";

import { Menu, Button, Drawer, Dropdown } from 'antd';
import { HomeOutlined, UserOutlined, LoginOutlined, LogoutOutlined, MenuOutlined, DownOutlined } from '@ant-design/icons';

function Header() {
    const auth = useSelector(state => state.auth);
    const { user, isLogged } = auth;

    // Size of width of window
    const { width } = useWindowDimensions();

    // handle user log out
    const handleLogout = async () => {
        try {
            await axios.get('/user/logout');
            localStorage.removeItem('firstLogin');
            window.localtion.href = "/";
        } catch(err) {
            window.location.href = "/";
        }
    };

    // Horizontal Navbar Generation (non-mobile view)   
    const [currentState, setCurrentState] = useState({ "currentState": "home" });
    const { SubMenu } = Menu;
    
    function handleClick(e) {
        setCurrentState({ currentState: e.key });
    };

    const generateHorizontalNavItems = () => {
        if(isLogged) {
            return (
                <SubMenu key="submenu" icon={<img id="header-avatarImg" src={user.avatar === "" ? defaultImage : user.avatar} className="avatar" prop="user avatar"/>} 
                    title={
                        <Link to="#" className="header-dropdown">
                            {user.name} <i className="fas fa-angle-down"></i>
                        </Link>
                    }
                    style={{float: "right"}}
                >
                    <Menu.ItemGroup title="User">
                        <Menu.Item key="profile">
                            <Link to="/profile"><UserOutlined /> Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="logout">
                            <Link to="/" onClick={handleLogout}><LogoutOutlined /> Logout</Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            );
        }

        return (
            <Menu.Item key="login" icon={<LoginOutlined />} className="header-menu-item">
                <Link to="/login">Login</Link>
            </Menu.Item>
        );
    };

    const generateHorizontalNav = () => {
        return (
            <Menu onClick={handleClick} selectedKeys={[currentState.currentState]} mode="horizontal">
                <Menu.Item key="icon">
                    <Link to="/" id="header-title">MERN Auth BP</Link>
                </Menu.Item>
                {generateHorizontalNavItems()}
                <Menu.Item key="home" icon={<HomeOutlined />} className="header-menu-item">
                    <Link to="/">Home</Link>
                </Menu.Item>
            </Menu>
        );
    };

    // Vertical Navbar Generation (mobile view)   
    const [visibleVerticalNav, setVisibleVerticalNav] = useState(false);

    const showVerticalDrawer = () => {
        setVisibleVerticalNav(true);
    };

    const closeVerticalDrawer = () => {
        setVisibleVerticalNav(false);
    };

    const generateVerticalNav = () => {
        return (
            <>
                <Button id="vertical-nav-drawer-button" onClick={showVerticalDrawer}>
                    <MenuOutlined />
                </Button>

                <Drawer
                    title={<Link to="/" className="vertical-dropdown-title">MERN Auth BP</Link>}
                    placement={"top"}
                    closable={false}
                    onClose={closeVerticalDrawer}
                    visible={visibleVerticalNav}
                    key="vertical header"
                >
                    {
                        isLogged ? 
                            <>
                                <Link to="/profile" onClick={closeVerticalDrawer} className="vertical-dropdown-link"><UserOutlined /> Profile</Link>
                                <Link to="/" onClick={handleLogout} className="vertical-dropdown-link"><LogoutOutlined /> Logout</Link>
                            </>
                        : 
                            <>
                                <Link to="/" onClick={closeVerticalDrawer} className="vertical-dropdown-link"><HomeOutlined /> Home</Link>
                                <Link to="/login" onClick={closeVerticalDrawer} className="vertical-dropdown-link"><LoginOutlined /> Login</Link>
                            </>
                    }
                    
                </Drawer>
            </>
        );
    };

    const generateHeader = () => {
        if(width < 560) {
            return generateVerticalNav();
        }

        return generateHorizontalNav();
    }

    return (
        generateHeader()
    );
};

export default Header;