import React from 'react'
import styled from 'styled-components'

import MountainLeft from '../../assets/background/mountain-left.png'
import MountainRight from '../../assets/background/mountain-right.png'
import FieldLeft from '../../assets/background/field-left.png'
import FieldRight from '../../assets/background/field-right.png'
import CloudMoon from '../../assets/background/cloud-moon.png'
import CloudSun from '../../assets/background/cloud-sun.png'

const BackgroundContainer = styled.div`
  z-index: -1;
  ${({ theme }) => theme.isDarkMode && 'filter: brightness(0.7);'}
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(${({ theme }) => (theme.isDarkMode ? MountainLeft : FieldLeft)}),
    url(${({ theme }) => (theme.isDarkMode ? MountainRight : FieldRight)}),
    url(${({ theme }) => (theme.isDarkMode ? CloudMoon : CloudSun)}),
    linear-gradient(${({ theme }) => (theme.isDarkMode ? '#352259, #0F1F34' : '#C4E6F3, #84CDEE')}),
    linear-gradient(${({ theme }) => (theme.isDarkMode ? '#32c5ff, #32c5ff' : '#DEF3C8, #DEF3C8')}),
    linear-gradient(${({ theme }) => (theme.isDarkMode ? '#1b1b1b, #1b1b1b' : '#B4E085, #B4E085')});
  background-size: auto calc(100% * 0.414814814814815), auto calc(100% * 0.414814814814815),
    auto calc(100% * 0.425296296296296), 100% 50%, 100% 4px, 100% 50%;
  background-position: top calc(50% - (100vh * 0.410814814814815 / 2)) left,
    top calc(50% - (100vh * 0.410814814814815 / 2)) right, top center, top center, top calc(50% + 4px) center,
    bottom center;

  @media (min-width: 1919.99px) and (max-height: 1079.99px) {
    background-size: auto calc(100% * 0.414814814814815), auto calc(100% * 0.414814814814815),
      auto calc(100% * 0.425296296296296), 100% 50%, 100% 4px, 100% 50%;
    background-position: top calc(50% - (100vh * 0.410814814814815 / 2)) left,
      top calc(50% - (100vh * 0.410814814814815 / 2)) right, top center, top center, top calc(50% + 4px) center,
      bottom center;
  }
`

const GridWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`

const Grid = styled.div`
  transform: scaleY(0);
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(165, 103, 142, 0.5) 25%,
      #a5678ee6 26%,
      transparent 27%,
      transparent 74%,
      #a5678e80 75%,
      #a5678ee6 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      #a5678ebf 25%,
      rgba(0, 6, 59, 0.25) 26%,
      transparent 27%,
      transparent 74%,
      #a5678ebf 75%,
      rgba(0, 6, 59, 0.25) 76%,
      transparent 77%,
      transparent
    );
  background-size: 50px 50px;
  position: absolute;
  top: 53%;
  left: 50%;
  width: 200vw;
  height: 150vh;
  margin-top: -75vh;
  margin-left: -100vw;
  animation: fly 3s linear;
  animation-iteration-count: infinite;
  @keyframes fly {
    0% {
      transform: perspective(300px) rotateX(80deg) translateY(0%);
    }
    100% {
      transform: perspective(300px) rotateX(80deg) translateY(50px);
    }
  }
`

export default function Background() {
  return (
    <BackgroundContainer>
      <GridWrapper>
        <Grid />
      </GridWrapper>
    </BackgroundContainer>
  )
}
