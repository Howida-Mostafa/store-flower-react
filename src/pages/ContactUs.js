import React, { useState } from 'react';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState(''); 
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let isValid = true;
        let errors = {};

  
        if (!name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!phone.trim()) {
            errors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^\d+$/.test(phone)) {
            errors.phone = 'Phone number must contain only digits';
            isValid = false;
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is not valid';
            isValid = false;
        }

        if (!address.trim()) {
            errors.address = 'Address is required';
            isValid = false;
        }

        if (!message.trim()) {
            errors.message = 'Message is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const contactData = {
                name,
                phone,
                email,
                address, 
                message,
            };
       
            localStorage.setItem('contactData', JSON.stringify(contactData));
            alert('Message sent successfully!');


            setName('');
            setPhone('');
            setEmail('');
            setAddress('');
            setMessage('');
            setErrors({});
        }
    };

    return (
        <div className="contact-us">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <input
                    type="tel"
                    placeholder="Your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                {errors.phone && <p className="error">{errors.phone}</p>}

                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input
                    type="text"
                    placeholder="Your Address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                {errors.address && <p className="error">{errors.address}</p>}

                <textarea
                    placeholder="Your Message"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                ></textarea>
                {errors.message && <p className="error">{errors.message}</p>}

                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ContactUs;
