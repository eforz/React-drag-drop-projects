import { ReactNode } from 'react';
import { ITask } from './ITask';

export interface IProjectProps {
    id: string | number | undefined;
    title: string;
    subtitle: string;
}