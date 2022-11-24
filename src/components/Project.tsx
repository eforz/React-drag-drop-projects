import React, { FC } from 'react'
import styled from 'styled-components'
import { Colors } from '../models/colors';
import { IProjectProps } from './../interfaces/IProjectProps';
import Button from './Button';
import FlexContainer from './FlexContainer';

const StyledProject = styled.div`
    width: 100%;
    border: 2px solid ${Colors.BORDER};
    background: ${Colors.CONTAINER};
`
const Project: FC<IProjectProps> = ({title, subtitle}) => {
  return (
    <StyledProject>
      <FlexContainer justify='space-between'>
        <h1>{title}</h1>
        <Button>Конструктор</Button>
      </FlexContainer>
      <FlexContainer>
        <p>{subtitle}</p>
      </FlexContainer>
    </StyledProject>
  )
}

export default Project