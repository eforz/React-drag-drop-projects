import React, { FC } from 'react'
import styled from 'styled-components';
import { IFlexContainerProps } from '../interfaces/IFlexContainerProps';

const StyledFlexContainer = styled.div<IFlexContainerProps>`
    display: flex;
    height: ${props => props.heightProps || 'auto'} ;
    max-width: ${props => props.maxwidthProps || '100%'} ;
    width: ${props => props.widthProps || '800px'} ;
    flex-direction: ${props => props.direction || 'row'} ;
    align-items: ${props => props.align || 'stretch'} ;
    justify-content: ${props => props.justify || 'stretch'} ;
    gap: ${props => props.gap || 'stretch'} ;
    margin: ${({margin}) => margin || '0'} ;
    padding:${props => props.paddingProps || '10px'};
`
const FlexContainer: FC<IFlexContainerProps> = (props) => {
  return <StyledFlexContainer {...props}>{props.children}</StyledFlexContainer>
}

export default FlexContainer