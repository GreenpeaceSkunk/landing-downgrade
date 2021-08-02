import { 
  GenericReducerFn,
  UserContextStateType as ContextStateType,
  UserContextActionType as ContextActionType,
  IUser,
  IUserDonation,
  IUserFeedback,
} from 'greenpeace';

export const initialState: ContextStateType = {
  // user: {
  //   firstName: '',
  //   lastName: '',
  //   citizenId: '',
  //   email: '',
  //   areaCode: '',
  //   mobilePhoneNumber: '',
  // } as IUserData,
  user: {
    data: {
      firstName: 'Doe',
      lastName: 'Deer',
      citizenId: '10234567',
      email: 'doe.deer@email.com',
      areaCode: '11',
      mobilePhoneNumber: '40000111',
    },
    donation: {
      percentDecrease: 10,
    } as IUserDonation,
    feedback: {
      selectedOption: '',
      comment: '',
    } as IUserFeedback,
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