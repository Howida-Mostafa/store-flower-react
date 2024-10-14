import React from 'react';

function FlowerItem({ flower, addToCart }) {
    return (
        <div>
            <h3>{flower.name}</h3>
            <h2>Price: {flower.price} EGP</h2>
            {/* <button onClick={() => addToCart(flower)}>Add to Cart</button> */}
            <Button onClick={() => addToCart(flower)} variant="outline-primary">Primary</Button>{' '}

        </div>
    );
}

export default FlowerItem;
