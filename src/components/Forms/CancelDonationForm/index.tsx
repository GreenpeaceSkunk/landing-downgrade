import React, { FormEvent, lazy, memo, Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Elements, { Button } from '@bit/meema.ui-components.elements';
import Carousel, { IRef as ICarouselRef } from '@bit/meema.ui-components.carousel';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form'; // Move to bit
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserForm, { IRef as IUserFormRef } from '../SplittedForms/UserDataForm';
import UserFeedbackForm, { IRef as IUserFeedbackRef } from '../SplittedForms/UserFeedbackForm';
import { UserDataFormContext } from '../SplittedForms/UserDataForm/context';
import { UserFeedbackFormContext } from '../SplittedForms/UserFeedbackForm/context';
import { save } from './service';

const ReduceDonationFormThankYou = lazy(() => import('./ThankYou'));

const pathnames = [
  '/form/user/information',
  '/form/user/feedback',
];

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const [ currentIndex, setCurrentIndex ] = useState<number>(0);
  const { path } = useRouteMatch();
  const { errors, setPathnames } = useContext(FormContext);
  const { data } = useContext(UserDataFormContext);
  const { feedback } = useContext(UserFeedbackFormContext);

  const carouselRef = useRef<ICarouselRef>(null);
  const userFormRef = useRef<IUserFormRef>(null);
  const userFeedbackFormRef = useRef<IUserFeedbackRef>(null);

  const onSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();

    if(currentIndex + 1 < pathnames.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      (async () => {
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
    feedback,
    currentIndex,
  ]);

  useEffect(() => {
    history.push({
      pathname: `${path}${pathnames[currentIndex]}`,
    });
  }, [
    currentIndex,
  ]);

  return useMemo(() => (
    <Elements.Wrapper>
      <Switch>
        <Route exact path={`${path}/thank-you`}>
          <Suspense fallback={<Loader />}>
            <ReduceDonationFormThankYou />
          </Suspense>
        </Route>
        <Route path={path}>
          <Form.Main onSubmit={onSubmit}>
            <Form.NavigationNav />

            <Form.Header>
              <Form.MainTitle>Cancelar mi donación</Form.MainTitle>
              <Form.Text>Lamentamos que hayas tomado esta decisión, pero entendemos que tenés motivos para hacerlo.</Form.Text>
            </Form.Header>
            
            <Route exact path={`${path}/form/user/information`}>
              <Form.CarouselWrapper>
                <UserForm ref={userFormRef} />
              </Form.CarouselWrapper>
            </Route>
            
            <Route exact path={`${path}/form/user/feedback`}>
              <Form.CarouselWrapper>
                <UserFeedbackForm ref={userFeedbackFormRef} />
              </Form.CarouselWrapper>
            </Route>
                
            <Form.Nav>
              <Form.Button
                type='submit'
                format='contained'
                disabled={(errors && Object.keys(errors).length) ? true : false}
              >Continuar</Form.Button>
            </Form.Nav>

            <Form.Message>* Datos obligatorios</Form.Message>
            {(errors && (Object.keys(errors).length >= 2)) ? (
              <Form.ErrorMessage>Tenés campos incompletos o con errores. Revisalos para continuar.</Form.ErrorMessage>
            ) : null }
          </Form.Main>
        </Route>
      </Switch>
    </Elements.Wrapper>
  ), [
    path,
    carouselRef,
    currentIndex,
    errors,
    userFormRef,
    userFeedbackFormRef,
    history,
  ]);
};

Component.displayName = 'CancelDonationForm';
export default memo(Component);
