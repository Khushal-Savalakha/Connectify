# Connectify: Social Media Application

Welcome to **Connectify**, a social media platform built using **Django REST Framework** for the backend and **React** for the frontend. This project allows users to interact with others through features such as registration, profile management, posts, networking, and messaging.

## Table of Contents
1. [Video](#video)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [Technologies](#technologies)
5. [Setup Instructions](#setup-instructions)

## Video

Watch the demo video to see how **Connectify** works in action.

[![Connectify Demo Video 1](https://github.com/user-attachments/assets/61497e3d-f2e6-44db-937b-0581dc0cdb28)](https://github.com/user-attachments/assets/61497e3d-f2e6-44db-937b-0581dc0cdb28)

[![Connectify Demo Video 2](https://github.com/user-attachments/assets/6025ddca-c504-4858-8517-166949ed81fd)](https://github.com/user-attachments/assets/6025ddca-c504-4858-8517-166949ed81fd)


## Features

- **User Registration & Authentication**: Users can sign up, log in, and manage their accounts. (Authentication not using JWT)
- **Profile Page**: Users can update their personal details and profile pictures.
- **Home Page**: View and interact with the latest posts.
- **My Network**: Manage and view your connections and followers.
- **Messaging**: Frontend ready for messaging, enabling communication with other users.
- **Notifications**: Both frontend and backend for notifications are pending.

## Screenshots

### 1. User Registration

This screen allows new users to register and create their accounts.

![User Registration](https://github.com/user-attachments/assets/8fa925ff-39bf-497c-839e-e742ec275b79)

### 2. Profile Page

The profile page shows user details and allows profile image and personal data updates.

![Profile Page](https://github.com/user-attachments/assets/ea521a7b-70c3-4fc1-bdd5-5c0c9d470b19)

### 3. Home Page

The home page displays the latest posts, enabling users to interact with them.

![Home Page](https://github.com/user-attachments/assets/040bc926-90c6-4edf-baf1-c24072f673f0)

### 4. My Network Page

Here, users can manage their connections, follow/unfollow others, and see who’s following them.

![My Network Page](https://github.com/user-attachments/assets/915765a4-0a57-479a-af36-ff7a3708d0db)

### 5. Messaging Page

The messaging feature allows users to send and receive messages with their connections (frontend is ready).

![Messaging Page](https://github.com/user-attachments/assets/0fc0da28-0f7c-409c-b110-0b1c2ab453b7)

## Technologies

- **Frontend**: React, Material-UI, Redux
- **Backend**: Django REST Framework
- **Database**: SQLite3 (default)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Khushal-Savalakha/Connectify.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Connectify
   ```

3. Install the necessary dependencies for both the frontend and backend:

   - For the **frontend** (React):
     ```bash
     cd frontend
     npm install
     npm start
     ```

   - For the **backend** (Django REST Framework):
     ```bash
     cd backend
     pip install -r requirements.txt
     python manage.py migrate
     python manage.py runserver
     ```

4. Access the application in your browser at `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend.
