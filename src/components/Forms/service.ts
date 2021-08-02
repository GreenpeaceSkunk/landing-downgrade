import { AxiosResquestError, } from 'greenpeace';
import { ApiCall } from '../../utils/apiCall';

// 15 	cancel-membership
const save = async (data: any): Promise<any | AxiosResquestError> => (
  ApiCall({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/11`,
    data,
  })
);

export {
  save,
};
