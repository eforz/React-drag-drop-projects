import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProjectProps } from './../../interfaces/IProjectProps';


interface ProjectsState {
    projects: IProjectProps[],
}

const initialState: ProjectsState = {
    projects: [],
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
    }

},)

export default projectsSlice.reducer;