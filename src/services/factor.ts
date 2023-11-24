import { request } from '@umijs/max';
import { FactorType, FactorList } from '@/constants/mockData'

const isDev = () => process.env.NODE_ENV === 'development'
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
  return isDev()
    ? request('/api/v1/queryFactorType', {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    })
    : new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: { list: FactorType },
        message: 'success',
      })
    })
}

export async function getFactorList(
  body?: any,
  options?: any,
) {
  return isDev()
    ? request('/api/v1/queryFactorList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    })
    : new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: { list: FactorList, total: FactorList.length },
        message: 'success',
      })
    })
}

export async function sendWarnMessage(
  body?: any,
  options?: any,
) {
  return isDev()
    ? request('/api/v1/sendWarnMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    })
    : new Promise((resolve, reject) => {
      resolve({
        code: 0,
        data: null,
        message: 'success',
      })
    })
}