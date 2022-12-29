import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { IColumsWrapperProps } from '../interfaces/IColumsWrapperProps';
import { projectsSlice } from '../store/reducers/projectsSlice'
import Column from './Column';
import FlexContainer from './FlexContainer';
import { ITask } from './../interfaces/ITask';
import Task from './Task';
import { IBoard } from './../interfaces/IBoards';
import { Colors } from '../models/colors';

const ColumsWrapper:FC<IColumsWrapperProps> = ({currentProject, }) => {

  const dispatch = useAppDispatch()
  const boards = useAppSelector(state => state.projectsReducer.boards)
  const tasks = useAppSelector(state => state.projectsReducer.tasks)

  useEffect( () => {
    dispatch(projectsSlice.actions.getTasksFromLocalStorage())
    dispatch(projectsSlice.actions.setCurrentBoardsTasks(currentProject?.id))
    // dispatch(projectsSlice.actions.setBoardTasksToLocal());
  }, [])

  

  const [currentBoard, setCurrentBoard] = useState<any>(null)
  const [currentItem, setCurrentItem] = useState<any>(null)
  console.log(boards)

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
        e.stopPropagation()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        const dropIndex = board.items.indexOf(item)
        const action = {
          id: board.id,
          item: item,
          dropIndex: dropIndex,
          currentItem: currentItem,
          currentBoard: currentBoard,
          currentIndex: currentIndex,
        }
        dispatch(projectsSlice.actions.currentBoardSplice(action));
        dispatch(projectsSlice.actions.boardSplice(action));
        (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

  const dropTaskHandler = (e: React.DragEvent<HTMLDivElement>, board:any) => {
    e.preventDefault()
    e.stopPropagation()

    const currentIndex = currentBoard?.items.indexOf(currentItem);
    const action = {
      id: board.id,
      currentItem: currentItem,
      currentBoard: currentBoard,
      currentIndex: currentIndex,
    }
    
    dispatch(projectsSlice.actions.setItemToBoard(action));
    dispatch(projectsSlice.actions.currentBoardSplice(action));
    dispatch(projectsSlice.actions.changeItemStatus(action));
    dispatch(projectsSlice.actions.setBoardTasksToLocal());
    (e.target as HTMLDivElement).style.boxShadow = 'none';
  }



  return (
    <FlexContainer widthProps='100%' gap='20px' margin='10px 0' direction='row' justify='space-around' align='center' paddingProps='10px 0'>
      {boards.map(board => 
        <Column 
          title={board.title} 
          currentProject={currentProject} 
          key={board.id} 
          onDragOverHandler={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)} 
          onDropHandler={(e: React.DragEvent<HTMLDivElement>) => dropTaskHandler(e, board)}
        >
          {
          board.items.map(item => 
            <Task 
              id={item.id} 
              projectId={item.projectId} 
              title={item.title} 
              subtitle={item.subtitle} 
              type={item.type} 
              status={item.status} 
              creationDate={item.creationDate} 
              doneDate={item.doneDate}
              key={item.id}
              onDragOverHandler={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
              onDragLeaveHandler={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
              onDragStartHandler={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, board, item)}
              onDragEndHandler={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
              onDropHandler={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, board, item)}
            />
          )
          }
        </Column>  
      )}
        
    </FlexContainer>
  )
}

export default ColumsWrapper