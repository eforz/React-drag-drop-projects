import { ReactNode } from "react";
import { IProjectProps } from "./IProjectProps";

export interface IColumsWrapperProps {
    children?: ReactNode;
    currentProject: IProjectProps | undefined;
}