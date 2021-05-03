import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { GoogleOutlined, FacebookOutlined, MailOutlined, PlusOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';

import RegisterDrawer from "./RegisterDrawer";
import ForgotPasswordDrawer from "./ForgotPasswordDrawer";
import Lottie from 'react-lottie';
import welcomeLottie from '../../utils/lottie/welcome.json';
import registerLottie from '../../utils/lottie/register.json';
import forgotpasswordLottie from '../../utils/lottie/forgotPassword.json';
import loginLottie from '../../utils/lottie/login.json';

const initialState = {
    email: "",
    password: "",
    err: "",
    success: ""
};

function Login() {
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const { email, password, err, success } = user;

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: "", success: "" });
    }

    const handleSubmit = async e => {
        try {
            const res = await axios.post("/user/login", { email, password });
            setUser({ ...user, err: "", success: res.data.msg });

            localStorage.setItem("firstLogin", true);

            dispatch(dispatchLogin());
            history.push("/");
        } catch(err) {
            err.response.data.msg 
            && 
            setUser({ ...user, err: err.response.data.msg, success: "" });
        }
    }

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post("/user/google_login", { tokenId: response.tokenId });
            setUser({ ...user, err: "", success: res.data.msg });

            localStorage.setItem("firstLogin", true);

            dispatch(dispatchLogin());
            history.push("/");
        } catch(err) {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: "" });
        }
    }

    const responseFacebook = async (response) => {
        try {
            const { accessToken, userID } = response;
            const res = await axios.post("/user/facebook_login", { accessToken, userID });
            setUser({ ...user, err: "", success: res.data.msg });

            localStorage.setItem("firstLogin", true);

            dispatch(dispatchLogin());
            history.push("/");
        } catch(err) {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: "" });
        }
    }

    const [visible, setVisible] = useState(false);
    const [childDrawer, setChildDrawer] = useState(false);
    const [childDrawerName, setChildDrawerName] = useState("");

    // show login drawer
    const showDrawer = () => {
        setVisible(true);
    };

    // close login drawer
    const onClose = () => {
        setVisible(false);
        setUser({ ...user, err: "", success: "" });
    };

    // open child drawer
    const showChildDrawer = () => {
        setChildDrawer(true);
    };

    const showRegisterChildDrawer = () => {
        setChildDrawerName("register");
        showChildDrawer();
    }

    const showForgotPasswordChildDrawer = () => {
        setChildDrawerName("forgotpassword");
        showChildDrawer();
    }

    // close child drawer
    const onChildClose = () => {
        setChildDrawer(false);
    };

    const onFinishFailed = e => {
        console.log("Form failed: ", e);
    }

    return (
        <div className="login_page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <Drawer
                title="Login"
                width={300}
                onClose={onClose}
                visible={visible}
                footer={
                    <div className="drawer-footer">
                        <Button onClick={showRegisterChildDrawer} className="drawer-footer-btn">
                            Register
                        </Button>
                        <Button onClick={showForgotPasswordChildDrawer} className="drawer-footer-btn">
                            Forgot Password
                        </Button>
                    </div>
                }
            >
                <Form layout="vertical" onFinish={handleSubmit} onFinishFailed={onFinishFailed} hideRequiredMark> 
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Enter Email' }]}
                    >
                        <Input 
                            type="email"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Enter Email" 
                            id="email"
                            value={email}
                            name="email"
                            onChange={handleChangeInput}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Enter Password' }]}
                    >
                        <Input.Password
                            type="password"
                            prefix={<LockOutlined className="site-form-item-icon" />} 
                            placeholder="Enter Password" 
                            id="password" 
                            value={password} 
                            name="password" 
                            onChange={handleChangeInput}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log In
                        </Button>
                    </Form.Item> 
                </Form>

                <Lottie 
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: loginLottie,
                        rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice"
                        }
                    }}
                    height={"auto"}
                    width={"250px"}
                />

                <Drawer
                    title={childDrawerName === "register" ? "Register":"Forgot Password"}
                    width={300}
                    onClose={onChildClose}
                    visible={childDrawer}
                >
                    { childDrawerName === "register" ? <RegisterDrawer /> : <ForgotPasswordDrawer /> }
                </Drawer>
            </Drawer>


            <div className="social">
                <Lottie 
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: welcomeLottie,
                        rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice"
                        }
                    }}
                    height={"100%"}
                    width={"100%"}
                />

                <button
                    id="email-auth-button"
                    onClick={showDrawer} 
                >
                    <MailOutlined className="oauth-icon" />Login By Email
                </button>

                <GoogleLogin
                    clientId="693817205628-jll174s704jdomb5d7lng2b0963cplci.apps.googleusercontent.com"
                    render={renderProps => (
                        <button 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}
                            id="google-oauth-button"
                        >
                            <GoogleOutlined className="oauth-icon" />Login with Google
                        </button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    
                />

                <FacebookLogin
                    appId="359521702148315"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook} 
                    render={renderProps => (
                        <button 
                            onClick={renderProps.onClick}
                            id="facebook-oauth-button"
                        >
                            <FacebookOutlined className="oauth-icon" />Login with Facebook
                        </button>
                    )}
                />
            </div>
        </div>
    );
};

export default Login;
