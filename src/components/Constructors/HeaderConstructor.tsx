import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks/redux'
import { IheaderConstructorProps } from '../../interfaces/IHeaderConstructorProps'
import Button from '../Button'
import Input from '../Input'
import { IProjectProps } from './../../interfaces/IProjectProps';
import { useAppDispatch } from './../../hooks/redux';
import { projectsSlice } from '../../store/reducers/projectsSlice'

const StyledConstructor = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`
const HeaderConstructor: FC<IheaderConstructorProps> = ({setVisible}) => {
    const [title, setTitle] = useState<string>('')
    const [subtitle, setSubtitle] = useState<string>('')

    const dispatch = useAppDispatch()
    const projects = useAppSelector(state => state.projectsReducer.projects)
    
    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const subtitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubtitle(e.target.value)
    }

    const addProject = (item:IProjectProps) => {
        dispatch(projectsSlice.actions.addProject(item))
        dispatch(projectsSlice.actions.addToLocalStorage())
    }

    const clickHandler = () => {
        setVisible()

        const newProject:IProjectProps = {
            id: Date.now(),
            title: title,
            subtitle: subtitle,
        }
        console.log(newProject)

        if (title) {
            addProject(newProject)
        }
        setTitle('')
        setSubtitle('')
    }

  return (
    <StyledConstructor>
        <Input type='text' placeholder='Введите название проекта' value={title} onChange={titleChangeHandler}></Input>
        <Input type='text' placeholder='Введите описание проекта' value={subtitle} onChange={subtitleChangeHandler}></Input>
        <Button onClick={clickHandler}>Create</Button>
    </StyledConstructor>
  )
}

export default HeaderConstructor