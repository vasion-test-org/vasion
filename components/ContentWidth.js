import React from 'react'
import styled from 'styled-components'
import media from '@/styles/media'

const ContentWidth = ({children, nav}) => {
  return (
      <Container nav={nav}>
        {children}
      </Container>
  )
}

export default ContentWidth

const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.nav ? 'row' : 'column'};
    justify-content: ${props => props.nav ? 'space-between' : 'center'};
    align-items: ${props => props.nav ? 'space-between' : 'center'};
    width: 100%; 

  ${media.fullWidth} {
    display: flex;
    flex-direction: ${props => props.nav ? 'row' : 'column'};
    margin: 0 auto;
    max-width: 1600px;
  }

  ${media.tablet} {
    width: 100%;
  }
  
  ${media.mobile} {
    width: 100%;
  }
`