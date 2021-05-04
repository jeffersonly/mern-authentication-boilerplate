import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { showErrMsg, showSuccessMsg} from "../../utils/notification/Notification";
import { isLength, isMatch } from "../../utils/validation/Validation";
import { Form, Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';

const initialState = {
    password: "",
    confirm_password: "",
    err: "",
    success: ""
};

function ResetPassword() {
    const [data, setData] = useState(initialState);
    const { token } = useParams();

    const { password, confirm_password, err, success } = data;

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    }

    const handleResetPassword = async () => {
        if(isLength(password)) {
            return setData({ ...data, err: "Password must be at least 6 characters", success: "" });
        }

        if(!isMatch(password, confirm_password)) {
            return setData({ ...data, err: "Passwords do not match", success: "" });
        }

        try {
            const res = await axios.post("/user/resetpassword", { password }, {
                headers: { Authorization: token }
            });

            return setData({ ...data, err: "", success: res.data.msg });
        } catch(err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    const onFinishFailed = e => {
        console.log("Form failed: ", e);
    }

    return (
        <div className="reset-password-page">
            <h2>Reset your Password</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <Form layout="vertical" onFinish={handleResetPassword} onFinishFailed={onFinishFailed} hideRequiredMark> 
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Enter new Password' }]}
                >
                    <Input.Password
                        type="password"
                        prefix={<LockOutlined className="site-form-item-icon" />} 
                        placeholder="Enter new Password" 
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
                    rules={[{ required: true, message: 'Confirm new Password' }]}
                >
                    <Input.Password
                        type="password"
                        prefix={<LockOutlined className="site-form-item-icon" />} 
                        placeholder="Confirm new Password" 
                        id="confirm_password" 
                        value={confirm_password} 
                        name="confirm_password" 
                        onChange={handleChangeInput}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Reset Password
                    </Button>
                </Form.Item> 
            </Form>
        </div>
    );
};

export default ResetPassword;