import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { IheaderConstructorProps } from '../../interfaces/IHeaderConstructorProps'
import Button from '../Button'
import Input from '../Input'
import { useAppDispatch } from './../../hooks/redux';
import { projectsSlice } from '../../store/reducers/projectsSlice'
import { ITask } from './../../interfaces/ITask';
import FlexContainer from '../FlexContainer'

const StyledConstructor = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`
const HeaderConstructor: FC<IheaderConstructorProps> = ({setVisible, currentProject}) => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>('')
    const [subtitle, setSubtitle] = useState<string>('')
    let currentRadioValue:string = "green";

    const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const subtitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubtitle(e.target.value)
    }
    const handleRadioChange = (value:string) => {
        currentRadioValue = value
        return currentRadioValue
    };

    const clickHandler = () => {
        const newTask:ITask = {
            id: performance.now(),
            projectId: currentProject?.id,
            title: title,
            subtitle: subtitle,
            type: currentRadioValue,
            status: 'queque',
            creationDate: Date(),
            doneDate: null
        }
        const addTask = (item:ITask) => {
            dispatch(projectsSlice.actions.addTask(item))
            dispatch(projectsSlice.actions.setBoardTasksToLocal(newTask.projectId))
        }
        setVisible()
        addTask(newTask)
        setTitle('')
        setSubtitle('')
    }

  return (
    <StyledConstructor>
        <h2>Создание таски</h2>
        <Input type='text' placeholder='Введите название проекта' value={title} onChange={titleChangeHandler}></Input>
        <Input type='text' placeholder='Введите описание проекта' value={subtitle} onChange={subtitleChangeHandler}></Input>
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
        <Button onClick={clickHandler}>Create</Button>
    </StyledConstructor>
  )
}

export default HeaderConstructor