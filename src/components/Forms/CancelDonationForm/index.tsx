import React, { FormEvent, lazy, memo, Suspense, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { isMobile } from 'meema.utils';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form'; // Move to bit
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserForm, { IRef as IUserFormRef } from '../SplittedForms/UserDataForm';
import UserFeedbackForm, { IRef as IUserFeedbackRef } from '../SplittedForms/UserFeedbackForm';
import { UserDataFormContext } from '../SplittedForms/UserDataForm/context';
import { UserFeedbackFormContext } from '../SplittedForms/UserFeedbackForm/context';
import { save } from './service';
import Snackbar, { IRef as ISnackbarRef } from '../../Snackbar';

const ReduceDonationFormThankYou = lazy(() => import('./ThankYou'));

const pathnames = [
  '/form-user/information',
  '/form-user/feedback',
];

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const {
    currentIndex,
    totalErrors,
    submitting,
    setCurrentIndex,
    setShowFieldErrors,
    dispatch,
  } = useContext(FormContext);
  const { data } = useContext(UserDataFormContext);
  const { feedback } = useContext(UserFeedbackFormContext);
  const formRef = useRef<HTMLFormElement>(null);
  const userFormRef = useRef<IUserFormRef>(null);
  const userFeedbackFormRef = useRef<IUserFeedbackRef>(null);
  const { path } = useRouteMatch();
  const snackbarRef = useRef<ISnackbarRef>(null);

  const onSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();

    if(totalErrors > 0) {
      setShowFieldErrors(true);
      if(snackbarRef && snackbarRef.current) {
        snackbarRef.current.showSnackbar();
      }
    } else {
      if(currentIndex + 1 < pathnames.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        (async () => {
          dispatch({ type: 'SUBMIT' });
          const result = await save({
            userAgent: window.navigator.userAgent,
            firstName: data.firstName,
            lastName: data.lastName,
            citizenId: data.citizenId,
            areaCode: data.areaCode,
            email: data.email,
            mPhoneNumber: data.mobilePhoneNumber,
            userFeedback: feedback.selectedOption,
            userComment: feedback.comment,
          });
          dispatch({ type: 'SUBMITTED' });
          if(result.error) {
            console.log('Error inesperado', result.message);
          } else {
            history.push(`${path}/thank-you`);
          }
        })();
      }
    }
  }, [
    currentIndex,
    totalErrors,
    data,
    feedback,
    history,
    path,
    dispatch,
    setShowFieldErrors,
    setCurrentIndex,
  ]);

  useEffect(() => {
    history.push({
      pathname: `${path}${pathnames[currentIndex]}`,
    });
  }, [
    path,
    currentIndex,
    history,
  ]);

  useEffect(() => {
    if(formRef && formRef.current && !isMobile()) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [
    formRef,
  ]);

  useEffect(() => {
    setCurrentIndex(0);
    if(isMobile()) {
      document.body.style.overflow = "hidden";
      
     return () => {
        document.body.style.overflow = "auto";
      }
    }
  }, [
    setCurrentIndex,
  ]);

  return useMemo(() => (
    <Elements.Wrapper>
      <Switch>
        <Route exact path={`${path}/thank-you`}>
          <Suspense fallback={<Loader mode='default' />}>
            <ReduceDonationFormThankYou />
          </Suspense>
        </Route>
        <Route path={path}>
          <Form.Main ref={formRef} onSubmit={onSubmit}>
            <Form.NavigationNav />
            <Form.Header>
              <Form.MainTitle>Cancelar mi donación</Form.MainTitle>
              <Form.Text>Lamentamos que hayas tomado esta decisión, pero entendemos que tenés motivos para hacerlo.</Form.Text>
            </Form.Header>
            
            <Route exact path={`${path}/form-user/information`}>
              <Form.CarouselWrapper>
                <UserForm ref={userFormRef} />
                <Form.Message>* Datos obligatorios</Form.Message>
              </Form.CarouselWrapper>
            </Route>
            
            <Route exact path={`${path}/form-user/feedback`}>
              <Form.CarouselWrapper>
                <UserFeedbackForm ref={userFeedbackFormRef} />
              </Form.CarouselWrapper>
            </Route>
                
            <Form.Nav>
              <Form.Button
                type='submit'
                format='contained'
                disabled={submitting}
                >
                {(submitting) ? (
                  <Loader mode='light' />
                  ) : (((currentIndex < (pathnames.length - 1)) ? 'Continuar' : 'Confimar'))}
              </Form.Button>

              <Form.ButtonLink to='/donation/reduce'>
                Disminuir el monto
              </Form.ButtonLink>
            </Form.Nav>
            <Snackbar
              ref={snackbarRef}
              text='Tenés campos incompletos o con errores. Revisalos para continuar.'
            />
          </Form.Main>
        </Route>
      </Switch>
    </Elements.Wrapper>
  ), [
    path,
    currentIndex,
    userFormRef,
    userFeedbackFormRef,
    submitting,
    formRef,
    snackbarRef,
    onSubmit,
  ]);
};

Component.displayName = 'CancelDonationForm';
export default memo(Component);
