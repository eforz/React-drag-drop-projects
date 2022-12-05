import React, { FC } from 'react'
import styled from 'styled-components'
import { Colors } from '../models/colors'
import { IModalProps } from './../interfaces/IModalProps';

const StyledBackground = styled.div<IModalProps>`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0000007b;
    display: ${({ visible }) => visible ? 'flex' : 'none'};
` 

const StyledModal = styled.div`
    max-width:420px;
    width: 100%;
    height: 500px;
    padding: 15px;
    background: ${Colors.WHITE};
    border: 3px solid ${Colors.PINK};
    border-radius: 15px;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const Modal: FC<IModalProps> = ({children, visible, setVisible}) => {
  return (
    <StyledBackground visible={visible} setVisible={setVisible} onClick={setVisible}>
        <StyledModal onClick={(e) => e.stopPropagation()}>
            {children}
        </StyledModal>
    </StyledBackground>
  )
}

export default Modal