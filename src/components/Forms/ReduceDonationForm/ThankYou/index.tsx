import React, { memo, useEffect, useMemo, useRef } from 'react';
import { isMobile, pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import Elements, { Img, H1, P } from '@bit/meema.ui-components.elements';
import Images from '../../../../images';
import Form from '../../../Shared/Form';

const Component: React.FunctionComponent<{}> = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(wrapperRef && wrapperRef.current && !isMobile()) {
      wrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [
    wrapperRef,
  ]);
  
  return useMemo(() => (
    <Elements.Wrapper
      ref={wrapperRef}
      customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: ${pixelToRem(40)} ${pixelToRem(40)};

        > * {
          margin-bottom: ${pixelToRem(10)};
        }

        @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          padding-left: 0;
          padding-right: 0;
        }
      `}
    >
      <Form.NavigationNav allowGoBack={false} />
      <Img
        src={Images.Icons.DoneIcon}
        alt="ok"
        customCss={css`
          width: ${pixelToRem(34)};
          height: ${pixelToRem(34)};
          filter: drop-shadow(0 ${pixelToRem(4)} ${pixelToRem(20)} rgba(0, 0, 0, .15));
        `}
      />
      <H1
        customCss={css`
          font-size: ${pixelToRem(32)};
        `}
      >Listo, reduciremos tu donación</H1>
      <P>Te confirmaremos a tu e-mail cuando la hayamos procesado.</P>
    </Elements.Wrapper>
  ), [
    wrapperRef,
  ]);
};

Component.displayName = 'ReduceDonationFormThankYou';
export default memo(Component);
