import React, { memo, useEffect, useMemo, useRef, useState, Suspense, lazy, useContext } from 'react';
import { Switch, Route, useLocation, useRouteMatch, useHistory } from 'react-router-dom';
// import Carousel, { IRef as ICarouselRef} from '@bit/meema.ui-components.carousel';
import ContentSliderItem from './ContentSliderItem';
import Elements from '@bit/meema.ui-components.elements';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import Layout from '../Shared/Layout';
import Card from '../Card';
import VideoPlayer, { IRef as IVideoPlayerRef } from '../VideoPlayer';
import { Loader } from '../Shared';
import { FormContext } from '../Forms/context';

const UserDataForm = lazy(() => import('../Forms/UserDataForm'));
const CancelDonationForm = lazy(() => import('../Forms/CancelDonationForm'));
const ReduceDonationForm = lazy(() => import('../Forms/ReduceDonationForm'));

type PathType = {
  path: string;
  index: number;
  showContinueButton: boolean;
  goTo?: string;
};

const paths: Array<PathType> = [
  { path: '/user/information', index: 0, showContinueButton: false },
  { path: '/video', goTo: '/about-us', index: 1, showContinueButton: true },
  { path: '/about-us', index: 2, showContinueButton: false },
  { path: '/form/reduce', index: 3, showContinueButton: false },
  { path: '/form/cancel', index: 3, showContinueButton: false },
];

const total = 4;

