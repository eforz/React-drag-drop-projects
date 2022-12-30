import React from 'react'
import { useParams } from 'react-router-dom'
import { IProjectProps } from './../../interfaces/IProjectProps';
import FlexContainer from '../FlexContainer';
import ProjectHeader from './../ProjectHeader';
import ColumsWrapper from '../ColumsWrapper';

interface ProjectPageParams {
  id: string;
}

const ProjectPage = () => {
  const params = useParams<ProjectPageParams | any>()
  const projects:IProjectProps[] = JSON.parse(localStorage.getItem('Projects')!)
  const currentProject = projects.find(item => item.id == params.id)
  
  return (
    <FlexContainer margin='0 auto' direction='column' justify='center' align='center' widthProps='80%'>
      <ProjectHeader widthProps='100%' currentProject={currentProject}></ProjectHeader>
      <ColumsWrapper currentProject={currentProject}></ColumsWrapper>
    </FlexContainer>
  )
}

export default ProjectPage