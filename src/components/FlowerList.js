import React, { useEffect, useState } from 'react';
import FlowerGallery from './FlowerGallery';

const FlowerList = ({ flowers, addToCart }) => {
    const [message, setMessage] = useState('');

    const handleAddToCart = (flower) => {
        addToCart(flower); // App.js
        setMessage(`${flower.name} has been added to your cart.`);
        setTimeout(() => setMessage(''), 3000); 
    };

    return (
        <div>
            <div className="flower-list">
                {flowers.map((flower) => (
                    <div key={flower.id} className="flower-item">
                        <img src={flower.image} alt={flower.name} className="flower-image" />
                        <h3>{flower.name}</h3>
                        <h2>Price: {flower.price} EGP</h2>
                        <button className="add-to-cart-btn" onClick={() => handleAddToCart(flower)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <FlowerGallery flowers={flowers} />
            </div>
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
};

export default FlowerList;
