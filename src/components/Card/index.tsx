import { H1, Img, P, Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { css } from 'styled-components';

interface IProps {
  description?: string;
  icon?: string;
  title?: string;
}

const Component: React.FunctionComponent<IProps> = ({
  description,
  icon,
  title,
}) => {
  const [ imageSrc, setImageSrc ] = useState<string>();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { default: src } = await import(`../../images/icons/${icon}.svg`);
        setImageSrc(src);
      } catch (err) {
        console.log(`Error when loading image`);
      }
      
      return () => {
        isMounted = false;
      }
    })()
  }, [
    icon,
  ]);

  return useMemo(() => (
    <Wrapper
      customCss={css`
        width: ${pixelToRem(400)};
        padding: ${pixelToRem(52)} ${pixelToRem(31)};
        background: #FFFFFF;
        box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(34)} rgba(0, 0, 0, .08);
        border-radius: ${pixelToRem(8)};
        text-align: center;
      `}
    >
      {(imageSrc) && (
        <Img
          alt={icon}
          src={imageSrc}
          customCss={css`
            margin-bottom: ${pixelToRem(30)};
          `}
        />
      )} 

      {(title) && (
        <H1
          customCss={css`
            margin-bottom: ${pixelToRem(18)};
            font-size: ${pixelToRem(18)};
            line-height: ${pixelToRem(22)};
          `}
          dangerouslySetInnerHTML={{__html: title}}
        />
      )}

      {(description) && (
        <P
          customCss={css`
            font-size: ${pixelToRem(16)};
            line-height: ${pixelToRem(20)};
          `}
        >{description}</P>
      )}
    </Wrapper>
  ), [
    imageSrc,
  ]);
};

Component.displayName = 'Card';
export default memo(Component);
