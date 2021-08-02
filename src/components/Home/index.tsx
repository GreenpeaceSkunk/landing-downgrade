import React, { lazy, useMemo, memo, Suspense } from 'react';
import { H1, H2, Img, P, Span, View, Wrapper } from '@bit/meema.ui-components.elements';
import { HomeProvider } from './context';
import styled, { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import { Loader } from '../Shared';
import Layout from '../Shared/Layout';
import ErrorBoundary from '../ErrorBoundary';

import Images from '../../images';
import Card from '../Card';
import VideoPlayer from '../VideoPlayer';

const FormRouter = lazy(() => import('../Forms/router'));

interface IText { showBullet?: boolean; };

const textStyles = css<IText>`
  display: flex;
  flex-direction: column;
  font-family: ${({theme}) => theme.font.family.primary.regular};
  font-size: ${pixelToRem(16)};
  font-weight: 400;
  line-height: ${pixelToRem(18)};

  ${({ showBullet }) => (typeof showBullet === 'boolean' && showBullet) && css`
    flex-direction: row;
    width: 100%;

    &:before {
      width: ${pixelToRem(25)};
      flex: 0 0 ${pixelToRem(25)};
      content: ">";
    }
  `};
`;

const Component: React.FunctionComponent<{}> = memo(() => {
  return useMemo(() => (
    <View>
      <Layout.Panel>
        <Layout.PanelWrapper>
          <Layout.Title
            color='primary'
          >Lamentamos que tengas que cancelar tu donación</Layout.Title>
          <Layout.Text>Comprendemos que necesites dejar de aportar, debe ser una decisión difícil<br/>para vos. Lo es también para nosotros por la importancia de tu ayuda.</Layout.Text>
        </Layout.PanelWrapper>
      </Layout.Panel>
      <Layout.Panel 
        customCss={css`
          background-color: ${({ theme }) => theme.color.secondary.light};
        `}
      >
        <Layout.PanelWrapper>
          <Layout.Title>Continuaremos luchando por las causas que más nos necesitan</Layout.Title>
          <Layout.Cards
            customCss={css`
              margin: ${pixelToRem(50)} 0 ${pixelToRem(80)};
            `}
          >
            <Card
              description='La agricultura es la principal causa de deforestación, por eso es necesario seguir generando conciencia.'
              icon='sustentability'
              title='Promover una vida sustentable'
            />
            <Card
              description='6 de cada 7 especies de tortugas marinas están en peligro de extinción.'
              icon='ocean'
              title='Seguir protegiendo los océanos'
            />
            <Card
              description='Los incendios en humedales que logramos visibilizar gracias a tu ayuda y tantas otras por las que seguiremos luchando cada día.'
              icon='trees'
              title='Protección<br/>de humedales'
            />
          </Layout.Cards>
          <VideoPlayer
            fixByScroll={true}
            videoUrl='https://www.youtube.com/watch?v=t4-sDoVfjxw'
          />
          <Wrapper>
            <Layout.Title color='primary'>Antes de seguir, tomate un minuto para pensarlo</Layout.Title>
            <Layout.Text>Recordá que en Greenpeace</Layout.Text>
          </Wrapper>
        </Layout.PanelWrapper>
      </Layout.Panel>
      <Layout.Panel>
        <Layout.Title color='light'>Tomate un minuto para pensarlo<br/>y recordá que en Greenpeace</Layout.Title>
        <Layout.Cards>
          <Card
            title='No recibimos aportes de empresas privadas.'
            icon='factory'
          />
          <Card
            title='6 de cada 7 especies de tortugas marinas están en peligro de extinción.'
            icon='government'
          />
        </Layout.Cards>
      </Layout.Panel>
      <Layout.Panel>
        <Layout.Title color='primary'>La decisión siempre está en tus manos</Layout.Title>
        <Layout.Text>Siempre podrás reducir el monto de tu donación o cancelarla directamente, sin vueltas. Si aún no estás seguro, podés hacerlo en otro momento.</Layout.Text>
      </Layout.Panel>
      <Layout.Panel 
        customCss={css`
          /* background-color: ${({ theme }) => theme.color.secondary.light}; */
        `}
      >
        <Layout.PanelWrapper>
          <ErrorBoundary fallback='Form Error'>
            <Suspense fallback={<Loader/>}>
              <FormRouter />
            </Suspense>
          </ErrorBoundary>
        </Layout.PanelWrapper>
      </Layout.Panel>
    </View>
  ), []);
});

Component.displayName = 'HomeView';
export default function HomeView() {
  return (
    <HomeProvider>
      <Component />
    </HomeProvider>
  );
};
