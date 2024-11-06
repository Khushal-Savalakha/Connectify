// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import Link for navigation
// import "../css/login.css"; // Ensure you create this CSS file

// // import logo from "../images/linkedin_logo.png"; // Import the LinkedIn logo

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault(); // Prevent page reload on submit
//     // Handle login logic here
//   };

//   return (
//     <div className="login">
//       <div className="login__box">
//         <div className="login__logo">
//           <h1 className="login__brand">
//             Linked
//             <span>
//               <img src="/images/linkedin_logo.png" alt="LinkedIn Logo" className="login__logo-img" />
//             </span>
//           </h1>
//         </div>

//         <form onSubmit={handleLogin} className="login__form">
//           <input
//             required
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="login__input"
//           />
//           <input
//             required
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="login__input"
//           />
//           <button type="submit" className="login__button">
//             Login
//           </button>
//         </form>

//         <h4 className="login__footer">
//           New to LinkedIn?{" "}
//           <Link to="/signup" className="login__link">
//             Join Now
//           </Link>
//         </h4>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../css/login.css"; // Ensure you create this CSS file
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice"; // Redux action

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on submit

    try {
      const response = await axios.post("http://127.0.0.1:8000/user_profile/login/", {
        email,
        password,
      });

      if (response.status === 200) {
        const { email, name, user_id } = response.data; // Destructure user data from response
        dispatch(login({ email, name, user_id })); // Dispatch login action to store data
        alert("Login successful!"); // Notify user
      } else {
        console.log("Error logging in:", response.data);
        alert("Login failed. Please check your credentials."); // Notify on error
      }
    } catch (error) {
      console.log("Network error:", error);
      alert("An error occurred during login. Please try again."); // Notify on network error
    }
  };

  return (
    <div className="login">
      <div className="login__box">
        <div className="login__logo">
          <h1 className="login__brand">
            {/* Linked */}
            <span>
              <img
                src="/images/connectify_logo_name.png"
                alt="Connectify Logo"
                className="login__logo-img"
              />
            </span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="login__form">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login__input"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login__input"
          />
          <button type="submit" className="login__button">
            Login
          </button>
        </form>

        <h4 className="login__footer">
          New to Connectify?{" "}
          <Link to="/signup" className="login__link">
            Join Now
          </Link>
        </h4>
      </div>
    </div>
  );
}

export default Login;
