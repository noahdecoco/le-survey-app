import React from 'react';

const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="/" className="left brand-logo">
                    Logo
                </a>
                <ul className="right">
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
