import React, { Suspense, lazy, memo, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import { AppProvider } from './context';
import { initialize as initializeTagManager, pushToDataLayer } from '../../utils/googleTagManager';
import { initialize as inititalizeAnalytics, trackPage } from '../../utils/googleAnalytics';
import { initialize as initializeFacebookPixel, trackEvent } from '../../utils/facebookPixel';
import { initialize as initializeDataCrush } from '../../utils/dataCrush';
import { initialize as initializeMercadopago } from '../../utils/mercadopago';

import { Loader } from '../Shared'; // TODO Import directly from bit

const AppRouter = lazy(() => import('./router'));

if(process.env.NODE_ENV === 'production') {
  initializeTagManager();
  inititalizeAnalytics();
  initializeFacebookPixel();
  initializeDataCrush();
  initializeMercadopago();
}

const Component: React.FunctionComponent<{}> = memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    if(process.env.NODE_ENV === 'production') {
      trackEvent('PageView');
      pushToDataLayer('pageview');
      trackPage("", pathname, "");
    }
  }, [ pathname ]);

  return useMemo(() => (
    <>
      <ErrorBoundary fallback='App Error.'>
        <Suspense fallback={<Loader />}>
          <AppRouter />
        </Suspense>
      </ErrorBoundary>
    </>
  ), []);
})

Component.displayName = 'App';
export default function App() {
  return useMemo(() => (
    <AppProvider>
      <Component />
    </AppProvider>
  ), []);
};
