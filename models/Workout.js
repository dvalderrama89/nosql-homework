const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: { type: String }
            },
            name: String,
            duration: Number,
            distance: Number
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);
// Workout.aggregate([
//     {"$unwind": "$exercises"},
   
//     {
//         "$addFields": {
//             "totalDuration": {
//                 "$sum": "$exercises.duration"
//             }
//         }
//     }
// ], function(err, results) {
//     if (err) throw err;
//     console.log(results);
// });

module.exports = Workout;