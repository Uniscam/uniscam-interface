import React, { useCallback, useRef } from 'react'
import { BookOpen, GitHub, Navigation, Info, Twitter, PieChart } from 'react-feather'
import styled from 'styled-components'
import { lighten } from 'polished'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

import { ExternalLink } from '../../theme'
import { useActiveWeb3React } from '../../hooks'
import useInfoLink from '../../hooks/useInfoLink'
import { useSelectedListUrl } from '../../state/lists/hooks'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => (theme.isDarkMode ? theme.primary1 : theme.bg3)};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => (theme.isDarkMode ? lighten(0.05, theme.primary1) : lighten(0.05, theme.bg3))};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 8.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -15.75rem;
  `};
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

// const CODE_LINK = 'https://github.com/KodamaSakuno/uniswap-interface'

export default function Menu() {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)
  const { chainId } = useActiveWeb3React()
  const infoLink = useInfoLink(chainId)

  const l = useSelectedListUrl()
  const c = useCallback(() => {
    alert(l)
  }, [l])

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          <MenuItem id="link" href="https://medium.com/y3dscam/introduction-to-unisave-6ca3a85a0693">
            <Info size={14} />
            About
          </MenuItem>
          <MenuItem id="link" href="https://unisave.gitbook.io/unisave-doc/">
            <BookOpen size={14} />
            Docs
          </MenuItem>
          <MenuItem id="link" href="https://github.com/Uniscam">
            <GitHub size={14} />
            Github
          </MenuItem>
          <MenuItem id="link" href="https://twitter.com/UnisaveProtocol">
            <Twitter size={14} />
            Twitter
          </MenuItem>
          <MenuItem id="link" href="https://t.me/y3dScam">
            <Navigation size={14} />
            Telegram
          </MenuItem>
          <MenuItem id="link" href={infoLink}>
            <PieChart size={14} />
            Info
          </MenuItem>
          <MenuItem onMouseUp={c}>WTF</MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
