import { IBoard } from './IBoards';

export interface ITask {
    id: string | number | undefined;
    projectId: string | number | undefined;
    title: string;
    subtitle: string;
    status: string;
    type: string | number;
    creationDate: string | number;
    // timer: string | number;
    doneDate: string | number | null;
    // files?: string;
    // comments?: IComment[];
    subtasks?: ITask[] | ITask;
    draggable?: Boolean | undefined;
    item?:any;
    board?: IBoard;
    currentBoard?: null | IBoard;
    setCurrentBoard?: any;
    currentItem?: any;
    setCurrentItem?: any;
    setBoards?: any;
    boards?: IBoard[];

    onDragOverHandler?: any;
    onDragLeaveHandler?: any;
    onDragStartHandler?: any;
    onDragEndHandler?: any;
    onDropHandler?: any;
// null | IBoard | 
}