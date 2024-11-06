import React from 'react';
import '../css/network.css';
import { Avatar, Button } from '@mui/material';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function NetworkPage() {
    const user=useSelector(selectUser)
    console.log(user);
    const connections = [
        { name: 'Prince Chaudhari', description: 'Student at LJ University | JAVA | Python | Django | Web Development', connectedTime: 'Connected 5 hours ago' },
        { name: 'Bhavik Soni', description: 'Share resume at hr@glopbe.com', connectedTime: 'Connected 3 days ago' },
        { name: 'Nikhilesh Varma', description: 'Digital Marketer', connectedTime: 'Connected 4 days ago' },
        { name: 'Almas Shaikh', description: 'Your go-to talent matchmaker', connectedTime: 'Connected 4 days ago' },
        { name: 'Rehan Saiyed', description: 'Full stack Website Developer | Html | Css | Javascript | Php | Laravel', connectedTime: 'Connected 4 days ago' },
        { name: 'Ajmeri Shejad', description: 'Legal help advisor at Class action lawsuit lawfirm', connectedTime: 'Connected 5 days ago' },
        { name: 'Pinal Patel', description: 'MERN Stack | MEAN Stack | AWS | PHP | GoLang | Full-Stack Developer', connectedTime: 'Connected 5 days ago' }
    ];

    return (
        <div className='network-page'>
            <div className='network-page__content'>
                {/* Left Column - Connections */}
                <div className='network-page__connections'>
                    <h3>103 Connections</h3>
                    <p>Sort by: <span className="sort-options">Recently added</span></p>

                    {connections.map((connection, index) => (
                        <div key={index} className='connection-card'>
                            <Avatar className='connection-card__avatar'  />
                            <div className='connection-card__details'>
                                <h4 className='connection-card__name'>{connection.name}</h4>
                                <p className='connection-card__description'>{connection.description}</p>
                                <p className='connection-card__time'>{connection.connectedTime}</p>
                            </div>
                            <Button className='connection-card__messageButton' variant="outlined">Message</Button>
                        </div>
                    ))}
                </div>

                {/* Right Sidebar */}
                <div className='network-page__sidebar'>
                    <div className='ad-section'>
                        <Avatar className='ad-avatar' src={user.profile_img} />
                        <p className='ad-text'>
                            See who's viewed your profile in the last 90 days
                        </p>
                        <Button variant="contained" color="primary" className="ad-button">Try for free</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
