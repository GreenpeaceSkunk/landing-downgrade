import React, { FormEvent, memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form';
import Layout from '../../Shared/Layout';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserPostponeForm, { IRef as IUsePostponeFormRef } from '../SplittedForms/UserPostponeForm';
import { UserPostponeFormContext } from '../SplittedForms/UserPostponeForm/context';
import { css } from 'styled-components';
import Snackbar, { IRef as ISnackbarRef } from '../../Snackbar';
import { AppContext } from '../../App/context';

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
    payload,
    serviceForm,
    setPayload,
    setServiceForm,
  } = useContext(FormContext);
  const { donation } = useContext(UserPostponeFormContext);
  const snackbarRef = useRef<ISnackbarRef>(null);
  const { queryParams } = useContext(AppContext);

  const onSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();

    if(totalErrors > 0) {
      setShowFieldErrors(true);
      if(snackbarRef && snackbarRef.current) {
        snackbarRef.current.showSnackbar();
      }
  } else {
    setServiceForm('PostponeDonationForm');
    setPayload({
      postponeUntil: donation.postponeUntil,
    });
  }
  }, [
    donation,
    totalErrors,
    setPayload,
    setServiceForm,
    setShowFieldErrors,
  ]);

  useEffect(() => {
    if(payload && serviceForm) {
      dispatch({
        type: 'SET_CURRENT_FORM',
        payload: { formType: 'postpone' },
      });

      history.push({
        pathname: `/user/information`,
        search: `?${queryParams}`,
      });
    }
  }, [
    payload,
    serviceForm,
    dispatch,
    history,
    queryParams,
  ]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push({
        pathname: `${path}/time`,
        search: `${queryParams}`,
      });
    }, 200);

    return () => {
      clearTimeout(timeout);
    }
  }, [
    path,
    history,
    queryParams,
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
                <Layout.ButtonLink format='text' to={`/about-us?${queryParams}`}>Volver</Layout.ButtonLink>
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
    queryParams,
    onSubmit,
  ]);
};

Component.displayName = 'PostponeDonationForm';
export default memo(Component);
