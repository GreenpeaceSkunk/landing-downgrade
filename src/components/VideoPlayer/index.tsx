import React, { memo, useMemo, useRef } from 'react';
import { Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import ReactPlayer from 'react-player/lazy';
import { css } from 'styled-components';
import { Loader } from '../Shared';

interface IProps {
  videoUrl: string;
}

const Component: React.FunctionComponent<IProps> = ({
  videoUrl,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return useMemo(() => (
    <Wrapper
      ref={wrapperRef}
      customCss={css`
        width: 100vw;
        height: ${pixelToRem(240)};
        background-color: black;
        
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          width: ${pixelToRem(888)};
          height: ${pixelToRem(450)};
          z-index: 999;
        }
      `}
    >
      <Wrapper
        customCss={css`
          width: 100%;
          height: 100%;
        `}
      >
        <ReactPlayer
          width='100%'
          height='100%'
          url={videoUrl}
          loop={false}
          playing={true}
          controls={true}
          muted={false}
          playbackRate={1}
          onPause={() => {}}
          fallback={
            <Wrapper customCss={css`
              display: flex;
              background: ${({theme}) => theme.color.secondary.dark};
              font-family: ${({theme}) => theme.font.family.primary.regular};
              color: white;
              height: 100%; 
              width: 100%;
              font-size: ${pixelToRem(40)};
            `}>
              <Loader mode='default' />
            </Wrapper>
          }
        />
      </Wrapper>
    </Wrapper>
  ), [
    videoUrl,
  ]);
};

Component.displayName = 'VideoPlayer';
export default memo(Component);
