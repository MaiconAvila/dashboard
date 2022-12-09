import { requestAPI } from 'utils/services/request';

export const getPaginatedData = async (url, method) => {
  return requestAPI(url, method);
}