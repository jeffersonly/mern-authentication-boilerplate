import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogin, fetchUser, dispatchGetUser } from "./redux/actions/authAction";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch(); // returns a reference to the dispatch function from the Redux store, used to dispatch actions as needed
    const token = useSelector(state => state.token); // extract data from redux store state
    const auth = useSelector(state => state.auth);

    // get access token, check to see if user is already logged in
    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if(firstLogin) {
            const getToken = async () => {
                const res = await axios.post("/user/refresh_token", null);
                dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
            };
            getToken();
        }
    }, [auth.isLogged, dispatch]);

    // get user data 
    useEffect(() => {
        if(token) {
            const getUser = () => {
                dispatch(dispatchLogin());
                return fetchUser(token).then(res => {
                    dispatch(dispatchGetUser(res));
                });
            };
            getUser();
        }
    }, [token, dispatch])

    return (
        <Router>
            <div className="App">
                <Header />
                <ToastContainer />
                <Body />
            </div>
        </Router>
    );
};

export default App;