const ContentSlider: React.FunctionComponent<{}> = memo(() => {
  const { submitted } = useContext(FormContext);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  // const [ sliderHeight, setSliderHeight ] = useState(0);
  const { pathname } = useLocation();
  // const [ total, setTotal ] = useState<number>(4);
  // const carouselRef = useRef<ICarouselRef>(null);
  const videoPlayerRef = useRef<IVideoPlayerRef>(null);
  const { path } = useRouteMatch();
  const history = useHistory();
  const [ allowContinue, setAllowContinue ] = useState<boolean>(false);

  // const getCurrentIndex = useCallback(() => {
  //   return carouselRef.current ? carouselRef.current.getIndex() : -1; 
  // }, []);
  
  // const onResizeHandler = useCallback((evt: any) => {
  //   setSliderHeight(
  //     document
  //       .querySelectorAll<HTMLElement>('.content-slider-item')
  //       .item(currentIndex).getBoundingClientRect().height
  //     );
  // }, [ currentIndex ]);

  useEffect(() => {
    if(pathname === '/' && paths.length) {
      setCurrentIndex(paths[0].index)
    } else {
      const path = paths.filter((_: PathType) => _.path === pathname);
      if(path.length) {
        const timeout = setTimeout(() => {
          setCurrentIndex(path[0].index);
        }, 100) 
        
        return () => {
          clearTimeout(timeout);
        }
      }
    }
  }, [ pathname ]);

  // useEffect(() => {
  //   if(carouselRef.current) {
  //     setTotal(carouselRef.current.getTotal());
  //   }
  // }, [ 
  //   carouselRef.current?.getTotal,
  //   total,
  // ]);

  useEffect(() => {
    history.push({
      pathname: `${paths[0].path}`,
    });
  }, [
    path,
    history,
  ]);

  useEffect(() => {
    // setSliderHeight(
    //   document
    //     .querySelectorAll<HTMLElement>('.content-slider-item')
    //     .item(currentIndex).getBoundingClientRect().height
    // );
    
    if(currentIndex === 1 && videoPlayerRef.current) {
      setAllowContinue(false);
      videoPlayerRef.current.onPlayVideo();
    }
  }, [
    currentIndex,
    // sliderHeight,
  ]);

  // useEffect(() => {
    // if(isMobile()) {
    //   window.addEventListener('resize', onResizeHandler);

    //   return () => {
    //     window.removeEventListener('resize', onResizeHandler)
    //   }

    // }
  // }, []);

  return useMemo(() => (
    <>
      {(currentIndex === 0) ? (
        <ContentSliderItem
          title='Subsistimos con aportes como el tuyo'
          text='Siempre podrás reducir el monto de tu donación o cancelarla directamente, sin vueltas.<br> Si aún no estás seguro, podés hacerlo en otro momento.'
        >
          <React.Suspense fallback={'User data form error'}>
            <UserDataForm />
          </React.Suspense>
        </ContentSliderItem>
      ) : (currentIndex === 1) ? (
        <ContentSliderItem title='Tu solicitud aún no termina.<br>Por favor, <em>mirá el video</em> antes de continuar'>
          <VideoPlayer
            ref={videoPlayerRef}
            // videoUrl='https://www.youtube.com/watch?v=FXr3_zGc0O4' 
            videoUrl='https://www.youtube.com/watch?v=QohH89Eu5iM'
            onEndedHandler={() => { setAllowContinue(true) }}  
          />
        </ContentSliderItem>
      ) : (currentIndex === 2) ? (
        <ContentSliderItem title='Antes de seguir, recordá que en Greenpeace:'>
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
              width: 80%;
              margin: ${pixelToRem(20)};
            `}
          >También podemos asegurarte que siempre podrás reducir el monto de tu donación o cancelarla, sin vueltas.</Layout.Text>
          <Elements.Nav
            customCss={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-self: flex-end;
              width: 100%;
              /* min-height: ${pixelToRem(100)}; */
              margin-top: ${pixelToRem(20)};
              padding-bottom: ${pixelToRem(20)};

              a {
                width: 100%;
                margin-bottom: ${pixelToRem(30)};
              }

              @media (min-width: ${({theme}) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                flex-direction: row;

                a {
                  width: fit-content;
                  margin-bottom: 0;

                  &:not(:last-child) {
                    margin-right: ${pixelToRem(30)};
                  }
                }
              }
            `}>
            <Layout.ButtonLink to='/form/cancel'>Cancelar mi donación</Layout.ButtonLink>
            <Layout.ButtonLink to='/form/reduce'>Reducir el monto</Layout.ButtonLink>
          </Elements.Nav>
        </ContentSliderItem>
      ) : (currentIndex === 3) ? (
        <ContentSliderItem>
          <Switch>
            <Route path={`/form/reduce`}>
              <Suspense fallback={<Loader mode='default' />}>
                <ReduceDonationForm />
              </Suspense>
            </Route>
            <Route path={`/form/cancel`}>
              <Suspense fallback={<Loader mode='default' />}>
                <CancelDonationForm />
              </Suspense>
            </Route>
          </Switch>
        </ContentSliderItem>
      ) : null}

      {!submitted && (
        <Elements.Wrapper
          customCss={css`
            display: flex;
            position: relative;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            align-items: center;
            margin-top: ${pixelToRem(40)};
            
            @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
              flex-direction: row-reverse;
              justify-content: flex-start;
            }
          `}
        >
          {(paths[currentIndex] && paths[currentIndex].showContinueButton) && <Elements.Nav customCss={css`
            display: flex;
            align-self: flex-end;
            margin-bottom: ${pixelToRem(40)};
          `}><Layout.ButtonLink to={paths[currentIndex].goTo || ''} disabled={!allowContinue}>Continuar</Layout.ButtonLink>
          </Elements.Nav>}

          <Elements.Wrapper
            customCss={css`
              display: flex;
              align-items: center;
              width: auto;
              pointer-events: none;

              @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                position: absolute;
                width: 100%;
                justify-content: center;
                margin-top: 0;
              }
            `}
          >
            {Array.from({ length: total }, (_, i) => i).map((idx: number) => (
              <Elements.Wrapper
                key={idx}
                customCss={css`
                  display: inline-flex;
                  width: ${pixelToRem(12)};
                  height: ${pixelToRem(12)};
                  border-radius: 50%;
                  border: ${pixelToRem(2)} solid ${({theme}) => theme.color.primary.normal};

                  &:not(:last-child) {
                    margin-right: ${pixelToRem(9)};
                  }

                  ${idx <= currentIndex && css`
                    background-color: ${({theme}) => theme.color.primary.normal};
                  `};
                `}
              />
            ))}
          </Elements.Wrapper>  
        </Elements.Wrapper>
      )}
    </>
  ), [
    currentIndex,
    allowContinue,
    submitted,
    // total,
    // sliderHeight,
    // getCurrentIndex,
  ]);
});

export default ContentSlider;
