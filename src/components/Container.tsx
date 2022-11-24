import React, { FC } from 'react'
import styled from 'styled-components'
import { IContainerProps } from '../interfaces/IContainerProps'
import { Colors } from '../models/colors'

const StyledContainer = styled.div`
    border: 2px solid ${Colors.BORDER};
    width: 100%;
    height: 100%;
`

const Container: FC<IContainerProps> = (props) => {
  return (
    <StyledContainer>{props.children}</StyledContainer>
  )
}

export default Container