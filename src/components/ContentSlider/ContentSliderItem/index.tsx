import React, { FunctionComponent, memo, useMemo } from 'react';
import Elements, { View, Wrapper } from '@bit/meema.ui-components.elements';
import Layout from '../../Shared/Layout';
import styled, { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';

const Title = styled(Elements.H1)`
  color: white;
`;

const Text = styled(Elements.P)`
  color: white;
`;

const ContentSliderItem: FunctionComponent<{ title?: string; text?: string; }> = memo(({ title, text, children }) => {
  return useMemo(() => (
    <Elements.View
      customCss={css`
        flex: 0 0 100%;
        background-color: purple;
        overflow: hidden;
      `}
    >
      <Elements.Header customCss={css`margin-bottom: ${pixelToRem(20)};`}>
        {title && <Layout.Title color='light' dangerouslySetInnerHTML={{__html: title}} /> }
        {text && <Layout.Text color='light' dangerouslySetInnerHTML={{__html: text}} /> }
      </Elements.Header>
      <Elements.Wrapper
        customCss={css`
          display: flex;
          justify-content: center;
          flex: 0 0 auto;
        `}
      >{children}</Elements.Wrapper>
    </Elements.View>
  ), []);
})

export default ContentSliderItem;
