import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../data/data.json';

const FlowerGallery = () => {
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        if (data.flowers && data.flowers.length > 0) {
            // Here we repeat the data 10 times to create 50 items
            const generatedFlowers = Array.from({ length: 50 }, (_, i) => ({
                ...data.flowers[i % data.flowers.length],
                id: i + 1, // Ensures that each item has a unique ID
            }));
            setFlowers(generatedFlowers);
        } else {
            console.error('No flowers found in data.');
        }
    }, []);

    return (
        <div className="flower-gallery">
            <h2>Flower Gallery</h2>
            <div className="gallery">
                {flowers.map((flower) => (
                    <div key={flower.id} className="flower-item">
                        <img src={flower.image} alt={flower.name} style={{ width: '100px', height: '100px' }} />
                        <h2>{flower.name}</h2>
                    </div>
                ))}
            </div>
            <Link to="/components/BouquetForm">
                <button className="album-button">Choose a Bouquet</button>
            </Link>
        </div>
    );
};

export default FlowerGallery;
