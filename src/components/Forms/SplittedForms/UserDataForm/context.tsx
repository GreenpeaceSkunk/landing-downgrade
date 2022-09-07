import React, { createContext, useContext, useMemo } from 'react';
import { AppContext } from '../../../App/context';

interface IContext {
  data: any;
  dispatch: React.Dispatch<any>;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'UserDataFormContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const { data, dispatch } = useContext(AppContext);
 
  return useMemo(() => (
    <Provider value={{
      data,
      dispatch,
    }}>{ children }</Provider>
  ), [
    children,
    data,
    dispatch,
  ]);
};

export {
  ContextProvider as UserDataFormProvider,
  Consumer as UserDataFormConsumer,
  Context as UserDataFormContext,
};
