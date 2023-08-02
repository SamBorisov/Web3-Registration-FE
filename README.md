
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Back end - https://github.com/SamBorisov/Web3-Registration-BE

# Task
You must create an app that provides Register, Login and My Profile functionalities.
## Architecture
The app architecture consists of a backend and a frontend.
## Backend
It must be a basic Express server with a MongoDB database connection.
## Frontend
It must be a basic React Application.
## Functionalities
### Backend
It must handle the following tasks:
● Register a new user and store its base data in the DB - name, email, username and
blockchain address.
● Sign in registered user with blockchain wallet signature as credentials
JWT token must be returned to the user.
● Return user information (To be used on the My Profile page)
### Frontend
It must have the following pages:
● Register page
Initially, the user connects his wallet.
Then the user fills in a form - name, email, username.
On successful registration, the user is redirected to the Login page.
● Login Page
A user connects his wallet.
A login request to the backend is made.
On successful login, the user is redirected to the My Profile page
● My Profile page
Authenticated request for user data is made.
Data is visualized on the My Profile page.
Implement an exit button that logout the user.
