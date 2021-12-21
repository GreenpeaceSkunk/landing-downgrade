import React, { memo, useEffect, useMemo, useRef } from 'react';
import { isMobile, pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import Elements, { Img } from '@bit/meema.ui-components.elements';
import Images from '../../../../images';
import Layout from '../../../Shared/Layout';

const Component: React.FunctionComponent<{}> = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if(wrapperRef && wrapperRef.current && !isMobile()) {
  //     wrapperRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //   }
  // }, [
  //   wrapperRef,
  // ]);

  return useMemo(() => (
    <Elements.Wrapper
      ref={wrapperRef}
      customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
      `}
    >
      <Elements.Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          align-self: center;

          > * {
            margin-bottom: ${pixelToRem(10)};
          }
        `}
      >
        <Img
          src={Images.Icons.DoneIcon}
          alt="ok"
          customCss={css`
            width: ${pixelToRem(66)};
            height: ${pixelToRem(66)};
            filter: drop-shadow(0 ${pixelToRem(4)} ${pixelToRem(20)} rgba(0, 0, 0, .15));
          `}
        />
        <Layout.Title color='primary'>Cancelamos tu donación,</Layout.Title>
        <Layout.Title color='light'>¡Gracias por tu ayuda y dedicación!</Layout.Title>
        <Layout.Text color='light'>En las próximas 72 horas haremos el cambio  y lo verás reflejado en el próximo resumen. Recordá que tu aporte para nosotros siempre es muy importante y podrás volver a colaborar cuando quieras. </Layout.Text>
      </Elements.Wrapper>
      <Elements.Nav customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      
        > *:not(:last-child) {
          margin-bottom: ${pixelToRem(20)};
        }
      `}>
        <Layout.ButtonLink to='/'>Conocé más sobre Greenpeace</Layout.ButtonLink>
        <Layout.ButtonLink to='/' format='text' >Volver al inicio</Layout.ButtonLink>
      </Elements.Nav>
    </Elements.Wrapper>
  ), [
    wrapperRef,
  ]);
};

Component.displayName = 'ReduceDonationFormThankYou';
export default memo(Component);
