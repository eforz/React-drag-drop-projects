import React, { FC, useState } from 'react'
import styled from 'styled-components';
import { IBoard } from '../interfaces/IBoards';
import { Colors } from '../models/colors';
import { ITask } from './../interfaces/ITask';
import { IStyledItask } from './../interfaces/IStyledITask';
import Button from './Button';
import Modal from './Modal';
import ColumnConstructor from './Constructors/ColumnConstructor';
import TaskConstructor from './Constructors/TaskConstructor';

const StyledTaskContainer = styled.div`
    width:90%;
    min-height: 65px;
    border: 2px solid ${Colors.BORDER};
    display:flex;
    justify-content:space-between;
`
const StyledTaskHeader = styled.div`
    width:95%;
    margin-top: 3px;
    height: 30px;
    border-bottom: 2px solid ${Colors.BORDER};
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const StyledTaskContent = styled.div`
    width:90%;
    min-height: 50px;
    display:flex;
    flex-direction:column;
`
const StyledTaskLine = styled.div<IStyledItask>`
    width:3px;
    min-height: 50px;
    border: 2px solid ${props => props.type || `${Colors.BORDER}`};
`
const StyledSubtitle=styled.div`
    width:95%;
    margin: 5px 0;
    display:flex;
    justify-content: space-between;
`

const Task:FC<ITask> = ({id, projectId, title, subtitle, type, status, creationDate, doneDate, borderColor, 
    onDragOverHandler,
    onDragLeaveHandler,
    onDragStartHandler,
    onDragEndHandler,
    onDropHandler }) => {

    const [modal, setModal] = useState(false)
  
    const modalClickHandler = () => {
        setModal(!modal)
      }

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
        <Modal visible={modal} setVisible={modalClickHandler}><TaskConstructor setVisible={modalClickHandler} projectId={projectId} taskTitle={title} taskSubtitle={subtitle} color={type} status={status} id={id}></TaskConstructor></Modal>
        <StyledTaskLine type={type}/>
        <StyledTaskContent>
            <StyledTaskHeader>
                {title}
                <Button  onClick={modalClickHandler} widthProps='28px' heightProps='15px' paddingProps='7px'><strong>...</strong></Button>
            </StyledTaskHeader>
            <StyledSubtitle>
                {subtitle}
            </StyledSubtitle>
        </StyledTaskContent>
    </StyledTaskContainer>
  )
}

export default Task






