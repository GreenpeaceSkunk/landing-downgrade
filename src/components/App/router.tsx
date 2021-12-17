import React, { Suspense, memo, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { css }  from 'styled-components';
import { Wrapper } from '@bit/meema.ui-components.elements';
import { Loader } from '../Shared';
import ErrorBoundary from '../ErrorBoundary';
import { pixelToRem } from 'meema.utils';

const MainHeader = React.lazy(() => import('../Header'));  // TODO Import directly from bit
const MainFooter = React.lazy(() => import('../Footer'));  // TODO Import directly from bit
const HomeView = React.lazy(() => import('../Home'));

// const ThankYouView = React.lazy(() => import('../ThankYou'));


const Component: React.FunctionComponent<{}> = memo(() => {
  return useMemo(() => (
    <>
      {/* <ErrorBoundary fallback='Header error'>
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
      </ErrorBoundary> */}
      <Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;
          margin: auto;
          min-height: 20rem;
        `}
      >
        <Switch>
          <Route path='/'>
            <ErrorBoundary fallback='Home error'>
              <Suspense fallback={<Loader mode='default' />}>
                <HomeView />
              </Suspense>
            </ErrorBoundary>
          </Route>
        </Switch>
        <ErrorBoundary fallback='Footer error'>
          <Suspense
            fallback={
              <Wrapper
                customCss={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  min-height: ${({theme}) => pixelToRem(theme.footer.mobile.height)};
                  background-color: ${({theme}) => theme.color.secondary.light};

                  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                    min-height: ${({theme}) => pixelToRem(theme.footer.tablet.height)};
                  }
                  
                  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.desktop.minWidth)}) {
                    min-height: ${({theme}) => pixelToRem(theme.footer.desktop.height)};
                  }
                `}
              >
                <Loader mode='default' />
              </Wrapper>
            }
          >
            <MainFooter />
          </Suspense>
        </ErrorBoundary>
      </Wrapper>
    </>
  ), []);
})

Component.displayName = 'AppRouter'
export default Component;
