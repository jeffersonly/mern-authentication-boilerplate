import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import Lottie from 'react-lottie';
import authenticationAnim from '../../utils/lottie/authentication.json';

function ActivationEmail() {
    const { activation_token } = useParams();
    const [err, setError] = useState("");
    const [success, setSuccess] = useState("");

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: authenticationAnim,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        if(activation_token) {
            const activationEmail = async() => {
                try {
                    const res = await axios.post("/user/activation", { activation_token });
                    setSuccess(res.data.msg);
                } catch(err) {
                    err.response.data.msg && setError(err.response.data.msg);
                }
            }

            activationEmail();
        }
    }, [activation_token]);

    return (
        
        <div id="account-activation-page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <p id="account-activation-text">After authenticating successfully, go ahead and log in!</p>
            <Lottie 
                options={defaultOptions}
                height={"100%"}
                width={"40%"}
            />
        </div>
    );
};

export default ActivationEmail;
