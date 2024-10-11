import React from 'react';
import './index.css';
import {  HashRouter as Router, Routes, Route } from "react-router-dom";
import { Overview } from './pages/Overview.tsx';
import { NavBar } from './components/NavBar.tsx';
import { PRD } from './pages/PRD.tsx';
import { Testing } from './pages/Testing.tsx';
import { WeeklyNotebook } from './pages/WeeklyNotebook.tsx';
import { PageLayout } from './components/PageLayout.tsx';
import { Assignments } from './pages/Assignments.tsx';


function App() {
  return (
    <div className='h-screen flex flex-col'>
      <Router>
        <NavBar/> 
        <div className='py-5 px-6 w-full font-light items-center flex flex-col'>
          <Routes>
            <Route path={"/"} element={<PageLayout title="Embedded Systems Capstone Project Website" content={<Overview />}/>} />
            <Route path={`/prd`} element={<PageLayout title="Product Requirements Document" content={<PRD />}/>} />
            <Route path={`/testing`} element={<PageLayout title="Testing" content={<Testing />}/>} />
            <Route path={`/assignments`} element={<PageLayout title="Assignments" content={<Assignments />}/>} />
            <Route path={`/weeklynotebook`} element={<PageLayout title="Weekly Notebook" content={<WeeklyNotebook />}/>} />

            <Route path={`/assignments/projectproposal`} element={<PageLayout title="Project Proposal" content={<Assignments />}/>} />
            <Route path={`/assignments/projectrequirementsdocument`} element={<PageLayout title="Project Requirements Document" content={<Assignments />}/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
