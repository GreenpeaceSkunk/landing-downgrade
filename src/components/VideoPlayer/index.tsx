import React, { useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Elements, { Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import ReactPlayer from 'react-player/lazy';
import { css } from 'styled-components';
import { Loader } from '../Shared';
import Layout from '../Shared/Layout';
import { AppContext } from '../App/context';

interface IProps {
  videoUrl: string;
  allowNext: boolean;
  onEndedHandler?: () => void;
}
export interface IRef {
  onPlayVideo: () => void;
}

const Component: React.ForwardRefRenderFunction<IRef, IProps> = ((
  {
    videoUrl,
    allowNext = true,
    onEndedHandler,
  }: IProps,
  innerRef: React.ForwardedRef<IRef>
) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ playingVideo, setPlayingVideo ] = useState<boolean>(false);
  const { queryParams } = useContext(AppContext);

  const onEnded = useCallback(() => {
    if(onEndedHandler) {
      onEndedHandler();
    }
  }, [
    allowNext,
    onEndedHandler,
  ]);

  const onPlayVideo = useCallback(() => {
    setPlayingVideo(true);
  }, []);

  useImperativeHandle(innerRef, () => {
    return {
      onPlayVideo,
    }
  });

  useEffect(() => {
    setPlayingVideo(true);
  }, []);

  return useMemo(() => (
    <Wrapper
      ref={wrapperRef}
      customCss={css`
        width: 100vw;
        padding: 0 ${pixelToRem(30)};
        
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding-left: 0;
          padding-right: 0;
        }
      `}
    >
      <Wrapper
        customCss={css`
          width: 100%;
          height: 100%;
          height: ${pixelToRem(400)};

          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            height: ${pixelToRem(450)};
          }
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
      <Elements.Nav
        customCss={css`
          display: flex;
          align-self: flex-end;
          justify-content: flex-end;
          margin-top: ${pixelToRem(60)};
        `}
      >
        <Layout.ButtonLink to={`/about-us?${queryParams}`} disabled={allowNext}>
          Continuar
        </Layout.ButtonLink>
      </Elements.Nav>
    </Wrapper>
  ), [
    allowNext,
    videoUrl,
    playingVideo,
    queryParams,
    onEnded,
  ]);
});

Component.displayName = 'VideoPlayer';
export default React.forwardRef<IRef, IProps>(Component);
