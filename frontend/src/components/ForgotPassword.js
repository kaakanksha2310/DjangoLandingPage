import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/forgot-password/', { email })
            .then(response => {
                setMessage('An email has been sent with instructions to reset your password.');
            })
            .catch(error => {
                console.log(error.response.data);
                setMessage('There was an error sending the email. Please try again.');
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-orange-600 mb-6">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />
                    </div>
                    <button
                        className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        type="submit"
                    >
                        Send Email
                    </button>
                </form>
                {message && <p className="mt-4 text-red-500">{message}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
