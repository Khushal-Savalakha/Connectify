import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Remove the duplicate import
import SearchIcon from "@mui/icons-material/Search";
import "../css/header.css";
import Headeroptions from "./Headeroptions";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";

export default function Header() {
  const [activeOption, setActiveOption] = useState("profile");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [data,setData]=useState("");

  const fetchData = (value) => {
    if (value.length > 0) {
      try {
        fetch("http://127.0.0.1:8000/user_profile/current_user/")
          .then((response) => response.json())
          .then((json) => {
            // Filter the results based on the input value
            console.log(json);
            const results = json.filter((user) => {
              return (
                user &&
                user.name &&
                user.name.toLowerCase().startsWith(value.toLowerCase()) // Match the starting characters
              );
            });
            setSuggestions(results); // Update suggestions based on the input value
            setData(json)
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setSuggestions([]); // Clear suggestions if no input
    }
  };

  const handleSearchIconClick = () => {
    if (input) {
      let searched = data.filter((user) => user.name.toLowerCase() === input.toLowerCase());
      if(searched.length>1){
        searched=data.filter((user) => user.name=== input);
        console.log(searched);
        navigate('/searched',{ state: { data: searched } })
      }
      else{
        console.log(searched); 
        navigate('/searched',{ state: { data: searched } })
      }
    } else {
      console.log("Please enter a name to search."); // Prompt for input
    }
};

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleSuggestionClick = (value) => {
    setInput(value); // Set the input field to the clicked suggestion
    setSuggestions([]); // Clear suggestions after selection
  };
  // Handle View Profile button click
  const handleViewProfile = () => {
    console.log("View Profile clicked!"); // Functionality for button click
    navigate("/profile"); // Programmatically navigate to /profile
  };

  // Handle Log Out button click
  const handleLogout = () => {
    console.log("Log Out clicked!"); // Additional functionality for Log Out
    dispatch(logout());
  };

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  useEffect(() => {
    // This effect will run when activeOption changes
    // Any additional logic related to class management can be placed here
  }, [activeOption]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">
          <img src="/images/connectify_logo.png" alt="logo" />
        </div>
        <div className="header__search">
        <SearchIcon id="search-icon" onClick={handleSearchIconClick} />
          <input
            placeholder="Type to search..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />

          {/* Render suggestions only when input is non-empty and suggestions are available */}
          {input && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion"
                  onClick={() => handleSuggestionClick(suggestion.name)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="header__right">
        <Link
          to="/home"
          onClick={() => setActiveOption("home")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Headeroptions
            Icon={HomeIcon}
            title="Home"
            active={activeOption === "home"}
          />
        </Link>
        <Link
          to="/network"
          onClick={() => setActiveOption("network")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Headeroptions
            Icon={PeopleIcon}
            title="My Network"
            active={activeOption === "network"}
          />
        </Link>
        <Headeroptions
          Icon={BusinessCenterIcon}
          title="Jobs"
          active={activeOption === "jobs"}
        />
        <Link
          to="/messaging"
          onClick={() => setActiveOption("messaging")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Headeroptions
            Icon={MessageIcon}
            title="Messaging"
            active={activeOption === "messaging"}
          />
        </Link>

        <Link
          to="/notification"
          onClick={() => setActiveOption("notifications")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
         <Headeroptions
          Icon={NotificationsIcon}
          title="Notifications"
          active={activeOption === "notifications"}
        />
        </Link>
        

        {/* Me dropdown section */}

        <div className="header__me" onClick={toggleDropdown}>
          <Headeroptions
            avatar={<Avatar src={user.profile_img} />}
            title="Me"
            active={activeOption === "profile"}
          />

          {/* Professional Dropdown content */}
          {isDropdownOpen && (
            <div className="header__meDropdown">
              <div className="header__meInfo">
                <strong>{user?.name}</strong>
              </div>
              {/* View Profile button with both navigation and function */}
              <Link
                to="/"
                onClick={() => setActiveOption("profile")}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <button
                  className="header__meProfileBtn"
                  onClick={handleViewProfile}
                >
                  View Profile
                </button>
              </Link>
              {/* Log Out button */}
              <button className="header__meLogoutBtn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
