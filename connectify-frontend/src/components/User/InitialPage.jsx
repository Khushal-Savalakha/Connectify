import React from 'react';
import '../css/initialPage.css'; // Import your CSS styles

const InitialPage = () => {
  return (
    <div className="login-hero">
      {/* Header section with logo and action buttons */}
      <div className="login-hero__header">
        <div className="login-hero__logo-text">
          {/* <span className="login-hero__logo-link">Linked</span> */}
          <img 
            src={process.env.PUBLIC_URL + '/images/connectify_logo_name.png'} 
            alt="LinkedIn Logo" 
            className="login-hero__logo" 
          />
        </div>
        <div className="login-hero__actions">
          <a href="/signup" className="login-hero__signup-button">Join now</a>
          <a href="/login" className="login-hero__signin-button">Log in</a>
        </div>
      </div>

      {/* Main content section with text and image */}
      <div className="login-hero__content">
        <div className="login-hero__text">
          <h1 className="login-hero__title">Welcome to your professional community</h1>
        </div>
        <div className="login-hero__image">
          <img 
            src='/images/login-hero.svg'
            alt="Illustration of professional community" 
            className="login-hero__rounded-image"
          />
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
