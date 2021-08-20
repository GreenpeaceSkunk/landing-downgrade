import React, { FormEvent, lazy, memo, Suspense, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
// import Carousel, { IRef as ICarouselRef } from '@bit/meema.ui-components.carousel';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form'; // Move to bit
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserForm, { IRef as IUserFormRef } from '../SplittedForms/UserDataForm';
import UserFeedbackForm, { IRef as IUserFeedbackRef } from '../SplittedForms/UserFeedbackForm';
import { UserDataFormContext } from '../SplittedForms/UserDataForm/context';
import { UserFeedbackFormContext } from '../SplittedForms/UserFeedbackForm/context';
import { save } from './service';
import { isMobile } from 'meema.utils';

const ReduceDonationFormThankYou = lazy(() => import('./ThankYou'));

const pathnames = [
  '/form-user/information',
  '/form-user/feedback',
];

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const {
    errors,
    currentIndex,
    allowNext,
    showFieldErrors,
    showGeneralError,
    submitting,
    setCurrentIndex,
    dispatch,
  } = useContext(FormContext);
  const { data } = useContext(UserDataFormContext);
  const { feedback } = useContext(UserFeedbackFormContext);
  // const carouselRef = useRef<ICarouselRef>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const userFormRef = useRef<IUserFormRef>(null);
  const userFeedbackFormRef = useRef<IUserFeedbackRef>(null);
  const { path } = useRouteMatch();

  const onSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();

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
  }, [
    currentIndex,
    data,
    feedback,
    history,
    path,
    pathnames,
    dispatch,
    setCurrentIndex,
  ]);

  useEffect(() => {
    history.push({
      pathname: `${path}${pathnames[currentIndex]}`,
    });
  }, [
    currentIndex,
    history,
  ]);

  useEffect(() => {
    if(formRef.current && !isMobile()) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [
    formRef.current,
  ]);

  useEffect(() => {
    setCurrentIndex(0);
    if(isMobile()) {
      document.body.style.overflow = "hidden";
  
      return () => {
        document.body.style.overflow = "auto";
      }
    }
  }, []);

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
              </Form.CarouselWrapper>
            </Route>
            
            <Route exact path={`${path}/form-user/feedback`}>
              <Form.CarouselWrapper>
                <UserFeedbackForm ref={userFeedbackFormRef} />
              </Form.CarouselWrapper>
            </Route>
                
            <Form.Message>* Datos obligatorios</Form.Message>
            {(showGeneralError) ? (
              <Form.ErrorMessage>Tenés campos incompletos o con errores. Revisalos para continuar.</Form.ErrorMessage>
            ) : null }
            <Form.Nav>
              <Form.Button
                type='submit'
                format='contained'
                disabled={!allowNext || submitting}
              >
                {(submitting) ? (
                  <Loader mode='light' />
                ) : (((currentIndex < (pathnames.length - 1)) ? 'Continuar' : 'Confimar'))}
              </Form.Button>

              <Form.ButtonLink to='/donation/reduce'>
                Disminuir el monto
              </Form.ButtonLink>
            </Form.Nav>
          </Form.Main>
        </Route>
      </Switch>
    </Elements.Wrapper>
  ), [
    path,
    // carouselRef,
    currentIndex,
    errors,
    userFormRef,
    userFeedbackFormRef,
    history,
    allowNext,
    showFieldErrors,
    showGeneralError,
    submitting,
    formRef,
    setCurrentIndex,
    dispatch,
  ]);
};

Component.displayName = 'CancelDonationForm';
export default memo(Component);
