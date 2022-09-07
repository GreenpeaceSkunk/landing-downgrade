import React, { FormEvent, memo, useCallback, useContext, useMemo, useRef } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import { Loader } from '../../Shared';
import Form from '../../Shared/Form'; // Move to bit
import Layout from '../../Shared/Layout';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { FormContext } from '../context';
import UserDataForm, { IRef as IUserDataFormRef } from '../SplittedForms/UserDataForm';
import { UserDataFormContext } from '../SplittedForms/UserDataForm/context';
import { css } from 'styled-components';
import Snackbar, { IRef as ISnackbarRef } from '../../Snackbar';
import { pixelToRem } from 'meema.utils';

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
    payload,
    serviceForm,
    dispatch,
    setShowFieldErrors,
  } = useContext(FormContext);
  const { data: { user: { data }} } = useContext(UserDataFormContext);
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

        if(payload && serviceForm) {
          const Service = await (import (`../${serviceForm}/service`));
          if(Service) {
            const { save } = Service;

            const result = await save({
              citizenId: data.citizenId,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              userAgent: window.navigator.userAgent,
              ...payload,
            });

            if(result.error) {
              console.log('Error inesperado', result.message);
            } else {
              if(redirectTo) {
                history.push(redirectTo);
              }
            }
          }
        }
      })();
    }
  }, [
    data,
    totalErrors,
    history,
    payload,
    serviceForm,
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
            <Form.Nav
              customCss={css`
                display: flex;
                flex-direction: column;
                align-items: center !important;
                justify-content: space-between;
                width: 100%;

                a {
                  padding: 0;
                  background: transparent;
                  color: ${({theme}) => theme.color.primary.dark};
                  text-decoration: underline;
                  margin-bottom: ${pixelToRem(40)} !important;
                  
                  &:not(:last-child) {
                    margin-bottom: 0;
                  }

                  &:hover {
                    background: transparent;
                  }
                }

                @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                  flex-direction: row !important;
                  align-items: center !important;
                }
              `}
            >
              <Layout.Link type='text' format='contained' href='https://www.greenpeace.org/argentina' target='_self'>Continuar como socio</Layout.Link>
              <Layout.Button
                type='submit'
                format='text'
                >{(submitting) ? <Loader mode='light' /> : 'Confimar la baja'}
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
    payload,
    serviceForm,
  ]);
};

Component.displayName = 'UserDataForm';
export default memo(Component);

