import React from 'react';
import './App.css';
import Home from './components/pages/Home';
import Customers from './components/pages/Customers';
import Trainings from './components/pages/Trainings';

function App() {
  return (
    <div className="App">
      <Trainings />
      <Customers />
    </div>
  );
}

export default App;
