import React, { memo, useEffect, useMemo, useRef, useState, Suspense, lazy, useContext } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import ContentSliderItem from './ContentSliderItem';
import Elements from '@bit/meema.ui-components.elements';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import Layout from '../Shared/Layout';
import Card from '../Card';
import VideoPlayer, { IRef as IVideoPlayerRef } from '../VideoPlayer';
import { Loader } from '../Shared';
import { FormContext } from '../Forms/context';
import { AppContext } from '../App/context';

const UserDataForm = lazy(() => import('../Forms/UserDataForm'));
const CancelDonationForm = lazy(() => import('../Forms/CancelDonationForm'));
const CancelDonationFormThankYou = lazy(() => import('../Forms/CancelDonationForm/ThankYou'));
const ReduceDonationForm = lazy(() => import('../Forms/ReduceDonationForm'));
const ReduceDonationFormThankYou = lazy(() => import('../Forms/ReduceDonationForm/ThankYou'));
const PostponeDonationForm = lazy(() => import('../Forms/PostponeDonationForm'));
const PostponeDonationFormThankYou = lazy(() => import('../Forms/PostponeDonationForm/ThankYou'));

type PathType = {
  path: string;
  index?: number;
  showContinueButton?: boolean;
  goTo?: string;
  redirectTo: string;
};

type RouteType = {
  [a: string]: PathType;
}
const routing: RouteType = {
  'video': { path: '/video', redirectTo: 'about-us', showContinueButton: true },
  'about-us': { path: '/about-us', redirectTo: 'video', showContinueButton: false },
}

const ContentSlider: React.FunctionComponent<{}> = memo(() => {
  const { submitted } = useContext(FormContext);
  const { queryParams} = useContext(AppContext);
  const [ currentPath, setCurrentPath ] = useState<PathType | null>(null);
  const { pathname } = useLocation();
  const videoPlayerRef = useRef<IVideoPlayerRef>(null);
  const history = useHistory();
  const [ allowContinue, setAllowContinue ] = useState<boolean>(false);

  useEffect(() => {
    if(pathname !== '/') {
      setCurrentPath(routing[pathname.slice(1, pathname.length).replace(/\//g, '-')]);
    } else {
      setCurrentPath(routing['video']);
    }
  }, [
    pathname,
    queryParams,
  ]);
        
  useEffect(() => {
    if(currentPath) {
      history.push({
        pathname: `${currentPath.path}`,
        search: `${queryParams}`,
      });
    }
  }, [
    currentPath,
  ]);

  useEffect(() => {
    setCurrentPath(routing['video']);
  }, []);

  return useMemo(() => (
    <>
      <Switch>

        <Route path='/video'>
          <ContentSliderItem title='Por favor, <em>mirá el video</em> antes de continuar'>
            <React.Suspense fallback={'User data form error'}>
              <VideoPlayer
                ref={videoPlayerRef}
                videoUrl='https://www.youtube.com/watch?v=FXr3_zGc0O4' 
                onEndedHandler={() => { setAllowContinue(true) }}  
              />
            </React.Suspense>
          </ContentSliderItem>
        </Route>
        
        <Route path='/user/information'>
          <ContentSliderItem
            title='Subsistimos con aportes como el tuyo'
            text='Siempre podrás reducir el monto de tu donación, postergar tu aporte o cancelarlo, sin vueltas. Si aún no estás seguro, podés hacerlo en otro momento.'
          >
            <React.Suspense fallback={'User data form error'}>
              <UserDataForm redirectTo={`/${(queryParams.get('from') || '').replace(/\-/g, '/')}/thankyou`} />
            </React.Suspense>
          </ContentSliderItem>
        </Route>

        <Route path='/about-us'>
          <ContentSliderItem title='Antes de seguir, recordá que en Greenpeace:'>
            <Elements.Wrapper>
              <Layout.Cards>
                <Card
                  title='No recibimos aportes de empresas privadas.'
                  icon='factory'
                />
                <Card
                  title='No recibimos aportes de partidos políticos ni estamos vinculados con ellos.'
                  icon='government'
                />
              </Layout.Cards>
              <Layout.Text
                color='light'
                customCss={css`
                  width: fit-content;
                  margin: ${pixelToRem(20)};
                  text-align: center;
                `}
              >También podemos asegurarte que siempre podrás reducir el monto de tu donación, postergar tu aporte o cancelarlo, sin vueltas.</Layout.Text>
              <Elements.Nav
                customCss={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-self: flex-end;
                  width: 100%;
                  margin-top: ${pixelToRem(60)};
                  padding-bottom: ;
                  padding: ${pixelToRem(20)} ${pixelToRem(80)};

                  a {
                    width: 100%;
                    margin-bottom: ${pixelToRem(30)};
                  }

                  @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                    flex-direction: row;
                    padding: 0;

                    a {
                      width: fit-content;
                      margin-bottom: 0;

                      &:not(:last-child) {
                        margin-right: ${pixelToRem(30)};
                      }
                    }
                  }
                `}>
                <Layout.ButtonLink to={`/form/cancel?${queryParams}`}>Cancelar mi donación</Layout.ButtonLink>
                <Layout.ButtonLink to={`/form/reduce?${queryParams}`}>Reducir el monto</Layout.ButtonLink>
                <Layout.ButtonLink to={`/form/postpone?${queryParams}`}>Postergar mi donación</Layout.ButtonLink>
              </Elements.Nav>
            </Elements.Wrapper>
          </ContentSliderItem>
        </Route>

        <Route exact path='/form/reduce/thankyou'>
          <Suspense fallback={<Loader mode='default' />}>
            <ReduceDonationFormThankYou />
          </Suspense>
        </Route>
        
        <Route path='/form/reduce'>
          <Suspense fallback={<Loader mode='default' />}>
            <ReduceDonationForm />
          </Suspense>
        </Route>
        
        <Route exact path='/form/cancel/thankyou'>
          <Suspense fallback={<Loader mode='default' />}>
            <CancelDonationFormThankYou />
          </Suspense>
        </Route>
        
        <Route path='/form/cancel'>
          <Suspense fallback={<Loader mode='default' />}>
            <CancelDonationForm />
          </Suspense>
        </Route>
        
        <Route exact path='/form/postpone/thankyou'>
          <Suspense fallback={<Loader mode='default' />}>
            <PostponeDonationFormThankYou />
          </Suspense>
        </Route>
        
        <Route path='/form/postpone'>
          <Suspense fallback={<Loader mode='default' />}>
            <PostponeDonationForm />
          </Suspense>
        </Route>
      </Switch>
    </>
  ), [
    queryParams,
    currentPath,
    allowContinue,
    submitted,
  ]);
});

export default ContentSlider;
