import React, { FC, useState } from 'react'
import styled from 'styled-components'
import Input from './Input'
import { IHeaderProps } from '../interfaces/IHeaderProps'
import Button from './Button'
import FlexContainer from './FlexContainer'
import { Colors } from '../models/colors'
import Modal from './Modal'
import HeaderConstructor from './Constructors/HeaderConstructor'

const StyledHeader = styled.header<IHeaderProps>`
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-around;
    margin-top:30px;
    padding: 30px;
    width: ${props => props.widthProps || '100%'} ;
    height: 200px;
    border: 2px solid ${Colors.BORDER};
`



const Header: FC<IHeaderProps> = (props) => {

  const [modal, setModal] = useState(false)
  const clickHandler = () => {
    setModal(!modal)
  }

  return (
    <StyledHeader {...props}>
        <Modal visible={modal} setVisible={clickHandler}><HeaderConstructor setVisible={clickHandler}></HeaderConstructor></Modal>
        <h1>{props.title}</h1>
        <FlexContainer gap='10px' justify='center'>
            {/* <Input placeholder='1 Search by project name' type='text'/> */}
            {props.children}
            <Button onClick={clickHandler}>Create</Button>
        </FlexContainer>
    </StyledHeader>
  )
}

export default Header