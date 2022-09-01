export interface IUserData {
  firstName: string;
  lastName: string;
  citizenId: string;
  email: string;
  mobilePhoneNumber: string;
  areaCode: string;
}

export interface IUserIDonation {
  percentDecrease?: number;
  postponeUntil?: number;
}

export interface IUserFeedback {
  selectedOption: string,
  comment: string,
}

export interface IUser {
  data: IUserData;
  donation: IUserIDonation;
  feedback: IUserFeedback;
}

export type ContextStateType = {
  user: IUser;
} & SharedState;

export type ContextActionType = 
| { type: 'UPDATE_USER_INFORMATION', payload: PayloadObjectType }
| { type: 'UPDATE_USER_DONATION', payload: PayloadObjectType }
| { type: 'UPDATE_USER_FEEDBACK', payload: PayloadObjectType }
| SharedActions;
