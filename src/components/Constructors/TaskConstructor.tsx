import React, { FC, useState } from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Input from '../Input'
import { useAppDispatch } from './../../hooks/redux';
import { projectsSlice } from '../../store/reducers/projectsSlice'
import { ITaskConstructorProps } from './../../interfaces/ITaskConstructorProps';
import FlexContainer from '../FlexContainer'

const StyledConstructor = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`
const TaskConstructor: FC<ITaskConstructorProps> = ({setVisible, id, color, status, taskSubtitle, taskTitle, projectId}) => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>(taskTitle)
    const [subtitle, setSubtitle] = useState<string>(taskSubtitle)
    const [currentRadioValue, setCurrentRadioValue] = useState('green')
    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const subtitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubtitle(e.target.value)
    }
    const handleRadioChange = (value:string) => {
        setCurrentRadioValue(value)
    };

    const changedTask = {
        id: id,
        projectId: projectId,
        title: title,
        subtitle: subtitle,
        type: currentRadioValue,
        status: status,
        creationDate: Date(),
        doneDate: null
    }

    const clickHandler = () => {
        setVisible()
        dispatch(projectsSlice.actions.changeTaskInfo(changedTask))
        dispatch(projectsSlice.actions.setBoardTasksToLocal(changedTask.projectId))
    }

    const deleteHandler = () => {
        setVisible()
        dispatch(projectsSlice.actions.deleteTask(changedTask))
        dispatch(projectsSlice.actions.setBoardTasksToLocal(changedTask.projectId))
    }

  return (
    <StyledConstructor>
        <h2>Изменение таски</h2>
        <Input type='text' placeholder='Введите новое название' value={title} onChange={titleChangeHandler}></Input>
        <Input type='text' placeholder='Введите новое описание' value={subtitle} onChange={subtitleChangeHandler}></Input>
        <h3>Select type:</h3>
        <FlexContainer widthProps='400px' direction='row' align='center' justify='space-around'>
            <div>   
                <input
                    name="radio-item-1"
                    value="green"
                    type="radio"
                    onChange={e => handleRadioChange(e.target.value)}
                    defaultChecked={currentRadioValue === 'green'}
                />
                <label htmlFor="radio-item-1"> Зеленый</label>

            </div>
            <div>
                <input
                    name="radio-item-1"
                    value="orange"
                    type="radio"
                    onChange={e => handleRadioChange(e.target.value)}
                    defaultChecked={currentRadioValue === 'orange'}
                />
                <label htmlFor="radio-item-2"> Оранжевый</label>
            </div>
            <div>
                <input
                    name="radio-item-1"
                    value="red"
                    type="radio"
                    onChange={e => handleRadioChange(e.target.value)}
                    defaultChecked={currentRadioValue === 'red'}
                />
                <label htmlFor="radio-item-3"> Красный</label>
            </div>
        </FlexContainer>
        <Button onClick={clickHandler}>Change</Button>
        <Button onClick={deleteHandler}>DeleteTask</Button>
    </StyledConstructor>
  )
}

export default TaskConstructor