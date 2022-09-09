import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { pixelToRem } from 'meema.utils';
import { css } from 'styled-components';
import Elements, { Img } from '@bit/meema.ui-components.elements';
import Images from '../../../../images';
import Layout from '../../../Shared/Layout';
import { UserDataFormContext } from '../../SplittedForms/UserDataForm/context';
import { updateContact } from '../../../../services/greenlab';
import { AppContext } from '../../../App/context';

const Component: React.FunctionComponent<{}> = () => {
  const { queryParams } = useContext(AppContext);
  const { data: { user: { data } } } = useContext(UserDataFormContext);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      await updateContact(data.email, { estado_landing_de_bajas: 'reduced' });
    })();
  }, []);
  
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
        <Layout.Title color='light'>Listo, registramos tu solicitud</Layout.Title>
        <Layout.Text color='light'>En breve estaremos aplicando la reducción en el monto de tu donación.</Layout.Text>
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
    data,
    queryParams,
    wrapperRef,
  ]);
};

Component.displayName = 'ReduceDonationFormThankYou';
export default memo(Component);
