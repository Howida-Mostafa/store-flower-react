import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [productsCount, setProductsCount] = useState(0);
    const [flowersCount, setFlowersCount] = useState(0);

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const savedFlowers = JSON.parse(localStorage.getItem('flowers')) || [];
        
        setProductsCount(savedProducts.length);
        setFlowersCount(savedFlowers.length);
    }, []);

    const handleProductsChange = (count) => {
        setProductsCount(count);
    };

    const handleFlowersChange = (count) => {
        setFlowersCount(count);
    };

    return (
        <div className="dashboard-container marg">
            <Sidebar />
            <div className="main-content">
                <h1>Dashboard</h1>
                <p> Num of Product: {productsCount}</p>
                <p>Num of Flowers:{flowersCount}</p>
                <Outlet 
                    context={{ handleProductsChange, handleFlowersChange }} // تمرير الدوال هنا
                />
            </div>
        </div>
    );
};

export default Dashboard;
