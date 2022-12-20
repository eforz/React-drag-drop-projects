import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { projectsSlice } from './../../store/reducers/projectsSlice';
import { IProjectProps } from './../../interfaces/IProjectProps';
import FlexContainer from '../FlexContainer';
import ProjectHeader from './../ProjectHeader';
import Header from '../Header';
import ColumsWrapper from '../ColumsWrapper';

interface ProjectPageParams {
  id: string;
}

const ProjectPage = () => {
  const params = useParams<ProjectPageParams | any>()

  console.log(params.id)

  const projects:IProjectProps[] = JSON.parse(localStorage.getItem('Projects')!)
  console.log(projects)

  const currentProject = projects.find(item => item.id == params.id)
  

  
  

  return (
    <FlexContainer margin='0 auto' direction='column' justify='center' align='center' widthProps='80%'>
      <ProjectHeader widthProps='100%' currentProject={currentProject}></ProjectHeader>
      <ColumsWrapper></ColumsWrapper>
    </FlexContainer>
  )
}

export default ProjectPage