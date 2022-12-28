import { ReactNode } from "react";
import { IProjectProps } from "./IProjectProps";

export interface IHeaderProps {
    title?: string;
    button?: ReactNode;
    input?: ReactNode;
    widthProps?:string;
    children?: ReactNode
    currentProject?: IProjectProps | undefined;
}