import React, { FormEvent, memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form';
import Layout from '../../Shared/Layout';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserPostponeForm, { IRef as IUsePostponeFormRef } from '../SplittedForms/UserPostponeForm';
import { save } from './service';
import { UserDataFormContext } from '../SplittedForms/UserDataForm/context';
import { UserPostponeFormContext } from '../SplittedForms/UserPostponeForm/context';
import { css } from 'styled-components';
import Snackbar, { IRef as ISnackbarRef } from '../../Snackbar';

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const formRef = useRef<HTMLFormElement>(null);
  const userPostponeFormRef = useRef<IUsePostponeFormRef>(null);
  const { path } = useRouteMatch();
  const {
    totalErrors,
    submitting,
    setShowFieldErrors,
    dispatch,
  } = useContext(FormContext);
  const { data } = useContext(UserDataFormContext);
  const { donation } = useContext(UserPostponeFormContext);
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
          postponeUntil: donation.postponeUntil,
          firstName: data.firstName,
          lastName: data.lastName,
          citizenId: data.citizenId,
          email: data.email,
        });
        dispatch({ type: 'SUBMITTED' });
        if(result.error) {
          console.log('Error inesperado', result.message);
        } else {
          history.push(`/user/information?from=form-postpone`);
        }
      })();
    }
  }, [
    path,
    data,
    donation,
    totalErrors,
    history,
    dispatch,
    setShowFieldErrors,
  ]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push({ pathname: `${path}/time` });
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
        <Route path={path}>
          <Form.Main
            ref={formRef}
            onSubmit={onSubmit}
          >
            <Form.Header customCss={css`> * { text-align: left !important; }`}>
              <Layout.Title color='primary'>Postergar donación</Layout.Title>
              <Form.Text>Postergá tu aporte unos meses hasta que puedas volver a ayudarnos.</Form.Text>
            </Form.Header>

            <Route exact path={`${path}/time`}>
              <UserPostponeForm ref={userPostponeFormRef} />
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
                <Layout.ButtonLink format='text' to='/about-us'>Volver</Layout.ButtonLink>
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
    userPostponeFormRef,
    submitting,
    formRef,
    snackbarRef,
    onSubmit,
  ]);
};

Component.displayName = 'PostponeDonationForm';
export default memo(Component);
