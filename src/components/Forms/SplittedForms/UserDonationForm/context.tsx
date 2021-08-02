import React, { createContext, useMemo, useReducer } from 'react';
import { IUserDonation, UserContextActionType as ContextActionType } from 'greenpeace';
import { reducer, initialState } from '../../../App/reducer';

interface IContext {
  donation: IUserDonation;
  dispatch: (action: ContextActionType) => void;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'UserDonationFormContext';
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
  ContextProvider as UserDonationFormProvider,
  Consumer as UserDonationFormConsumer,
  Context as UserDonationFormContext,
};
