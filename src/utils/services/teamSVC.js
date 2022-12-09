import { requestAPI } from 'utils/services/request';

export const getTotalData = async (url, method) => {
  return requestAPI(url, method);
}