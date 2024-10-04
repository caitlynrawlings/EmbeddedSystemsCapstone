import React from 'react';
import './index.css';
import {  HashRouter as Router, Routes, Route } from "react-router-dom";
import { Overview } from './pages/Overview.tsx';
import { NavBar } from './components/NavBar.tsx';
import { Notes } from './pages/Notes.tsx';
import { Testing } from './pages/Testing.tsx';
import { Debugging } from './pages/Debugging.tsx';
import { WeeklyNotebook } from './pages/WeeklyNotebook.tsx';


function App() {
  return (
    <div className='h-screen flex flex-col'>
      <Router>
        <NavBar/> 
        <div className='p-5 w-full'>
          <Routes>
            <Route path={"/"} element={<Overview />} />
            <Route path={`/notes`} element={<Notes />} />
            <Route path={`/testing`} element={<Testing />} />
            <Route path={`/debugging`} element={<Debugging />} />
            <Route path={`/weeklynotebook`} element={<WeeklyNotebook />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
