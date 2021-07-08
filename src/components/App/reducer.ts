import { SharedActions, GenericReducerFn, SharedState } from 'greenpeace';

export type ContextStateType = {} & SharedState;
export type ContextActionType = {} & SharedActions;

export const initialState: ContextStateType = {
  data: null,
  error: null,
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    default: {
      throw new Error('Context Error');
    }
  }
}