import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";

const initialState = {
    email: "",
    err: "",
    success: ""
};

function ForgotPassword() {
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
            console.log("here");
            return setData({ ...data, err: "", success: res.data.msg });
        } catch(err) {
            err.response.data.msg && setData({ ...data, err:  err.response.data.msg, success: "" });
        }
    }

    return (
        <div className="forgot_password">
            <h2>Forgot Your Password?</h2>

            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="email">Enter your email address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChangeInput}
                />
                <button onClick={forgotPasswordHandler}>
                    Send Reset to Email
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;