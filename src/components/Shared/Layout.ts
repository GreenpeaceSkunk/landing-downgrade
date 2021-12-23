import Elements from "@bit/meema.ui-components.elements";
import { CustomCSSType, pixelToRem } from "meema.utils";
import styled, { css } from "styled-components";
import { NavLink } from 'react-router-dom';

interface IButtonProps {
  format?: 'text' | 'contained' | 'outlined';
}

interface IButtonDisabledProps {
  disabled?: boolean;
}

const buttonDisabledStyles = css<IButtonDisabledProps>`
  ${({ disabled }) => disabled && css`
    /* background-color: white; */
    background-color: #DDE0E3;
    pointer-events: none;
    user-select: none;
    /* color: ${({theme}) => theme.text.color.primary.normal}; */
    color: #B6B6B6;

    &:hover {
      background-color: ${({theme}) => theme.color.secondary.normal};
    }
  `}
`;

const buttonStyles = css<IButtonProps>`
  padding: ${pixelToRem(10)};
  color: white;
  background-color: ${({theme}) => theme.color.primary.normal};
  border-radius: ${pixelToRem(5)};
  font-size: ${pixelToRem(16)};
  font-family: ${({theme}) => theme.font.family.primary.regular};
  padding: ${pixelToRem(13)} ${pixelToRem(60)};
  width: fit-content;
  user-select: none;
  transition: all 500ms ease;
  text-align: center;

  &:hover {
    background-color: ${({theme}) => theme.color.primary.dark};
  }
  
  ${({format}) => (format === 'text') && css`
    background-color: transparent;
    color: ${({theme}) => theme.color.primary.normal};
    text-decoration: underline;
    padding: 0;

    &:hover {
      background-color: transparent;
      box-shadow: none !important;
    }
  `}
`;

const Panel = styled(Elements.Wrapper)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: ${pixelToRem(28)} ${pixelToRem(24)};
  transition: all 250ms ease;
  font-family: ${({theme}) => theme.font.family.primary.regular};
  margin-bottom: 0;
  
  > * &:not(:last-child) {
    margin-bottom: ${pixelToRem(30)};
    /* background-color: pink; */
  }
  
  ${({customCss}) => customCss && customCss};
`;

const PanelWrapper = styled(Elements.Wrapper)<{ customCss?: CustomCSSType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  
  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    max-width: ${pixelToRem(1140)};
  }
  
  ${({customCss}) => customCss && customCss};
`;

const Cards = styled(Elements.Wrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  > * {
    margin-bottom: ${pixelToRem(30)};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    flex-direction: row;
    justify-content: center;
    align-items: stretch;

    > * {
      margin-bottom: 0;
      margin-right: ${pixelToRem(30)};
      
      &:last-child {
        margin-right: 0;
      }
    }
  }

  ${({customCss}) => customCss && customCss};
`;

const Title = styled(Elements.H1)<{ color?: 'light' | 'dark' | 'primary' }>`
  font-size: ${pixelToRem(20)};
  font-family: ${({theme}) => theme.font.family.primary.bold};
  font-weight: 700;
  color: ${({ theme }) => theme.color.secondary.dark};
  text-align: center;
  margin-bottom: ${pixelToRem(16)};

  ${({ color }) => (color) && css`
    ${(color === 'light') && css`
      color: white;
    `};
    
    ${(color === 'dark') && css`
      color: ${({ theme }) => theme.color.secondary.dark};
    `};
    
    ${(color === 'primary') && css`
      color: ${({ theme }) => theme.color.primary.normal};
    `};
  `};

  em {
    font-style: normal;
    color: ${({ theme }) => theme.color.primary.normal};
  }

  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    font-size: ${pixelToRem(32)};
  }

  ${({customCss}) => customCss && customCss};
`;

const Text = styled(Elements.P)<{ color?: 'light' | 'dark' | 'primary' }>`
  font-family: ${({theme}) => theme.font.family.primary.regular};
  font-size: ${pixelToRem(16)};
  font-weight: 400;
  line-height: ${pixelToRem(18)};
  text-align: center;

  ${({ color }) => (color) && css`
    ${(color === 'light') && css`
      color: white;
    `};
    
    ${(color === 'dark') && css`
      color: ${({ theme }) => theme.color.secondary.dark};
    `};
    
    ${(color === 'primary') && css`
      color: ${({ theme }) => theme.color.primary.normal};
    `};
  `};

  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    font-size: ${pixelToRem(20)};
    line-height: ${pixelToRem(28)};
  }

  ${({customCss}) => customCss && customCss};
`;

const HtmlText = styled(Elements.P)`
  strong {
    font-family: ${({theme}) => theme.font.family.primary.bold};
  }

  ${({customCss}) => customCss && customCss};
`;

const Button = styled(Elements.Button)`
  ${buttonStyles};
`;

const ButtonLink = styled(NavLink)<IButtonProps & IButtonDisabledProps>`
  ${buttonStyles};
  ${buttonDisabledStyles};
`;
const Link = styled(Elements.A)<IButtonProps & IButtonDisabledProps>`
  ${buttonStyles};
  ${buttonDisabledStyles};
`;

const _ = {
  Panel,
  PanelWrapper,
  Cards,
  Title,
  Text,
  HtmlText,
  Button,
  ButtonLink,
  Link,
};

export default _;
