import React, { lazy, useMemo, memo, Suspense, useEffect, useState } from 'react';
import { View, Wrapper } from '@bit/meema.ui-components.elements';
import Carousel from '@bit/meema.ui-components.carousel';
import { HomeProvider } from './context';
import { css } from 'styled-components';
import { isMobile, pixelToRem } from 'meema.utils';
import { Loader } from '../Shared';
import Layout from '../Shared/Layout';
import ErrorBoundary from '../ErrorBoundary';
import Card from '../Card';
import VideoPlayer from '../VideoPlayer';
import UserDataForm from '../Forms/UserDataForm';
import { useLocation } from 'react-router-dom';
import MainHeader from '../Header';

type PathType = {
  path: string;
  index: number;
}

// const FormRouter = lazy(() => import('../Forms/router'));
const mobile = isMobile();
const paths: Array<PathType> = [
  { path: '/user/information', index: 0 },
  { path: '/video', index: 1 },
];

const Component: React.FunctionComponent<{}> = memo(() => {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const path = paths.filter((_: PathType) => _.path === pathname);
    if(path.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(path[0].index);
      }, 500) 

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [ pathname ]);

  return useMemo(() => (
    <View
      id='home'
      customCss={css`
        display: flex;
        flex-direction: column;
        padding: ${pixelToRem(20)};
        background-color: #000;
        background-image: linear-gradient(0deg, rgba(0, 0, 0, .75) 0%, rgba(0, 0, 0, .75) 100%), url("https://unite.greenpeace.org.ar/sk/assets/landing-bajas/home.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        
        @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          padding: 0;
          height: calc(100vh - ${({ theme }) => pixelToRem(theme.footer.tablet.height)});
        }
        `}
    >
      <ErrorBoundary fallback='Header error'>
        <Suspense 
          fallback={
            <Wrapper
              customCss={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-height: ${({theme}) => pixelToRem(theme.header.mobile.height)};
                background-color: ${({theme}) => theme.color.secondary.light};

                @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                  min-height: ${({theme}) => pixelToRem(theme.header.tablet.height)};
                }
                
                @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
                  min-height: ${({theme}) => pixelToRem(theme.header.desktop.height)};
                }
              `}
            >
              <Loader mode='default' />
            </Wrapper>
          }
        >
          <MainHeader />
        </Suspense>
      </ErrorBoundary>
      <Wrapper
        customCss={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        `}
      >
        <Layout.Panel
          customCss={css`
            width: 100%;
            padding: 0;
            
            @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
              width: 80%;
            }

            @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.desktop.minWidth)}) {
              width: 60%;
            }
          `}
        >
          {/* <Carousel
            index={currentIndex}
            showControls={false}
            showIndicators={false}
          >
            <Wrapper customCss={css`flex: 0 0 100%;`}>
              <Layout.Title color='light' dangerouslySetInnerHTML={{__html: 'Reducir mi donación'}}/>
              <Layout.Text color='light'>Para nosotros es muy importante que sigamos trabajando juntos en las causas más importantes</Layout.Text>
              <UserDataForm />
            </Wrapper>
            <Wrapper customCss={css`flex: 0 0 100%;`}>
              <Layout.Title color='light' dangerouslySetInnerHTML={{__html: 'Tu solicitud aún no termina.<br>Por favor, <em>mirá el video</em> antes de continuar'}}/>
              <VideoPlayer videoUrl='https://www.youtube.com/watch?v=FXr3_zGc0O4' />
            </Wrapper>
            <Wrapper customCss={css`flex: 0 0 100%; background-color: orangered;`}>Element #3</Wrapper>
          </Carousel> */}
          <ContentSlider />
        </Layout.Panel>
      </Wrapper>
      {/* <Layout.Panel>
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
          <VideoPlayer videoUrl='https://www.youtube.com/watch?v=FXr3_zGc0O4' />
        </Layout.PanelWrapper>
      </Layout.Panel>
      <Layout.Panel
        customCss={css`
          padding-bottom: ${pixelToRem(30)};
          background-color: ${({ theme }) => theme.color.secondary.light};
          
          @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
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
      </Layout.Panel> */}
    </View>
  ), [
    mobile,
    currentIndex,
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
