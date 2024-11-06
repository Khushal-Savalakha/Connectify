import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../css/profile.css';
import { Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { selectUser } from '../../features/userSlice';
import axios from 'axios';
import { login } from "../../features/userSlice"; // Redux action

export default function Profile() {
    const user = useSelector(selectUser);
    const user_id = user.user_id;
    const base_url = ""; // Update the base URL as needed
    const dispatch = useDispatch();

    const [profileData, setProfileData] = useState({
        name: "No data",
        headline: 'No data',
        location: 'No data',
        email: 'No data',
        connections: "No data",
        background_img: 'https://plus.unsplash.com/premium_photo-1701534008693-0eee0632d47a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2Vic2l0ZSUyMGJhY2tncm91bmd8ZW58MHx8MHx8fDA%3D',
        profile_img: '',
    });

    const [Connection_list, setConnection_list] = useState([]); // Use useState for local state
    const [totalConnection, setTotalConnection] = useState(0);  // Use useState for local state
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(profileData);

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

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleOpen = () => {
        setFormData(profileData);
        setOpen(true);
    };

    async function fetchProfileData() {
        try {
            const token = await getCsrfToken();
            const profileResponse = await fetch('http://127.0.0.1:8000/user_profile/get_user_profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': token,
                },
                body: JSON.stringify({ user_id }),
            });

            if (!profileResponse.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const profileData = await profileResponse.json();
            setProfileData(profileData);
            setFormData(profileData);
            console.log(profileData);
            dispatch(login({ email: user.email, user_id, name: profileData.name, headline: profileData.headline, location: profileData.location, connections: profileData.connections, background_img: profileData.background_img, profile_img: profileData.profile_img }));
            
            // Handle connection list processing
            let connection_list = Array.isArray(profileData.connections)
                ? profileData.connections
                : profileData.connections.trim().split(',');

            connection_list = connection_list
                .map(connection => parseInt(connection.replace(/"/g, '')))
                .filter(connection => !isNaN(connection));

            setConnection_list(connection_list);
            setTotalConnection(connection_list.length);
        } catch (error) {
            console.log('Error fetching user profile:', error);
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function updateUserProfile(event) {
        event.preventDefault();
        const csrfToken = await getCsrfToken();
        const formData = new FormData();

        formData.append('user_id', user_id);
        const name = document.getElementById('name').value;
        if (name && name !== profileData.name) {
            formData.append('name', name);
        }

        const headline = document.getElementById('headline').value;
        if (headline && headline !== profileData.headline) {
            formData.append('headline', headline);
        }

        const location = document.getElementById('location').value;
        if (location && location !== profileData.location) {
            formData.append('location', location);
        }

        const profileImg = document.getElementById('profile_img').files[0];
        if (profileImg) {
            formData.append('profile_img', profileImg);
        }

        const backgroundImg = document.getElementById('background_img').files[0];
        if (backgroundImg) {
            formData.append('background_img', backgroundImg);
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/user_profile/update/', {
                method: 'PATCH',
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert('Profile updated successfully!');
                setOpen(false);
                fetchProfileData();
            } else {
                const errorData = await response.json();
                alert('Failed to update profile. See console for details.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please try again.');
        }
    }


    return (
        <div className='profile-page'>
            {/* Profile Section */}
            <div className='profile'>
                <div className='profile__background'>
                    <img
                        src={profileData.background_img}
                        alt='Profile Background'
                        className='profile__backgroundImage'
                    />
                </div>

                <div className='profile__details' style={{ position: 'relative' }}>
                    <IconButton onClick={handleOpen} className='edit-button' style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <ModeEditOutlinedIcon />
                    </IconButton>

                    <Avatar
                        src={profileData.profile_img}
                        alt="Profile Picture"
                        className='profile__avatar'
                        sx={{ width: 170, height: 170 }}
                    />

                    <div className='profile__container'>
                        <h2 className='profile__name'>{profileData.name}</h2>
                        <p className='profile__headline'>{profileData.headline}</p>
                        <p className='profile__location'>{profileData.location}</p>
                        <a href={`mailto:${profileData.email}`} className='profile__email'>{profileData.email}</a>
                        <p className='profile__connections'>
                            <a href='#' className='profile__connectionsLink'>{totalConnection} connections</a>
                        </p>

                        <div className='profile__buttons'>
                            <button className='profile__button primary'>Open to work</button>
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
                    <p><a href="https://linkedin.com/in/khushalsavalakha">www.connetify.com/in/khushalsavalakha</a></p>
                </div>
                <div className='sidebar-section'>
                    <p>Unlock your full potential with Connectify Premium</p>
                    <button className='ad-button'>Try for free</button>
                </div>
            </div>

            {/* Modal for editing profile details */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" className="profile__dialog">
                <DialogTitle className="profile__dialogTitle">Edit Profile</DialogTitle>
                <DialogContent className="profile__dialogContent">
                    <form id="profileForm" onSubmit={updateUserProfile} encType="multipart/form-data" className="profile__form">
                        <label htmlFor="user_id" className="profile__label">User ID (required):</label>
                        <input type="number" id="user_id" name="user_id" required value={user_id} className="profile__input" /><br />

                        <label htmlFor="name" className="profile__label">Name:</label>
                        <input type="text" id="name" name="name" className="profile__input" /><br /> {/* New Name Input Field */}

                        <label htmlFor="headline" className="profile__label">Headline:</label>
                        <input type="text" id="headline" name="headline" className="profile__input" /><br />

                        <label htmlFor="location" className="profile__label">Location:</label>
                        <input type="text" id="location" name="location" className="profile__input" /><br />

                        <label htmlFor="connections" className="profile__label">Connections:</label>
                        <input type="text" id="connections" name="connections" className="profile__input" /><br />

                        <label htmlFor="profile_img" className="profile__label">Profile Image:</label>
                        <input type="file" id="profile_img" name="profile_img" accept="image/*" className="profile__fileInput" /><br />

                        <label htmlFor="background_img" className="profile__label">Background Image:</label>
                        <input type="file" id="background_img" name="background_img" accept="image/*" className="profile__fileInput" /><br />

                        <Button type="submit" className="profile__button profile__saveButton">Save</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} className="profile__cancelButton">Cancel</Button>
                </DialogActions>
            </Dialog>


        </div>
    );
}
