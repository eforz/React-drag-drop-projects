import React, { FC } from 'react'
import styled from 'styled-components';
import { IButtonProps } from './../interfaces/IButtonProps';

const StyledButton = styled.div`
    width: 120px;
    padding: 8px;
    border: 2px solid #fff;
    text-align: center;
    border-radius: 30px;
    cursor: pointer;
    &:hover {
        border-color: #FC76A1;
    }
`

const Button: FC<IButtonProps> = ({children, ...props}) => {
  return (
    <StyledButton {...props}>
        {children}
    </StyledButton>
  )
}

export default Button