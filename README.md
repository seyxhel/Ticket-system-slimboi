Ticketing System

This ticketing system is a full-stack web application built using Django REST framework for the backend and React for the frontend, with SQLite as the database. The system supports comprehensive ticket management functionalities and user interaction, including custom APIs and secure user authentication.

Key Features

	•	Backend (Django REST Framework):
	•	Custom APIs for full CRUD (Create, Read, Update, Delete) operations for tickets and ticket comments.
	•	APIs for updating ticket statuses and assigning support teams.
	•	Secure authentication and user permission management through the Django admin panel.
	•	Detailed tracking of ticket creation and modification, including timestamps and user details.
	•	Frontend (React):
	•	Modular, responsive design that interfaces seamlessly with the backend.
	•	User-friendly forms and interfaces for creating, updating, and commenting on tickets.
	•	Real-time status updates and data rendering from the backend APIs.
	•	Database:
	•	SQLite is used as the database for local development, ensuring ease of setup and lightweight operations.

Branch Structure

	•	main branch: Contains the Django REST framework backend code.
	•	frontend branch: Contains the React project for the frontend.

Installation and Setup Guide

Prerequisites

Ensure the following software is installed on your machine:

	•	Python 3.8+
	•	Node.js and npm
	•	Git

Backend Setup (Django REST Framework)

	1.	Clone the Repository:

git clone https://github.com/slimboi34/Ticket-system.git
cd Ticket-system


	2.	Switch to the main branch:

git checkout main


	3.	Create and activate a virtual environment:

python -m venv env
source env/bin/activate   # On Windows, use `env\Scripts\activate`


	4.	Install the required dependencies:

pip install -r requirements.txt


	5.	Run database migrations:

python manage.py migrate


	6.	Create a superuser for admin access:

python manage.py createsuperuser


	7.	Run the development server:

python manage.py runserver

The backend will be accessible at http://127.0.0.1:8000/.

Frontend Setup (React)

	1.	Navigate to the login-system directory:

cd login-system


	2.	Switch to the frontend branch:

git checkout frontend


	3.	Install the frontend dependencies:

npm install


	4.	Start the React development server:

npm start

The React app will be accessible at http://localhost:3000/.

Running the Project

	1.	Ensure both the Django backend and React frontend servers are running:
	•	Backend: http://127.0.0.1:8000/
	•	Frontend: http://localhost:3000/
	2.	Access the frontend to interact with the ticketing system:
	•	Users can create, update, and comment on tickets.
	•	Secure login ensures only authenticated users can access and modify data.
	•	Admin functionalities are managed through the Django admin panel at http://127.0.0.1:8000/admin/.

Project Structure Overview

Backend (main branch)

	•	accounts/: Handles user authentication and management.
	•	tickets/: Manages ticket creation, updates, and comments.
	•	myproject/: Core project settings and configuration.

Frontend (frontend branch)

	•	src/: Contains the React components, services, and routing logic for the app.
	•	public/: Static files and the main index.html.

Security Features

	•	Secure authentication using Django’s built-in user model.
	•	Custom user permissions managed via the Django admin interface.
	•	API endpoints protected to ensure only authorized users can access them.

Future Enhancements

	•	Implement more advanced features such as ticket categorization, email notifications, and real-time updates with WebSockets.

