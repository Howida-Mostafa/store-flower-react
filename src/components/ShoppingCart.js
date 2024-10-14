import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function ShoppingCart()
{
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();  

    useEffect(() => {
      
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log('Saved Cart Items:', savedCartItems);  
        setCartItems(savedCartItems);  
    }, []);

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0); 

    const handleCheckout = () => {
        localStorage.setItem('totalPrice', totalPrice);
        navigate('/payment'); 
    };

    return (
        <div className='marg'>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Price: {item.price} EGP</p>
                            </li>
                        ))}
                    </ul>
                    <h3>Total Price: {totalPrice} EGP</h3> 
                    <button onClick={handleCheckout}>Proceed to Payment</button> 
                </div>
            )}
        </div>
    );
}

export default ShoppingCart;
