import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <Link to="/about">About</Link> | <Link to="/counter">Counter</Link>
        </nav>
    );
};

export default Navigation;
