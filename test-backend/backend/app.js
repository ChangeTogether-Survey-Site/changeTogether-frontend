const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
let cors = require('cors')


const DB = require('./config/db');
const Survey = require("./models/survey");

const app = express();

app.use(cors());

// database setup
// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "3600");
  next();
});

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });

// routes 
app.post("/api/surveys", (req, res, next) => {
  const survey = new Survey({
    surveyName: req.body.surveyName,
    organization: req.body.organization,
    description: req.body.description,
    questions: req.body.questions
  });
  // saves data to db
  survey.save();
  res.status(201).json({
    message: "Survey added successfully"
  });
});

app.get("/api/surveys", (req, res, next) => {
  // const surveys = [
  //   {
  //     id: "fadf12421l",
  //     surveyName: "Devpost 2022",
  //     organization: "Devpost",
  //     description: "Do you like hackatons?",
  //     questions: "4"
  //   },
  //   {
  //     id: "x89u90x8u",
  //     surveyName: "Centennial graduation",
  //     organization: "Centennial College",
  //     description: "Vote for the next Mr Centennial, power ranger or the Universe",
  //     questions: "1"
  //   },
  //   {
  //     id: "kl5k6m",
  //     surveyName: "Double Double or Black?",
  //     organization: "Tim Rogers",
  //     description: "We want to know your preferences as a customer, please answer the following questions",
  //     questions: "4"
  //   },
  //   {
  //     id: "bbbbbbbbb",
  //     surveyName: "TV Survey",
  //     organization: "Research",
  //     description: "Which TV channels do you like?",
  //     questions: "2"
  //   }
  // ];
  Survey.find().then(documents => {
    console.log(documents);
    // response block
    res.status(200).json({
      message: "Posts fetched successfully!",
      surveys: documents
    });
  });
});

app.delete("/api/surveys/:id", (req, res, next) => {
  Survey.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Survey deleted!" });
  });

});

module.exports = app;
