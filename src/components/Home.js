import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../css/styles.css';
import Button from 'react-bootstrap/Button';
import data from '../data/data.json'; 
import ContactUs from '../pages/ContactUs'; 
// import Footer from '../pages/Footer';
import { Link } from 'react-router-dom';

const Home = ({ addToCart }) => {
    const navigate = useNavigate(); 

    const handleAddToCart = (flower) => {
        addToCart(flower); 
        navigate('/cart'); 
    };


    const limitedFlowers = data.flowers.slice(0, 10); 


    const products = data.products; 

    return (
        <div>
            <section className='about'>
                <div className='text-about'>
                    <h1>TONIC Blooms</h1>
                    <h4>Fast, reliable, delightful Toronto flower delivery Shop</h4>
                    <Button variant="outline-primary">Primary</Button>{' '}
                </div>
                <div className='img-about'>
                    <img src="/images/Summer.webp" alt="Sun" />
                </div>
            </section>

            <h2 style={{ textAlign: 'center', margin: '2em' }}>Available Products</h2>

  
            <div className='flower-list'>
                {products.map((product) => (
                    <div key={product.id} className='flower-item'>
                        <img src={product.image} alt={product.name} className='flower-image' />
                        <h3>{product.name}</h3>
                        <h2>{product.price} EGP</h2>
                        <Button 
                            className='add-to-cart-btn'  
                            variant="outline-primary" 
                            onClick={() => handleAddToCart(product)} 
                        >
                            Add to Cart
                        </Button> 
                    </div>
                ))}
            </div>

            <h2 style={{ textAlign: 'center', margin: '2em' }}>Flower Gallery</h2>
            {/* <div className='gallery-scroll'>
                {limitedFlowers.map((flower) => (
                    <div key={flower.id} className='gallery-item'>
                        <img src={flower.image} alt={flower.name} className='flower-gallery-image' />
                        <h3>{flower.name}</h3>
                    </div>
                ))}
            </div> */}
            <div className="flower-gallery">
            {/* <h2>Flower Gallery</h2> */}
            <div className='gallery-scroll'>
                {limitedFlowers.map((flower) => (
                    <div key={flower.id} className='gallery-item'>
                        <img src={flower.image} alt={flower.name} className='flower-gallery-image' />
                        <h3>{flower.name}</h3>
                    </div>
                ))}
            </div>
            <Link to="/components/BouquetForm">
                <button className="album-button" style={{width:'99.8%',borderRadius:'5px'}}>Choose a Bouquet</button>
            </Link>
        </div>

            <h2 style={{ textAlign: 'center', margin: '2em' }}>Contact Us</h2>
            <ContactUs /> 

            {/* <Footer />  */}
        </div>
    );
}

export default Home;
