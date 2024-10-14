import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Payment = () => {
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [accountName, setAccountName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [total, setTotal] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paypalEmail, setPaypalEmail] = useState(''); // Email for PayPal
    const [errors, setErrors] = useState({});


    // useEffect(() => {
    //     const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    //     setCartItems(savedCart);
    //     const totalAmount = savedCart.reduce((acc, item) => {
    //         const price = Number(item.price) || 0; 
    //         const quantity = Number(item.quantity) || 0; 
    //         return acc + price * quantity;
    //     }, 0);
    //     setTotal(totalAmount);
    // }, []);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(savedCart);

 
        const totalAmount = localStorage.getItem('totalPrice') || 0;
        setTotal(totalAmount);
    }, []);
    
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
       
        setAccountName('');
        setAccountNumber('');
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        setPaypalEmail(''); // Reset PayPal email
        setErrors({});
    };

    // Validate input fields
    const validateFields = () => {
        const validationErrors = {};
        if (paymentMethod === 'Credit Card') {
            if (!cardNumber) {
                validationErrors.cardNumber = 'Card number is required.';
            } else if (!/^\d{16}$/.test(cardNumber)) {
                validationErrors.cardNumber = 'Card number must be 16 digits.';
            }
            if (!expiryDate) {
                validationErrors.expiryDate = 'Expiry date is required.';
            } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
                validationErrors.expiryDate = 'Expiry date must be in MM/YY format.';
            }
            if (!cvv) {
                validationErrors.cvv = 'CVV is required.';
            } else if (!/^\d{3}$/.test(cvv)) {
                validationErrors.cvv = 'CVV must be 3 digits.';
            }
        } else if (paymentMethod === 'Bank Transfer') {
            if (!accountName) {
                validationErrors.accountName = 'Account name is required.';
            }
            if (!accountNumber) {
                validationErrors.accountNumber = 'Account number is required.';
            }
        } else if (paymentMethod === 'PayPal') {
            if (!paypalEmail) {
                validationErrors.paypalEmail = 'PayPal email is required.';
            } else if (!/\S+@\S+\.\S+/.test(paypalEmail)) {
                validationErrors.paypalEmail = 'Invalid PayPal email format.';
            }
        }
        return validationErrors;
    };

    
    const completeCheckout = () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (paymentMethod === 'PayPal') {
   
            window.open('https://www.paypal.com/signin', '_blank'); 
        } else {
            
            Swal.fire({
                title: 'Thank you for your purchase!',
                text: `You have successfully completed your purchase using ${paymentMethod}!`,
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                localStorage.removeItem('cartItems'); 
                localStorage.setItem('orderSummary', JSON.stringify(cartItems)); 
            });
        }
    };

    return (
        <div className="container mt-6 marg" >
            <h1 className="text-center">Checkout</h1>

            <div id="checkoutItems" className="mb-4">
                {cartItems.map((item, index) => (
                    <div className="card mb-3" key={index}>
                        <div className="card-body">
                            <h5>{item.name}</h5>
                            <p>Price: {item.price} EGP</p>
                        </div>
                    </div>
                ))}
            </div>
            <h4 className="text-end">Total: {total} EGP</h4>

            <h3 className="mt-4">Choose Payment Method</h3>
            <div>
                <input
                    type="radio"
                    id="creditCard"
                    name="payment"
                    value="Credit Card"
                    checked={paymentMethod === 'Credit Card'}
                    onChange={handlePaymentMethodChange}
                />
                <label htmlFor="creditCard">Credit Card</label><br />
                <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    value="PayPal"
                    checked={paymentMethod === 'PayPal'}
                    onChange={handlePaymentMethodChange}
                />
                <label htmlFor="paypal">PayPal</label><br />
                <input
                    type="radio"
                    id="bankTransfer"
                    name="payment"
                    value="Bank Transfer"
                    checked={paymentMethod === 'Bank Transfer'}
                    onChange={handlePaymentMethodChange}
                />
                <label htmlFor="bankTransfer">Bank Transfer</label>
            </div>

            {paymentMethod === 'Credit Card' && (
                <div className="mt-4">
                    <h4>Credit Card Information</h4>
                    <label className="form-label">Card Number</label>
                    <input
                        type="text"
                        className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                        placeholder="Enter card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                    {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                    <label className="form-label">Expiry Date (MM/YY)</label>
                    <input
                        type="text"
                        className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                    {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                    <label className="form-label">CVV</label>
                    <input
                        type="text"
                        className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                    {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                </div>
            )}

            {paymentMethod === 'PayPal' && (
                <div className="mt-4">
                    <h4>PayPal Information</h4>
                    <label className="form-label">PayPal Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.paypalEmail ? 'is-invalid' : ''}`}
                        placeholder="Enter your PayPal email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        required
                    />
                    {errors.paypalEmail && <div className="invalid-feedback">{errors.paypalEmail}</div>}
                    <p>Please log in to your PayPal account to complete the payment.</p>
                </div>
            )}

            {paymentMethod === 'Bank Transfer' && (
                <div className="mt-4">
                    <h4>Bank Transfer Information</h4>
                    <label className="form-label">Account Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.accountName ? 'is-invalid' : ''}`}
                        placeholder="Enter account name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        required
                    />
                    {errors.accountName && <div className="invalid-feedback">{errors.accountName}</div>}
                    <label className="form-label">Account Number</label>
                    <input
                        type="text"
                        className={`form-control ${errors.accountNumber ? 'is-invalid' : ''}`}
                        placeholder="Enter account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                    {errors.accountNumber && <div className="invalid-feedback">{errors.accountNumber}</div>}
                </div>
            )}

            <button className="btn btn-success mt-4" onClick={completeCheckout}>Complete Purchase</button>
        </div>
    );
};

export default Payment;
