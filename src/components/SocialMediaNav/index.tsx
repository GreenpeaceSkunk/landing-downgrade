import React, {memo, useMemo} from 'react';
import { A, Img, Nav, Span, Wrapper } from '@bit/meema.ui-components.elements';
import Images from '../../images';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';

const Component: React.FunctionComponent<{
  text?: string;
}> = ({
  text,
}) => {
  return useMemo(() => (
    <Wrapper>
      {text && <Span
        customCss={css`
          display: flex;
          justify-content: center;
          color: white;
          margin-bottom: ${pixelToRem(36)};
          text-align: center;
        `}
      >{text}</Span>}
      <Nav
        customCss={css`
          display: flex;
          justify-content: center;
          width: 100%;
          > * {
            margin-right: ${pixelToRem(32)};
            
            &:last-child {
              margin-right: 0;
            }
          }
        `}
      >
        <A href={`${process.env.REACT_APP_SOCIAL_MEDIA_URL_FACEBOOK}`} target='_blank'>
          <Img src={Images.Icons.FacebookLogo} alt='Facebook' loading='lazy' />
        </A>
        <A href={`${process.env.REACT_APP_SOCIAL_MEDIA_URL_INSTAGRAM}`} target='_blank'>
          <Img src={Images.Icons.InstagramLogo} alt='Instagram' loading='lazy' />
        </A>
        <A href={`${process.env.REACT_APP_SOCIAL_MEDIA_URL_TWITTER}`} target='_blank'>
          <Img src={Images.Icons.TwitterLogo} alt='Twitter' loading='lazy' />
        </A>
      </Nav>
    </Wrapper>
  ), [
    text,
  ]);
}

export default memo(Component);
