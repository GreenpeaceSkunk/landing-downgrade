import Elements from "@bit/meema.ui-components.elements";
import { CustomCSSType, pixelToRem } from "meema.utils";
import styled, { css } from "styled-components";

const Panel = styled(Elements.Wrapper)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: ${pixelToRem(28)} ${pixelToRem(24)};
  transition: all 250ms ease;
  font-family: ${({theme}) => theme.font.family.primary.regular};
  
  > * {
    margin-bottom: ${pixelToRem(30)};

    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    /* padding: ${pixelToRem(58)} ${pixelToRem(77)}; */
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

  > * {
    &:not(:last-child) {
      /* margin-right: ${pixelToRem(36)}; */
    }
  }

  ${({customCss}) => customCss && customCss};
`;

const Title = styled(Elements.H1)<{ color?: 'light' | 'dark' | 'primary' }>`
  font-size: ${pixelToRem(20)};
  font-weight: 700;
  line-height: ${pixelToRem(22)};
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

  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    font-size: ${pixelToRem(26)};
    line-height: ${pixelToRem(36)};
  }

  ${({customCss}) => customCss && customCss};
`;

const Text = styled(Elements.P)`
  font-family: ${({theme}) => theme.font.family.primary.regular};
  font-size: ${pixelToRem(16)};
  font-weight: 400;
  line-height: ${pixelToRem(18)};
  text-align: center;

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

const _ = {
  Panel,
  PanelWrapper,
  Cards,
  Title,
  Text,
  HtmlText,
};

export default _;
