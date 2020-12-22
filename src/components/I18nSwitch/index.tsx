import React, { useRef } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import i18n from '../../i18n'
import { ReactComponent as I18nIcon } from '../../assets/svg/i18n.svg'
// import { useActiveWeb3React } from '../../hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'
import { ExternalLink } from '../../theme'
// import { ButtonPrimary } from '../Button'

const StyledI18nIcon = styled(I18nIcon)`
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
  color: ${({ theme }) => (theme.isDarkMode ? theme.text1 : theme.text1)};
  fill: ${({ theme }) => (theme.isDarkMode ? theme.text1 : theme.text1)};
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
    color: ${({ theme }) => (theme.isDarkMode ? theme.text1 : theme.text1)};
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
  min-width: 12.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 6px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -9.25rem;
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

export default function I18nSwitch() {
  // const { account } = useActiveWeb3React()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.I18N)
  const toggle = useToggleModal(ApplicationModal.I18N)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledI18nIcon />
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          <MenuItem>
            <div onClick={() => changeLanguage('en')}>English</div>
          </MenuItem>
          <MenuItem>
            <div onClick={() => changeLanguage('zh-CN')}>简体中文</div>
          </MenuItem>
          <MenuItem>
            <div onClick={() => changeLanguage('zh-TW')}>繁體中文</div>
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
