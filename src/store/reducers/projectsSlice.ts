import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProjectProps } from './../../interfaces/IProjectProps';
import { ITask } from './../../interfaces/ITask';

interface ProjectsState {
    projects: IProjectProps[],
    tasks: ITask[]
}

const initialState: ProjectsState = {
    projects: [],
    tasks:[]
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

        addTaskToLocalStorage(state) {
            localStorage.setItem('Tasks', JSON.stringify(state.tasks))
        },
        addTasksToLocalStorage(state, action:PayloadAction<ITask>) {
            localStorage.setItem('Tasks', JSON.stringify(action.payload))
        },
        getTasksFromLocalStorage(state) {
            state.tasks = JSON.parse(localStorage.getItem('Tasks')!)
            if (state.tasks == null || undefined) {
                state.tasks = []
            }
        },
        addTask(state, action:PayloadAction<ITask>) {
            state.tasks.push(action.payload)
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
    }

},)

export default projectsSlice.reducer;