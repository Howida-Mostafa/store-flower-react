import React, { useState, useEffect } from 'react';
import '../css/styles.css';
import data from '../data/data.json'; 

const BouquetForm = () => {
    const [selectedFlowers, setSelectedFlowers] = useState([]);
    const [selectedShape, setSelectedShape] = useState('');
    const [message, setMessage] = useState('');
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        console.log(data); 
        if (data.flowers && data.flowers.length > 0) {
            setFlowers(data.flowers);
        } else {
            console.error('No flowers found in data:', data);
        }
    }, []);
    
    const handleFlowerChange = (e) => {
        const flowerId = e.target.id;
        const flowerData = flowers.find(flower => flower.name.toLowerCase() === flowerId);

        if (e.target.checked) {
            setSelectedFlowers((prev) => [...prev, flowerData]);
        } else {
            setSelectedFlowers((prev) => prev.filter((f) => f.name.toLowerCase() !== flowerId));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const bouquetData = {
            selectedFlowers: selectedFlowers.map(flower => ({
                id: flower.id,
                name: flower.name,
                image: flower.image, // Add image
                description: flower.description,
            })),
            selectedShape,
        };

        const existingBouquets = JSON.parse(localStorage.getItem('bouquets')) || [];
        existingBouquets.push(bouquetData);
        localStorage.setItem('bouquets', JSON.stringify(existingBouquets));

        // Show success message and reset form
        setMessage('Data saved successfully!');
        setSelectedFlowers([]);
        setSelectedShape('');

        // Uncheck all flower checkboxes
        const checkboxes = document.querySelectorAll('.flower-option input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    };

    return (
        <form className="bouquet-form" onSubmit={handleSubmit}>
            <h2>Select Flowers</h2>
            <div className="flower-selection">
                {flowers.length > 0 ? (
                    flowers.map((flower) => (
                        <div key={flower.id} className="flower-option">
                            <input
                                type="checkbox"
                                id={flower.name.toLowerCase()}
                                onChange={handleFlowerChange}
                            />
                            <label htmlFor={flower.name.toLowerCase()} className="flower-label" style={{ paddingLeft: '10px' }}>
                                <img src={flower.image} alt={flower.name} className="flower-image" style={{ width: '100px', height: '100px', paddingRight: '15px'}} />
                            
                                {flower.name}
                            </label>
                        </div>
                    ))
                ) : (
                    <p>No flowers available for selection.</p>
                )}
            </div>
            <label htmlFor="shape">Choose Shape:</label>
            <select className="shape-select" value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)}>
                <option value="">Select Shape</option>
                <option value="round">Round</option>
                <option value="heart">Heart</option>
                <option value="basket">Basket</option>
            </select>
            <button className="submit-btn" type="submit">Submit</button>
            {message && <p>{message}</p>} 
        </form>
    );
};

export default BouquetForm;
