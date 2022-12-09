import { requestAPI } from 'utils/services/request';

export const postOrderData = async (url, method, body) => {
  const raw = JSON.stringify(body);
  return requestAPI(url, method, raw);
}

export const deleteOrderData = async (url, method) => {
  return requestAPI(url, method);
}