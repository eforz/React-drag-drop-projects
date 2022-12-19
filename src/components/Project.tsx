import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Colors } from '../models/colors';
import { IProjectProps } from './../interfaces/IProjectProps';
import Button from './Button';
import ProjectConstructor from './Constructors/ProjectConstructor';
import FlexContainer from './FlexContainer';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const StyledProject = styled.div`
    width: 100%;
    border: 2px solid ${Colors.BORDER};
    background: ${Colors.CONTAINER};
    cursor: pointer;
    &:hover{
      border-Color: ${Colors.PINK};
    }
`
const Project: FC<IProjectProps> = ({title, subtitle, id}) => {

  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  
  const clickHandler = () => {
    setModal(!modal)
  }
  const navigateClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate('/project/'+ id)
  }
  const btnClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setModal(!modal)
  }

  return (
    <StyledProject >
      <Modal visible={modal} setVisible={clickHandler}><ProjectConstructor id={id} setVisible={clickHandler} projectTitle={title} projectSubtitle={subtitle}></ProjectConstructor></Modal>
      <div onClick={navigateClick}>
        <FlexContainer justify='space-between'>
          <h1>{title}</h1>
          <Button onClick={btnClickHandler}>Конструктор</Button>
        </FlexContainer>
        <FlexContainer>
          <p>{subtitle}</p>
        </FlexContainer>
      </div>
    </StyledProject>
  )
}

export default Project