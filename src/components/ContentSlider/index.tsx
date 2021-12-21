import React, { memo, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel, { IRef as ICarouselRef} from '@bit/meema.ui-components.carousel';
import ContentSliderItem from './ContentSliderItem';
import UserDataForm from '../Forms/UserDataForm';
import VideoPlayer from '../VideoPlayer';
import Elements from '@bit/meema.ui-components.elements';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import Layout from '../Shared/Layout';
import Card from '../Card';
import { Loader } from '../Shared';
import CancelDonationForm from '../Forms/CancelDonationForm';

type PathType = {
  path: string;
  index: number;
  showContinueButton: boolean;
};

const paths: Array<PathType> = [
  { path: '/user/information', index: 0, showContinueButton: false, },
  { path: '/video', index: 1, showContinueButton: true, },
];

const ContentSlider: React.FunctionComponent<{}> = memo(() => {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const { pathname } = useLocation();
  const [ total, setTotal ] = useState<number>(0);
  const carouselRef = useRef<ICarouselRef>(null);

  useEffect(() => {
    const path = paths.filter((_: PathType) => _.path === pathname);
    if(path.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(path[0].index);
      }, 500) 

      return () => {
        clearTimeout(timeout);
      }
    }
  }, [ pathname ]);

  useEffect(() => {
    if(carouselRef.current) {
      setTotal(carouselRef.current.getTotal());
    }
  }, [ 
    carouselRef.current?.getTotal,
    total,
  ]);

  return useMemo(() => (
    <>
      <Carousel
        ref={carouselRef}
        index={currentIndex}
        showControls={false}
        showIndicators={false}
      >
        <ContentSliderItem
          title='Subsistimos con aportes como el tuyo'
          text='Siempre podrás reducir el monto de tu donación o cancelarla directamente, sin vueltas.<br> Si aún no estás seguro, podés hacerlo en otro momento.'
        >
          <React.Suspense fallback={'User data form error'}>
            <UserDataForm />
          </React.Suspense>
        </ContentSliderItem>

        <ContentSliderItem title='Tu solicitud aún no termina.<br>Por favor, <em>mirá el video</em> antes de continuar'>
          <VideoPlayer videoUrl='https://www.youtube.com/watch?v=FXr3_zGc0O4' />
        </ContentSliderItem>

        <ContentSliderItem
          title='Antes de seguir, recordá que en Greenpeace:'
        >
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
          <Layout.Text>También podemos asegurarte que siempre podrás reducir el monto de tu donación o cancelarla, sin vueltas.</Layout.Text>
          <Elements.Nav customCss={css`display: flex; justify-content: center; width: 100%;`}>
            <Layout.ButtonLink to='/form/reduce/checkout'>Reducir el monto</Layout.ButtonLink>
            <Layout.ButtonLink to='/form/cancel/checkout'>Cancelar mi donación</Layout.ButtonLink>
          </Elements.Nav>
        </ContentSliderItem>

        <ContentSliderItem>
          <Switch>
            <Route exact path={`/form/reduce/checkout`}>
              Reduce
              {/* <Suspense fallback={<Loader mode='default' />}>
              </Suspense> */}
            </Route>
            <Route path={`/form/cancel/checkout`}>
              <Suspense fallback={<Loader mode='default' />}>
                <CancelDonationForm />
              </Suspense>
            </Route>
          </Switch>
        </ContentSliderItem>
      </Carousel>
      <Elements.Wrapper
        customCss={css`
          display: flex;
          justify-content: space-between;
          align-self: flex-end;
          width: 50%;
        `}
      >
        <Elements.Wrapper
          customCss={css`
            display: flex;
            align-items: center;
            width: auto;
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

                &:not(last-child) {
                  margin-right: ${pixelToRem(9)};
                }

                ${idx <= currentIndex && css`
                  background-color: ${({theme}) => theme.color.primary.normal};
                `};
              `}
            />
          ))}
        </Elements.Wrapper>
        {(paths[currentIndex] && paths[currentIndex].showContinueButton) && (
          <Layout.Button
            type='submit'
            format='contained'
            disabled={!true}
            onClick={(evt: MouseEvent) => {
              evt.preventDefault();
              setCurrentIndex(currentIndex + 1)
            }}
          >Continuar</Layout.Button>
        )}
      </Elements.Wrapper>
    </>
  ), [
    currentIndex,
    total,
  ]);
});

export default ContentSlider;
