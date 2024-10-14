import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Flowers = () => {
    const { handleFlowersChange } = useOutletContext(); // استخدام الدالة من السياق
    const [flowers, setFlowers] = useState([]);
    const [newFlower, setNewFlower] = useState({ name: '', image: '', description: '', price: '' });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const savedFlowers = JSON.parse(localStorage.getItem('flowers')) || [];
        setFlowers(savedFlowers);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFlower({ ...newFlower, [name]: value });
    };

    const handleAddFlower = () => {
        let updatedFlowers;
        if (editIndex !== null) {
            updatedFlowers = flowers.map((flower, index) =>
                index === editIndex ? newFlower : flower
            );
            setEditIndex(null);
        } else {
            updatedFlowers = [...flowers, newFlower];
        }
        setFlowers(updatedFlowers);
        localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
        handleFlowersChange(updatedFlowers.length); // هنا استخدم الدالة الصحيحة
        setNewFlower({ name: '', image: '', description: '', price: '' });
    };

    const handleEditFlower = (index) => {
        setNewFlower(flowers[index]);
        setEditIndex(index);
    };

    const handleDeleteFlower = (index) => {
        const updatedFlowers = flowers.filter((_, i) => i !== index);
        setFlowers(updatedFlowers);
        localStorage.setItem('flowers', JSON.stringify(updatedFlowers));
        handleFlowersChange(updatedFlowers.length); // هنا استخدم الدالة الصحيحة
    };

    return (
        <div>
            <h2>Flowers</h2>
            <input
                type="text"
                name="name"
                placeholder="Flower Name"
                value={newFlower.name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newFlower.image}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={newFlower.description}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={newFlower.price}
                onChange={handleInputChange}
            />
            <button onClick={handleAddFlower}>{editIndex !== null ? 'Update' : 'Add'}</button>

            <h3>Flower List</h3>
            <ul>
                {flowers.map((flower, index) => (
                    <li key={index}>
                        <h4>{flower.name}</h4>
                        <img src={flower.image} alt={flower.name} style={{ width: '100px' }} />
                        <p>{flower.description}</p>
                        <p>Price: {flower.price} EGP</p>
                        <button onClick={() => handleEditFlower(index)}>Edit</button>
                        <button onClick={() => handleDeleteFlower(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Flowers;
