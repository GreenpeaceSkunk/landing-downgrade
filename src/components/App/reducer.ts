import { 
  GenericReducerFn,
  UserContextStateType as ContextStateType,
  UserContextActionType as ContextActionType,
  IUser,
} from 'greenpeace';

const autofill = process.env.REACT_APP_AUTOFILL_VALUES ? (process.env.REACT_APP_AUTOFILL_VALUES === 'true') ? true : false : false;

export const initialState: ContextStateType = {
  user: {
    data: {
      firstName: '',
      lastName: '',
      citizenId: '',
      email: '',
      areaCode: '',
      mobilePhoneNumber: '',
      ...(autofill ? {
        firstName: 'Doe',
        lastName: 'Deer',
        citizenId: '10234567',
        email: 'doe.deer@email.com',
        areaCode: '11',
        mobilePhoneNumber: '41239876',
      } : {}),
    },
    donation: {
      percentDecrease: 10,
    },
    feedback: {
      selectedOption: '',
      comment: '',
      ...(autofill ? {
        selectedOption: '',
        comment: 'Acá va el comentario',
      } : {}),
    },
  } as IUser,
  error: null,
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        user: {
          ...state.user,
          data: {
            ...state.user.data,
            ...action.payload,
          }
        },
      }
    case 'UPDATE_USER_DONATION':
      return {
        ...state,
        user: {
          ...state.user,
          donation: {
            ...state.user.donation,
            ...action.payload,
          },
        },
      }
      case 'UPDATE_USER_FEEDBACK':
        return {
          ...state,
          user: {
            ...state.user,
            feedback: {
              ...state.user.feedback,
              ...action.payload,
            },
          },
        }
    default: {
      throw new Error('Context Error');
    }
  }
}
