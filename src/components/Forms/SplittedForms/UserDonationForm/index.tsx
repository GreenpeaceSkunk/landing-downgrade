import React, { useCallback, useContext, useImperativeHandle, useMemo } from 'react';
import { pixelToRem } from 'meema.utils';
import { Wrapper, Button, } from '@bit/meema.ui-components.elements';
import { OnClickEvent } from 'greenpeace';
import { css } from 'styled-components';
import Form from '../../../Shared/Form'; // Move to bit
import { FormContext } from '../../context';
import { UserDonationFormContext } from './context';

interface IProps {}
export interface IRef {
  errors: any;
}

const Component: React.ForwardRefRenderFunction<IRef, IProps> = ((
  props: IProps,
  innerRef: React.ForwardedRef<IRef>
) => {
  const { donation, dispatch } = useContext(UserDonationFormContext);
  const { errors } = useContext(FormContext);

  const onClick = useCallback((evt: OnClickEvent) => {
    evt.preventDefault();
    evt.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    dispatch({
      type: 'UPDATE_USER_DONATION',
      payload: {
        [`${evt.currentTarget.name}`]: parseInt(evt.currentTarget.dataset.value),
      },
    });
  }, [
    dispatch,
  ]);
  
  useImperativeHandle(innerRef, () => {
    return {
      errors,
    }
  });
  
  return useMemo(() => (
    <Form.Content>
      <Form.Title>¿Cuánto vas a reducir?</Form.Title>
      <Form.Row>
        <Form.Group
          fieldName='percentDecrease'
        >
          <Wrapper
            customCss={css`
              display: flex;
              flex-wrap: wrap;
              width: 100%;
              margin-bottom: ${pixelToRem(15)};
            `}
          >
            {[10, 20, 30, 40, 50].map((value: number) => (
              <Button
                format='outlined'
                key={value}
                name='percentDecrease'
                data-value={value}
                customCss={css`
                  padding: ${pixelToRem(10)} ${pixelToRem(34)};
                  border-radius: ${pixelToRem(5)};
                  border-color: #BDBDBD !important;
                  border-width: ${pixelToRem(1)};
                  color: ${({theme}) => theme.color.secondary.dark} !important;
                  background-color: white;
                  font-size: ${pixelToRem(16)};
                  margin-bottom: ${pixelToRem(10)};
                  width: 30%;

                  &:not(:last-child) {
                    margin-right: 3%;
                  }

                  ${(donation.percentDecrease === value) && css`
                    background-color: ${({theme}) => theme.color.primary.normal} !important;
                    border-color: ${({theme}) => theme.color.primary.normal} !important;
                    color: white !important;
                    `}
                    
                    &:hover {
                      border-color: ${({theme}) => theme.color.primary.normal} !important;
                      background-color: white;;
                    }

                    @media (min-width: ${({ theme }) => pixelToRem(theme.responsive.tablet.minWidth)}) {
                      width: fit-content;

                      &:not(:last-child) {
                        margin-right: ${pixelToRem(16)};
                      }
                    }                  
                `}
                onClick={onClick}
              >{value}%</Button>
            ))}
          </Wrapper>
        </Form.Group>
      </Form.Row>
    </Form.Content>
  ), [
    donation,
    onClick,
  ]);
});

Component.displayName = 'UserDonationForm';
export default React.forwardRef<IRef, IProps>(Component);
