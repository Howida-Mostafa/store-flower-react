import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Products = () => {
    const { handleProductsChange } = useOutletContext(); 
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', image: '', description: '', price: '' });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(savedProducts);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = () => {
        let updatedProducts;
        if (editIndex !== null) {
            updatedProducts = products.map((product, index) =>
                index === editIndex ? newProduct : product
            );
            setEditIndex(null);
        } else {
            updatedProducts = [...products, newProduct];
        }
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        handleProductsChange(updatedProducts.length); 
        setNewProduct({ name: '', image: '', description: '', price: '' });
    };

    const handleEditProduct = (index) => {
        setNewProduct(products[index]);
        setEditIndex(index);
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        handleProductsChange(updatedProducts.length); 
    };

    return (
        <div>
            <h2>Products</h2>
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={newProduct.description}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleInputChange}
            />
            <button onClick={handleAddProduct}>{editIndex !== null ? 'Update' : 'Add'}</button>

            <h3>Product List</h3>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <h4>{product.name}</h4>
                        <img src={product.image} alt={product.name} style={{ width: '100px' }} />
                        <p>{product.description}</p>
                        <p>Price: {product.price} EGP</p>
                        <button onClick={() => handleEditProduct(index)}>Edit</button>
                        <button onClick={() => handleDeleteProduct(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
