import React from 'react';
import './index.css';
import {  HashRouter as Router, Routes, Route } from "react-router-dom";
import { Overview } from './pages/Overview.tsx';
import { NavBar } from './components/NavBar.tsx';
import { Notes } from './pages/Notes.tsx';
import { Testing } from './pages/Testing.tsx';
import { Debugging } from './pages/Debugging.tsx';
import { WeeklyNotebook } from './pages/WeeklyNotebook.tsx';
import { PageLayout } from './components/PageLayout.tsx';


function App() {
  return (
    <div className='h-screen flex flex-col'>
      <Router>
        <NavBar/> 
        <div className='py-5 px-6 w-full font-light items-center flex flex-col'>
          <Routes>
            <Route path={"/"} element={<PageLayout title="Embedded Systems Capstone Project Website" content={<Overview />}/>} />
            <Route path={`/notes`} element={<PageLayout title="Notes" content={<Notes />}/>} />
            <Route path={`/testing`} element={<PageLayout title="Testing" content={<Testing />}/>} />
            <Route path={`/debugging`} element={<PageLayout title="Debugging" content={<Debugging />}/>} />
            <Route path={`/weeklynotebook`} element={<PageLayout title="Weekly Notebook" content={<WeeklyNotebook />}/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
