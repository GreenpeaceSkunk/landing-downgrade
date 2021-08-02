import React, { memo, useMemo } from 'react';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import Elements, { Img, H1, P } from '@bit/meema.ui-components.elements';
import Images from '../../../../images';

const Component: React.FunctionComponent<{}> = () => {
  return useMemo(() => (
    <Elements.Wrapper
      customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: ${pixelToRem(40)} 0;

        > * {
          margin-bottom: ${pixelToRem(10)};
        }
      `}
    >
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
  ]);
};

Component.displayName = 'ReduceDonationFormThankYou';
export default memo(Component);
