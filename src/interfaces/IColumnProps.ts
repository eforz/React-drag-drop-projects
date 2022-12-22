import { ReactNode } from 'react';
import { IProjectProps } from './IProjectProps';

export interface IColumnProps {
    title: string;
    children?: ReactNode;
    currentProject?: IProjectProps | undefined;
    onDrop?: any;
    onDragOver?: any;
}