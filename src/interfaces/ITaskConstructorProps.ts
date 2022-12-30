export interface ITaskConstructorProps {
    setVisible: () => void;
    taskTitle: string;
    taskSubtitle: string;
    color: string | number;
    status: string;
    id: string | number | undefined;
    projectId: string | number | undefined;
}