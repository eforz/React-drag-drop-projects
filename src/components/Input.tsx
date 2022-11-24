import React, { FC } from 'react'
import styled from 'styled-components'
import { Colors } from '../models/colors'
import { IInputProps } from '../interfaces/IInputProps';

const StyledInput = styled.input`
    width: 300px;
    height: 35px;
    border: 2px solid ${Colors.PINK};
`

const Input: FC<IInputProps> = (props) => {
  return (
    <StyledInput {...props}/>
  )
}

export default Input