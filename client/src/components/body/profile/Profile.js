import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";

const initialState = {
    name: "",
    password: "",
    confirm_password: "",
    err: "",
    success: ""
};

function Profile() {
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);

    const { user, isAdmin } = auth;
    const [data, setData] = useState(initialState);
    const [avatar, setAvatar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(false);

    const { name, email, password, confirm_password, err, success } = data;

    const dispatch = useDispatch();

    const handleChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    }

    const changeAvatar = async (e) => {
        e.preventDefault();

        try {
            const file = e.target.files[0];

            if(!file) {
                return setData({ ...data, err: "No files were uploaded", success: "" });
            }

            if(file.size > 1024 * 1024) { // 1mb 
                return setData({ ...data, err: "File size too large", success: "" });
            }
    
            if(file.type !== 'image/jpeg' && file.type !== 'image/png') { // check file type
                return setData({ ...data, err: "File must be a jpeg or png image", success: "" });
            }

            let formData = new FormData();
            formData.append('file', file);

            setLoading(true);
            const res = await axios.post("/api/upload_avatar", formData, {
                headers: { "content-type": "multipart/form-data", Authorization: token }
            });
            setLoading(false);
            setAvatar(res.data.url);
        } catch(err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    }

    const updateInfo = () => {
        try {
            axios.patch("/user/update", {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            }, {
                headers: { Authorization: token }
            });

            setData({ ...data, err: "", success: "Updated Profile Successfully" });
        } catch(err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    }

    const updatePassword = () => {
        if(isLength(password)) {
            return setData({ ...data, err: "Password must be at least 6 characters", success: "" });
        }

        if(!isMatch(password, confirm_password)) {
            return setData({ ...data, err: "Passwords do not match", success: "" });
        }

        try {
            axios.patch("/user/resetpassword", {
                password
            }, {
                headers: { Authorization: token }
            });

            setData({ ...data, err: "", success: "Updated Profile Successfully" });
        } catch(err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    }

    const handleUpdate = () => {
        if(name || avatar) {
            updateInfo();
        }

        if(password) {
            updatePassword();
        }
    }

    return (
        <>
            <div>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                {loading && <h3>Loading...</h3>}
            </div>
            <div className="profile_page">
                <div className="col-left">
                    <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>

                    <div className="avatar">
                        <img src={avatar ?  avatar : user.avatar} alt="" />
                        <span>
                            <i className="fas fa-camera"></i>
                            <p>Change Avatar</p>
                            <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="name"
                            name="name"
                            id="name"
                            placeholder="Your Name"
                            defaultValue={user.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Your Email Address"
                            defaultValue={user.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">New Password</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            placeholder="New Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Confirm New Password</label>
                        <input 
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            placeholder="Confirm New Password"
                            value={confirm_password}
                            onChange={handleChange}
                        />
                    </div>

                    <p style={{ opacity: "0.7", fontSize: "12px" }}>Changing/updating your password will result in oAuth login not working (you'll have to manually enter your email/fb email and password</p>

                    <button disabled={loading} onClick={handleUpdate}>Update Profile</button>

                </div>

                <div className="col-right">
                    <h2>{isAdmin ? "Users" : "MyOrders"}</h2>

                    <div style={{ overflowX: "auto" }}>
                        <table className="customers">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            {/* <tbody>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Admin</td>
                                <td>Action</td>
                            </tbody> */}
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;