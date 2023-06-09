# Netflix Clone



This is a Netflix clone project that aims to replicate the basic functionality and design of the popular streaming platform, Netflix.
This project includes both frontend and backend.

## Table of Contents

- [Live Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Backend](#Backend)

## Live Demo
https://netflix-again.netlify.app/login

## Frontend

Created a Netflix Clone that allows users to login, search and watch desired movies on netflix clone with real time data fetching from TMDB API.


## Features

- User authentication: Users can sign up, log in, and log out of their accounts.
- Browse movies and TV shows: Users can view a collection of movies and TV shows available on the platform.
- Movie/TV show details: Users can click on a specific movie or TV show to view more information such as title, description, rating, and cast.
- Search functionality: Users can search for movies and TV shows based on title or genre.
- Play videos: Users can watch movie and TV show trailers or clips.
- Add to Likedlist: Users can add movies and TV shows to their watchlist for easy access later.
- Responsive design: The application is responsive and adapts to different screen sizes.

## Technologies Used

- React: JavaScript library for building user interfaces.
- Redux-Toolkit: State management library for managing application state.
- JavaScript: Programming language used for the application logic.
- HTML: Markup language for structuring the web pages.
- CSS: Styling language used for the application's appearance.

## Setup

To set up the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Vishal08122001/Netflix`
2. Navigate to the project directory: `cd netflix-clone`
3. Install the dependencies: `npm install`

## Usage

1. Start the development server: `npm start`
2. Open the application in your browser: `http://localhost:3000`



## Backend

Developed backend using Node.js, Express.js, and MongoDB, incorporating features
for users to like or dislike movies.


## Technologies Used

- NodeJS 
- ExpressJS
- MongoDB Atlas
- Mongoose
## API Reference

#### Get all items

```http
  GET :- `https://agreeable-button-lion.cyclic.app/`
 
  POST :- `https://agreeable-button-lion.cyclic.app/`

```



#### Get Liked Movie

```http
  GET /api/user/liked/${email}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Post Liked Movie

```http
  GET /api/user/add
```


## Future Enhancements


- Adding OTP validation of user email .
- Adding forget password feature.
- Further optimization

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY` :- Contact me on 8076929271 for API KEY

`PORT` :- 5000

`Mongo_URI`:- You can add you personal MongoDB Atlas URI


![Logo](https://www.edigitalagency.com.au/wp-content/uploads/netflix-logo-png-large.png)

