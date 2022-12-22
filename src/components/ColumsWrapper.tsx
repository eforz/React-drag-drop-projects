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
  let tasks:ITask[] = useAppSelector(state => state.projectsReducer.tasks)
  if (tasks.length <=0) {
    tasks = JSON.parse(localStorage.getItem('Tasks')!)
  }
  useEffect( () => {
    dispatch(projectsSlice.actions.getTasksFromLocalStorage())
  }, [])

  const currentProjectTasks = tasks.filter(item => item.projectId === currentProject?.id)
  
  const quequeTasks:ITask[] = currentProjectTasks.filter(task => task.status == 'queque')
  const inProgressTasks:ITask[] = currentProjectTasks.filter(task => task.status == 'inProgress')
  const doneTasks:ITask[] = currentProjectTasks.filter(task => task.status == 'done')

  const [pinkShadow, setPinkShadow] = useState<boolean>(false)

  const [boards, setBoards] = useState<IBoard[]>([
    {id:1, title:'Queque', items: quequeTasks},
    {id:2, title:'In Progress', items: inProgressTasks},
    {id:3, title:'Done', items: doneTasks}
  ])

  const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null)
  const [currentItem, setCurrentItem] = useState<any>(null)

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault() 
    if ((e.target as HTMLDivElement).className.includes('item')) {
        (e.target as HTMLDivElement).style.boxShadow = `0 2px 3px ${Colors.PINK}`
    }
  }

  const dropTaskHandler = (e: React.DragEvent<HTMLDivElement>, board:any) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard?.items.indexOf(currentItem);
    currentBoard?.items.slice(currentIndex, 1);
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

  console.log(quequeTasks)

  return (
    <FlexContainer widthProps='100%' gap='20px' margin='10px 0' direction='row' justify='space-around' align='center' paddingProps='10px 0'>
      {boards.map(board => 
        <Column title={board.title} currentProject={currentProject} key={board.id} 
          onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)} 
          onDrop={(e: React.DragEvent<HTMLDivElement>) => dropTaskHandler(e, board)}
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
              item={item}
              board={board}
              currentBoard={currentBoard}
              setCurrentBoard={setCurrentBoard}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              boards={boards}
              setBoards={setBoards}
            />
          ) : <h2>Список пуст</h2>}
        </Column>  
      )}
        
    </FlexContainer>
  )
}

export default ColumsWrapper