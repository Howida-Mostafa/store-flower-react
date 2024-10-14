import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FlowerList from './components/FlowerList';
import ShoppingCart from './components/ShoppingCart';
import About from './pages/About';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import data from './data/data.json'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './pages/Footer';
import BouquetForm from './components/BouquetForm';
import FlowerGallery from './components/FlowerGallery';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Dashboard from './dashboard/Dashboard';
import Products from './dashboard/Products';
import Flowers from './dashboard/Flowers';



const App = () => {
    const [cart, setCart] = useState([]);

    const products = data.products; 


    const addToCart = (product) => {
        console.log("Adding to cart:", product);
        setCart((prevCart) => {
            const updatedCart = [...prevCart, product];
            localStorage.setItem('cartItems', JSON.stringify(updatedCart)); 
            return updatedCart; 
        });
    };

 
    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCart(savedCartItems);
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home flowers={products} addToCart={addToCart} />} /> 
                <Route path="/flowers" element={<FlowerList flowers={products} addToCart={addToCart} />} /> 
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart cartItems={cart} />} />
                <Route path="/pages/login" element={<Login />} /> 
                <Route path="/pages/register" element={<Register />} />
                <Route path="/gallery" element={<FlowerGallery />} />
                <Route path="/components/BouquetForm" element={<BouquetForm />} />
                <Route path="/shoppingcart" element={<ShoppingCart />} />
                <Route path="/payment" element={<Payment />} />

                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="products" element={<Products />} />
                    <Route path="flowers" element={<Flowers />} />
                </Route>
            </Routes>
            <Footer /> 
        </Router>
    );
};

export default App;
