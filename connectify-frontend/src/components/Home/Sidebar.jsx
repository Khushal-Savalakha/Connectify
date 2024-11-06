import React from 'react';
import '../css/sidebar.css';
import { Avatar } from '@mui/material';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";


export default function Sidebar() {
    const user=useSelector(selectUser)

    return (
        <div className='sidebar'>
            <div className='sidebar__profile'>
                <img
                    src={user.background_img || 'https://plus.unsplash.com/premium_photo-1701534008693-0eee0632d47a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2Vic2l0ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D'}
                    alt=''  // Decorative image, so alt is empty
                />
                <div className='profile__details'>
                    <Avatar src={user.profile_img} className='user__img'/>
                    <h4>{user.name}</h4>
                    <p>{user.headline}</p>
                </div>
                <div className='profile_stats'>
                    <span>Who viewed your profile  </span>
                    <span className='stat__number'>20</span>
                </div>
                <div className='profile_stats'>
                    <span>Connection<br /><b>Grow Your Network</b> </span>
                    <span className='stat__number'>150</span>
                </div>

            </div>
            <div className='sidebar__recent'>
                <p>Recent</p>
                <p className="hash"><span>#</span>branding</p>
                <p className="hash"><span>#</span>Marketing</p>
                <p className="hash"><span>#</span>Backend development</p>
                <p className="hash"><span>#</span>Webdevelopment</p>
                <p className="hash"><span>#</span>Redux Toolkit</p>
                <p className="hash"><span>#</span>React Js</p>
            </div>
        </div>
    );
}
