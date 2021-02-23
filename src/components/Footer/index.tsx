import React from 'react'
import styled from 'styled-components'

import YFII from '../../assets/images/link-yfii.png'
import YFII_MOON from '../../assets/images/link-yfii-moon.png'
import NASH from '../../assets/images/link-nash.png'

interface LinkListInterface {
  name: string
  img: any
  link: string
}

const StyledFooter = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  @media (max-width: 960px) {
    bottom: 72px;
  }
  @media (max-width: 540px) {
    bottom: 72px;
    p {
      padding: 0 4px;
      margin: 4px 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
      a {
        margin-left: 0px;
        margin-right: 8px;
        &::nth-last-child(1) {
          margin-right: 0;
        }
        img {
          height: 20px;
        }
      }
    }
  }
`
const StyledFooterItem = styled.p`
  text-align: right;
  padding: 0 40px;
  margin: 10px 0;
`

const StyledFooterItemLink = styled.a`
  margin-left: 20px;
  display: inline-block;
  line-height: 0;
  &:nth-of-type(1) {
    margin-left: 0;
  }
  img {
    height: 30px;
  }
`

export default function Footer() {
  const linkList: LinkListInterface[] = [
    {
      name: 'YFII',
      img: YFII,
      link: 'https://dfi.money/#/'
    },
    {
      name: 'YFII MOON',
      img: YFII_MOON,
      link: 'https://moon.unisave.exchange/#/'
    },
    {
      name: 'NASH',
      img: NASH,
      link: 'http://www.nashpt.co/'
    }
  ]

  return (
    <StyledFooter>
      <StyledFooterItem>
        {linkList.map((i: LinkListInterface, index: number) => (
          <StyledFooterItemLink href={i.link} key={index} target="_blank" rel="noopener noreferrer">
            <img src={i.img} alt={i.name} />
          </StyledFooterItemLink>
        ))}
      </StyledFooterItem>
    </StyledFooter>
  )
}
