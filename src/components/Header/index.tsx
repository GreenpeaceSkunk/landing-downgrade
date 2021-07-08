import React, { FunctionComponent, memo, useMemo } from 'react';
import { Wrapper, Header, H1, HGroup, Span } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import { Logo } from '../Shared';
import Images from '../../images';

const MainHeader: FunctionComponent<{}> = memo(() => {
  return useMemo(() => (
    <Header
      customCss={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: ${pixelToRem(30)};
        padding-bottom: ${pixelToRem(30)};
        width: 100%;
        min-height: ${({theme}) => pixelToRem(theme.header.mobile.height)};
        background-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 1%, rgba(44, 44, 44, 0) 96%), url(${Images.Backgrounds.HeaderBackground});
        background-repeat: no-repeat;
        background-position: center center;
        background-size: auto 100%;
        transition: all 250ms ease;
  
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          background-size: cover;
          min-height: ${({theme}) => pixelToRem(theme.header.tablet.height)};
          background-color: ${({theme}) => theme.header.tablet.backgroundColor};
        }
        
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
          min-height: ${({theme}) => pixelToRem(theme.header.desktop.height)};
          background-color: ${({theme}) => theme.header.desktop.backgroundColor};
        }
      `}
    >
      <Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;
          padding-right: ${pixelToRem(30)};
          padding-left: ${pixelToRem(30)};
          margin-top: ${pixelToRem(20)};
          width: 100%;
          transition: all 250ms ease;
  
          > * {
            margin-bottom: ${pixelToRem(20)};
  
            &:last-child {
              margin-bottom: 0;
            }
          }
  
          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            /* max-width: ${pixelToRem(1100)}; */
            align-self: center;
          }
        `}
      >
        <Logo />
        <HGroup>
          <H1
            customCss={css`
              color: ${({theme}) => theme.color.tertiary.normal};
              font-size: ${pixelToRem(28)};
              line-height: 110%;
  
              @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
                font-size: ${pixelToRem(36)};
              }
            `}
          >Título</H1>
          <Span
            customCss={css`
              color: white;
              font-size: ${pixelToRem(18)};
            
              @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
                font-size: ${pixelToRem(20)};
              }
            `}
          >Bajada.</Span>
        </HGroup>
      </Wrapper>
    </Header>
  ), [])
});

export default MainHeader;
