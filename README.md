# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

Functionality

The server provides the following functionality:

Users:

Retrieve all users

Retrieve a specific user by ID

Create a new user

Retrieve the currently authenticated user

Update the current user's profile name

Update the current user's avatar

Clothing Items:

Retrieve all clothing items

Create a new clothing item

Delete a clothing item

Like a clothing item

Unlike a clothing item

Error Handling:

Returns appropriate HTTP status codes

Handles invalid IDs

Handles invalid input data

Prevents deletion of items by users who do not own them

Technologies Used

This project uses the following technologies:

Node.js

Express.js

MongoDB

Mongoose

ESLint (Airbnb configuration)

Nodemon

Validator package
