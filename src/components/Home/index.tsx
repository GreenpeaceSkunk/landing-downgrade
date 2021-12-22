import React, { useMemo, memo } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { HomeProvider } from './context';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import Layout from '../Shared/Layout';
import MainHeader from '../Header';
import ContentSlider from '../ContentSlider';

const Component: React.FunctionComponent<{}> = memo(() => {
  return useMemo(() => (
    <Elements.View
      id='home'
      customCss={css`
        display: flex;
        flex-direction: column;
        padding: 0 ${pixelToRem(20)} ${pixelToRem(20)};
        background-color: #000;
        background-image: linear-gradient(0deg, rgba(0, 0, 0, .75) 0%, rgba(0, 0, 0, .75) 100%), url("https://unite.greenpeace.org.ar/sk/assets/landing-bajas/home.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 100%;
      `}
    >
      <MainHeader />
      <Elements.Wrapper
        customCss={css`
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: ${pixelToRem(50)};
          margin-bottom: ${pixelToRem(50)};
          
          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            height: 100%;
            margin-top: 0;
          }
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
              width: 50%;
            }
          `}
        >
          <ContentSlider />
        </Layout.Panel>
      </Elements.Wrapper>
    </Elements.View>
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
