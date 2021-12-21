import React, { FormEvent, lazy, memo, Suspense, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { isMobile, pixelToRem } from 'meema.utils';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form'; // Move to bit
import Layout from '../../Shared/Layout';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserDataForm, { IRef as IUserDataFormRef } from '../SplittedForms/UserDataForm';
import UserDonationForm, { IRef as IUserDonationFormRef } from '../SplittedForms/UserDonationForm';
import { save } from './service';
import { UserDataFormContext } from '../SplittedForms/UserDataForm/context';
import { UserDonationFormContext } from '../SplittedForms/UserDonationForm/context';
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
    totalErrors,
    currentIndex,
    submitting,
    setCurrentIndex,
    setShowFieldErrors,
    dispatch,
  } = useContext(FormContext);
  const { data } = useContext(UserDataFormContext);
  const { donation } = useContext(UserDonationFormContext);
  const snackbarRef = useRef<ISnackbarRef>(null);

  const onSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();

    if(totalErrors > 0) {
      setShowFieldErrors(true);
      if(snackbarRef && snackbarRef.current) {
        snackbarRef.current.showSnackbar();
      }
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
          history.push(`${path}/thankyou`);
        }
      })();
    }
  }, [
    path,
    data,
    donation,
    currentIndex,
    totalErrors,
    history,
    dispatch,
    setCurrentIndex,
    setShowFieldErrors,
  ]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push({ pathname: `${path}/amounts` });
    }, 200);

    return () => {
      clearTimeout(timeout);
    }
  }, [
    path,
  ]);

  // useEffect(() => {
  //   if(currentIndex === 0) {
  //     history.push({
  //       pathname: `${path}/form-user/information`,
  //     })
  //   }
  // }, [
  //   history,
  //   path,
  //   currentIndex,
  // ]);

  // useEffect(() => {
  //   if(formRef && formRef.current && !isMobile()) {
  //     formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //   }
  // }, [
  //   formRef,
  // ]);

  // useEffect(() => {
  //   setCurrentIndex(0);
  //   if(isMobile()) {
  //     document.body.style.overflow = "hidden";
  
  //     return () => {
  //       document.body.style.overflow = "auto";
  //     }
  //   }
  // }, [
  //   setCurrentIndex,
  // ]);

  return useMemo(() => (
    <Elements.View customCss={css`
      width: 100%; 
      height: 100%;
    
      @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
        width: 60%;
      }
    `}>
      <Switch>
        <Route exact path={`${path}/thankyou`}>
          <Suspense fallback={<Loader mode='default' />}>
            <ReduceDonationFormThankYou />
          </Suspense>
        </Route>
        <Route path={path}>
          <Form.Main
            ref={formRef}
            onSubmit={onSubmit}
          >
            <Form.Header customCss={css`> * { text-align: left !important; }`}>
              <Layout.Title color='primary'>Reducir mi donación</Layout.Title>
              <Form.Text>Para nosotros es muy importante que sigamos trabajando juntos en las causas que más nos mueven.</Form.Text>
            </Form.Header>

            <Route exact path={`${path}/amounts`}>
              <UserDonationForm ref={userDonationFormRef} />
            </Route>
            
            <Form.Nav
              customCss={css`
                display: flex;
                flex-direction: row !important;
                align-items: center !important;
                justify-content: flex-end;
                width: 100%;

                > * {
                  margin-bottom: 0 !important;
                  height: 100%;
                }
              `}>
                <Layout.Button
                  type='submit'
                  format='contained'
                  disabled={submitting}
                  >{(submitting) ? <Loader mode='light' /> : 'Finalizar'}</Layout.Button>
            </Form.Nav>
            <Snackbar
              ref={snackbarRef}
              text='Tenés campos incompletos o con errores. Revisalos para continuar.'
            />
          </Form.Main>
        </Route>
      </Switch>
    </Elements.View>
  ), [
    path,
    currentIndex,
    userDataFormRef,
    userDonationFormRef,
    submitting,
    formRef,
    snackbarRef,
    onSubmit,
  ]);
};

Component.displayName = 'ReduceDonationForm';
export default memo(Component);
