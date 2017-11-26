import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import * as actions from '../actions';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route
                            exact
                            path="/"
                            render={() => <h1>Welcome to Emaily</h1>}
                        />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route
                            exact
                            path="/surveys/new"
                            component={SurveyNew}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
