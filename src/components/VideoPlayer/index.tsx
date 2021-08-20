import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import ReactPlayer from 'react-player/lazy';
import { css } from 'styled-components';
import { Loader } from '../Shared';

interface IProps {
  fixByScroll?: boolean;
  videoUrl: string;
}

const Component: React.FunctionComponent<IProps> = ({
  fixByScroll = false,
  videoUrl,
}) => {
  const [ isFixed, setIsFixed ] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onScrollHandler = useCallback(() => {
    if(wrapperRef.current) {
      if(window.pageYOffset > (wrapperRef.current.offsetTop + (wrapperRef.current.clientHeight - 20))) {
        // setIsFixed(true);
      } else {
        // setIsFixed(false);
      }
    }
  }, [
    isFixed,
  ]);

  useEffect(() => {
    if(fixByScroll) {
      window.addEventListener('scroll', onScrollHandler);
    }

    return () => {
      window.removeEventListener('scroll', onScrollHandler);
    }
  }, []);

  return useMemo(() => (
    <Wrapper
      ref={wrapperRef}
      customCss={css`
        width: 100%;
        height: ${pixelToRem(240)};
        background-color: black;
        
        @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          width: ${pixelToRem(864)};
          height: ${pixelToRem(487)};
          z-index: 999;
        }
      `}
    >
      <Wrapper
        customCss={css`
          width: 100%;
          height: 100%;
          
          ${(isFixed) && css`
            flex: 0 0 auto;
            top: ${pixelToRem(20)};
            left: 0;
            right: 0;
            margin: auto;
            transition: ease 250ms all;
            animation-name: fixVideo;
            animation-duration: 250ms;
            animation-iteration-count: 1;
            animation-direction: alternate;
            animation-fill-mode: forwards;

            @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            }
            
            @keyframes fixVideo {
              0% {
                opacity: 0;
                width: ${pixelToRem(322)};
                height: ${pixelToRem(0)};
              }

              1% {
                position: fixed;
              }

              100% {
                position: fixed;
                width: ${pixelToRem(322)};
                height: ${pixelToRem(200)};
                opacity: 1;
              }
            }

            @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
              right: ${pixelToRem(20)};
              left: auto;

              @keyframes fixVideo {
                0% {
                  opacity: 0;
                  width: ${pixelToRem(396)};
                  height: ${pixelToRem(0)};
                }

                1% {
                  position: fixed;
                }

                100% {
                  position: fixed;
                  width: ${pixelToRem(396)};
                  height: ${pixelToRem(222)};
                  opacity: 1;
                }
              }
            }
            
          `}
        `}
      >
        <ReactPlayer
          width='100%'
          height='100%'
          url={videoUrl}
          loop={false}
          playing={true}
          controls={true}
          muted={true}
          playbackRate={1}
          onPause={() => {
            setIsFixed(false);
            window.removeEventListener('scroll', onScrollHandler);
          }}
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
    isFixed,
  ]);
};

Component.displayName = 'VideoPlayer';
export default memo(Component);