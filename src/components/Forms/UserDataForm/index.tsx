import React, { FormEvent, memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { isMobile, pixelToRem } from 'meema.utils';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form'; // Move to bit
import Layout from '../../Shared/Layout';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserDataForm, { IRef as IUserDataFormRef } from '../SplittedForms/UserDataForm';
import { save } from './service';
import { UserDataFormContext } from '../SplittedForms/UserDataForm/context';
import { css } from 'styled-components';
import Snackbar, { IRef as ISnackbarRef } from '../../Snackbar';

const Component: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const formRef = useRef<HTMLFormElement>(null);
  const userDataFormRef = useRef<IUserDataFormRef>(null);
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
          firstName: data.firstName,
          lastName: data.lastName,
          citizenId: data.citizenId,
          email: data.email,
          campaignName: '',
        });
        dispatch({ type: 'SUBMITTED' });
        if(result.error) {
          console.log('Error inesperado', result.message);
        } else {
          history.push(`/video`);
        }
      })();
    }
  }, [
    path,
    data,
    currentIndex,
    totalErrors,
    history,
    dispatch,
    setCurrentIndex,
    setShowFieldErrors,
  ]);

  useEffect(() => {
    if(formRef && formRef.current && !isMobile()) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [
    formRef,
  ]);

  useEffect(() => {
    setCurrentIndex(0);
    if(isMobile()) {
      document.body.style.overflow = "hidden";
  
      return () => {
        document.body.style.overflow = "auto";
      }
    }
  }, [
    setCurrentIndex,
  ]);

  return useMemo(() => (
    <Elements.Wrapper customCss={css`padding-bottom: ${pixelToRem(45)}; width: 100%;`}>
      <Switch>
        <Route path={path}>
          <Form.Main
            ref={formRef}
            onSubmit={onSubmit}
          >
            {/* Isolate this form */}
            <UserDataForm ref={userDataFormRef} />
            
            <Form.Message>* Datos obligatorios</Form.Message>
            <Form.Nav>
            <Layout.Button
              type='submit'
              format='contained'
              >
              {(submitting) ? <Loader mode='light' /> : 'Confimar'}
              </Layout.Button>
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
    path,
    currentIndex,
    userDataFormRef,
    submitting,
    formRef,
    snackbarRef,
    onSubmit,
  ]);
};

Component.displayName = 'UserDataForm';
export default memo(Component);
