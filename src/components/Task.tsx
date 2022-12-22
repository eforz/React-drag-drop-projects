import React, { FC, useState } from 'react'
import styled from 'styled-components';
import { IBoard } from '../interfaces/IBoards';
import { Colors } from '../models/colors';
import { ITask } from './../interfaces/ITask';
import FlexContainer from './FlexContainer';


const StyledTaskContainer = styled.div`
    width:100%;
    min-height: 50px;
    border: 2px solid ${Colors.BORDER};
    
`

/* box-shadow: ${({ pinkShadow }) => pinkShadow ? `0 2px 3px ${Colors.PINK}` : ''}; */

const Task:FC<ITask> = ({id, projectId, title, subtitle, type, status, creationDate, doneDate, item, board, currentBoard, currentItem, setCurrentItem, setCurrentBoard, setBoards, boards}) => {

    const [isDrag, setIsDrag] = useState<boolean>(false)
  
    const dragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
        e.preventDefault() 
        
        if ((e.target as HTMLDivElement).className.includes('item')) {
            (e.target as HTMLDivElement).style.boxShadow = `0 2px 3px ${Colors.PINK}`
        }

    }

    const dragLeaveHandler = (e: any): void => {
        (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, board:IBoard | undefined, item: ITask | undefined): void => {
        setCurrentItem(item)
        setCurrentBoard(board)
    }

    const dragEndHandler = (e: any): void => {
        (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

    const dropHandler = (e: React.DragEvent<HTMLDivElement>, board:any, item: any): void => {
        e.preventDefault()
        const currentIndex = currentBoard?.items.indexOf(currentItem)
        currentBoard?.items.slice(currentIndex, 1)
        const dropIndex = board?.items.indexOf(item)
        board?.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards?.map((b) =>{
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard?.id) {
                return currentBoard
            }
            return b
        }))
        (e.target as HTMLDivElement).style.boxShadow = 'none'

    }
  
    return (
    <StyledTaskContainer 
        onDragOver={(e) => dragOverHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragStart={(e) => dragStartHandler(e, board, item)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDrop={(e) => dropHandler(e, board, item)}
        draggable={true}
        className='item'
    >
        {title}
    </StyledTaskContainer>
  )
}

export default Task






