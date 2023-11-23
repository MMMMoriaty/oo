import { request } from '@umijs/max';

export async function getFactorType(
  params: {
    keyword?: string;
    page?: number;
    page_size?: number;
    sorter?: string,
    conditions?: any,
    types?: any,
  },
  options?: { [key: string]: any },
) {
  return request('/api/v1/queryFactorType', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getFactorList(
  body?: any,
  options?: any,
) {
  return request('/api/v1/queryFactorList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function sendWarnMessage(
  body?: any,
  options?: any,
) {
  return request('/api/v1/sendWarnMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}