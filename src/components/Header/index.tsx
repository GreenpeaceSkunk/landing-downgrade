import React, { FunctionComponent, memo, useMemo } from 'react';
import { Wrapper, Header, H1, HGroup, P } from '@bit/meema.ui-components.elements';
import { isMobile, pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import { Logo } from '../Shared';
import Images from '../../images';

const MainHeader: FunctionComponent<{}> = memo(() => {
  const mobile = isMobile();

  return useMemo(() => (
    <Header
      customCss={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: ${pixelToRem(30)};
        width: 100%;
        min-height: ${({theme}) => pixelToRem(theme.header.mobile.height)};
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 1%, rgba(44, 44, 44, 0) 96%), url(${Images.Backgrounds.HeaderBackground});
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        transition: all 250ms ease;
  
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          min-height: ${({theme}) => pixelToRem(theme.header.tablet.height)};
          background-color: ${({theme}) => theme.header.tablet.backgroundColor};
          background-position: center 80%;
        }
        
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
          min-height: ${({theme}) => pixelToRem(theme.header.desktop.height)};
          background-color: ${({theme}) => theme.header.desktop.backgroundColor};
        }
      `}
    >
      <Logo />
      <Wrapper
        customCss={css`
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          width: 100%;
          transition: all 250ms ease;
  
          > * {
            margin-bottom: ${pixelToRem(20)};
  
            &:last-child {
              margin-bottom: 0;
            }
          }
  
          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            max-width: ${pixelToRem(1140)};
            align-self: center;
            justify-content: space-between;

          }
        `}
      >
        <HGroup
          customCss={css`
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            justify-content: center;
            text-align: center;
            
            @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
              text-align: left;
            }
          `}
        >
          <H1
            customCss={css`
              margin-bottom: ${pixelToRem(16)};
              color: white;
              font-size: ${pixelToRem(26)};
              font-family: ${({theme}) => theme.font.family.primary.bold};
              line-height: ${pixelToRem(28)};
              
              @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                margin-bottom: ${pixelToRem(24)};
                font-size: ${pixelToRem(48)};
              }
            `}
          >Subsistimos con aportes como el tuyo</H1>
          <P
            customCss={css`
              color: white;
              font-size: ${pixelToRem(16)};
              line-height: ${pixelToRem(18)};
              
              @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                font-size: ${pixelToRem(26)};
                line-height: ${pixelToRem(28)};
              }
            `}
          >En greenpeace no recibimos dinero de empresas privadas,{(!mobile) ? <br/> : null} ni de la política, por eso tu aporte es tan importante.</P>
        </HGroup>
      </Wrapper>
    </Header>
  ), [
    mobile,
  ])
});

export default MainHeader;
