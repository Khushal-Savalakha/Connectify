import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar } from '@mui/material';
import axios from 'axios';
import { selectUser } from '../../features/userSlice';
import '../css/notification.css';

export default function Notifications() {
    const user = useSelector(selectUser); // Logged-in user
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch connection requests on component load
        const checkConnectionRequest = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/connection/get-connections/');
                const filteredRequests = response.data.filter(
                    (request) => request.user == user.user_id
                );

                // Fetch profile data for each request_user
                const requestsWithProfileData = await Promise.all(
                    filteredRequests.map(async (request) => {
                        const profileData = await fetchProfileData(request.request_user);
                        return { ...request, ...profileData }; // Merge request with profile data
                    })
                );

                setRequests(requestsWithProfileData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching connection requests:", error);
                setIsLoading(false);
            }
        };

        checkConnectionRequest();
    }, [user]);

    // Function to get CSRF token
    const getCsrfToken = async () => {
        try {
            const csrfResponse = await fetch('http://127.0.0.1:8000/user_profile/csrf_token/');
            const csrfData = await csrfResponse.json();
            return csrfData.csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    };

    // Fetch profile data based on the request_user from each connection request
    const fetchProfileData = async (request_user) => {
        try {
            const csrfToken = await getCsrfToken();
            const profileResponse = await fetch('http://127.0.0.1:8000/user_profile/get_user_profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({ request_user }),
            });

            if (!profileResponse.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const profileData = await profileResponse.json();
            return profileData; // Return the profile data for further use
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    };

    // Function to handle reject connection
    const handleReject = async (requestId) => {
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error('CSRF token is missing');
                return;
            }

            const response = await fetch('http://127.0.0.1:8000/connection/reject-request/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ user: user.user_id, request_id: requestId }),
                credentials: 'include'
            });

            if (response.ok) {
                setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
            } else {
                console.error('Error rejecting request');
            }
        } catch (error) {
            console.error('Error rejecting connection request:', error);
        }
    };

    // Handle accept connection
    const handleAccept = async (requestId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/connection/accept-request/${requestId}/`);
            setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
        } catch (error) {
            console.error('Error accepting connection request:', error);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="notifications-page">
            <h2>Connection Requests</h2>
            {requests.length === 0 ? (
                <p>No new connection requests.</p>
            ) : (
                requests.map((request) => (
                    <div className="notifications__card" key={request.id}>
                        <div className="notifications__avatar">
                            {/* Fetch and display request_user profile data */}
                            <Avatar
                                src={request.profile_img} // Use profile_img from fetched profile data
                                alt="Profile Picture"
                                className='profile__avatar'
                                sx={{ width: 60, height: 60 }}
                            />
                        </div>

                        <div className="notifications__info">
                            <h4 className="notifications__info-title">{request.name}</h4> {/* Display request name */}
                            <p className="notifications__info-subtitle">{request.headline}</p>
                            <div className="notifications__buttons">
                                <button
                                    className="notifications__button notifications__button--accept"
                                    onClick={() => handleAccept(request.id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="notifications__button notifications__button--reject"
                                    onClick={() => handleReject(request.id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
