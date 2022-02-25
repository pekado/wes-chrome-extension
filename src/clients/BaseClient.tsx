import axios from 'axios';
import JWTHelper from '../util/JWTHelper';

interface Error {
  error: {
    message: string | null
  },
  error_description: string
}

interface IHttpRequestErrorData {
  response?: {
    data: Error
  }
}

axios.defaults.headers.common['X-Request-With'] = 'XMLHttpRequest';

class BaseClient {
  baseUrl = 'http://dev.hellowes.com/api';
  // baseUrl = "http://localhost:8000/api";

  constructor() {
    axios.interceptors.request.use((config) => {
      config.headers!.Authorization = `Bearer ${JWTHelper.getAccessToken()}`;

      return config;
    });
  }

  get = (uri: string, options?: object): Promise<any> => {
    let res = new Promise<any>((resolve, reject) => {
      let data = axios.get(this.baseUrl + uri, options);
      data.then(
        (res) => {
          resolve(res.data);
        }
      ).catch(
        (error) => {
          this.httpRequestErrorHandler(error, (message) => {
            reject(message);
          });
        }
      );
    });

    return res;
  }

  post = (uri: string, params: object, options?: object): Promise<any> => {
    let res = new Promise<any>((resolve, reject) => {
      let data = axios.post(this.baseUrl + uri, params, options);
      data.then(
        (res) => {
          resolve(res.data);
        }
      ).catch(
        (error) => {
          console.log(error)
          this.httpRequestErrorHandler(error, (message) => {
            reject(message);
          });
        }
      );
    });

    return res;
  }

  put = (uri: string, params: object, options?: object): Promise<any> => {
    let res = new Promise<any>((resolve, reject) => {
      let data = axios.put(this.baseUrl + uri, params, options);
      data.then(
        (res) => {
          resolve(res.data);
        }
      ).catch(
        (error) => {
          this.httpRequestErrorHandler(error, (message) => {
            reject(message);
          });
        }
      );
    });

    return res;
  }

  delete = (uri: string, options?: object): Promise<any> => {
    let res = new Promise<any>((resolve, reject) => {
      let data = axios.delete(this.baseUrl + uri, options);
      data.then(
        (res) => {
          resolve(res.data);
        }
      ).catch(
        (error) => {
          this.httpRequestErrorHandler(error, (message) => {
            reject(message);
          });
        }
      );
    });

    return res;
  }

  httpRequestErrorHandler = (error: IHttpRequestErrorData,
    callback: (message: string) => void) => {

    if(error.response) {
      let message = error.response.data.error_description ? error.response.data.error_description : error.response.data.error.message;
      callback(message!);
    } else {
      console.log(error);
      callback('Something went wrong.');
    }
  }
}

export default BaseClient;
