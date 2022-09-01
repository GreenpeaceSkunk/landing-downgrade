import React, { createContext, useMemo, useReducer } from 'react';
import { IUserDonation, UserContextActionType as ContextActionType } from 'greenpeace';
import { reducer, initialState } from '../../../App/reducer'

interface IContext {
  donation: IUserDonation;
  dispatch: (action: ContextActionType) => void;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'UserPostponeFormContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [{ user: { donation } }, dispatch ] = useReducer(reducer, initialState);

  return useMemo(() => (
    <Provider value={{
      donation,
      dispatch,
    }}>{ children }</Provider>
  ), [
    children,
    donation,
    dispatch,
  ]);
};

export {
  ContextProvider as UserPostponeFormProvider,
  Consumer as UserPostponeFormConsumer,
  Context as UserPostponeFormContext,
};
