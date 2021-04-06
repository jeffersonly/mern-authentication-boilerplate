import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AccountActivation from "./auth/AccountActivation";
import NotFound from "../utils/not_found/NotFound";
import { useSelector } from "react-redux";

function Body() {
    const auth = useSelector(state => state.auth);
    const { isLogged } = auth;

    return (
        <section>
            <Switch>
                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />
                <Route path="/user/activate/:activation_token" component={AccountActivation} exact />
            </Switch>
        </section>
    );
};

export default Body;