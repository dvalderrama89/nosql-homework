const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const { Workout } = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Makes it so that the html file type doesnt have to be specified in hrefs
app.use(express.static(path.join(__dirname, 'public'),{index:false,extensions:['html']}));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
    {
        "$addFields": {
            "totalDuration": {
                "$sum": "$exercises.duration"
            }
        }
    }
    ], function(err, results) {
        if (err) throw err;
        console.log(results);
    })
    .then(workouts => {
        //console.log(workouts);
        res.json(workouts);
    })
    .catch(err => {
        res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([        
    {
        "$addFields": {
            "totalDuration": {
                "$sum": "$exercises.duration"
            }
        }
    }
    ], function(err, results) {
        if (err) throw err;
        console.log(results);
    })
    .then(workouts => {
        res.json(workouts);
    })
    .catch(err => {
        res.json(err);
    });
})

app.put("/api/workouts/:id", (req, res) => {
    db.Workout.updateOne({'_id': req.params.id}, {exercises: [req.body]})
    .then(workout => {
        res.json(workout);
    })
    .catch(({ message }) => {
        console.log('err: ' + message);
    });
});

app.post("/api/workouts/", ({body}, res) => {
    db.Workout.create(body)
    .then(workout => {
        res.json(workout);
    })
    .catch(({ message }) => {
        console.log(message);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });