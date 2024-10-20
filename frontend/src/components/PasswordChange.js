import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PasswordChange() {
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        axios.post('http://localhost:8000/api/change-password/', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setMessage('Password changed successfully.');
            
            // Automatically redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        })
        .catch(error => {
            setMessage('Failed to change password. Please try again.');
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-orange-600 mb-6">Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="old_password"
                            value={formData.old_password}
                            onChange={handleChange}
                            placeholder="Enter your old password"
                            required
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="new_password"
                            value={formData.new_password}
                            onChange={handleChange}
                            placeholder="Enter your new password"
                            required
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            placeholder="Confirm your new password"
                            required
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                    </div>
                    <button
                        className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        type="submit"
                    >
                        Change Password
                    </button>
                </form>
                {message && <p className="mt-4 text-red-500">{message}</p>}
            </div>
        </div>
    );
}

export default PasswordChange;
