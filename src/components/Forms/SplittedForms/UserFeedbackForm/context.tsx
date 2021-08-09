import React, { createContext, useMemo, useReducer } from 'react';
import { IUserFeedback, UserContextActionType as ContextActionType } from 'greenpeace';
import { reducer, initialState } from '../../../App/reducer';
interface IContext {
  feedback: IUserFeedback;
  dispatch: (action: ContextActionType) => void;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'UserFeedbackFormContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [ { user: { feedback } }, dispatch ] = useReducer(reducer, initialState);

  return useMemo(() => (
    <Provider value={{
      feedback,
      dispatch,
    }}>{ children }</Provider>
  ), [
    children,
    feedback,
    dispatch,
  ]);
};

export {
  ContextProvider as UserFeedbackFormProvider,
  Consumer as UserFeedbackFormConsumer,
  Context as UserFeedbackFormContext,
};
