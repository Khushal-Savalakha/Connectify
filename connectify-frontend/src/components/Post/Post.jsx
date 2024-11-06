import { Avatar } from '@mui/material';
import React, { forwardRef } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import '../css/post.css';

// Correct the signature of the forwardRef function
const Post = forwardRef((props, ref) => { 
  const { name, time, message, photoURL, postImg } = props; // Destructure props here

  return (
    <div className='posts' ref={ref}> {/* Make use of ref here */}
      <div className='post__header'>
        <div className='post__headerLeft'>
          <Avatar src={photoURL} />
          <div className='post__profile_details'>
            <h3>{name}</h3>
            <p>{time}</p>
          </div>
        </div>
        <MoreHorizIcon className="post__headerRight" />
      </div>

      <div className="post__body">
        <p>{message}</p>
        {/* Conditionally render the image if postImg is present */}
        {postImg && <img src={postImg} alt="Post" className="post__image" />}
      </div>

      <div className="post__footer">
        <div className="post__footerOption">
          <ThumbUpAltOutlinedIcon className="post__icon" />
          <span>Like</span>
        </div>
        <div className="post__footerOption">
          <CommentOutlinedIcon className="post__icon" />
          <span>Comment</span>
        </div>
        <div className="post__footerOption">
          <ShareOutlinedIcon className="post__icon" />
          <span>Share</span>
        </div>
        <div className="post__footerOption">
          <SendOutlinedIcon className="post__icon" />
          <span>Send</span>
        </div>
      </div>
    </div>
  );
});

export default Post;
