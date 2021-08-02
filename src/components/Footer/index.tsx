import React, { memo, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Footer, A, Nav, Span, Wrapper, } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import SocialMediaNav from '../SocialMediaNav';

const Link = styled(A)`
  color: white;
  text-decoration: underline;
  margin-bottom: ${pixelToRem(5)};
  font-family: ${({theme}) => theme.font.family.primary.regular};
  
  @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
    margin-bottom: 0;
    
    &:after {
      content: '|';
      margin-right: ${pixelToRem(10)};
      margin-left: ${pixelToRem(10)};
    }
    
    &:last-child {
      &:after {
        display: none;
      }
    }
  }
`;

const Component: React.FunctionComponent<{}> = memo(() => useMemo(() => (
  <Footer
    customCss={css`
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
      padding: ${pixelToRem(30)};
      width: 100%;
      min-height: ${({theme}) => pixelToRem(theme.footer.mobile.height)};
      background-color: ${({theme}) => theme.footer.mobile.backgroundColor};
      color: white;
      transition: all 250ms ease;

      @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
        min-height: ${({theme}) => pixelToRem(theme.footer.tablet.height)};
        background-color: ${({theme}) => theme.footer.tablet.backgroundColor};
      }

      @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
        min-height: ${({theme}) => pixelToRem(theme.footer.desktop.height)};
        background-color: ${({theme}) => theme.footer.desktop.backgroundColor};
      }
    `}
  >
    <Nav>
      <Link
        href={`${process.env.REACT_APP_TERMS_AND_CONDITIONS_URL}`}
      >Términos y condiciones</Link>
      <Link
        href={`${process.env.REACT_APP_PRIVACY_POLICY_URL}`}
      >Política de privacidad</Link>
    </Nav>
    <Wrapper>
      {/* <Span
        customCss={css`
          color: white;
          margin-bottom: ${pixelToRem(5)};
        `}
      >® Greenpeace Argentina 2021</Span> */}
      <SocialMediaNav />
    </Wrapper>
  </Footer>
), []));

Component.displayName = 'MainFooter';
export default Component;
