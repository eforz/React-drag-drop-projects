import React, { FC } from 'react'
import styled from 'styled-components'
import { IColumnProps } from '../interfaces/IColumnProps'
import { Colors } from '../models/colors'
import Button from './Button';
import ColumnHeader from './ColumnHeader';
import FlexContainer from './FlexContainer';

const StyledColumn = styled.div`
    width: 32%;
    border: 2px solid ${Colors.BORDER};
    min-height: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`


const Column:FC<IColumnProps> = ({children, title, currentProject, onDragOverHandler, onDropHandler}) => {
  return (
    <StyledColumn onDragOver={onDragOverHandler} onDrop={onDropHandler}>
        <ColumnHeader title={title} currentProject={currentProject} />
        {children}
    </StyledColumn>
  )
}

export default Column