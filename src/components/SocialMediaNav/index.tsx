import React, {memo, useMemo} from 'react';
import { A, Img, Nav, Span, Wrapper } from '@bit/meema.ui-components.elements';
import Images from '../../images';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';


const Component: React.FunctionComponent<{}> = () => {
  return useMemo(() => (
    <Wrapper>
      <Span
        customCss={css`
          display: flex;
          color: white;
          margin-bottom: ${pixelToRem(36)};
        `}
      >¡Seamos muchos más los que ayudamos al planeta!</Span>
      <Nav
        customCss={css`
          > * {
            margin-right: ${pixelToRem(32)};
            
            &:last-child {
              margin-right: 0;
            }
          }
        `}
      >
        <A href='https://facebook.com/greenpeace'>
          <Img src={Images.Icons.FacebookLogo} alt='' />
        </A>
        <A href='https://facebook.com/greenpeace'>
          <Img src={Images.Icons.InstagramLogo} alt='' />
        </A>
        <A href='https://facebook.com/greenpeace'>
          <Img src={Images.Icons.TwitterLogo} alt='' />
        </A>
      </Nav>
    </Wrapper>
  ), []);
}

export default memo(Component);