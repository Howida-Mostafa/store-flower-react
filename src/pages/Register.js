import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // التحقق من صحة البيانات
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // استرجاع بيانات المستخدمين من localStorage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // التحقق مما إذا كان المستخدم موجودًا بالفعل
        const userExists = existingUsers.some(user => user.email === email);
        if (userExists) {
            alert("User already exists!");
            return;
        }

        // إنشاء حساب جديد وإضافته للبيانات
        const newUser = {
            firstName,
            lastName,
            email,
            password
        };

        // إضافة المستخدم الجديد إلى localStorage
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
        navigate('/pages/login');
    };

    return (
        <div className="register-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <a href="/pages/login">Sign in</a>
            </p>
        </div>
    );
};

export default Register;
