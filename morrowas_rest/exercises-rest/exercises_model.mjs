import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING
);

const db = mongoose.connection;

const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

const createExercise = async (name, reps, weight, unit, date) => {
    const dateValidationResult = isDateValid(date)
    try{
     if(typeof name !== "string" || name === "") {
        return "error";
     } else if (reps <= 0) {
        return "error";
     } else if (weight <=0) {
        return "error";
     } else if (unit !== "kgs" && unit !== "lbs") {
        return "error";
     } else if (dateValidationResult !== true) {
        return "error";
     } else {
        const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date})
        return exercise.save()
     }
    } catch(error) {
        console.log(error)
        return error;
    }
}

const returnAllExercises = async () => {
    const query = Exercise.find();
    return query.exec();
}

const findExerciseById = async (_id) => {
    const document = await Exercise.findOne({_id: _id});
    return document;
}

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const dateCheck = isDateValid(date);
    if (dateCheck === false) {
        return "error";
    } else {
        const result = await Exercise.updateOne({ _id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
        return result.matchedCount;}
}

const deletebyID = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id});
    return result.deletedCount;
}

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export {createExercise, returnAllExercises, replaceExercise, findExerciseById, deletebyID};