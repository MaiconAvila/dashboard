import { requestAPI } from 'utils/services/request';

export const getAllDataForChart = async (url, method) => {
  return requestAPI(url, method);
}