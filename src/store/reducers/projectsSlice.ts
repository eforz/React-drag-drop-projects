import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../interfaces/IBoards';
import { IProjectProps } from './../../interfaces/IProjectProps';
import { ITask } from './../../interfaces/ITask';

interface ProjectsState {
    projects: IProjectProps[],
    tasks: ITask[],
    boards: IBoard[],
    clear: boolean
}

const initialState: ProjectsState = {
    projects: [],
    tasks:[],
    boards: [
        {id:1, title:'Queque', status: 'queque', items: []},
        {id:2, title:'In Progress', status: 'inProgress', items: []},
        {id:3, title:'Done', status: 'done', items: []}
    ],
    clear: false
}

export const projectsSlice = createSlice(
{
    name: 'projects',
    initialState,

    reducers: {
        addToLocalStorage(state) {
            localStorage.setItem('Projects', JSON.stringify(state.projects))
        },
        getFromLocalStorage(state) {
            state.projects = JSON.parse(localStorage.getItem('Projects')!)
            if (state.projects == null || undefined) {
                state.projects = []
            }
        },
        addProject(state, action:PayloadAction<IProjectProps>) {
            state.projects.push(action.payload);
        },
        removeProject(state, action) {
            state.projects = state.projects.filter(item => item.id !== action.payload)
            localStorage.setItem('Projects', JSON.stringify(state.projects))
        },
        changeTitle(state, action:PayloadAction<IProjectProps>) {
            const findProject = state.projects.find(item => item.id === action.payload.id)
            if (findProject){
                findProject.title = action.payload.title
            }
        },
        changeSubtitle(state, action:PayloadAction<IProjectProps>) {
            const findProject = state.projects.find(item => item.id === action.payload.id)
            if (findProject){
                findProject.subtitle = action.payload.subtitle
            }
        },

        getTasksFromLocalStorage(state, action:PayloadAction<any>) {
            if (state.tasks.length <= 0) {
                state.tasks = JSON.parse(localStorage.getItem(`${action.payload}`)!)
            }
            
            if (state.tasks == null || undefined) {
                state.tasks = []
            }
        },
        addTask(state, action:PayloadAction<ITask>) {
            state.boards[0].items.push(action.payload)
        },
        removeTask(state, action:PayloadAction<ITask>) {
            state.tasks = state.tasks.filter(item => item.id !== action.payload.id)
        },
        changeTaskTitle(state, action:PayloadAction<ITask>) {
            const findTask = state.tasks.find(item => item.id === action.payload.id)
            if (findTask) {
                findTask.title = action.payload.title
            }
        },
        changeTaskSubitle(state, action:PayloadAction<ITask>) {
            const findTask = state.tasks.find(item => item.id === action.payload.id)
            if (findTask) {
                findTask.subtitle = action.payload.subtitle
            }
        },
        changeTaskStatus(state, action:PayloadAction<ITask>) {
            const findTask = state.tasks.find(item => item.id === action.payload.id)
            if (findTask) {
                findTask.status = action.payload.status
            }
        },

        clearBoards(state){
            state.boards = initialState.boards
            state.tasks = initialState.tasks
        },

        setCurrentBoardsTasks(state, action: PayloadAction<string | number | undefined>) {
            if (!state.tasks) {
                state.tasks = initialState.tasks
            }
            if (state.boards[0].items.length <= 0 &&
                state.boards[1].items.length <= 0 &&
                state.boards[2].items.length <= 0  ) {
                const currentProjectTasks = state.tasks.filter(item => item.projectId === action.payload)
                const quequeTasks:ITask[] = currentProjectTasks.filter(task => task.status == 'queque')
                const inProgressTasks:ITask[] = currentProjectTasks.filter(task => task.status == 'inProgress')
                const doneTasks:ITask[] = currentProjectTasks.filter(task => task.status == 'done')
                state.boards[0].items.push(...quequeTasks)
                state.boards[1].items.push(...inProgressTasks)
                state.boards[2].items.push(...doneTasks)
            }
        },
        setItemToBoard(state, action:PayloadAction<any>) {
            const boardToChange = state.boards.find(board => board.id === action.payload.id)
            boardToChange?.items.push(action.payload.currentItem)
        },
        boardSplice(state, action:PayloadAction<any>) {
            const board = state.boards.find((board) => board.id === action.payload.id)
            board?.items.splice(action.payload.dropIndex + 1, 0, action.payload.currentItem)
        },
        currentBoardSplice(state, action:PayloadAction<any>) {
            const board = state.boards.find((board) => board.id === action.payload.currentBoard.id)
            board?.items.splice(action.payload.currentIndex, 1)
        },
        setBoards(state, action:PayloadAction<any>) {
            state.boards = action.payload
        },
        changeItemStatus(state, action:PayloadAction<any>) {
            const board = state.boards.find((board) => board.id === action.payload.id)
            board?.items.forEach((item) => {
                item.status = board.status
            })
        },
        setBoardTasksToLocal(state, action:PayloadAction<any>) {
            const quequeTasks = state.boards[0].items
            const inProgressTasks = state.boards[1].items
            const doneTasks = state.boards[2].items
            const allTasks = [...quequeTasks, ...inProgressTasks, ...doneTasks,]
            localStorage.setItem(`${action.payload}`, JSON.stringify(allTasks))
        },
        setClear(state){
            state.clear = !state.clear
        },    
    }

},

)

export default projectsSlice.reducer;