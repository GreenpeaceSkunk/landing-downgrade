import { EventType as GoogleTagManagerEventType } from 'google-tag-manager';
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
  }
}

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
  data: any;
  submitting?: boolean,
  submitted?: boolean,
  error: string | null,
};

export type SharedActions = 
  | { type: 'SUBMIT' }
  | { type: 'SUBMITTED' }
  | { type: 'CANCEL' }
  | { type: 'FAILURE', error: any }
  
// For example 'email' | 'fullName'
export type FormFields = '';

export type FormFieldsType = {
  [Key in FormFields]: boolean;
}

export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;
export type OnClickEvent = MouseEvent<HTMLButtonElement>;

export type {
  GoogleTagManagerEventType,
};
