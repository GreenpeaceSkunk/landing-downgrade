import React, { createContext, useMemo } from 'react';

export interface IContext {}
interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'HomeContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps> = ({ children }) => {
  return useMemo(() => (
    <Provider 
      value={{}}>
        {children}
      </Provider>
  ), [
    children,
  ]);
};

export {
  ContextProvider as HomeProvider,
  Consumer as HomeConsumer,
  Context as HomeContext,
}
