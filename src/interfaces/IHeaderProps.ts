import { ReactNode } from "react";

export interface IHeaderProps {
    title: string;
    button?: ReactNode;
    input?: ReactNode;
    widthProps?:string;
}