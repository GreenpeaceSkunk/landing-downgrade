import React, { useMemo, memo, useContext, useEffect } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import Layout from '../Shared/Layout';
import Card from '../Card';
import { AppContext } from '../App/context';
import { FormContext } from '../Forms/context';

interface IHome {}

const Component: React.FunctionComponent<IHome> = memo(() => {
  const { queryParams } = useContext(AppContext);
  const { payload, setPayload } = useContext(FormContext);

  useEffect(() => {
    if(payload !== null) {
      setPayload(null);
    }
  }, [
    payload,
    setPayload,
  ]);

  return useMemo(() => (
    <Elements.Wrapper>
      <Layout.Cards>
        <Card
          title='No recibimos aportes de empresas privadas.'
          icon='factory'
        />
        <Card
          title='No recibimos aportes de partidos políticos ni estamos vinculados con ellos.'
          icon='government'
        />
      </Layout.Cards>
      <Layout.Text
        color='light'
        customCss={css`
          width: fit-content;
          margin: ${pixelToRem(20)};
          text-align: center;
        `}
      >También podemos asegurarte que siempre podrás reducir el monto de tu donación, postergar tu aporte o cancelarlo, sin vueltas.</Layout.Text>
      <Elements.Nav
        customCss={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-self: flex-end;
          width: 100%;
          margin-top: ${pixelToRem(60)};
          padding-bottom: ;
          padding: ${pixelToRem(20)} ${pixelToRem(80)};

          a {
            width: 100%;
            margin-bottom: ${pixelToRem(30)};
          }

          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            flex-direction: row;
            padding: 0;

            a {
              width: fit-content;
              margin-bottom: 0;

              &:not(:last-child) {
                margin-right: ${pixelToRem(30)};
              }
            }
          }
        `}>
        <Layout.ButtonLink to={`/form/cancel?${queryParams}`}>Cancelar mi donación</Layout.ButtonLink>
        <Layout.ButtonLink to={`/form/reduce?${queryParams}`}>Reducir el monto</Layout.ButtonLink>
        <Layout.ButtonLink to={`/form/postpone?${queryParams}`}>Postergar mi donación</Layout.ButtonLink>
      </Elements.Nav>
    </Elements.Wrapper>
  ), [
    queryParams,
  ]);
});

Component.displayName = 'AboutUs';
export default Component;
