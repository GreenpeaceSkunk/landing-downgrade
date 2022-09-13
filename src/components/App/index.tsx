import React, { Suspense, lazy, memo, useMemo, useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import { AppContext, AppProvider } from './context';
import { initialize as initializeTagManager, pushToDataLayer } from '../../utils/googleTagManager';
import { initialize as inititalizeAnalytics, trackPage } from '../../utils/googleAnalytics';
import { initialize as initializeFacebookPixel, trackEvent } from '../../utils/facebookPixel';
import { Loader } from '../Shared'; // TODO Import directly from bit
import { Wrapper } from '@bit/meema.ui-components.elements';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import { FormProvider } from '../Forms/context';
import { scrollToTop } from '../../utils';
import useQuery from '../../hooks/useQuery';
import { getUserById } from '../../services/greenlab';

const AppRouter = lazy(() => import('./router'));

if(process.env.NODE_ENV === 'production') {
  initializeTagManager();
  inititalizeAnalytics();
  initializeFacebookPixel();
}

const Component: React.FunctionComponent<{}> = memo(() => {
  const [ allowedUser, setAllowedUser ] = useState<boolean>(false);
  const [ fetchingUser, setFetchingUser ] = useState<boolean>(true);
  const { dispatch } = useContext(AppContext);
  const { pathname } = useLocation();
  const queryParams = useQuery();

  useEffect(() => {
    scrollToTop();
    if(process.env.NODE_ENV === 'production') {
      trackEvent('PageView');
      pushToDataLayer('pageview');
      trackPage("", pathname, "");
    }
  }, [ pathname ]);

  useEffect(() => {
    (async () => {
      if(queryParams.get('memberId')) {
        const user = await getUserById(`${queryParams.get('memberId')}`);

        setAllowedUser(true);
        setFetchingUser(false);

        if(user) {
          dispatch({
            type: 'UPDATE_HUBSPOT_USER_INFORMATION',
            payload: user,
          });
        }
      }
    })();
  }, [
    dispatch,
    queryParams,
  ]);

  return useMemo(() => (
    <Wrapper
      customCss={css`
        width: 100vw;
        
        @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
          min-height: inherit;
          height: 100vh;
        }
      `}
    >
      <>
        {(fetchingUser && !allowedUser) ? (
          <Wrapper
            customCss={css`
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
            `}
          >
            <Loader mode='default' />
          </Wrapper>
        ) : (
          <ErrorBoundary fallback='App Error.'>
            <Suspense fallback={<Loader mode='default' />}>
              <AppRouter />
            </Suspense>
          </ErrorBoundary>
        )}
        
      </>
    </Wrapper>
  ), [
    allowedUser,
    fetchingUser,
  ]);
})

Component.displayName = 'App';
export default function App() {
  return useMemo(() => (
    <AppProvider>
      <FormProvider>
        <Component />
      </FormProvider>
    </AppProvider>
  ), []);
};
