// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to handle user signup
    const signup = async (email, password, name) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/signup', { email, password, name });
            setCurrentUser(response.data.user); // Adjust based on your API response
            localStorage.setItem('user', JSON.stringify(response.data.user));
        } catch (error) {
            console.error("Signup error:", error);
            localStorage.setItem('token', token);  // Save token in localStorage

            throw error; // Throw to handle in the component
        }
    };

    // Function to handle user login
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
            setCurrentUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', token);  // Save token in localStorage

        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    // Function to handle logout
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');

    };

    // Check if user is already logged in on component mount
    // useEffect(() => {
    //     const checkUser = async () => {
    //         const storedUser = localStorage.getItem('user');
    //         if (storedUser) {
    //             setCurrentUser(JSON.parse(storedUser));
    //         } else {
    //             try {
    //                 const response = await axios.get('http://localhost:5000/api/profile/user');
    //                 setCurrentUser(response.data.user);
    //             } catch (error) {
    //                 console.error("Error fetching user:", error);
    //             }
    //         }
    //         setLoading(false);
    //     };
    //     checkUser();
    // }, []);
    useEffect(() => {
        const checkUser = async () => {
            const storedUser = localStorage.getItem('user');
            
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            } else {
                try {
                    const token = localStorage.getItem('token'); // Get the token from localStorage
                    const response = await axios.get('http://localhost:8000/api/user', {
                        headers: {
                            Authorization: `Bearer ${token}` // Include token in headers
                        }
                    });
                    setCurrentUser(response.data);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        console.error("Unauthorized: Please log in again.");
                        // Redirect to login page or handle unauthorized case
                    } else {
                        console.error("Error fetching user:", error);
                    }
                }
            }
            
            setLoading(false);
        };
        
        checkUser();
    }, []);
    



    // Providing user data and auth functions
    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
