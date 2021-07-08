import React, { Suspense, lazy, memo, useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import { Loader } from '../Shared';

const Index = lazy(() => import('.'));

const Component: React.FunctionComponent<{}> = memo(() => {
  const { path } = useRouteMatch();
  
  return useMemo(() => (
    <Switch>
      <Route path={path}>
        <Suspense fallback={<Loader />}>
          <Index />
        </Suspense>
      </Route>
    </Switch>
  ), [
    path,
  ]);
})

Component.displayName = 'HomeRouter';
export default Component;
