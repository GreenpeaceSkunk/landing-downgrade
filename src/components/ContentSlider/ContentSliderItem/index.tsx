import React, { FunctionComponent, memo, useMemo } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import Layout from '../../Shared/Layout';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';

const ContentSliderItem: FunctionComponent<{ title?: string; text?: string; }> = memo(({ title, text, children }) => {
  return useMemo(() => (
    <Elements.View
      className='content-slider-item'
      customCss={css`
        flex: 0 0 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        /* height: fit-content; */
        /* background-color: purple; */
        /* height: 100%; */
      `}
    >
      <Elements.Header 
        customCss={css`
          display: flex;
          flex-direction: column;
          flex: 0 0 auto;
          margin-bottom: ${pixelToRem(20)};
        `}>
        {title && <Layout.Title color='light' dangerouslySetInnerHTML={{__html: title}} /> }
        {text && <Layout.Text color='light' dangerouslySetInnerHTML={{__html: text}} /> }
      </Elements.Header>
      <Elements.Wrapper
        className='content-slider-item__children'
        customCss={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          
          @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
            height: 100%;
            /* background-color: orange; */
          }
        `}
      >{children}</Elements.Wrapper>
    </Elements.View>
  ), []);
})

export default ContentSliderItem;
