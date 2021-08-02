import React, { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { reducer, initialState, ContextActionType as FormContextActionType, FieldErrorType } from './reducer';
import { UserDonationFormProvider } from './SplittedForms/UserDonationForm/context';
import { UserDataFormProvider } from './SplittedForms/UserDataForm/context';
import { UserFeedbackFormProvider } from './SplittedForms/UserFeedbackForm/context';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

interface IContext {
  errors: FieldErrorType;
  showFieldErrors: boolean;
  pathnames: string[];
  setPathnames: React.Dispatch<React.SetStateAction<string[]>>;
  onUpdateFieldHandler: ( fieldName: string, isValid: boolean ) => void;
  dispatch: (action: FormContextActionType) => void;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'FormContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [{ errors }, dispatch ] = useReducer(reducer, initialState);
  const [ showFieldErrors, setShowFieldErrors ] = useState<boolean>(true);
  const [ currentIndex, setCurrentIndex ] = useState<number>(0);
  const [ pathnames, setPathnames ] = useState<string[]>([]);
  const history = useHistory();
  const { path } = useRouteMatch();

  const onUpdateFieldHandler = useCallback(( fieldName: string, isValid: boolean ) => {
    dispatch({
      type: 'UPDATE_FIELD_ERRORS',
      payload: {
        fieldName,
        isValid,
      }
    });
  }, [
    errors,
    dispatch,
  ]);

  // useEffect(() => {
  //   history.push({
  //     pathname: `${path}${pathnames[currentIndex]}`,
  //   });
  // }, [
  //   currentIndex,
  // ]);

  // useEffect(() => {
  //   if(!pathnames.length) {
  //     setCurrentIndex(0);
  //   }
  // }, [
  //   pathnames,
  // ])

  // useEffect(() => {
  //   setPathnames([]);
  // }, [])

  return useMemo(() => (
    <Provider value={{
      errors,
      showFieldErrors,
      pathnames,
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
    showFieldErrors,
    path,
    setPathnames,
    onUpdateFieldHandler,
    dispatch,
  ]);
};

export {
  ContextProvider as FormProvider,
  Consumer as FormConsumer,
  Context as FormContext,
};
