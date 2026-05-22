# WTWR (What to Wear?): Back End

# WTWR Backend API

## Project Description

This project is the backend server for the WTWR (What to Wear) application. The server provides an API that manages users and clothing items. It connects to a MongoDB database and allows clients to create, retrieve, update, and delete data related to users and clothing items.

The backend is built with Node.js and Express and follows a RESTful API structure. It includes proper error handling, validation, and a modular folder structure for maintainability.

## Functionality

The server provides the following functionality.

## Projecy Link

https://api.tayowtwr.minecraftnoob.com/
https://www.tayowtwr.minecraftnoob.com/
https://tayowtwr.minecraftnoob.com/

### Users

- Retrieve all users
- Retrieve a specific user by ID
- Create a new user
- Retrieve the currently authenticated user
- Update the current user's profile name
- Update the current user's avatar

### Clothing Items

- Retrieve all clothing items
- Create a new clothing item
- Delete a clothing item
- Like a clothing item
- Unlike a clothing item

### Error Handling

- Returns appropriate HTTP status codes
- Handles invalid IDs
- Handles invalid input data
- Prevents deletion of items by users who do not own them

## Technologies Used

This project uses the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose
- ESLint with Airbnb configuration
- Nodemon
- Validator package

## Project Pitch Video

Check out this video https://www.loom.com/share/ecdee32da8ba40eeb58331ad66113888, where I describe my
project and some challenges I faced while building it.
