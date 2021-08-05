import React, { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { reducer, initialState, ContextActionType as FormContextActionType, ErrorsType } from './reducer';
import { UserDonationFormProvider } from './SplittedForms/UserDonationForm/context';
import { UserDataFormProvider } from './SplittedForms/UserDataForm/context';
import { UserFeedbackFormProvider } from './SplittedForms/UserFeedbackForm/context';
import { RouteComponentProps, useHistory, useLocation, useRouteMatch, withRouter } from 'react-router-dom';

interface IContext {
  errors: ErrorsType;
  pathnames: string[];
  currentIndex: number;
  showFieldErrors: boolean;
  allowNext: boolean;
  submitted: boolean;
  submitting: boolean;
  setPathnames: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onUpdateFieldHandler: ( fieldName: string, isValid: boolean ) => void;
  dispatch: (action: FormContextActionType) => void;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'FormContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps & RouteComponentProps> = ({ children }) => {
  const [{
    errors,
    submitted,
    submitting,
  }, dispatch ] = useReducer(reducer, initialState);
  const [ showFieldErrors, setShowFieldErrors ] = useState<boolean>(true);
  const [ currentIndex, setCurrentIndex ] = useState<number>(0);
  const [ pathnames, setPathnames ] = useState<string[]>([]);
  const { path } = useRouteMatch();
  const [ allowNext, setAllowNext ] = useState<boolean>(true);

  const onUpdateFieldHandler = useCallback(( fieldName: string, isValid: boolean ) => {
    dispatch({
      type: 'UPDATE_FIELD_ERRORS',
      payload: {
        fieldName,
        isValid,
        indexForm: currentIndex,
      }
    });
  }, [
    errors,
    currentIndex,
    dispatch,
  ]);

  useEffect(() => {
    if(errors && errors[currentIndex]) {
      const tmp = {...errors[currentIndex]};
      setAllowNext(Object.values(tmp).length ? false : true);
      setShowFieldErrors((Object.values(tmp).length >= 2) ? false : true)
    }
  }, [
    currentIndex,
    errors,
  ]);

  return useMemo(() => (
    <Provider value={{
      errors,
      pathnames,
      currentIndex,
      showFieldErrors,
      allowNext,
      submitted,
      submitting,
      setCurrentIndex,
      setPathnames,
      onUpdateFieldHandler,
      dispatch,
    }}>
      <UserDataFormProvider>
        <UserDonationFormProvider>
          <UserFeedbackFormProvider>
            { children }
          </UserFeedbackFormProvider>
        </UserDonationFormProvider>
      </UserDataFormProvider>
    </Provider>
  ), [
    children,
    errors,
    path,
    currentIndex,
    showFieldErrors,
    allowNext,
    submitted,
    submitting,
    setPathnames,
    setCurrentIndex,
    onUpdateFieldHandler,
    dispatch,
  ]);
};

const WrappedProvider = withRouter(ContextProvider);

export {
  WrappedProvider as FormProvider,
  Consumer as FormConsumer,
  Context as FormContext,
};
