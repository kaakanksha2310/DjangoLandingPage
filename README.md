
# Django-React Signup/Login System

This project is a full-stack application that integrates Django as the backend and React for the frontend. It provides user authentication features including user signup, login, profile view, password change, and password reset functionalities.

## Features

- **User Signup**: Allows new users to create an account with username, email, first name, last name, and password.
- **User Login**: Authenticated users can log in using their credentials.
- **Profile View**: Displays user information like username, email, first name, last name, date joined, and last login.
- **Password Change**: Users can change their passwords after logging in.
- **Password Reset**: Users can request a password reset by email.
- **Dashboard**: After login, users are redirected to a dashboard where they can navigate to profile or password change options.

## Tech Stack

- **Backend**: Django (with Django REST Framework)
- **Frontend**: React.js
- **Database**: SQLite (or any other Django-supported database)
- **Authentication**: JWT (JSON Web Token)

## Installation

### Backend (Django)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/django-react-auth.git
   cd django-react-auth/backend
2. **Create and activate a virtual environment**:
   ```bash
   python3 -m venv env
   source env/bin/activate
3. **Install the required packages**:
   ```bash
   pip install -r requirements.txt
4. **Run migrations**:
   ```bash
   python manage.py migrate

5. **Start the Django server**:
   ```bash
   python manage.py runserver


### Frontend
1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
2. **Install the required package**:
   ```bash
   npm install
3. **Start the React development server**:
   ```bash
   npm start
