const express = require("express");
const app = express();
const cors = require("cors");
const knex = require('knex');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require("./controllers/profile.js");


const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
    res.send('it is working');
})

app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)}) 

app.put("/image", (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


// // Load hash from your password DB.

app.listen(process.env.PORT || 3000, () => {
    console.log(`App running on port ${process.env.PORT}`);
})
