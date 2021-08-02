import React, { createContext, useMemo, useReducer } from 'react';
import { UserContextActionType as ContextActionType, IUserData } from 'greenpeace';
import { reducer, initialState } from '../../../App/reducer';

interface IContext {
  data: IUserData;
  dispatch: (action: ContextActionType) => void;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'UserDataFormContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [ { user: { data } }, dispatch ] = useReducer(reducer, initialState);

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
