import React, { useCallback, useContext, useImperativeHandle, useMemo } from 'react';
import Form from '../../../Shared/Form'; // Move to bit
import { FormContext } from '../../context';
import { 
  validateFirstName,
  validateLastName,
  validateCitizenId,
  validateEmail,
  // validatePhoneNumber,
  // validateAreaCode,
} from '../../../../utils/validators';
import { css } from 'styled-components';
import { pixelToRem } from 'meema.utils';
import { OnChangeEvent } from 'greenpeace';
import { UserDataFormContext } from './context';

interface IProps {}
export interface IRef {}

const Component: React.ForwardRefRenderFunction<IRef, IProps> = ((
  props: IProps,
  innerRef: React.ForwardedRef<IRef>
) => {
  const { showFieldErrors, onUpdateFieldHandler, onFocusHandler } = useContext(FormContext);
  const { data, dispatch } = useContext(UserDataFormContext);

  const onChangeHandler = useCallback((evt: OnChangeEvent) => {
    evt.preventDefault();
    dispatch({
      type: 'UPDATE_USER_DATA',
      payload: {
        [`${evt.currentTarget.name}`]: evt.currentTarget.value,
      },
    });
  }, [
    dispatch,
  ]);

  useImperativeHandle(innerRef, () => {
    return {}
  });

  return useMemo(() => (
    <Form.Content>
      <Form.Title>Datos personales</Form.Title>
      <Form.Row>
        <Form.Column>
          <Form.Group
            value={data.firstName}
            fieldName='firstName'
            labelText='Nombre'
            validateFn={validateFirstName}
            onUpdateHandler={onUpdateFieldHandler}
            showErrorMessage={showFieldErrors}
            isRequired={true}
          >
            <Form.Input
              name='firstName'
              type='text'
              placeholder='Daniel'
              value={data.firstName}
              onChange={onChangeHandler}
              onFocus={onFocusHandler}
            />
          </Form.Group>
        </Form.Column>
        <Form.Column>
          <Form.Group
            value={data.lastName}
            fieldName='lastName'
            labelText='Apellido'
            showErrorMessage={showFieldErrors}
            isRequired={true}
            validateFn={validateLastName}
            onUpdateHandler={onUpdateFieldHandler}
            >
            <Form.Input
              name='lastName'
              type='text'
              placeholder='Alvarez'
              value={data.lastName}
              onChange={onChangeHandler}
              onFocus={onFocusHandler}
            />
          </Form.Group>
        </Form.Column>
      </Form.Row>

      <Form.Row>
        <Form.Column>
          <Form.Group
            fieldName='citizenId'
            value={data.citizenId}
            labelText='Número de documento (DNI, CUIL, CUIT)'
            showErrorMessage={showFieldErrors}
            isRequired={true}
            validateFn={validateCitizenId}
            onUpdateHandler={onUpdateFieldHandler}
          >
            <Form.Input
              name='citizenId'
              type='number'
              placeholder='23755211'
              value={data.citizenId}
              onChange={onChangeHandler}
              onFocus={onFocusHandler}
            />
          </Form.Group>
        </Form.Column>
        {/* <Form.Column>
          <Form.Group
            fieldName='areaCode'
            value={data.areaCode}
            labelText='Cod. Área'
            labelBottomText='Sin el 0'
            showErrorMessage={showFieldErrors}
            isRequired={true}
            customCss={css`
              flex-basis: ${pixelToRem(140)};
            `}
            validateFn={validateAreaCode}
            onUpdateHandler={onUpdateFieldHandler}
          >
            <Form.Input
              name='areaCode'
              type='text'
              placeholder='1234'
              value={data.areaCode}
              maxLength={4}
              onChange={onChangeHandler}
              onFocus={onFocusHandler}
            />
          </Form.Group>
          <Form.Group
            fieldName='mobilePhoneNumber'
            value={data.mobilePhoneNumber}
            labelText='Celular'
            labelBottomText='Sin el 15'
            showErrorMessage={showFieldErrors}
            isRequired={true}
            validateFn={validatePhoneNumber}
            onUpdateHandler={onUpdateFieldHandler}
          >
            <Form.Input
              name='mobilePhoneNumber'
              type='text'
              placeholder='61234567'
              value={data.mobilePhoneNumber}
              maxLength={12}
              onChange={onChangeHandler}
              onFocus={onFocusHandler}
            />
          </Form.Group>
        </Form.Column> */}
        <Form.Column>
          <Form.Group
            value={data.email}
            fieldName='email'
            labelText='Email'
            showErrorMessage={showFieldErrors}
            isRequired={true}
            validateFn={validateEmail}
            onUpdateHandler={onUpdateFieldHandler}
          >
            <Form.Input
              name='email'
              type='email'
              placeholder='daniel.alvarez@gmail.com'
              value={data.email}
              onChange={onChangeHandler}
              onFocus={onFocusHandler}
            />
          </Form.Group>
        </Form.Column>
      </Form.Row>
    </Form.Content>
  ), [
    data,
    showFieldErrors,
    onFocusHandler,
    onChangeHandler,
    onUpdateFieldHandler,
  ]);
});

Component.displayName = 'UserDataForm';
export default React.forwardRef<IRef, IProps>(Component);
