import React from 'react';

function BouquetCard({ bouquet, addToCart }) {
    return (
        <div>
            <h3>{bouquet.name}</h3>
            <p>Price: {bouquet.price} EGP</p>
            <Button onClick={() => addToCart(flower)} variant="outline-primary">Primary</Button>{' '}

            {/* <button onClick={() => addToCart(bouquet)}>Add to Cart</button> */}
        </div>
    );
}

export default BouquetCard;
