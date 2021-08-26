import React, {
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Input } from '@bit/meema.gpar-ui-components.form';
import Form from '../../../Shared/Form'; // Move to bit
import { useRouteMatch } from 'react-router-dom';
import { FormContext } from '../../context';
import { 
  validateFirstName,
  validateLastName,
  validateCitizenId,
  validateEmail,
  validatePhoneNumber,
  validateAreaCode,
} from '../../../../utils/validators';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import { OnChangeEvent } from 'greenpeace';
import { UserDataFormContext } from './context';

interface IProps {}
export interface IRef {
  isValid: boolean;
}

const Component: React.ForwardRefRenderFunction<IRef, IProps> = ((
  props: IProps,
  innerRef: React.ForwardedRef<IRef>
) => {
  const { path } = useRouteMatch();
  const { showFieldErrors, onUpdateFieldHandler } = useContext(FormContext);
  const { data, dispatch } = useContext(UserDataFormContext);
  const [ isValid, setIsValid ] = useState<boolean>(false);

  const onChangeHandler = useCallback((evt: OnChangeEvent) => {
    evt.preventDefault();
    dispatch({
      type: 'UPDATE_USER_DATA',
      payload: {
        [`${evt.currentTarget.name}`]: evt.currentTarget.value,
      },
    });
  }, [
    data,
    dispatch,
  ]);

  useImperativeHandle(innerRef, () => {
    return {
      isValid,
    }
  });

  return useMemo(() => (
    <Form.Content>
      <Form.Title>Datos personales</Form.Title>
      <Form.Row>
        <Form.Column>
          <Form.Group
            value={data.firstName}
            fieldName='firstName'
            labelText='Nombre *'
            validateFn={validateFirstName}
            onUpdateHandler={onUpdateFieldHandler}
            showErrorMessage={showFieldErrors}
          >
            <Input
              name='firstName'
              type='text'
              placeholder='Daniel'
              value={data.firstName}
              onChange={onChangeHandler}
              />
          </Form.Group>
        </Form.Column>
        <Form.Column>
          <Form.Group
            value={data.lastName}
            fieldName='lastName'
            labelText='Apellido *'
            showErrorMessage={showFieldErrors}
            validateFn={validateLastName}
            onUpdateHandler={onUpdateFieldHandler}
            >
            <Input
              name='lastName'
              type='text'
              placeholder='Alvarez'
              value={data.lastName}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Form.Column>
      </Form.Row>

      <Form.Row>
        <Form.Column>
          <Form.Group
            fieldName='citizenId'
            value={data.citizenId}
            labelText='DNI *'
            showErrorMessage={showFieldErrors}
            validateFn={validateCitizenId}
            onUpdateHandler={onUpdateFieldHandler}
          >
            <Input
              name='citizenId'
              type='text'
              placeholder='23755211'
              value={data.citizenId}
              onChange={onChangeHandler}
              maxLength={8}
            />
          </Form.Group>
        </Form.Column>
        <Form.Column>
          <Form.Group
            fieldName='areaCode'
            value={data.areaCode}
            labelText='Cod. Área *'
            labelBottomText='Sin el 0'
            showErrorMessage={showFieldErrors}
            customCss={css`
              flex-basis: ${pixelToRem(140)};
            `}
            validateFn={validateAreaCode}
            onUpdateHandler={onUpdateFieldHandler}
          >
            <Input
              name='areaCode'
              type='text'
              placeholder='11'
              value={data.areaCode}
              maxLength={2}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group
            fieldName='mobilePhoneNumber'
            value={data.mobilePhoneNumber}
            labelText='Celular *'
            labelBottomText='Sin el 15'
            showErrorMessage={showFieldErrors}
            validateFn={validatePhoneNumber}
            onUpdateHandler={onUpdateFieldHandler}
          >
            <Input
              name='mobilePhoneNumber'
              type='text'
              placeholder='61234567'
              value={data.mobilePhoneNumber}
              maxLength={8}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Form.Column>
      </Form.Row>
      <Form.Row>
        <Form.Column
          customCss={css`
            flex-basis: 50%;
          `}
        >
          <Form.Group
            value={data.email}
            fieldName='email'
            labelText='Email *'
            showErrorMessage={showFieldErrors}
            validateFn={validateEmail}
            onUpdateHandler={onUpdateFieldHandler}
          >
            <Input
              name='email'
              type='email'
              placeholder='daniel.alvarez@gmail.com'
              value={data.email}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </Form.Column>
      </Form.Row>
    </Form.Content>
  ), [
    path,
    data,
    isValid,
    showFieldErrors,
    onChangeHandler,
    onUpdateFieldHandler,
  ]);
});

Component.displayName = 'UserDataForm';
export default React.forwardRef<IRef, IProps>(Component);
