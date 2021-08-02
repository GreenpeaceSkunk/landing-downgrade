import { AxiosResquestError } from 'greenpeace';
import { ApiCall } from '../../../utils/apiCall';

const save = async (data: any): Promise<any | AxiosResquestError> => (
  ApiCall({
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/forms/save`,
    data: {
      form_id: `${process.env.REACT_APP_MEMBERSHIP_DOWNGRADE_FORM_ID}`,
      ...data,
    },
  })
)

export {
  save,
};