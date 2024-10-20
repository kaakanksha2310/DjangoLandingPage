// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [firstName, setFirstName] = useState('');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const handleHome = () => {
        navigate('/');
    };

    useEffect(() => {
        // Fetch user profile data using token
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                navigate('/login');  // Redirect to login if no token is found
            } else {
                try {
                    const response = await axios.get('http://localhost:8000/api/profile/', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setFirstName(response.data.first_name);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    navigate('/login');  // Redirect to login if any error occurs
                }
            }
        };

        fetchProfile();
    }, [navigate]);


    const goToHome = () => {
        navigate('/');
    };

   return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-orange-600 mb-6">
                    Welcome {firstName}, ready to try new features?
                </h2>
                <div className="flex justify-between mb-4">
                    <button
                        className="bg-white text-orange-600 border border-orange-600 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        onClick={() => navigate('/my-profile')}
                    >
                        My Profile
                    </button>
                    <button
                        className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        onClick={() => navigate('/password-change')}
                    >
                        Password Change
                    </button>
                </div>
                {/* Adding Links for Logout and Home */}
                <div className="flex justify-between mt-4">
                    <a 
                        onClick={handleLogout} 
                        className="text-orange-600 hover:underline cursor-pointer">
                        Logout
                    </a>
                    <a 
                        onClick={() => navigate('/')} 
                        className="text-orange-600 hover:underline cursor-pointer">
                        Home
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;