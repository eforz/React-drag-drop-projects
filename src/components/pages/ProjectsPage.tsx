import React from 'react'
import Header from '../Header'
import Container from '../Container';
import FlexContainer from './../FlexContainer';
import Project from '../Project';

const ProjectsPage = () => {
  return (
    <FlexContainer margin='0 auto' direction='column' justify='center' align='center'>
        <Header title='Projects'></Header>
        <FlexContainer gap='20px' margin='10px 0' direction='column' justify='center' align='center'>
            <h1>Сейчас тут пусто</h1>
            <Project title='название' subtitle='Описание'></Project>
        </FlexContainer>
    </FlexContainer>
  )
}

export default ProjectsPage