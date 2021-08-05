import React, { memo, useMemo } from 'react';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import Elements, { Img, H1, P, Wrapper, Span } from '@bit/meema.ui-components.elements';
import Images from '../../../../images';
import Form from '../../../Shared/Form';

const Component: React.FunctionComponent<{}> = () => {
  return useMemo(() => (
    <Elements.Wrapper
      customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
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
      >Cancelaremos tu donación</H1>
      <P>En las próximas 72 horas haremos el cambio y lo verás reflejado en el próximo resumen.</P>
      <Wrapper
        customCss={css`
          width: 100%; 
          background-color: white;
          border-radius: ${pixelToRem(10)};
          padding: ${pixelToRem(35)} ${pixelToRem(24)};

          > * {
            &:not(:last-child.child) {
              margin-bottom: ${pixelToRem(24)};
              font-size: ${pixelToRem(18)};
            }
          }

          @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            width: ${pixelToRem(400)}; 
          }
        `}
      >
        <P>Recordá que para nosotros siempre serás muy importante y podrás volver a colaborar cuando quieras.</P>
        <P
          customCss={css`
            font-family: ${({theme}) => theme.font.family.primary.bold};
          `}
        >¡Gracias por tu ayuda y dedicación!</P>
        <Span
          customCss={css`
            font-size: ${pixelToRem(14)};
          `}
        >El equipo de Greenpeace</Span>
      </Wrapper>
    </Elements.Wrapper>
  ), []);
};

Component.displayName = 'ReduceDonationFormThankYou';
export default memo(Component);
