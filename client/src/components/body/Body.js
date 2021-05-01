import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/LoginPage";
import AccountActivation from "./auth/AccountActivationPage";
import ResetPassword from "./auth/ResetPasswordPage";
import Profile from "./profile/Profile";
import EditUser from "./profile/EditUser";
import NotFoundPage from "./auth/NotFoundPage";
import { useSelector } from "react-redux";

import DrawerForm from "./auth/AntdLoginPage";

function Body() {
    const auth = useSelector(state => state.auth);
    const { isLogged, isAdmin } = auth;

    return (
        <section>
            <Switch>
                <Route path="/login" component={isLogged ? NotFoundPage : Login} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFoundPage : ResetPassword} exact />
                <Route path="/user/activate/:activation_token" component={AccountActivation} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFoundPage} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFoundPage} exact />

                <Route path="/another" component={DrawerForm} exact />
                <Route component={NotFoundPage} />
            </Switch>
        </section>
    );
};

export default Body;