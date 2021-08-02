import { SharedActions, GenericReducerFn, SharedState } from 'greenpeace';

export type FieldErrorType = { [fieldName: string]:boolean } | null;

export type ContextStateType = {
  errors: FieldErrorType;
} & SharedState;

export type ContextActionType = 
| { type: 'UPDATE_FIELD_ERRORS', payload: { fieldName: string; isValid: boolean; } }
| { type: 'RESET_FIELD_ERRORS' }
| { type: 'SET_ERROR', error: string | null }
| SharedActions;

export const initialState: ContextStateType = {
  error: null,
  errors: null,
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    case 'UPDATE_FIELD_ERRORS':
      let tmpErrors = (state.errors) ? {...state.errors} : {};
      if(action.payload.isValid) {
        delete tmpErrors[action.payload.fieldName];
      } else {
        tmpErrors = {...tmpErrors, ...{ [`${action.payload.fieldName}`]: !!action.payload.isValid }};
      }
      return {
        ...state,
        errors: tmpErrors,
      }
    case 'RESET_FIELD_ERRORS': {
      return {
        ...state,
        errors: null,
      }
    }
    default: {
      throw new Error('Context Error');
    }
  }
}

export default {
  initialState,
  reducer,
};
