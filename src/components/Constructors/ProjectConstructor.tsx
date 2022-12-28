import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks/redux'
import Button from '../Button'
import Input from '../Input'
import { useAppDispatch } from './../../hooks/redux';
import { projectsSlice } from '../../store/reducers/projectsSlice'
import { IProjectConstructorProps } from '../../interfaces/IProjectConstructorProps'

const StyledConstructor = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`
const ProjectConstructor: FC<IProjectConstructorProps> = ({setVisible, projectTitle, projectSubtitle, id}) => {
    const [title, setTitle] = useState<string>(projectTitle)
    const [subtitle, setSubtitle] = useState<string>(projectSubtitle)
    const dispatch = useAppDispatch()
    const projects = useAppSelector(state => state.projectsReducer.projects)
    const findedProject = projects.find(item => item.id === id)

    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const subtitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubtitle(e.target.value)
    }

    const clickHandler = () => {
        setVisible()

        if (findedProject) {
            const changedProject = {
                id: findedProject.id,
                title: title,
                subtitle: subtitle,
                tasks: null,
            }
            dispatch(projectsSlice.actions.changeTitle(changedProject))
            dispatch(projectsSlice.actions.changeSubtitle(changedProject))
            dispatch(projectsSlice.actions.addToLocalStorage())
        }
    }

    const deleteHandler = () => {
        setVisible()
        dispatch(projectsSlice.actions.removeProject(findedProject?.id))
    }

  return (
    <StyledConstructor>
        <h2>Редактирование</h2> <br />
        <h4>Введите новое название проекта</h4>
        <Input type='text' placeholder='Введите новое название проекта' value={title} onChange={titleChangeHandler}></Input>
        <h4>Введите новое описание проекта</h4>
        <Input type='text' placeholder='Введите новое описание проекта' value={subtitle} onChange={subtitleChangeHandler}></Input>
        <Button onClick={clickHandler}>Change</Button>
        <Button onClick={deleteHandler}>DeleteProject</Button>
    </StyledConstructor>
  )
}

export default ProjectConstructor