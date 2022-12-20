import { ReactNode } from 'react';
import { IProjectProps } from './IProjectProps';

export interface IProjectHeaderProps {
    children?: ReactNode;
    widthProps?:string;
    currentProject: IProjectProps | undefined;
}