import React, { createContext, FocusEvent, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { reducer, initialState, ContextActionType as FormContextActionType, ErrorsType, FormType } from './reducer';
import { UserDonationFormProvider } from './SplittedForms/UserDonationForm/context';
import { UserDataFormProvider } from './SplittedForms/UserDataForm/context';
import { UserFeedbackFormProvider } from './SplittedForms/UserFeedbackForm/context';
import { UserPostponeFormProvider } from './SplittedForms/UserPostponeForm/context';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type ServiceFnType = 'CancelDonationForm' | 'ReduceDonationForm' | 'PostponeDonationForm';

interface IContext {
  errors: ErrorsType;
  pathnames: string[];
  currentIndex: number;
  totalErrors: number;
  showFieldErrors: boolean;
  showGeneralError: boolean;
  isEdited: boolean;
  submitted: boolean;
  submitting: boolean;
  currentForm: FormType;
  setPathnames: React.Dispatch<React.SetStateAction<string[]>>;
  setShowGeneralError: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFieldErrors: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onUpdateFieldHandler: (fieldName: string, isValid: boolean, value?: string|number) => void;
  onFocusHandler: (evt: FocusEvent) => void
  dispatch: (action: FormContextActionType) => void;
  payload: any;
  serviceForm: ServiceFnType | null;
  setPayload: React.Dispatch<any>;
  setServiceForm: React.Dispatch<ServiceFnType | null>;
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
    currentForm,
  }, dispatch ] = useReducer(reducer, initialState);
  const [ showFieldErrors, setShowFieldErrors ] = useState<boolean>(false);
  const [ showGeneralError, setShowGeneralError ] = useState<boolean>(false);
  const [ currentIndex, setCurrentIndex ] = useState<number>(0);
  const [ totalErrors, setTotalErrors ] = useState<number>(0);
  const [ pathnames, setPathnames ] = useState<string[]>([]);

  const [ payload, setPayload ] = useState<any>(null);
  const [ serviceForm, setServiceForm ] = useState<ServiceFnType | null>(null);

  const onFocusHandler = useCallback((evt: FocusEvent) => {
    evt.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

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
    isEdited,
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

  useEffect(() => {
    setServiceForm(null);
    setPayload(null);
  }, []);

  return useMemo(() => (
    <Provider value={{
      errors,
      pathnames,
      currentIndex,
      totalErrors,
      currentForm,
      showFieldErrors,
      showGeneralError,
      isEdited,
      submitted,
      submitting,
      setCurrentIndex,
      setShowGeneralError,
      setPathnames,
      setShowFieldErrors,
      onUpdateFieldHandler,
      onFocusHandler,
      dispatch,
      serviceForm,
      setServiceForm,
      payload,
      setPayload,
    }}>
      <UserDataFormProvider>
        <UserDonationFormProvider>
          <UserFeedbackFormProvider>
            <UserPostponeFormProvider>
              { children }
            </UserPostponeFormProvider>
          </UserFeedbackFormProvider>
        </UserDonationFormProvider>
      </UserDataFormProvider>
    </Provider>
  ), [
    children,
    pathnames,
    errors,
    currentIndex,
    totalErrors,
    showFieldErrors,
    showGeneralError,
    isEdited,
    submitted,
    submitting,
    currentForm,
    setPathnames,
    setCurrentIndex,
    setShowGeneralError,
    setShowFieldErrors,
    onUpdateFieldHandler,
    onFocusHandler,
    dispatch,
    serviceForm,
    setServiceForm,
    payload,
    setPayload,
  ]);
};

const WrappedProvider = withRouter(ContextProvider);

export {
  WrappedProvider as FormProvider,
  Consumer as FormConsumer,
  Context as FormContext,
};
