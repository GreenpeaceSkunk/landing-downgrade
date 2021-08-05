import { SharedActions, GenericReducerFn, SharedState } from 'greenpeace';

export type FieldErrorType = { [fieldName: string]:boolean } | null;
export type ErrorsType = { [index: string]: FieldErrorType } | null;

export type ContextStateType = {
  errors: ErrorsType;
} & SharedState;

export type ContextActionType = 
| { type: 'UPDATE_FIELD_ERRORS', payload: { fieldName: string; isValid: boolean; indexForm: number; } }
| { type: 'RESET_FIELD_ERRORS' }
| { type: 'RESET' }
| { type: 'SET_ERROR', error: string | null }
| SharedActions;

export const initialState: ContextStateType = {
  error: null,
  errors: null,
  submitted: false,
  submitting: false,
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    case 'UPDATE_FIELD_ERRORS':
      let tmpErrors = (state.errors) ? {...state.errors} : {};
      if(action.payload.isValid) {
        if(tmpErrors[`${action.payload.indexForm}`]) {
          const tmpFormIndex = {...tmpErrors[`${action.payload.indexForm}`]};
          delete tmpFormIndex[`${action.payload.fieldName}`];
          tmpErrors[`${action.payload.indexForm}`] = {...tmpFormIndex};
        }
      } else {
        tmpErrors[`${action.payload.indexForm}`] = {
          ...tmpErrors[`${action.payload.indexForm}`],
          [`${action.payload.fieldName}`]: !!action.payload.isValid,
        };
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
    case 'RESET': {
      return {
        ...state,
        errors: null,
        submitting: false,
        submitted: false,
      };
    }
    case 'SUBMIT': {
      return {
        ...state,
        submitting: true,
        submitted: false,
      };
    }
    case 'SUBMITTED': {
      return {
        ...state,
        submitting: false,
        submitted: true,
      };
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
