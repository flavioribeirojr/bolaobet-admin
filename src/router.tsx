import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { AdminRouter } from './modules/admin/router';
import { AdminSignin } from './modules/auth/admin-signin/admin-signin';

export function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login">
                    <AdminSignin />
                </Route>
                <Route path="/">
                    <AdminRouter />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}