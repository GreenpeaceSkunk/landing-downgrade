import React, { FormEvent, memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form'; // Move to bit
import Layout from '../../Shared/Layout';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserFeedbackForm, { IRef as IUserFeedbackRef } from '../SplittedForms/UserFeedbackForm';
import { UserDataFormContext } from '../SplittedForms/UserDataForm/context';
import { UserFeedbackFormContext } from '../SplittedForms/UserFeedbackForm/context';
import Snackbar, { IRef as ISnackbarRef } from '../../Snackbar';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import { AppContext } from '../../App/context';

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();
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
  const { queryParams } = useContext(AppContext);
  const { data: { user: { data } } } = useContext(UserDataFormContext);
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
    setServiceForm('CancelDonationForm');
    setPayload({
      areaCode: '',
      mPhoneNumber: '',
      userFeedback: feedback.selectedOption,
      userComment: feedback.comment,
    });
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
    if(payload && serviceForm) {
      history.push({
        pathname: `/user/information`,
        search: `?${queryParams}&from=form-cancel`,
      });
    }
  }, [
    payload,
    serviceForm,
  ]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push({
        pathname: `${path}/feedback`,
        search: `${queryParams}`,
      });
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
                <Layout.ButtonLink format='text' to={`/about-us${queryParams}`}>Volver</Layout.ButtonLink>
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
    payload,
    serviceForm,
    queryParams,
    onSubmit,
    setPayload,
    setServiceForm,
  ]);
};

Component.displayName = 'CancelDonationForm';
export default memo(Component);
