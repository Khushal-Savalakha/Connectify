import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../css/search_result.css';
import { Avatar, IconButton } from '@mui/material';
import { selectUser } from '../../features/userSlice';
import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function SearchResult() {
    const location = useLocation();
    const current_user = location.state?.data;
    const requested_user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [user_id, setUser_id] = useState("");  // ID of the user to whom the request is sent
    const [name, setName] = useState("");
    const [headline, setHeadline] = useState("");
    const [user_location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [connections, setConnection] = useState("");
    const [background_img, setBackground_img] = useState('https://plus.unsplash.com/premium_photo-1701534008693-0eee0632d47a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2Vic2l0ZSUyMGJhY2tncm91bmd8ZW58MHx8MHx8fDA%3D');
    const [profile_img, setProfile_img] = useState("");
    const [isConnected, setIsConnected] = useState(false); // state to track connection

    useEffect(() => {
        if (current_user && current_user.length > 0) {
            const user = current_user[0];
            setUser_id(user.user_id)
            setName(user.name);
            setHeadline(user.headline);
            setLocation(user.location);
            setEmail(user.email);
            setProfile_img(user.profile_img);
            setBackground_img(user.background_img ? user.background_img : background_img);
            setConnection(user.connections);

            // Check if connection request already exists on page load
            checkIfAlreadyConnected(user.user_id, requested_user.user_id);
        } else {
            console.log("No user found.");
        }
    }, [current_user, requested_user]); // Run this effect when current_user or requested_user changes

    // Function to get CSRF token
    const fetchCsrfToken = async () => {
        const response = await axios.get('http://127.0.0.1:8000/connection/get-csrf-token/');
        return response.data.csrfToken;
    };

    // Function to check if a connection request already exists
    const checkConnectionRequest = async () => {
        const response = await axios.get('http://127.0.0.1:8000/connection/get-connections/');
        return response.data;  // Return the connection request data
    };

    // Function to check if the current user has already sent a connection request
    const checkIfAlreadyConnected = async (targetUserId, requestUserId) => {
        try {
            const connectionRequests = await checkConnectionRequest();
            const existingRequest = connectionRequests.find(
                (request) => request.user === targetUserId && request.request_user === requestUserId
            );
            if (existingRequest) {
                setIsConnected(true);  // If a request already exists, update the button state
            }
        } catch (error) {
            console.error('Error checking connection status:', error);
        }
    };

    // Function to handle connection request
    const handleConnect = async () => {
        try {
            // Fetch connection requests to check if it already exists
            const connectionRequests = await checkConnectionRequest();
            const existingRequest = connectionRequests.find(
                (request) => request.user === user_id && request.request_user === requested_user.user_id
            );

            if (existingRequest) {
                // Show alert if connection request already exists
                alert('You have already requested this user.');
            } else {
                // If no request exists, fetch CSRF token
                const csrfToken = await fetchCsrfToken();

                // Create connection request
                const response = await axios.post(
                    'http://127.0.0.1:8000/connection/create-connection/',
                    {
                        user: user_id,
                        request_user: requested_user.user_id,
                        notification: "requested"
                    },
                    {
                        headers: {
                            'X-CSRFToken': csrfToken,  // Add CSRF token in the headers
                        },
                    }
                );

                console.log('Connection request created:', response.data);
                setIsConnected(true);  // Update UI state to show that connection request is sent
            }
        } catch (error) {
            console.error('Error handling connection request:', error);
        }
    };

    return (
        <div className='profile-page'>
            {/* Profile Section */}
            <div className='profile'>
                <div className='profile__background'>
                    <img
                        src={background_img}
                        alt='Profile Background'
                        className='profile__backgroundImage'
                    />
                </div>

                <div className='profile__details' style={{ position: 'relative' }}>
                    
                    <Avatar
                        src={profile_img}
                        alt="Profile Picture"
                        className='profile__avatar'
                        sx={{ width: 170, height: 170 }}
                    />

                    <div className='profile__container'>
                        <h2 className='profile__name'>{name}</h2>
                        <p className='profile__headline'>{headline}</p>
                        <p className='profile__location'>{user_location}</p>
                        <a href={`mailto:${email}`} className='profile__email'>{email}</a>
                        <p className='profile__connections'>
                            <a href='#' className='profile__connectionsLink'>{connections} connections</a>
                        </p>

                        {/* Connect Button */}
                        <div className='profile__buttons'>
                            <button 
                                className='profile__button primary' 
                                onClick={handleConnect}
                                // disabled={isConnected} // Disable the button after connection is sent
                            >
                                {isConnected ? 'Request Sent' : 'Connect'}
                            </button>
                            <button className='profile__button'>Add profile section</button>
                            <button className='profile__button'>Enhance profile</button>
                        </div>

                        <div className='profile__openTo'>
                            <span>Open to work:</span>
                            <p>Back-end Developer and Full-Stack Developer roles</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Sidebar */}
            <div className='right-sidebar'>
                <div className='sidebar-section'>
                    <p className='sidebar-title'>Profile language</p>
                    <p>English</p>
                </div>
                <div className='sidebar-section'>
                    <p className='sidebar-title'>Public profile & URL</p>
                    <p><a href="https://linkedin.com/in/khushalsavalakha">www.linkedin.com/in/{name}</a></p>
                </div>
                <div className='sidebar-section'>
                    <p>Unlock your full potential with LinkedIn Premium</p>
                    <button className='ad-button'>Try for free</button>
                </div>
            </div>
        </div>
    );
}
