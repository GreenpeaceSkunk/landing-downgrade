import React, { FunctionComponent, memo, useMemo } from 'react';
import Elements from '@bit/meema.ui-components.elements';
import Layout from '../../Shared/Layout';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';

const ContentSliderItem: FunctionComponent<{ title?: string; text?: string; }> = memo(({ title, text, children }) => {
  return useMemo(() => (
    <Elements.View
      customCss={css`
        flex: 0 0 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      `}
    >
      {(title || text) && (
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
      )}
      <Elements.Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          /* background-color: purple; */
        `}
      >{children}</Elements.Wrapper>
    </Elements.View>
  ), []);
})

export default ContentSliderItem;
