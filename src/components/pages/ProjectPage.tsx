import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { projectsSlice } from './../../store/reducers/projectsSlice';
import { IProjectProps } from './../../interfaces/IProjectProps';

interface ProjectPageParams {
  id: string;
}

const ProjectPage = () => {
  const params = useParams<ProjectPageParams | any>()
  const navigate = useNavigate();
  console.log(params.id)

  const projects:IProjectProps[] = JSON.parse(localStorage.getItem('Projects')!)
  console.log(projects)

  const currentProject = projects.find(item => item.id == params.id)
  console.log(currentProject)
  
  

  return (
    <div>
      Вы на странице проекта с названием: {currentProject?.title} <br />
      Описание проекта:{currentProject?.subtitle}
    </div>
  )
}

export default ProjectPage