import React, { memo, useEffect, useMemo, useRef, useState, Suspense, lazy, useContext } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import ContentSliderItem from './ContentSliderItem';
import VideoPlayer, { IRef as IVideoPlayerRef } from '../VideoPlayer';
import { Loader } from '../Shared';
import { FormContext } from '../Forms/context';
import { AppContext } from '../App/context';

const UserDataForm = lazy(() => import('../Forms/UserDataForm'));
const AboutUs = lazy(() => import('../AboutUs'));
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
  const { queryParams } = useContext(AppContext);
  const [ currentPath, setCurrentPath ] = useState<PathType | null>(null);
  const { pathname } = useLocation();
  const videoPlayerRef = useRef<IVideoPlayerRef>(null);
  const history = useHistory();

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
    history,
    queryParams,
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
                allowNext={(!submitted)}
                onEndedHandler={() => {}}
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
              <UserDataForm />
            </React.Suspense>
          </ContentSliderItem>
        </Route>

        <Route path='/about-us'>
          <ContentSliderItem title='Antes de seguir, recordá que en Greenpeace:'>
            <React.Suspense fallback={'AboutUs error'}>
              <AboutUs />
            </React.Suspense>
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
    submitted,
  ]);
});

export default ContentSlider;
