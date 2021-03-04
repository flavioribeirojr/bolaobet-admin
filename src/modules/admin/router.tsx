import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAdminLoader } from './admin-loader';
import BetList from './bet/bet-list/bet-list';

export function AdminRouter() {
    const admin = useAdminLoader();

    if (!admin) {
        return null;
    }

    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/apostas" />
            </Route>
            <Route exact path="/apostas">
                <BetList />
            </Route>
        </Switch>
    );
}