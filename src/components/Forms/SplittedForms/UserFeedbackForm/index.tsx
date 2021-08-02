import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import { Input, RadioButton } from '@bit/meema.gpar-ui-components.form';
import { OnClickEvent, OnChangeEvent } from 'greenpeace';
import { useRouteMatch } from 'react-router-dom';
import Form from '../../../Shared/Form'; // Move to bit
import { FormContext } from '../../context';
import { UserFeedbackFormContext } from './context';
import { validateField, validateFirstName } from '../../../../utils/validators';

interface IProps {}
export interface IRef {}

const Component: React.ForwardRefRenderFunction<IRef, IProps> = ((
  props: IProps,
  innerRef: React.ForwardedRef<IRef>
) => {
  const { path } = useRouteMatch();
  const { showFieldErrors, onUpdateFieldHandler } = useContext(FormContext);
  const { feedback, dispatch } = useContext(UserFeedbackFormContext);

  const onChangeHandler = useCallback((evt: OnChangeEvent) => {
    evt.preventDefault();
    console.log('onChangeHandler')
    dispatch({
      type: 'UPDATE_USER_FEEDBACK',
      payload: {
        [`${evt.currentTarget.name}`]: evt.currentTarget.value,
      },
    });
  }, [
    feedback,
    dispatch,
  ]);

  // const onClick = useCallback((evt: OnClickEvent) => {
  //   evt.preventDefault();
  //   dispatch({
  //     type: 'UPDATE_USER_FEEDBACK',
  //     payload: {
  //       [`${evt.currentTarget.name}`]: parseInt(evt.currentTarget.dataset.value),
  //     },
  //   });
  // }, [
  //   feedback,
  //   dispatch,
  // ]);
  
  useImperativeHandle(innerRef, () => {
    return {}
  });

  useEffect(() => {

  }, [

  ]);
  return useMemo(() => (
    <Form.Content>
      <Form.Title>Datos personales</Form.Title>
      <Form.Row>
        <Form.Column>
          <Form.Group
            value={feedback.selectedOption}
            fieldName='selectedOption'
            labelText='¿Qué motivo te llevó a tomar esta decisión? *'
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
        </Form.Column>
        <Form.Column>
          <Form.Group
            fieldName='comment'
            labelText='Contanos más sobre el motivo que elegiste*'
            value={feedback.comment}
            validateFn={validateFirstName}
            onUpdateHandler={onUpdateFieldHandler}
          >
            <Form.TextArea
              name='comment'
              placeholder='0/150'
              value={feedback.comment}
              onChange={onChangeHandler}
              maxLength={150}
            />
          </Form.Group>
        </Form.Column>
      </Form.Row>
    </Form.Content>
  ), [
    path,
    showFieldErrors,
    feedback,
    onUpdateFieldHandler,
    // onClick,
  ]);
});

Component.displayName = 'UserFeedbackForm';
export default React.forwardRef<IRef, IProps>(Component);
