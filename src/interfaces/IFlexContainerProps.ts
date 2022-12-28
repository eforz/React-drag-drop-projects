export interface IFlexContainerProps {
    direction?: string;
    align?: string;
    justify?: string;
    margin?: string;
    children?:  React.ReactChild | React.ReactNode;
    widthProps?: string;
    heightProps?: string;
    gap?:string;
    maxwidthProps?:string;
    paddingProps?: string;
}