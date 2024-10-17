import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const createExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', 
            {
                method: 'POST',
                body: JSON.stringify(newExercise),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response);

            if(response.status === 201){
                alert("Successfully added the exercise!");
            } else {
                alert(`Failed to add exercise, status code = ${response.status}`);
            }

        navigate("/");
    };

    return (
        <div>
            <h1>Create Exercise</h1>
            <input
                type='text'
                placeholder='Enter name here'
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type='number'
                placeholder='Enter # of reps here'
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type='number'
                placeholder='Enter weight here'
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            
            <select name="unit" id="unit-select" required onChange={e => setUnit(e.target.value)}>
                <option value="">Choose unit of measurement</option>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option> 
            </select>

            <input
                type='string'
                placeholder='Enter date as MM-DD-YY'
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={createExercise}
                >Add</button>
        </div>
    );
} 

export default CreateExercisePage;