import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // الحصول على المستخدمين من data.js
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // التحقق من وجود المستخدم
        const user = users.find(user => user.email === email && user.password === password);

        // إذا كان المستخدم هو المدير
        if (email === 'admin.admin@example.com' && password === '12345') {
            alert('Admin login successful');
            navigate('/dashboard'); // التوجيه إلى صفحة الداشبورد
        } 
        else if (user) {
            // تسجيل الدخول بنجاح للمستخدمين العاديين
            alert('Login successful');
            navigate('/'); // التوجيه إلى الصفحة الرئيسية
        } else {
            // رسالة خطأ في حال عدم وجود المستخدم
            alert('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/pages/register">Register</a>
            </p>
        </div>
    );
};

export default Login;
