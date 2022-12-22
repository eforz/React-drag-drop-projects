import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { IProjectHeaderProps } from '../interfaces/IProjectHeaderProps'
import { Colors } from '../models/colors';
import { IHeaderProps } from './../interfaces/IHeaderProps';
import Button from './Button';

const StyledHeader = styled.header<IHeaderProps>`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top:30px;
    padding: 30px;
    width: ${props => props.widthProps || '100%'} ;
    height: 200px;
    border: 2px solid ${Colors.BORDER};
`

const ProjectHeader:FC<IProjectHeaderProps> = ({currentProject}) => {
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate('/')
    }

  return (
    <StyledHeader>
        <div>
            <h1>Название проекта: {currentProject?.title}</h1>
            <h2>Описание проекта: {currentProject?.subtitle}</h2>
        </div>
        <Button onClick={clickHandler}> &#10232; Back</Button>
    </StyledHeader>
  )
}

export default ProjectHeader