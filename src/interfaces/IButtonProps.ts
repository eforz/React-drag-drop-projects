import { ReactNode } from 'react';

export interface IButtonProps {
    children?: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}