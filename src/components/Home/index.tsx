import React, { useMemo, memo } from 'react';
import { View } from '@bit/meema.ui-components.elements';
import { HomeProvider } from './context';

const Component: React.FunctionComponent<{}> = memo(() => {
  return useMemo(() => (
    <View>
      Home view
    </View>
  ), []);
});

Component.displayName = 'HomeView';
export default function HomeView() {
  return (
    <HomeProvider>
      <Component />
    </HomeProvider>
  )
}
