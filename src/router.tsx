import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import BetList from './modules/admin/bet-list/bet-list';
import { AdminSignin } from './modules/auth/admin-signin/admin-signin';

export function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/apostas" />
                </Route>
                <Route exact path="/apostas">
                    <BetList />
                </Route>
                <Route exact path="/login">
                    <AdminSignin />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}