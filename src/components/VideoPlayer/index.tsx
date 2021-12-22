import React, { useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import ReactPlayer from 'react-player/lazy';
import { css } from 'styled-components';
import { Loader } from '../Shared';

interface IProps {
  videoUrl: string;
  onEndedHandler: () => void;
}
export interface IRef {
  onPlayVideo: () => void;
}

const Component: React.ForwardRefRenderFunction<IRef, IProps> = ((
  {
    videoUrl,
    onEndedHandler,
  }: IProps,
  innerRef: React.ForwardedRef<IRef>
) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ playingVideo, setPlayingVideo ] = useState<boolean>(false);

  const onEnded = useCallback(() => {
    if(onEndedHandler) {
      onEndedHandler();
    }
  }, [ onEndedHandler ]);

  const onPlayVideo = useCallback(() => {
    setPlayingVideo(true);
  }, []);

  useImperativeHandle(innerRef, () => {
    return {
      onPlayVideo,
    }
  });

  return useMemo(() => (
    <Wrapper
      ref={wrapperRef}
      customCss={css`
        width: 100vw;
        height: ${pixelToRem(240)};
        background-color: black;
        
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          width: 100%;
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
          playing={playingVideo}
          controls={true}
          muted={false}
          playbackRate={1}
          onPause={() => {}}
          onEnded={onEnded}
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
    playingVideo,
    onEnded,
  ]);
});

Component.displayName = 'VideoPlayer';
export default React.forwardRef<IRef, IProps>(Component);
