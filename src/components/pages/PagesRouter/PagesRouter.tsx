import React from 'react'
import {Route, Routes} from "react-router-dom";
import ProjectPage from '../ProjectPage';
import ProjectsPage from '../ProjectsPage';


const PagesRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<ProjectsPage/>}> </Route>
        <Route path='/project/:id' element={<ProjectPage/>}> </Route>
    </Routes>
  )
}

export default PagesRouter