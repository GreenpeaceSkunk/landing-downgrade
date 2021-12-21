import React, {
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
} from 'react';
import { OnChangeEvent } from 'greenpeace';
import Form from '../../../Shared/Form'; // Move to bit
import { FormContext } from '../../context';
import { UserFeedbackFormContext } from './context';
import { validateNotEmptyField } from '../../../../utils/validators';

interface IProps {}
export interface IRef {}

const Component: React.ForwardRefRenderFunction<IRef, IProps> = ((
  props: IProps,
  innerRef: React.ForwardedRef<IRef>
) => {
  const { showFieldErrors, onUpdateFieldHandler, onFocusHandler } = useContext(FormContext);
  const { feedback, dispatch } = useContext(UserFeedbackFormContext);

  const onChangeHandler = useCallback((evt: OnChangeEvent) => {
    evt.preventDefault();
    dispatch({
      type: 'UPDATE_USER_FEEDBACK',
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
      {/* <Form.Title>Datos personales</Form.Title> */}
      <Form.Row>
        {/* <Form.Column>
          <Form.Group
            value={feedback.selectedOption}
            fieldName='selectedOption'
            labelText='¿Qué motivo te llevó a tomar esta decisión?'
            labelBottomText='* Obligatorio'
            showErrorMessage={showFieldErrors}
            isRequired={true}
            validateFn={validateNotEmptyField}
            onUpdateHandler={onUpdateFieldHandler}
            >
              {[
                'No estoy conforme con el trabajo que hace Greenpeace por el medio ambiente.',
                'Creo que Greenpeace esá vinculado con partidos políticos o sindicatos.',
                'Creo que Greenpeace recibe aportes de grandes empresas.',
                'Me gustaría que Greenpeace participe en otras causas de mi interés.',
              ].map((text: string) => (
                <Form.RadioButton
                  key={text}
                  text={text}
                  name='selectedOption'
                  value={text}
                  checkedValue={feedback.selectedOption}
                  onChangeHandler={onChangeHandler}
                />
              ))}
          </Form.Group>
        </Form.Column> */}
        <Form.Column>
          <Form.Group
            fieldName='comment'
            labelText='¿Qué motivo te llevó a tomar esta decisión?'
            value={feedback.comment}
            showErrorMessage={showFieldErrors}
            isRequired={true}
            validateFn={validateNotEmptyField}
            onUpdateHandler={onUpdateFieldHandler}
          >
            <Form.TextArea
              name='comment'
              placeholder='Ingresar detalles'
              value={feedback.comment}
              maxLength={150}
              onChange={onChangeHandler}
              onFocus={onFocusHandler}
            />
          </Form.Group>
        </Form.Column>
      </Form.Row>
    </Form.Content>
  ), [
    showFieldErrors,
    feedback,
    onUpdateFieldHandler,
    onChangeHandler,
    onFocusHandler,
  ]);
});

Component.displayName = 'UserFeedbackForm';
export default React.forwardRef<IRef, IProps>(Component);
