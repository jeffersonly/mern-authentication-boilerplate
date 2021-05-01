import React, { useState } from "react";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import { isEmpty, isEmail, isLength, isMatch } from "../../utils/validation/Validation";
import { Form, Button, Input } from 'antd';
import { MailOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';


const initialState = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    err: "",
    success: ""
};

function RegisterDrawer() {
    const [user, setUser] = useState(initialState);
    const { name, email, password, confirm_password, err, success } = user;

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: "", success: "" });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if(isEmpty(name) || isEmpty(password)) {
            return setUser({ ...user, err: "Please fill in all fields", success: "" });
        }

        if(!isEmail(email)) {
            return setUser({ ...user, err: "Invalid email", success: "" });
        }

        if(isLength(password)) {
            return setUser({ ...user, err: "Password must be at least 6 characters", success: "" });
        }
        
        if(!isMatch(password, confirm_password)) {
            return setUser({ ...user, err: "Passwords did not match", success: "" });
        }

        try {
            const res = await axios.post("/user/register", {
                name, email, password
            });

            setUser({ ...user, err: "", success: res.data.msg });
        } catch(err) {
            err.response.data.msg 
            && 
            setUser({ ...user, err: err.response.data.msg, success: "" });
        }
    }

    const onFinishFailed = e => {
        console.log("Form failed: ", e);
    }

    return (
        <>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <Form layout="vertical" onFinish={handleSubmit} onFinishFailed={onFinishFailed} hideRequiredMark> 
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Enter Name' }]}
                >
                    <Input 
                        type="text" 
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Enter Name" 
                        id="name" 
                        value={name} 
                        name="name" 
                        onChange={handleChangeInput}
                    />
                </Form.Item>
                
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

                <Form.Item
                    name="confirm_password"
                    label="Confirm Password"
                    rules={[{ required: true, message: 'Confirm Password' }]}
                >
                    <Input.Password
                        type="password"
                        prefix={<LockOutlined className="site-form-item-icon" />} 
                        placeholder="Confirm Password" 
                        id="confirm_password" 
                        value={confirm_password} 
                        name="confirm_password" 
                        onChange={handleChangeInput}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                </Form.Item> 
            </Form>
        </>
    );
};

export default RegisterDrawer;
