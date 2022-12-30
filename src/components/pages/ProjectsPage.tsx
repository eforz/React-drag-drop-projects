import React, { useEffect, useMemo, useState } from 'react'
import Header from '../Header'
import Container from '../Container';
import FlexContainer from './../FlexContainer';
import Project from '../Project';
import Modal from './../Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { projectsSlice } from './../../store/reducers/projectsSlice';
import Input from '../Input';
import { useProjects } from './../../hooks/useProjects';

const ProjectsPage = () => {
  const dispatch = useAppDispatch()
  const projects = useAppSelector(state => state.projectsReducer.projects)
  const boards = useAppSelector(state => state.projectsReducer.boards)
  useEffect( () => {
    dispatch(projectsSlice.actions.getFromLocalStorage())
  }, [])

  
  const [filter, setFilter] = useState({query: ''})
  const searchedProjects = useProjects(projects, filter.query)

  return (
    <FlexContainer margin='0 auto' direction='column' justify='center' align='center'>
        <Header title='Projects'>
          <Input placeholder='Search by project name' type='text'value={filter.query} onChange={e => setFilter({...filter, query: e.target.value})}/>
        </Header>
        <FlexContainer gap='20px' margin='10px 0' direction='column' justify='center' align='center'>
            {searchedProjects?.length === 0 ? <h1>Сейчас тут пусто</h1> : null}
            {searchedProjects?.map(project => 
              <Project key={project.id} id={project.id} title={project.title} subtitle={project.subtitle}></Project>  
            )}
        </FlexContainer>
    </FlexContainer>
  )
}

export default ProjectsPage
