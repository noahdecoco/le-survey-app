import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
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
                        <Route exact path="/" render={() => <h1>Emaily</h1>} />
                        <Route
                            exact
                            path="/surveys"
                            render={() => <h1>Dash</h1>}
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
