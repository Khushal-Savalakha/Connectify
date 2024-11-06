// --->Feed.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Avatar } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TodayIcon from "@mui/icons-material/Today";
import AssessmentIcon from "@mui/icons-material/Assessment";
import "../css/feed.css";
import Post from "../Post/Post";
import FlipMove from 'react-flip-move';

export default function Feed() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showImageForm, setShowImageForm] = useState(false);
  const user = useSelector(selectUser);
  const submitPost = async (e) => {
    e.preventDefault();
    try {
      const csrfResponse = await fetch('http://localhost:8000/post/get-csrf-token/');
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;

      const response = await fetch('http://localhost:8000/post/add-post/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          user_id: user.user_id,
          name: user.name,
          message: input,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setInput("");
        fetchPosts();
      } else {
        console.log('Failed to add post:', response.statusText);
      }
    } catch (error) {
      console.log('Error adding post:', error);
    }
  };

  // Function to submit image post to Django backend
  const imgPost = async (e) => {
    e.preventDefault();
    try {
      const csrfResponse = await fetch('http://localhost:8000/post/get-csrf-token/');
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;

      const formData = new FormData();
      formData.append('user_id', user.user_id);
      formData.append('name', user.name);
      formData.append('message', input);
      if (image) {
        formData.append('post_img', image);
      }

      const response = await fetch('http://localhost:8000/post/add-post/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        body: formData,
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setInput("");
        setImage(null); // Clear the image after submission
        setShowImageForm(false); // Hide the image upload form
        fetchPosts();
      } else {
        console.log('Failed to add post with image:', response.statusText);
      }
    } catch (error) {
      console.log('Error adding post with image:', error);
    }
  };


  async function fetchPosts() {
    try {
      const response = await fetch('http://localhost:8000/post/get-post/');
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  // Fetch posts from Django backend on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Helper function to format the time
  const formatTime = (dateTime) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };
  return (
    <div className="feed">
      <div className="feed__input">
        <div className="feed__form">
          <Avatar src={user.profile_img} />
          <form onSubmit={submitPost}>
            <input
              type="text"
              placeholder="Start a Post"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <input type="submit" value="Post" />
          </form>
        </div>
        <div className="feed__options">
          <div
            className="option"
            onClick={() => setShowImageForm(!showImageForm)}
          >
            <InsertPhotoIcon style={{ color: "#70b5f9" }} className="icon" />
            <span>Photo</span>
          </div>
          <div className="option">
            <YouTubeIcon style={{ color: "#7fc15e" }} />
            <span>Video</span>
          </div>
          <div className="option">
            <TodayIcon style={{ color: "#e7a33e" }} />
            <span>Event</span>
          </div>
          <div className="option">
            <AssessmentIcon style={{ color: "#fc9295" }} />
            <span>Write Article</span>
          </div>
        </div>
      </div>

      {showImageForm && (
        <form onSubmit={imgPost} className="image-upload-form">
          <input
            type="text"
            placeholder="Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="image-upload-actions">
            <input type="submit" value="Upload" />
            <button type="button" onClick={() => setShowImageForm(false)} className="cancel-button">Cancel</button>
          </div>
        </form>
      )}

      <FlipMove>
        {posts.map(({ id, name, message, time, post_img, profile_img }) => (
          <Post
            key={id}
            name={name}
            time={formatTime(time)}
            message={message}
            photoURL={profile_img}
            postImg={post_img}
          />
        ))}
      </FlipMove>
    </div>
  );
}
