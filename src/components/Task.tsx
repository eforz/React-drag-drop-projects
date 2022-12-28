import React, { FC, useState } from 'react'
import styled from 'styled-components';
import { IBoard } from '../interfaces/IBoards';
import { Colors } from '../models/colors';
import { ITask } from './../interfaces/ITask';
import FlexContainer from './FlexContainer';


const StyledTaskContainer = styled.div`
    width:90%;
    min-height: 50px;
    border: 2px solid ${Colors.BORDER};
    
`

/* box-shadow: ${({ pinkShadow }) => pinkShadow ? `0 2px 3px ${Colors.PINK}` : ''}; */

const Task:FC<ITask> = ({id, projectId, title, subtitle, type, status, creationDate, doneDate, 
    onDragOverHandler,
    onDragLeaveHandler,
    onDragStartHandler,
    onDragEndHandler,
    onDropHandler }) => {


  
    return (
    <StyledTaskContainer 
        onDragOver={onDragOverHandler}
        onDragLeave={onDragLeaveHandler}
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
        onDrop={onDropHandler}
        draggable={true}
        className='item'
    >
        {title}
    </StyledTaskContainer>
  )
}

export default Task






