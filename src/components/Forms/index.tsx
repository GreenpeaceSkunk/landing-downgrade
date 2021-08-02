import React, { FunctionComponent, lazy, memo, Suspense, useEffect, useMemo } from 'react';
import Elements, { Nav, Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import styled, { css } from 'styled-components';
import { FormProvider } from './context';
import { NavLink, Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { Loader } from '../Shared';

const ReduceDonationForm = lazy(() => import('./ReduceDonationForm'));
const CancelDonationForm = lazy(() => import('./CancelDonationForm'));

const TabButton = styled(NavLink)`
  /* width: 100%; */
  padding: ${pixelToRem(18)} ${pixelToRem(40)};
  font-size: ${pixelToRem(18)};
  background-color: ${({ theme }) => theme.color.primary.normal};
  transition: all 250ms ease;
  color: white;
  border-radius: ${pixelToRem(40)};
  
  /* &:first-child {
    border-radius: ${pixelToRem(30)} 0 0 ${pixelToRem(30)};
  } */
  
  /* &:last-child {
    border-radius: 0 ${pixelToRem(30)} ${pixelToRem(30)} 0;
  } */
  &:not(:last-child) {
    /* margin-right: ${pixelToRem(25)}; */
  }
  
  &.active {}

  @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    padding-right: ${pixelToRem(75)};
    padding-left: ${pixelToRem(75)};
  }
`;

const Component: FunctionComponent<{}> = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { path } = useRouteMatch();

  return useMemo(() => (
    <Elements.View
      customCss={css`
        padding-bottom: ${pixelToRem(30)};
        width: 100%;
      `}
    >
      <Elements.Nav
        customCss={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;

          > * {
            &:not(:last-child) {
              margin-bottom: ${pixelToRem(25)};
            }
          }
          
          @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            flex-direction: row;
            width: 100%;

            > * {
              &:not(:last-child) {
                margin-bottom: 0;
                margin-right: ${pixelToRem(24)};
              }
            }
          }
        `}
      >
        <TabButton
          to={`/donation/reduce`}
          activeClassName='active'
        >Quiero disminuir el monto</TabButton>
        <TabButton
          activeClassName='active'
          to={`/donation/cancel`}
        >Quiero cancelar mi donación</TabButton>
      </Elements.Nav>
      <Wrapper>
        <FormProvider>
          <Switch>
            <Route path={`/donation/reduce`}>
              <Suspense fallback={<Loader />}>
                <ReduceDonationForm />
              </Suspense>
            </Route>
            <Route path={`/donation/cancel`}>
              <Suspense fallback={<Loader />}>
                <CancelDonationForm />
              </Suspense>
            </Route>
          </Switch>
        </FormProvider>
      </Wrapper>
    </Elements.View>
  ), [
    pathname,
  ])
};

Component.displayName = 'ReduceDonationForm';
export default memo(Component);
