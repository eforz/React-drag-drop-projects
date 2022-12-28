import { ITask } from './ITask';

export interface IBoard {
    id: string | number;
    title: string;
    items: ITask[]
    status: string;
}