import React, { FormEvent, memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form';
import Layout from '../../Shared/Layout';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserDonationForm, { IRef as IUserDonationFormRef } from '../SplittedForms/UserDonationForm';
import { UserDonationFormContext } from '../SplittedForms/UserDonationForm/context';
import { css } from 'styled-components';
import Snackbar, { IRef as ISnackbarRef } from '../../Snackbar';
import { AppContext } from '../../App/context';

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const formRef = useRef<HTMLFormElement>(null);
  const userDonationFormRef = useRef<IUserDonationFormRef>(null);
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
  const { donation } = useContext(UserDonationFormContext);
  const { queryParams } = useContext(AppContext);
  const snackbarRef = useRef<ISnackbarRef>(null);

  const onSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();

    if(totalErrors > 0) {
      setShowFieldErrors(true);
      if(snackbarRef && snackbarRef.current) {
        snackbarRef.current.showSnackbar();
      }
    } else {
      setServiceForm('ReduceDonationForm');
      setPayload({
        percentDecrease: donation.percentDecrease,
        mPhoneNumber: '',
        areaCode: '', 
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
        payload: { formType: 'reduce' },
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
        pathname: `${path}/amounts`,
        search: `?${queryParams}`,
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
    userDonationFormRef,
    submitting,
    formRef,
    snackbarRef,
    queryParams,
    onSubmit,
  ]);
};

Component.displayName = 'ReduceDonationForm';
export default memo(Component);
