import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Header from "./Header/Header";
// import Sidebar from "./Home/Sidebar";
// import Feed from "./Home/Feed";
// import Widget from "./Home/Widget";
import Login from "./User/Login";  // Import Login component
import Signup from "./User/Signup";  // Import Signup component
import Profile from "./Profile/Profile";
import Home from "./Home/Home";
import Network from "./Network/Network";
import Messaging from './Messaging/Messaging';
import Post from './Post/Post';  // Import Post component
import InitialPage from './User/InitialPage';  // Import InitialPage component
import SearchResult from './Searched/SearchResult'
import Notification from "./Notification/Notification";

function App() {
  // Check if user is authenticated (e.g., user is logged in)
   const user = useSelector(selectUser);
  // const user = "jk"
  console.log(user);
  return (
    <Router>
      <Routes>
        {/* If no user is logged in, show InitialPage */}
        {!user ? (
          <>
            {/* Initial landing page with Sign up and Log in options */}
            <Route path="/" element={<InitialPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* If the user navigates to an unknown route, redirect to InitialPage */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {/* Once the user is logged in, show the main app with Header and all authenticated routes */}
            <Route path="/" element={
              <div className="app_wrapper">
                <Header />  {/* Show Header across all authenticated routes */}
                <Profile/>    
              </div>
            } />

            {/* Define a common layout with Header for all authenticated routes */}
            <Route path="/" element={<AuthenticatedLayout />}>
              {/* Authenticated routes */}
              <Route path="/messaging" element={<Messaging />} />
              <Route path="/home" element={<Home />} />
              <Route path="/post" element={<Post />} />
              <Route path="/network" element={<Network />} />
              <Route path="/searched" element={<SearchResult/>}/>
              <Route path="/notification" element={<Notification/>}/>
            </Route>

            {/* Redirect unknown authenticated routes to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

// This is the common layout for all authenticated routes
function AuthenticatedLayout() {
  return (
    <div className="app_wrapper">
      <Header /> {/* Header common for all authenticated pages */}
      <div className="app_body">
        {/* Here, we define the routes which are children */}
        <Routes>
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/network" element={<Network />} />
          <Route path="/searched" element={<SearchResult/>}/>
          <Route path="/notification" element={<Notification/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
