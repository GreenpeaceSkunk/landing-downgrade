import React, { lazy, useMemo, memo, Suspense } from 'react';
import { View, Wrapper } from '@bit/meema.ui-components.elements';
import { HomeProvider } from './context';
import { css } from 'styled-components';
import { isMobile, pixelToRem } from 'meema.utils';
import { Loader } from '../Shared';
import Layout from '../Shared/Layout';
import ErrorBoundary from '../ErrorBoundary';
import Card from '../Card';
import VideoPlayer from '../VideoPlayer';

const FormRouter = lazy(() => import('../Forms/router'));

const Component: React.FunctionComponent<{}> = memo(() => {
  const mobile = isMobile();

  return useMemo(() => (
    <View
      id='home'
      customCss={css`
        padding-bottom: 0;
      `}
    >
      <Layout.Panel>
        <Layout.PanelWrapper
          customCss={css`
            padding-top: ${pixelToRem(35)};
            padding-bottom: ${pixelToRem(35)};

            @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
              padding-top: ${pixelToRem(55)};
              padding-bottom: ${pixelToRem(55)};
            }
          `}
        >
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
        <Layout.PanelWrapper
          customCss={css`
            padding-top: ${pixelToRem(30)};

            @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
              padding-top: ${pixelToRem(55)};
            }
          `}
        >
          <Layout.Title>Continuaremos luchando por las causas que más nos necesitan</Layout.Title>
          <Layout.Cards
            customCss={css`
              margin: ${pixelToRem(50)} 0 ${pixelToRem(80)};
              justify-content: space-between !important;
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
              title='Protección de humedales'
            />
          </Layout.Cards>
          <VideoPlayer
            fixByScroll={true}
            videoUrl='https://www.youtube.com/watch?v=FXr3_zGc0O4'
          />
        </Layout.PanelWrapper>
      </Layout.Panel>
      <Layout.Panel
        customCss={css`
          /* padding-top: ${pixelToRem(30)}; */
          padding-bottom: ${pixelToRem(30)};
          background-color: ${({ theme }) => theme.color.secondary.light};
          
          @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            /* padding-top: ${pixelToRem(55)}; */
            padding-bottom: ${pixelToRem(55)};
          }
          `}
      >
        <Wrapper
          customCss={css`
            display: flex;
            flex-direction: column;
            margin-bottom: ${pixelToRem(50)} !important;
          `}
        >
          <Layout.Title color='primary'>Antes de seguir, tomate un minuto para pensarlo.</Layout.Title>
          <Layout.Text>Recordá que en Greenpeace:</Layout.Text>
        </Wrapper>
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
      </Layout.Panel>
      <Layout.Panel>
        <Wrapper
          customCss={css`
            @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
              max-width: ${pixelToRem(1140)};
              align-self: center;
              justify-content: space-between;
            }
          `}
        >
        <Layout.Title
          color='primary'
          customCss={css``}
        >La decisión siempre está {mobile ? <br/> : null} en tus manos</Layout.Title>
        <Layout.Text>Siempre podrás reducir el monto de tu donación o cancelarla directamente, sin vueltas. Si aún no estás seguro, podés hacerlo en otro momento.</Layout.Text>
        </Wrapper>
      </Layout.Panel>
      <Layout.Panel
        customCss={css`
          padding-left: 0;
          padding-right: 0;
          padding-bottom: 0;
        `}
      >
        <ErrorBoundary fallback='Form Error'>
          <Suspense fallback={<Loader mode='default' />}>
            <FormRouter />
          </Suspense>
        </ErrorBoundary>
      </Layout.Panel>
    </View>
  ), [
    mobile,
  ]);
});

Component.displayName = 'HomeView';
export default function HomeView() {
  return (
    <HomeProvider>
      <Component />
    </HomeProvider>
  );
};
