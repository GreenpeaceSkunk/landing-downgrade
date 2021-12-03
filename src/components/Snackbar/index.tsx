import React, { useImperativeHandle, useMemo, useState } from 'react';
import { Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import Icons from '../../images/icons';

export interface IRef {
  showSnackbar: () => void;
}
interface IProps {
  text?: string;
  miliseconds?: number;
}

const Component: React.ForwardRefRenderFunction<IRef, IProps> = ({
  text = '',
  miliseconds = 4000,
}, innerRef: React.ForwardedRef<IRef>) => {
  const [ animate, setAnimate ] = useState<boolean>(false);

  useImperativeHandle(innerRef, () => {
    return {
      showSnackbar: () => {
        setAnimate(true);
        
        const timer = setTimeout(() => {
          setAnimate(false);
        }, miliseconds);
    
        return () => {
          clearTimeout(timer);
        }
      }
    }
  });

  return useMemo(() => (
    <Wrapper
      customCss={css`
        display: ${animate ? 'flex' : 'none'};
        position: fixed;
        bottom: 0;
        left: 0;
        align-items: center;
        padding: ${pixelToRem(12)};
        background-color: ${({theme}) => theme.color.error.normal};
        color: white;
        opacity: 0;
        margin-top: ${pixelToRem(18)};
        animation-duration: ${miliseconds}ms;
        animation-direction: alternate;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;

        @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          border-radius: ${pixelToRem(5)};
          position: relative;
        }

        ${(animate) && css`
          animation-name: show-snackbar;
        `};

        &:before {
          flex: 0 0 auto;
          width: ${pixelToRem(20)};
          height: ${pixelToRem(20)};
          background-size: ${pixelToRem(20)} ${pixelToRem(20)};
          background-position: center center;
          background-repeat: no-repeat;
          transform-origin: center;
          background-image: url(${Icons.WarningIcon});
          content: "";

          @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            margin-right: ${pixelToRem(12)};
          }

          @keyframes show-snackbar {
            0% {
              display: flex;
            }
            
            1% {
              opacity: 0;
            }

            15% {
              opacity: 1;
            }

            85% {
              opacity: 1;
            }

            100% {
              opacity: 0;
            }
          }
        }
      `}
    >{text}</Wrapper>
  ), [
    text,
    animate,
  ]);
}

Component.displayName = 'Snackbar';
export default React.forwardRef<IRef, IProps>(Component);
