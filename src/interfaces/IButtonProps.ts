import { ReactNode } from 'react';

export interface IButtonProps {
    children?: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    widthProps?: string;
    paddingProps?: string;
    heightProps?: string;
    borderColor?: string;
    FontSizeProps?: string;
}