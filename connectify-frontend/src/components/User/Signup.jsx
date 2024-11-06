import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/signup.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signup } from "../../features/userSlice"; // Redux action

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [csrfToken, setCsrfToken] = useState("");
  const dispatch = useDispatch();

  // Function to update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fetch CSRF token from the backend
  const getCsrfToken = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/user_profile/csrf_token/");
      if (response.status === 200) {
        setCsrfToken(response.data.csrfToken);
        console.log("CSRF Token fetched:", response.data.csrfToken);
      } else {
        console.error("Error fetching CSRF token");
      }
    } catch (error) {
      console.error("Network error fetching CSRF token:", error);
    }
  };

  // Function to send user data to Django backend after successful sign-up
  const sendUserDataToBackend = async () => {
    try {
      const { email, password, name } = formData; // Extract formData
      const response = await axios.post(
        "http://127.0.0.1:8000/user_profile/signup/",
        { email, password, name },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken, // Include CSRF token in headers
          },
        }
      );
      console.log(response.status);
      if (response.status ==201) {
        console.log(response.status);
        const { email, name, user_id } = response.data; // Destructure the response
        console.log("Profile updated on backend:", response.data);
        
        // Dispatch signup action to store email, name, and user_id in Redux
        dispatch(signup({ email, name, user_id }));
        
        alert("Signup successful! You can now login.");
      } else {
        console.log("Error updating profile:", response.data);
      }
    } catch (error) {
      console.log("Network error:", error);
    }
  };

  // Fetch CSRF token on component mount
  useEffect(() => {
    getCsrfToken();
  }, []);

  // Handle form submission
  const register = (e) => {
    e.preventDefault();
    sendUserDataToBackend();
  };

  return (
    <div className="signup">
      <div className="signup__box">
        <div className="signup__logo">
          <h1 className="signup__brand">
            <span>
              <img
                src="/images/connectify_logo_name.png"
                alt="Connectify Logo"
                className="signup__logo-img"
              />
            </span>
          </h1>
        </div>

        <form onSubmit={register} className="signup__form">
          <input
            required
            type="text"
            name="name" // Match name with formData keys
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="signup__input"
          />
          <input
            required
            type="email"
            name="email" // Match name with formData keys
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="signup__input"
          />
          <input
            required
            type="password"
            name="password" // Match name with formData keys
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="signup__input"
          />
          <button type="submit" className="signup__button">
            Sign Up
          </button>
        </form>

        <h4 className="signup__footer">
          Already a member?{" "}
          <Link to="/login" className="signup__link">
            Login Here
          </Link>
        </h4>
      </div>
    </div>
  );
}

export default Signup;
