import { ApiCall } from '../utils/apiCall';

const greenlab_app_name = 'membership-downgrade-app'; // hardcoded through the apiCall

export const getApiUrl = (): string => {
  return (`${process.env.REACT_APP_ENVIRONMENT}` === 'development')
    ? `${process.env.REACT_APP_GREENLAB_API_URL}`
    : `${window.location.origin}${process.env.REACT_APP_GREENLAB_API_URL}`;
}

export const updateContact = async (email: string, data: any) => {
  try {
    const response = await ApiCall({
      headers: {
        'X-Greenlab-App': greenlab_app_name,
      },
      baseURL: `${getApiUrl()}/hubspot/contact/email/${email}`,
      method: 'POST',
      data,
    });
    return response;
  } catch(error: any) {
    console.log(error);
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const response = await ApiCall({
      headers: {
        'X-Greenlab-App': greenlab_app_name,
      },
      baseURL: `${getApiUrl()}/hubspot/contact/email/${email}`,
      method: 'GET',
    });
    return response;
  } catch(error: any) {
    console.log(error);
  }
}

export const getUserById = async (id: string) => {
  console.log(getApiUrl());
  try {
    const response = await ApiCall({
      headers: {
        'X-Greenlab-App': greenlab_app_name,
      },
      baseURL: `${getApiUrl()}/hubspot/contact/id/${id}`,
      method: 'GET',
    });
    return response;
  } catch(error: any) {
    console.log(error);
  }
}
