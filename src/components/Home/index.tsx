import React, { useMemo, memo, Suspense } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { HomeProvider } from './context';
import { css } from 'styled-components';
import { isMobile, pixelToRem } from 'meema.utils';
import { Loader } from '../Shared';
import Layout from '../Shared/Layout';
import ErrorBoundary from '../ErrorBoundary';
import MainHeader from '../Header';
import ContentSlider from '../ContentSlider';

const mobile = isMobile();

const Component: React.FunctionComponent<{}> = memo(() => {
  return useMemo(() => (
    <Elements.View
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
        min-height: calc(100vh - ${({ theme }) => pixelToRem(theme.footer.tablet.height)});
        
        @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          padding: 0;
          height: calc(100vh - ${({ theme }) => pixelToRem(theme.footer.tablet.height)});
        }
      `}
    >
      <ErrorBoundary fallback='Header error'>
        <Suspense 
          fallback={
            <Elements.Wrapper
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
            </Elements.Wrapper>
          }
        >
          <MainHeader />
        </Suspense>
      </ErrorBoundary>
      <Elements.Wrapper
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
          <ContentSlider />
        </Layout.Panel>
      </Elements.Wrapper>
    </Elements.View>
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
