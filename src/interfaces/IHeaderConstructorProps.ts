import { IProjectProps } from "./IProjectProps";

export interface IheaderConstructorProps {
    setVisible: () => void;
    currentProject?: IProjectProps | undefined;
}