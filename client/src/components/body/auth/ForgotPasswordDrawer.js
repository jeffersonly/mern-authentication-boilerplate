import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import { Form, Button, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const initialState = {
    email: "",
    err: "",
    success: ""
};

function ForgotPasswordDrawer() {
    const [data, setData] = useState(initialState);

    const { email, err, success } = data;

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    }

    const forgotPasswordHandler = async () => {
        if(!isEmail(email)) {
            return setData({ ...data, err: "Invalid email", success: "" });
        }

        try {
            const res = await axios.post("/user/forgotpassword", { email });
            return setData({ ...data, err: "", success: res.data.msg });
        } catch(err) {
            err.response.data.msg && setData({ ...data, err:  err.response.data.msg, success: "" });
        }
    }

    const onFinishFailed = e => {
        console.log("Form failed: ", e);
    }

    return (
        <>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <Form layout="vertical" onFinish={forgotPasswordHandler} onFinishFailed={onFinishFailed} hideRequiredMark> 
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Enter your email address' }]}
                >
                    <Input 
                        type="email"
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="Enter your email address" 
                        id="email"
                        value={email}
                        name="email"
                        onChange={handleChangeInput}
                    />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Send Email to Reset
                    </Button>
                </Form.Item> 
            </Form>
        </>
    );
};

export default ForgotPasswordDrawer;