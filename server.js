// I might have created an issue when I run local host not sure where the problem resides. Go back and check again later
  const mongoose = require("mongoose");
  const mongojs = require("mongojs");
  const express = require("express");
  const path = require("path");
  const PORT = process.env.PORT || 8080;
  const db = require("./models");
  const app = express();

  app.use(logger("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(data => {
        res.json(data);
      })
  });

  app.get ("/stats", (req, res) =>{
    res.sendFile ( path.join(__dirname,  "./public/stats.html"))
  })

  app.get ("/exercise", (req, res) =>{
    res.sendFile (path.join(__dirname,  "./public/exercise.html"))
  })

app.put ("/api/workouts/:id", (req, res) => {
  console.log(req.body);
  db.Workout.findByIdAndUpdate(

  req.params.id, 
  {
      $push: {
      exercises: req.body
  }
  }
  ).then(data => {
    console.log(data);
    res.json(data)
  });
})



app.get("/api/workouts/range", (req, res) =>{
  
  db.Workout.find({})
  .then(data => {
    res.json(data);
  })
  })

app.post ("/api/workouts", ({ body }, res) =>{
  
  db.Workout.create(body).then(data =>{
    res.json(data)
    })
});



    app.get("/all", (req, res) => {
  db.Workout.find({}, (error, data) => {
    if (error) {
        res.send(error);
    } else {
      res.json(data);
    }
  });
});

//Burned out!!!!!

app.listen({ port: PORT }, err => {
  if (err) {
      throw err;
  }
  console.log("App listening on localhost:" + PORT)
  });
  
  
  