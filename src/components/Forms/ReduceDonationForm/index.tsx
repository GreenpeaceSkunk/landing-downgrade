import React, { FormEvent, lazy, memo, Suspense, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
// import Carousel, { IRef as ICarouselRef } from '@bit/meema.ui-components.carousel';
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
import { isMobile } from 'meema.utils';

const ReduceDonationFormThankYou = lazy(() => import('./ThankYou'));

const pathnames = [
  '/form-user/information',
];

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  // const carouselRef = useRef<ICarouselRef>(null);
  const userDataFormRef = useRef<IUserDataFormRef>(null);
  const userDonationFormRef = useRef<IUserDonationFormRef>(null);
  const { path } = useRouteMatch();
  const {
    errors,
    currentIndex,
    allowNext,
    isEdited,
    showFieldErrors,
    showGeneralError,
    submitted,
    submitting,
    setCurrentIndex,
    dispatch,
  } = useContext(FormContext);
  const { data } = useContext(UserDataFormContext);
  const { donation } = useContext(UserDonationFormContext);
  const { feedback } = useContext(UserFeedbackFormContext);

  const onSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();
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
  }, [
    path,
    data,
    donation,
    currentIndex,
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
          <Form.Main onSubmit={onSubmit}>
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
            {(!showFieldErrors) ? (
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
            </Form.Nav>
          </Form.Main>
        </Route>
      </Switch>
    </Elements.Wrapper>
  ), [
    data,
    donation,
    feedback,
    path,
    // carouselRef,
    currentIndex,
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
    setCurrentIndex,
    dispatch,
  ]);
};

Component.displayName = 'ReduceDonationForm';
export default memo(Component);
