

# Practice Pal Api

Practice Pal will let you choose your instrument, and then provide a list of exercises to practice, as well as your current tempo for each exercise & your goal tempo for each exercise. You can build yourself an entire practice routine right in your profile!



  
## Run Locally

Clone the project:

Client:
```bash
  git clone https://github.com/Kevin-Conroy/Practice-Pal-Client
```
API:
```bash
  git clone https://github.com/Kevin-Conroy/Practice-Pal-API
````
Go to the project directory:
```bash
  cd practice-pal-api
  cd practice-pal-client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

  
## API Endpoints


- POST /login - takes in usernanme/password & returns an auth token to
    access the user's exercises

- POST /user - checks for username & password presence and adds a newProfile object to the users table in the database. The user's ID is generated automatically.

- POST /exercises - checks for current & goal tempo presence and add a newExercise object to the exercises table in the database. The ID for each exercise is generated automatically.

- GET /exercises/userId - takes in a userId as a parameter and returns an array of all exercises associated with that userId.

- PATCH /edittemps/id - takes in an id of an exercise as a parameter and takes in an updated currentTempo and/or goalTempo from the user as a body.


  
## Technology Used

The back-end of this project was built using Node.js, Knex, and Postgres. CORS was implemented to ensure the front-end app can connect to the back-end API.

  
## Upcoming Features

Based on user feedback, I am in the process of implementing a custom exercise field in which user's can add as many of their own custom exercises as they wish, in addition to using the exercises initially provided. This will be available soon in version 2.0.
