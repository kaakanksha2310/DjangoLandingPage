import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError('User not logged in. Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfile(response.data);
            } catch (err) {
                setError('Error fetching profile. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-orange-600 mb-6">My Profile</h2>
                {profile ? (
                    <div>
                        <p className="mb-4"><strong>Username:</strong> {profile.username}</p>
                        <p className="mb-4"><strong>Email:</strong> {profile.email}</p>
                        <p className="mb-4"><strong>First Name:</strong> {profile.first_name}</p>
                        <p className="mb-4"><strong>Last Name:</strong> {profile.last_name}</p>
                        <p className="mb-4"><strong>Date Joined:</strong> {new Date(profile.date_joined).toLocaleDateString()}</p>  {/* New Field */}
                        <p className="mb-4"><strong>Last Updated:</strong> {new Date(profile.last_login).toLocaleDateString()}</p>  {/* New Field */}
                        
                        <div className="flex justify-between">
                            <button
                                className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                                onClick={() => navigate('/password-change')}
                            >
                                Change Password
                            </button>
                            <button
                                className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                                onClick={() => navigate('/dashboard')}
                            >
                                Dashboard
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>No profile information found.</p>
                )}
            </div>
        </div>
    );
}

export default MyProfile;