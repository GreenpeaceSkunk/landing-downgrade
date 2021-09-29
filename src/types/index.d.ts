import { EventType as GoogleTagManagerEventType } from 'google-tag-manager';
import {
  ContextStateType as AppContextStateType,
  ContextActionType as AppContextActionType,
} from './app';
import { 
  IUser,
  IUserData,
  IUserDonation,
  IUserFeedback,
  ContextStateType as UserContextStateType,
  ContextActionType as UserContextActionType,
} from './user';

declare global {
  interface Window {
    dataLayer: [{
      event: EventType,
    }];
    
    dcS: {
      synchro: any;
    };

    dc: {
      track: {
        event: (portalId: string, eventId: string) => void;
      }
    };

    Mercadopago: {
      setPublishableKey: (a: string) => void;
      createToken: (a: any, b: any) => string;
      getInstallments: (a: any, b: any) => any;
      key: string;
      tokenId: string;
    };

    _hjSettings: {
      hjid: number;
      hjsv: number;
    }
  }
}

export interface DispatchFn<action> {
  (action: any): void;  
};

export interface GenericReducerFn<S, A> { 
  (state: S, action: A): S;
}

export type StylesType = {
  [el: string]: React.CSSProperties,
};
  
export type AxiosResquestError = {
  error: boolean,
  status: number,
  message: string,
};

export type SharedState = {
  submitting: boolean,
  submitted: boolean,
  error: string | null,
};

export type PayloadObjectType = { [x: string]: string | number };

export type SharedActions = 
  | { type: 'SUBMIT' }
  | { type: 'SUBMITTED' }
  | { type: 'CANCEL' }
  | { type: 'FAILURE', error: any }
  
export type FormFields = '';

export type FormFieldsType = {
  [Key in FormFields]: boolean;
}

export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;
export type OnClickEvent = MouseEvent<HTMLButtonElement>;

export type {
  GoogleTagManagerEventType,
  AppContextStateType,
  AppContextActionType,
  IUser,
  IUserData,
  IUserDonation,
  IUserFeedback,
  UserContextStateType,
  UserContextActionType,
};
