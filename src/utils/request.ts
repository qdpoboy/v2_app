import urlcat from 'urlcat';
import { Alert } from 'react-native';

const API_BASE_URL_V1 = process.env.EXPO_PUBLIC_API_BASE_URL_V1;
const TIMEOUT = 10000; // 10秒超时

interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
}

/**
 * 基础请求方法
 * @param url 接口路径
 * @param options 配置选项
 */
async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  // 使用 urlcat 处理查询参数
  const fullUrl = params ? urlcat(API_BASE_URL_V1 + url, params) : API_BASE_URL_V1 + url;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.EXPO_PUBLIC_API_TOKEN,
        ...fetchOptions.headers,
      },
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
  } catch (error: any) {
    clearTimeout(timer);
    if (error.name === 'AbortError') {
      Alert.alert('提示', '请求超时，请检查网络连接');
    }
    throw error;
  }
}

/**
 * GET 请求
 * @param url 接口路径，如 '/topics'
 * @param params 查询参数
 * @example
 * const topics = await getFetch('/topics', { tab: 'hot' });
 */
export const getFetch = <T>(url: string, params?: Record<string, any>) =>
  request<T>(url, { method: 'GET', params });

/**
 * POST 请求
 * @param url 接口路径
 * @param data 请求体数据
 * @example
 * await postFetch('/replies', { content: 'test' });
 */
export const postFetch = <T>(url: string, data?: any) =>
  request<T>(url, { method: 'POST', body: JSON.stringify(data) });

export default { getFetch, postFetch };
