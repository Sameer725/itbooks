import axios, {AxiosRequestConfig} from 'axios';
let baseURL: string =
  process.env.API_ENDPOINT || 'https://api.itbook.store/1.0';

type RequestConfig = Omit<AxiosRequestConfig, 'url'>;

export interface IClienHook extends RequestConfig {
  endpoint: string;
}

export default async function client({endpoint, ...config}: IClienHook) {
  const defaultConfig: AxiosRequestConfig = {
    baseURL,
    url: endpoint,
    cancelToken: axios.CancelToken.source().token,
    ...config,
  };

  return axios.request(defaultConfig).then(
    async res => {
      return res.data;
    },
    error => {
      return Promise.reject(error);
    },
  );
}
