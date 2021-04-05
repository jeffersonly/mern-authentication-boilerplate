import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AccountActivation from "./auth/AccountActivation";

function Body() {
    return (
        <section>
            <Switch>
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/user/activate/:activation_token" component={AccountActivation} exact />
            </Switch>
        </section>
    );
};

export default Body;