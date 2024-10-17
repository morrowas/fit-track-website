import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.post("/exercises", (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            if (exercise === "error"){
                res.status(400).json({ Error: "Invalid request a" });
            } else {
            res.status(201).json(exercise);
        }})
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: "Invalid request b" });
        });
});

app.get("/exercises/:_id", async (req, res) => {
    exercises.findExerciseById(req.params._id)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: "Not found"} );
            }
        })
        .catch(error => {
            res.status(404).json({ Error: "Not found"})
        })
    });

app.get("/exercises", (req, res) => {
    exercises.returnAllExercises()
    .then(exercises => {
        res.send(exercises);
    })
});

app.put("/exercises/:_id", (req, res) => {
    const bodyType = typeof req.body.name
    const dateType = typeof req.body.date

    if (bodyType !== "string" || req.body.name === ""){
        res.status(400).json({ Error: "Invalid request" });
    } else if (req.body.reps <= 0) {
        res.status(400).json({ Error: "Invalid request" });
    } else if (req.body.weight <=0) {
        res.status(400).json({ Error: "Invalid request" });
    } else if (req.body.unit !== "kgs" && req.body.unit !== "lbs") {
        res.status(400).json({ Error: "Invalid request" });
    } else if (dateType !== "string") {
        res.status(400).json({ Error: "Invalid request" });
    } else {
        exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(matchedCount => {
                if (matchedCount === 0) {
                res.status(404).json({ Error: "Not found" })
                } else if (matchedCount === "error") {
                    res.status(400).json({ Error: "Invalid request" });
                } else {
                res.json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
        }
    })
            .catch(error => {
            res.status(400).json({ Error: "Invalid request"})
    })}
})

app.delete("/exercises/:_id", (req, res) => {
    exercises.deletebyID(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json( {Error: "Not found"});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(404).json( {Error: "Not found"});
        })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});