import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import Elements, { Img } from '@bit/meema.ui-components.elements';
import Images from '../../../../images';
import Layout from '../../../Shared/Layout';
import { updateContact } from '../../../../services/greenlab';
import { UserDataFormContext } from '../../SplittedForms/UserDataForm/context';
import { AppContext } from '../../../App/context';

const Component: React.FunctionComponent<{}> = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { data: { user: { data } } } = useContext(UserDataFormContext);
  const { queryParams } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      if(data.email) {
        await updateContact(data.email, { estado_landing_de_bajas: 'cancelled' });
      }
    })();
  }, [ data.email ]);

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
        <Layout.Title color='primary'>Cancelaremos tu donación</Layout.Title>
        <Layout.Title color='light'>¡Gracias por tu ayuda y dedicación!</Layout.Title>
        <Layout.Text color='light'>Registramos tu solicitud y en breve será procesada. Recordá que tu aporte para nosotros siempre es muy importante y podrás volver a colaborar cuando quieras.</Layout.Text>
      </Elements.Wrapper>
      <Elements.Nav customCss={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: ${pixelToRem(200)};
      
        > *:not(:last-child) {
          margin-bottom: ${pixelToRem(20)};
        }
      `}>
        <Layout.Link href='https://www.greenpeace.org/argentina/campanas/' target='_blank'>Conocé más sobre Greenpeace</Layout.Link>
        <Layout.ButtonLink to={`/?${queryParams}`} format='text' >Volver al inicio</Layout.ButtonLink>
      </Elements.Nav>
    </Elements.Wrapper>
  ), [
    wrapperRef,
    queryParams,
  ]);
};

Component.displayName = 'ReduceDonationFormThankYou';
export default memo(Component);
