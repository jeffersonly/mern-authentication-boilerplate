import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../../utils/validation/Validation";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import { fetchAllUsers, dispatchGetAllUsers } from "../../../redux/actions/usersAction";
import defaultUserImage from "../../utils/default-user-image.png";
import { Button, Table, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
    const users = useSelector(state => state.users);

    const { user, isAdmin } = auth;
    const [data, setData] = useState(initialState);
    const [avatar, setAvatar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(false);

    const { name, email, password, confirm_password, err, success } = data;

    const dispatch = useDispatch();

    // get all users if user is admin
    useEffect(() => {
        if(isAdmin) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res));
            });
        }
    }, [token, isAdmin, dispatch, callback]);

    // handle input field change
    const handleChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    };

    // change user's avatar image
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
    };

    // update user's information
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
    };

    // update user's password
    const updatePassword = () => {
        if(isLength(password)) {
            return setData({ ...data, err: "Password must be at least 6 characters", success: "" });
        }

        if(!isMatch(password, confirm_password)) {
            return setData({ ...data, err: "Passwords do not match", success: "" });
        }

        try {
            axios.post("/user/resetpassword", {
                password
            }, {
                headers: { Authorization: token }
            });

            setData({ ...data, err: "", success: "Updated Profile Successfully" });
        } catch(err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    // handle user information update
    const handleUpdate = () => {
        setLoading(true);
        if(name || avatar) {
            updateInfo();
        }

        if(password) {
            updatePassword();
        }
        setLoading(false);
    };

    // handle user account deletion
    const handleDelete = async (id) => {
        try {
            if(window.confirm("Are you sure you want to delete this account?")) {
                setLoading(true);
                await axios.delete(`/user/delete/${id}`, {
                    headers: { Authorization: token }
                });
                setLoading(false);
                setCallback(!callback);

                // if the user deletes their own account, log them out and clear storage
                if(user._id === id) {
                    try {
                        await axios.get('/user/logout');
                        localStorage.removeItem('firstLogin');
                        window.localtion.href = "/";
                    } catch(err) {
                        window.location.href = "/";
                    }
                }
            }
        } catch(err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    // specify columns for admin table
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Space size="middle">
                    <span>
                        <Tag color={role === 1 ? "green" : "volcano"} key={role === 1 ? "Administrator" : "User"}>
                            {role === 1 ? "Administrator" : "User"}
                        </Tag>
                    </span>
                </Space>   
            )
        },
        {
            title: 'Actions',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Link to={`/edit_user/${user._id}`}>
                        <EditOutlined title="Edit User" className="profile edit-user-icon" />
                    </Link>

                    <DeleteOutlined title="Delete User" onClick={() => handleDelete(user._id)} className="profile delete-user-icon" />
                </Space>
            ),
        },
    ];

    // generate data for the admin table
    function generateData() {
        var dataArray = [];
        for(var i = 0; i < users.length; i++) {
            let objectItem = users[i];
            let newObject = {
                key: objectItem._id,
                id: objectItem._id,
                name: objectItem.name,
                email: objectItem.email,
                role: objectItem.role
            };
            dataArray.push(newObject);
        }
        return dataArray;
    };

    const tableData = generateData();

    return (
        <>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <div className="profile_page">
                <div className="col-left">
                    <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>

                    <div className="avatar">
                        <img src={avatar ? avatar : (user.avatar === "" ? defaultUserImage : user.avatar)} alt="" />
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
                            disabled={true}
                        />
                    </div>

                    {
                        user.oauth ? null : 
                        (
                            <>
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
                            </>
                        )
                    }

                        <Button 
                            type="primary" 
                            disabled={loading} 
                            loading={loading} 
                            onClick={handleUpdate}
                        >
                            Update Profile
                        </Button>
                        <Button 
                            type="primary"
                            disabled={loading}
                            loading={loading} 
                            danger={true}
                            onClick={() => handleDelete(user._id)}
                        >
                            Delete Account
                        </Button>
                </div>

                {
                    user.role === 0 ? null : 
                    (
                        <>
                            <div className="col-right">
                                <h2>Users</h2>
                                
                                <Table
                                    columns={columns}
                                    pagination={{ position: ['none', 'bottomRight'] }}
                                    dataSource={tableData}
                                    scroll={{ x: 800 }}
                                    sticky
                                />
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default Profile;