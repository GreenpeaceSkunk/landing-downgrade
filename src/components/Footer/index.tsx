import React, { memo, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Footer, A, Nav, Span, Wrapper, } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import SocialMediaNav from '../SocialMediaNav';

const Link = styled(A)`
  color: white;
  text-decoration: underline;
  font-family: ${({theme}) => theme.font.family.primary.regular};
  font-size: ${pixelToRem(14)};
  
  @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
    margin-bottom: 0;
  }
`;

const Component: React.FunctionComponent<{}> = memo(() => useMemo(() => (
  <Footer
    customCss={css`
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;
      padding: ${pixelToRem(30)};
      width: 100%;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: auto;
      /* min-height: ${({theme}) => pixelToRem(theme.footer.mobile.height)}; */
      min-height: ${({theme}) => pixelToRem(theme.footer.mobile.height)};
      background-color: ${({theme}) => theme.footer.mobile.backgroundColor};
      color: white;
      transition: all 250ms ease;
      overflow: hidden;

      @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
        flex-direction: row-reverse;
        /* min-height: initial; */
        min-height: ${({theme}) => pixelToRem(theme.footer.tablet.height)};
        background-color: ${({theme}) => theme.footer.tablet.backgroundColor};
      }
      
      @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
        min-height: ${({theme}) => pixelToRem(theme.footer.desktop.height)};
        /* background-color: ${({theme}) => theme.footer.desktop.backgroundColor}; */
      }
      /* background-color: orange !important; */
    `}
  >
    <Wrapper
      customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <SocialMediaNav/>
    </Wrapper>
    <Wrapper
      customCss={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        `}
    >
      <Nav
        customCss={css`
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: ${pixelToRem(48)};

          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            justify-content: flex-start;
            margin-top: 0;
          }
        `}
      >
        <Link href={`${process.env.REACT_APP_TERMS_AND_CONDITIONS_URL}`}>Términos y condiciones</Link>
        <Span customCss={css`color: white; margin: 0 ${pixelToRem(10)};`}>|</Span>
        <Link href={`${process.env.REACT_APP_PRIVACY_POLICY_URL}`}>Política de privacidad</Link>
      </Nav>
    </Wrapper>
  </Footer>
), []));

Component.displayName = 'MainFooter';
export default Component;
