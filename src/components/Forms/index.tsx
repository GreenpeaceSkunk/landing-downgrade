import React, { FunctionComponent, lazy, memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Elements, { Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import styled, { css } from 'styled-components';
import { FormProvider } from './context';
import { NavLink, Route, Switch, useLocation } from 'react-router-dom';
import { Loader } from '../Shared';
import Layout from '../Shared/Layout';

const ReduceDonationForm = lazy(() => import('./ReduceDonationForm'));
const CancelDonationForm = lazy(() => import('./CancelDonationForm'));

const FormWrapper = styled(Wrapper)`
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: scroll;
  height: 100vh;
  width: 100vw;
  z-index: 99;
  background-color: ${({ theme }) => theme.color.secondary.light};
  
  @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    width: 100%;
    position: relative;
    height: auto;
  }
`;

const TabButton = styled(NavLink)`
  padding: ${pixelToRem(18)} ${pixelToRem(40)};
  font-size: ${pixelToRem(18)};
  background-color: ${({ theme }) => theme.color.primary.normal};
  transition: all 250ms ease;
  color: white;
  border-radius: ${pixelToRem(40)};
  text-align: center;
  
  @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
    padding-right: ${pixelToRem(75)};
    padding-left: ${pixelToRem(75)};
  }
`;

const Component: FunctionComponent<{}> = () => {
  const { pathname } = useLocation();
  const [ posArrowLeftX, setPosArrowLeftX ] = useState<number>(0);
  const triangleRef = useRef<HTMLDivElement>(null);
  const reduceButtonRef = useRef<any>(null);
  const cancelButtonRef = useRef<any>(null);

  const onMoveTriangle = useCallback((parentButton: any) => {
    if(triangleRef.current && parentButton) {
      const trianglePosX = triangleRef.current.getBoundingClientRect();
      setPosArrowLeftX(parentButton.getBoundingClientRect().x - trianglePosX.x + (parentButton.getBoundingClientRect().width / 2) - 60);
    }
  }, [
    triangleRef,
  ]);

  useEffect(() => {
    if(/reduce/.test(pathname) && reduceButtonRef && reduceButtonRef.current) {
      onMoveTriangle(reduceButtonRef.current);
    }
    
    if(/cancel/.test(pathname) && reduceButtonRef && reduceButtonRef.current) {
      onMoveTriangle(cancelButtonRef.current);
    }
  }, [
    pathname,
    onMoveTriangle,
  ]);

  return useMemo(() => (
    <Elements.View
      customCss={css`
        width: 100%;
      `}
    >
      <Elements.Nav
        customCss={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          margin-bottom: ${pixelToRem(50)};
          padding: 0 ${pixelToRem(20)};

          > * {
            &:not(:last-child) {
              margin-bottom: ${pixelToRem(25)};
            }
          }
          
          @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            flex-direction: row;
            width: 100%;
            margin-bottom: ${(/donation/.test(pathname) ? 0 : pixelToRem(50))};

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
          ref={reduceButtonRef}
        >Quiero disminuir el monto</TabButton>
        <TabButton
          activeClassName='active'
          to={`/donation/cancel`}
          ref={cancelButtonRef}
        >Quiero cancelar mi donación</TabButton>
      </Elements.Nav>
      
      {(/donation/.test(pathname)) && (
        <>
          <Wrapper
            ref={triangleRef}
            customCss={css`
              display: none;
              align-items: flex-end;
              height: ${pixelToRem(62)};
              opacity: ${(posArrowLeftX > 0) ? 1 : 0};
              
              @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                display: flex;
              }
            `}
          >
            <Wrapper
              customCss={css`
                width: 0; 
                height: 0; 
                border-left: ${pixelToRem(60)} solid transparent;
                border-right: ${pixelToRem(60)} solid transparent;
                border-bottom: ${pixelToRem(28)} solid ${({ theme }) => theme.color.secondary.light};
                transition: all 250ms ease;
                transform: translateX(${pixelToRem(posArrowLeftX)});
                transform-origin: center center;
              `}
            />
          </Wrapper>
          <Layout.Panel
            customCss={css`
              background-color: ${({ theme }) => theme.color.secondary.light};
            `}
          >
            <Layout.PanelWrapper>
              <FormProvider>
                <Switch>
                  <Route path={`/donation/reduce`}>
                    <Suspense fallback={<Loader mode='default' />}>
                      <FormWrapper>
                        <ReduceDonationForm />
                      </FormWrapper>
                    </Suspense>
                  </Route>
                  <Route path={`/donation/cancel`}>
                    <Suspense fallback={<Loader mode='default' />}>
                      <FormWrapper>
                        <CancelDonationForm />
                      </FormWrapper>
                    </Suspense>
                  </Route>
                </Switch>
              </FormProvider>
            </Layout.PanelWrapper>
          </Layout.Panel>
        </>
      )}
    </Elements.View>
  ), [
    pathname,
    posArrowLeftX,
  ])
};

Component.displayName = 'ReduceDonationForm';
export default memo(Component);
