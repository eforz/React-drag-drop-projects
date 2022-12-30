import React, { FC } from 'react'
import styled from 'styled-components';
import { IButtonProps } from './../interfaces/IButtonProps';

const StyledButton = styled.div<IButtonProps>`

    width: ${props => props.widthProps || '120px'} ;
    padding:${props => props.paddingProps || '8px'};
    height:${props => props.heightProps || 'auto'};
    border: 2px solid ${props => props.borderColor || '#fff'};;
    font-size: ${props => props.FontSizeProps || ''};
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        border-color: #FC76A1;
    }
    display:flex;
    align-items: center;
    justify-content:center;
`

const Button: FC<IButtonProps> = ({children, ...props}) => {
  return (
    <StyledButton {...props}>
        {children}
    </StyledButton>
  )
}

export default Button