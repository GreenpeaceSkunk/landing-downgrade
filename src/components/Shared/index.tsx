import Images from '../../images';
import Elements from '@bit/meema.ui-components.elements';
import ThreeCircles from '@bit/meema.ui-components.loaders.three-circles';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';

export const Logo = () => (
  <Elements.A
    href='https://greenpeace.org.ar'
  >
    <Elements.Img 
      alt='Greenpeace'
      src={Images.Icons.GreenpeaceLogoWhite}
      customCss={css`
        width: 10rem;
        height: auto;
      `}
      width='10rem'
      height='auto'
    />
  </Elements.A>
);


export const Loader = () => (
  <Elements.Wrapper
    customCss={css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      padding: ${pixelToRem(16)} 0;
    `}
  >
    <ThreeCircles 
      circleCss={css`
        background-color: ${props => props.theme.color.primary.normal};
      `}
    />
  </Elements.Wrapper>
);

const defaults = {
  Loader,
  Logo,
};

export default defaults;