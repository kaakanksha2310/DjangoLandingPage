import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login/', formData)
            .then(response => {
                const { access } = response.data;
                localStorage.setItem('token', access);
                navigate('/dashboard');
            })
            .catch(error => {
                alert("Login failed. Please try again.");
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md text-center">
                
                {/* Orange Header with white text */}
                <div className="bg-orange-600 text-white text-2xl font-bold text-center py-3 mb-6 rounded-t-lg">
                    Login
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="username">
                            Username:
                        </label>
                        <input
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            value={formData.username}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-orange-600 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-white hover:bg-orange-500 text-orange-600 font-bold py-2 px-4 border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Footer Links */}
                <div className="mt-6 text-sm">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/" className="text-orange-600 hover:underline">
                            Signup
                        </Link>
                    </p>
                    <p className="mt-2">
                        <Link to="/forgot-password" className="text-orange-600 hover:underline">
                            Forgot password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
