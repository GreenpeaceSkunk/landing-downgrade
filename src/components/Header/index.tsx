import React, { FunctionComponent, memo, useMemo } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import { Logo } from '../Shared';

const MainHeader: FunctionComponent<{}> = memo(() => {
  return useMemo(() => (
    <Elements.Header
      customCss={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: ${pixelToRem(30)};
        width: 100%;
        height: ${({theme}) => pixelToRem(theme.header.mobile.height)};
        background-color: ${({theme}) => theme.header.mobile.backgroundColor};
  
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          height: ${({theme}) => pixelToRem(theme.header.tablet.height)};
          background-color: ${({theme}) => theme.header.tablet.backgroundColor};
        }
        
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
          height: ${({theme}) => pixelToRem(theme.header.desktop.height)};
          background-color: ${({theme}) => theme.header.desktop.backgroundColor};
        }
      `}
    >
      <Logo color='green' />
    </Elements.Header>
  ), [])
});

export default MainHeader;
