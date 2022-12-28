import React, { FC, useState } from 'react'
import Button from './Button'
import FlexContainer from './FlexContainer'
import { IColumnProps } from './../interfaces/IColumnProps';
import { Colors } from '../models/colors';
import styled from 'styled-components';
import Modal from './Modal';
import ColumnConstructor from './Constructors/ColumnConstructor';

const UnderLine = styled.span`
    width: 100%;
    height:1px;
    border: 2px solid ${Colors.BORDER};
`

const ColumnHeader:FC<IColumnProps> = ({title, currentProject}) => {
    
const [modal, setModal] = useState(false)
  const modalClickHandler = () => {
    setModal(!modal)
  }

  return (
    <FlexContainer direction='column' gap='5px'>
        <Modal visible={modal} setVisible={modalClickHandler}><ColumnConstructor currentProject={currentProject} setVisible={modalClickHandler}></ColumnConstructor></Modal>
            <FlexContainer justify='space-between' align='center'>
                <h3>{title}</h3>
                <Button widthProps='30px' paddingProps='5px' onClick={modalClickHandler}>+</Button>
            </FlexContainer>
            <UnderLine/>
    </FlexContainer>
  )
}

export default ColumnHeader