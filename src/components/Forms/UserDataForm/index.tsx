import React, { FormEvent, memo, useCallback, useContext, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
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

interface IProps {
  redirectTo: string;
}

const Component: React.FunctionComponent<IProps> = ({ redirectTo }) => {
  const history = useHistory();
  const formRef = useRef<HTMLFormElement>(null);
  const userDataFormRef = useRef<IUserDataFormRef>(null);
  const { path } = useRouteMatch();
  const {
    totalErrors,
    submitting,
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
        if(result.error) {
          console.log('Error inesperado', result.message);
        } else {
          if(redirectTo) {
            history.push(redirectTo);
          }
        }
      })();
    }
  }, [
    data,
    totalErrors,
    history,
    redirectTo,
    dispatch,
    setShowFieldErrors,
  ]);

  return useMemo(() => (
    <Elements.Wrapper customCss={css`width: 100%;`}>
      <Switch>
        <Route path={path}>
          <Form.Main
            ref={formRef}
            onSubmit={onSubmit}
          >
            <UserDataForm ref={userDataFormRef} />
            <Form.Nav>
              <Layout.Button
                type='submit'
                format='contained'
                >{(submitting) ? <Loader mode='light' /> : 'Confimar'}
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
    userDataFormRef,
    submitting,
    formRef,
    snackbarRef,
    redirectTo,
    onSubmit,
  ]);
};

Component.displayName = 'UserDataForm';
export default memo(Component);
