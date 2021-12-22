import React, { FormEvent, lazy, memo, Suspense, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form'; // Move to bit
import Layout from '../../Shared/Layout';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserFeedbackForm, { IRef as IUserFeedbackRef } from '../SplittedForms/UserFeedbackForm';
import { UserDataFormContext } from '../SplittedForms/UserDataForm/context';
import { UserFeedbackFormContext } from '../SplittedForms/UserFeedbackForm/context';
import { save } from './service';
import Snackbar, { IRef as ISnackbarRef } from '../../Snackbar';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';

const ReduceDonationFormThankYou = lazy(() => import('./ThankYou'));

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const {
    totalErrors,
    submitting,
    setShowFieldErrors,
    dispatch,
  } = useContext(FormContext);
  const { data } = useContext(UserDataFormContext);
  const { feedback } = useContext(UserFeedbackFormContext);
  const formRef = useRef<HTMLFormElement>(null);
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
          history.push(`${path}/thankyou`);
        }
      })();
    }
  }, [
    totalErrors,
    data,
    feedback,
    history,
    path,
    dispatch,
    setShowFieldErrors,
  ]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push({ pathname: `${path}/feedback` });
    }, 200);

    return () => {
      clearTimeout(timeout);
    }
  }, [
    path,
    history,
  ]);

  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, [ dispatch ]);

  return useMemo(() => (
    <Elements.View customCss={css`
      width: 100%; 
      height: 100%;
    
      @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
        width: 80%;
      }
    `}>
      <Switch>
        <Route exact path={`${path}/thankyou`}>
          <Suspense fallback={<Loader mode='default' />}>
            <ReduceDonationFormThankYou />
          </Suspense>
        </Route>
        <Route path={path}>
          <Form.Main ref={formRef} onSubmit={onSubmit}>
            <Form.Header customCss={css`> * { text-align: left !important; }`}>
              <Layout.Title color='primary'>Cancelar mi donación</Layout.Title>
              <Form.Text>Lamentamos que hayas tomado esta decisión, pero entendemos que tenés motivos para hacerlo.</Form.Text>
            </Form.Header>
            
            <Route exact path={`${path}/feedback`}>
              <UserFeedbackForm ref={userFeedbackFormRef} />
            </Route>
            
            <Form.Nav
              customCss={css`
                display: flex;
                flex-direction: row !important;
                align-items: center !important;
                justify-content: space-between;
                width: 100%;

                > * {
                  margin-bottom: 0 !important;
                  height: 100%;
                }
              `}>
                <Layout.ButtonLink format='text' to='/form/reduce'>Quiero reducir mi donación</Layout.ButtonLink>
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
    userFeedbackFormRef,
    submitting,
    formRef,
    snackbarRef,
    onSubmit,
  ]);
};

Component.displayName = 'CancelDonationForm';
export default memo(Component);
