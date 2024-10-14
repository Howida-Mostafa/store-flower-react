import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Dashboard</h2>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/dashboard/products">Products</Link>
                </li>
                <li>
                    <Link to="/dashboard/flowers">Flowers</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
