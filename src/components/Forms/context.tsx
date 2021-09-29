import React, { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { reducer, initialState, ContextActionType as FormContextActionType, ErrorsType } from './reducer';
import { UserDonationFormProvider } from './SplittedForms/UserDonationForm/context';
import { UserDataFormProvider } from './SplittedForms/UserDataForm/context';
import { UserFeedbackFormProvider } from './SplittedForms/UserFeedbackForm/context';
import { RouteComponentProps, useRouteMatch, withRouter } from 'react-router-dom';

interface IContext {
  errors: ErrorsType;
  pathnames: string[];
  currentIndex: number;
  totalErrors: number;
  showFieldErrors: boolean;
  showGeneralError: boolean;
  isEdited: boolean;
  allowNext: boolean;
  submitted: boolean;
  submitting: boolean;
  setPathnames: React.Dispatch<React.SetStateAction<string[]>>;
  setShowGeneralError: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFieldErrors: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onUpdateFieldHandler: (fieldName: string, isValid: boolean, value?: string|number) => void;
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
    isEdited,
    submitted,
    submitting,
  }, dispatch ] = useReducer(reducer, initialState);
  const [ showFieldErrors, setShowFieldErrors ] = useState<boolean>(false);
  const [ showGeneralError, setShowGeneralError ] = useState<boolean>(false);
  const [ currentIndex, setCurrentIndex ] = useState<number>(0);
  const [ totalErrors, setTotalErrors ] = useState<number>(0);
  const [ pathnames, setPathnames ] = useState<string[]>([]);
  const { path } = useRouteMatch();
  const [ allowNext, setAllowNext ] = useState<boolean>(true);

  const onUpdateFieldHandler = useCallback(( fieldName: string, isValid: boolean, value?: string|number ) => {
    if(value && value !== '' && !isEdited) {
      dispatch({ type: 'UPDATE_FORM_STATUS' });
    }
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
      setTotalErrors(Object.values(tmp).length);
    }
  }, [
    currentIndex,
    errors,
    isEdited,
  ]);

  return useMemo(() => (
    <Provider value={{
      errors,
      pathnames,
      currentIndex,
      totalErrors,
      showFieldErrors,
      showGeneralError,
      allowNext,
      isEdited,
      submitted,
      submitting,
      setCurrentIndex,
      setShowGeneralError,
      setPathnames,
      setShowFieldErrors,
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
    totalErrors,
    showFieldErrors,
    showGeneralError,
    allowNext,
    isEdited,
    submitted,
    submitting,
    setPathnames,
    setCurrentIndex,
    setTotalErrors,
    setShowGeneralError,
    setShowFieldErrors,
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
