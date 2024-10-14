import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();  

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log('Saved Cart Items:', savedCartItems); 
        setCartItems(savedCartItems);  
    }, []);

    const removeFromCart = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);  
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));  

    };

    const handleCheckout = () => {
        navigate('/shoppingcart'); 
    };

    return (
        <div className='marg'>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Price: {item.price} EGP</p>
                            <button onClick={() => removeFromCart(index)}>Remove</button> {/* زر لحذف العنصر */}
                        </li>
                    ))}
                </ul>
                
            )}
            <button onClick={handleCheckout}>Proceed to Payment</button>
        </div>
    );
}

export default Cart;
