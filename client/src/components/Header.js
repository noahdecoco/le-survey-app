import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonStripe from './ButtonStripe';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default:
                return [
                    <li key="1">
                        <ButtonStripe />
                    </li>,
                    <li key="2" style={{ margin: '0 10px 0 20px' }}>
                        Credits: ${this.props.auth.credits}
                    </li>,
                    <li key="3">
                        <Link to="/surveys">Dashboard</Link>
                    </li>,
                    <li key="4">
                        <a href="/api/logout">Logout</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="left brand-logo">
                        Emaily
                    </Link>
                    <ul className="right">{this.renderContent()}</ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, null)(Header);
