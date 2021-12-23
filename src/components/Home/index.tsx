import React, { useMemo, memo } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { HomeProvider } from './context';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import Layout from '../Shared/Layout';
import MainHeader from '../Header';
import ContentSlider from '../ContentSlider';
// import { Route, Switch, useRouteMatch } from 'react-router-dom';
// import { Loader } from '../Shared';

// const VideoPlayer = lazy(() => import('../VideoPlayer'));
// const UserDataForm = lazy(() => import('../Forms/UserDataForm'));
// const CancelDonationForm = lazy(() => import('../Forms/CancelDonationForm'));
// const ReduceDonationForm = lazy(() => import('../Forms/ReduceDonationForm'));

interface IHome {}

const Component: React.FunctionComponent<IHome> = memo(() => {
  // const { path } = useRouteMatch();
  // const [ allowContinue, setAllowContinue ] = useState<boolean>(false);

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
          margin-bottom: ${pixelToRem(30)};
          
          @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            height: 100%;
            margin-top: 0;
            margin-bottom: 0;
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
          {/* Move to router */}
          <ContentSlider />
          {/* <Switch>
            <Route exact path={`${path}video`}>
              <VideoPlayer
                // videoUrl='https://www.youtube.com/watch?v=FXr3_zGc0O4' 
                videoUrl='https://www.youtube.com/watch?v=QohH89Eu5iM'
                onEndedHandler={() => { setAllowContinue(true) }}
              />
            </Route>

            <Route path={path}>
              <React.Suspense fallback={<Loader mode='default' />}>
                  <UserDataForm />
              </React.Suspense>
            </Route>
          </Switch> */}

        </Layout.Panel>
      </Elements.Wrapper>
      {/* {!submitted && (
        <Elements.Wrapper
          customCss={css`
            display: flex;
            position: relative;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            align-items: center;
            margin-top: ${pixelToRem(40)};
            
            @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
              flex-direction: row-reverse;
              justify-content: flex-start;
            }
          `}
        >
          {(paths[currentIndex] && paths[currentIndex].showContinueButton) && <Elements.Nav customCss={css`
            display: flex;
            align-self: flex-end;
            margin-bottom: ${pixelToRem(40)};
          `}><Layout.ButtonLink to={paths[currentIndex].goTo || ''} disabled={!allowContinue}>Continuar</Layout.ButtonLink>
          </Elements.Nav>}

          <Elements.Wrapper
            customCss={css`
              display: flex;
              align-items: center;
              width: auto;
              pointer-events: none;

              @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                position: absolute;
                width: 100%;
                justify-content: center;
                margin-top: 0;
              }
            `}
          >
            {Array.from({ length: total }, (_, i) => i).map((idx: number) => (
              <Elements.Wrapper
                key={idx}
                customCss={css`
                  display: inline-flex;
                  width: ${pixelToRem(12)};
                  height: ${pixelToRem(12)};
                  border-radius: 50%;
                  border: ${pixelToRem(2)} solid ${({theme}) => theme.color.primary.normal};

                  &:not(:last-child) {
                    margin-right: ${pixelToRem(9)};
                  }

                  ${idx <= currentIndex && css`
                    background-color: ${({theme}) => theme.color.primary.normal};
                  `};
                `}
              />
            ))}
          </Elements.Wrapper>  
        </Elements.Wrapper>
      )} */}
    </Elements.View>
  ), [
    // children,
    // path,
    // allowContinue,
  ]);
});

Component.displayName = 'HomeView';
export default function HomeView(props: IHome) {
  return (
    <HomeProvider>
      <Component {...props} />
    </HomeProvider>
  );
};
