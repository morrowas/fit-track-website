import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Navigation';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <>
      <header>
        <h1>FitTrack: Exercise Logger</h1>
        <p>Logging your exercises has never been easier!</p>
        <p>Simply enter the name of the exercise, number of reps, weights used, unit of measurement for the weights, and the date the exercise was performed.</p>
        <p>You can also edit or delete an existing exercise by clicking on the Edit or Delete icon below.</p>
      </header>
      <div className="App">
        <div className='App-header'>
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
              <Route path="/create-exercise" element={<CreateExercisePage/>}></Route>
              <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit}/>}></Route>
            </Routes>
          </Router>
        </div>
      </div>
      <footer>
        <p>&#169; 2023 Ashley Morrow</p>
      </footer>
    </>
  );
}

export default App;
