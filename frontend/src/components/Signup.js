import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',  // Added first name field
        last_name: ''    // Added last name field
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // For navigation

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register/', formData)
            .then(response => {
                setMessage("Registration successful!");
                setTimeout(() => {
                    navigate('/login');  // Navigate to login after success
                }, 2000);
            })
            .catch(error => {
                setMessage("Registration failed. Please try again.");
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md overflow-y-auto" style={{ maxHeight: '90vh' }}>
                
                {/* Orange Header with white text */}
                <div className="bg-orange-600 text-white text-2xl font-bold text-center py-3 mb-6 rounded-t-lg">
                    Sign Up
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                    </div>

                    {/* First Name */}
                    <div className="mb-4">
                        <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            required
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-4">
                        <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            required
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                         <p className="text-xs text-gray-500 mt-1">Your email must be unique</p>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">Your password must contain at least 8 characters, combination of letters and alpahbets, only @,#,!,$ allowed.</p>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="password2">Confirm Password</label>
                        <input
                            type="password"
                            name="password2"
                            value={formData.password2}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>

                {message && <p className="mt-4 text-red-500">{message}</p>}

                {/* Back to Login Button */}
                <div className="mt-6">
                    <button 
                        className="bg-white hover:bg-orange-100 text-orange-600 border border-orange-600 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        onClick={() => navigate('/login')}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;