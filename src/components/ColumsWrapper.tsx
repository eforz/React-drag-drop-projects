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
  let tasks = useAppSelector(state => state.projectsReducer.tasks)
  if (tasks.length <= 0) {
    tasks = JSON.parse(localStorage.getItem('Tasks')!)
  }
  useEffect( () => {
    dispatch(projectsSlice.actions.getTasksFromLocalStorage())
  }, [])

  const currentProjectTasks = tasks.filter(item => item.projectId === currentProject?.id)
  
  const quequeTasks:ITask[] = currentProjectTasks.filter(task => task.status == 'queque')
  const inProgressTasks:ITask[] = currentProjectTasks.filter(task => task.status == 'inProgress')
  const doneTasks:ITask[] = currentProjectTasks.filter(task => task.status == 'done')

  console.log(quequeTasks)

  const [boards, setBoards] = useState<IBoard[]>([
    {id:1, title:'Queque', status: 'queque', items: quequeTasks},
    {id:2, title:'In Progress', status: 'inProgress', items: inProgressTasks},
    {id:3, title:'Done', status: 'done', items: doneTasks}
  ])

  useEffect( () => {
    setAllBoardsTasks()
  }, [boards])

  function setAllBoardsTasks() {
    const quequeTasks = boards[0].items
    const inProgressTasks = boards[1].items
    const doneTasks = boards[2].items
    const allTasks = [...quequeTasks, ...inProgressTasks, ...doneTasks]
    localStorage.setItem('Tasks', JSON.stringify(allTasks))
  }

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
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
          if (b.id === board.id) {
            return board
          }
          if (b.id === currentBoard.id) {
            return currentBoard
          }
          
          return b
        }));
        (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

  const dropTaskHandler = (e: React.DragEvent<HTMLDivElement>, board:any) => {
    e.preventDefault()
    e.stopPropagation()
    board.items.push(currentItem);

    const items = board.items
    const itemsStatus = board.items.forEach((item:any) => {
      item.status = board.status
    })
    console.log(items)
    console.log(itemsStatus)

    const currentIndex = currentBoard?.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(boards.map((b) =>{
      if (b.id === board.id) {
          return board
      }
      if (b.id === currentBoard?.id) {
          return currentBoard
      }
      return b
    }));
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
          {board.items? board.items.map(item => 
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
          ) : <h2>Список пуст</h2>}
        </Column>  
      )}
        
    </FlexContainer>
  )
}

export default ColumsWrapper