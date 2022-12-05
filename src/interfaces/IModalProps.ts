import { ReactNode } from 'react';

export interface IModalProps {
    children: ReactNode;
    visible: boolean;
    setVisible: (e: React.MouseEvent<HTMLDivElement>) => void;
}