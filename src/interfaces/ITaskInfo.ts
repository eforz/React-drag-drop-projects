import { IProjectProps } from './IProjectProps';
import { ITask } from './ITask';

export interface ITaskInfo {
    task: ITask;
    project: IProjectProps | undefined;
}