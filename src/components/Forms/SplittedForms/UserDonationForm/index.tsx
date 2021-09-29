import React, {
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { pixelToRem } from 'meema.utils';
import { Wrapper, Button, } from '@bit/meema.ui-components.elements';
import { OnClickEvent } from 'greenpeace';
import { useRouteMatch } from 'react-router-dom';
import { css } from 'styled-components';
import Form from '../../../Shared/Form'; // Move to bit
import { FormContext } from '../../context';
import { UserDonationFormContext } from './context';

interface IProps {}
export interface IRef {
  isValid: boolean;
  errors: any;
}

const Component: React.ForwardRefRenderFunction<IRef, IProps> = ((
  props: IProps,
  innerRef: React.ForwardedRef<IRef>
) => {
  // const [{ donation }, dispatch ] = useReducer(reducer, initialState);
  const { donation, dispatch } = useContext(UserDonationFormContext);
  const { path } = useRouteMatch();
  const { showFieldErrors, errors, onUpdateFieldHandler } = useContext(FormContext);
  const [ isValid, setIsValid ] = useState<boolean>(false);

  const onClick = useCallback((evt: OnClickEvent) => {
    evt.preventDefault();
    console.log('onClick', 'UPDATE_USER_DONATION');
    dispatch({
      type: 'UPDATE_USER_DONATION',
      payload: {
        [`${evt.currentTarget.name}`]: parseInt(evt.currentTarget.dataset.value),
      },
    });
  }, [
    donation,
    dispatch,
  ]);
  
  useImperativeHandle(innerRef, () => {
    return {
      isValid,
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
                  border-color: ${({theme}) => theme.color.secondary.normal} !important;
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
    path,
    showFieldErrors,
    errors,
    donation,
    onUpdateFieldHandler,
    onClick,
  ]);
});

Component.displayName = 'UserDonationForm';
export default React.forwardRef<IRef, IProps>(Component);
