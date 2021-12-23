import React, { Suspense, memo, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { css }  from 'styled-components';
import { Wrapper } from '@bit/meema.ui-components.elements';
import { Loader } from '../Shared';
import ErrorBoundary from '../ErrorBoundary';
import { pixelToRem } from 'meema.utils';

const MainFooter = React.lazy(() => import('../Footer'));  // TODO Import directly from bit
const HomeRouter = React.lazy(() => import('../Home/router'));

const Component: React.FunctionComponent<{}> = memo(() => {
  return useMemo(() => (
    <>
      <Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;
          margin: auto;
          height: 100%;
        `}
      >
        <Switch>
          <Route path='/'>
            <ErrorBoundary fallback='Home error'>
              <Suspense fallback={<Loader mode='default' />}>
                <HomeRouter />
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
