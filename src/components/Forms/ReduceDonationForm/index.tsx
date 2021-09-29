import React, { FormEvent, lazy, memo, Suspense, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { isMobile, pixelToRem } from 'meema.utils';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form'; // Move to bit
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserDataForm, { IRef as IUserDataFormRef } from '../SplittedForms/UserDataForm';
import UserDonationForm, { IRef as IUserDonationFormRef } from '../SplittedForms/UserDonationForm';
import { save } from './service';
import { UserDataFormContext } from '../SplittedForms/UserDataForm/context';
import { UserDonationFormContext } from '../SplittedForms/UserDonationForm/context';
import { UserFeedbackFormContext } from '../SplittedForms/UserFeedbackForm/context';
import { css } from 'styled-components';
import Snackbar, { IRef as ISnackbarRef } from '../../Snackbar';

const ReduceDonationFormThankYou = lazy(() => import('./ThankYou'));

const pathnames = [
  '/form-user/information',
];

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const formRef = useRef<HTMLFormElement>(null);
  const userDataFormRef = useRef<IUserDataFormRef>(null);
  const userDonationFormRef = useRef<IUserDonationFormRef>(null);
  const { path } = useRouteMatch();
  const {
    errors,
    totalErrors,
    currentIndex,
    allowNext,
    isEdited,
    showFieldErrors,
    showGeneralError,
    submitted,
    submitting,
    setCurrentIndex,
    setShowFieldErrors,
    dispatch,
  } = useContext(FormContext);
  const { data } = useContext(UserDataFormContext);
  const { donation } = useContext(UserDonationFormContext);
  const { feedback } = useContext(UserFeedbackFormContext);
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
            percentDecrease: donation.percentDecrease,
            firstName: data.firstName,
            lastName: data.lastName,
            citizenId: data.citizenId,
            areaCode: data.areaCode,
            email: data.email,
            mPhoneNumber: data.mobilePhoneNumber,
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
    path,
    data,
    donation,
    currentIndex,
    errors,
    totalErrors,
    showGeneralError,
    setShowFieldErrors,
  ]);
  
  useEffect(() => {
    if(currentIndex === 0) {
      history.push({
        pathname: `${path}/form-user/information`,
      })
    }
  }, [
    currentIndex,
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
    <Elements.Wrapper customCss={css`padding-bottom: ${pixelToRem(45)};`}>
      <Switch>
        <Route exact path={`${path}/thank-you`}>
          <Suspense fallback={<Loader mode='default' />}>
            <ReduceDonationFormThankYou />
          </Suspense>
        </Route>
        <Route path={path}>
          <Form.Main
            ref={formRef}
            onSubmit={onSubmit}
          >
            <Form.NavigationNav />
            <Form.Header>
              <Form.MainTitle>Reducir mi donación</Form.MainTitle>
              <Form.Text>Para nosotros es muy importante que sigamos trabajando juntos en las causas más importantes</Form.Text>
            </Form.Header>

            <Route exact path={`${path}/form-user/information`}>
              <Form.CarouselWrapper>
                <UserDonationForm ref={userDonationFormRef} />
                <UserDataForm ref={userDataFormRef} />
              </Form.CarouselWrapper>
            </Route>
            
            <Form.Message>* Datos obligatorios</Form.Message>
            <Form.Nav>
            <Form.Button
              type='submit'
              format='contained'
              >
              {(submitting) ? (
                <Loader mode='light' />
                ) : (((currentIndex < (pathnames.length - 1)) ? 'Continuar' : 'Confimar'))}
              </Form.Button>
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
    data,
    donation,
    feedback,
    path,
    currentIndex,
    totalErrors,
    errors,
    userDataFormRef,
    userDonationFormRef,
    history,
    allowNext,
    isEdited,
    showFieldErrors,
    showGeneralError,
    submitted,
    submitting,
    formRef,
    snackbarRef,
    setCurrentIndex,
    setShowFieldErrors,
    dispatch,
  ]);
};

Component.displayName = 'ReduceDonationForm';
export default memo(Component);
