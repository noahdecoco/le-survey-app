import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import * as actions from '../actions';

class App extends Component {
    componentDidMount() {
        console.log('mounted');
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
