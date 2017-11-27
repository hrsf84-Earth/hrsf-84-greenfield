# Impulse

> Find, save, and share the photos you love. An easy platform to view top quality pictures and share them with your friends.

## Team

  - Janet Lee
  - Jeffrey Stocker
  - Ted Anyansi
  - Carter Chavez

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
    a. [Installing Dependencies](#installing-dependencies)
    b. [Tasks](#tasks)
4. [Roadmap](#roadmap)
5. [Contributing](#contributing)

## Usage

> Create a user profile, from there you can start to store your favorite photos.
> Without a profile, you will only be able to view photos, not save or share them.

## Requirements

- Node 8.9.1



## Development
Native React with Webpack, Express, Babel, Axios. Testing was done with Jest, Enzyme, Mocha, Chai and Sinon. Deployment is on Heroku with Travis CI integration.

### Installing Dependencies

From within the root directory:

```sh
npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](https://docs.google.com/spreadsheets/d/1ldAAsgkCzwxRMjYKmlyn1AH73KN1VDDmkCAxwgyR_AA/edit#gid=777485879)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


## Product Feature Documentation

### Server Side
Server side artifacts:
  - app.js
  - database.js & schema.sql
  - authentication.js
  - unsplash.js

App.js is our primary routes file where our use of middleware is defined.
Database.js and schema.sql are the files that define our database structure in mySQL and our database query methods. It also contains a cookie generator.
Authentication.js has our functions for password storage and salt generation.
Unsplash.js has methods for communicating with Unsplash API.

### Client Side
Client side components:
  - index.jsx
  - Carousel.jsx
  - Login.jsx
  - search.jsx
  - Services: Get.jsx & Post.jsx

Index.jsx is the main rendering component that connects to Carousel, Login, search and other services. It is a stateful component that tracks the photo carousel's index position, search terms, search pagination, username and favorites view.  On componentWillMount, if there is no Axios GET call made to Unsplash, the server will default to a puppy photo and display a spinner while loading.  It also contains helper methods for Searching Unsplash, Adding new photos to carousel,  Navigation through the carousel, Views for logging in and out, Render.

Login.jsx controls the login and signup for users. It is a stateful component that tracks the signed in users and their authentication state. These were designed as interstitials/modals that popup and overlay upon the photo carousel.

Carousel.jsx controls the photo carousel in the center of the page. It is a stateless component that serves up hotlinks to Unsplash's API. Index.jsx holds the current cache of photos in the carousel and maintains the state of the current photo served in the carousel.

Search.jsx is a stateless component that renders the search box and button. It inherits methods from index.jsx.