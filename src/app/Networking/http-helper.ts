
import {TokenConstants} from '../utils/constants'; 

class HttpHelper {
  constructor() {
    //this.accessToken = null;
    //this.getAccessToken();
  }

  getHeader = (token: any) => {
    let headers = {
      Authorization: TokenConstants.HEADER_PARTIAL_VALUE + ' ' + token,
    };
    let config = {
      headers: headers,
    };
    return config as any;
  };

  getEventHeader = (token: any) => {
    let headers = {
      Accept: 'application/json',
      Authorization: TokenConstants.HEADER_PARTIAL_VALUE + ' ' + token,
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    };
    let config = {
      headers: headers,
    };
    console.log('config', config);
    return config as any;
  };

  getMultiPartHeader = (token: any) => {
    /*if (!this.accessToken) {
      this.accessToken = token
    }*/
    let headers = {
      Accept: 'application/json',
      Authorization: TokenConstants.HEADER_PARTIAL_VALUE + ' ' + token,
      'Content-Type': 'application/octet-stream'
    };
    let config = {
      headers: headers,
    };
    return config;
  };

  getDownloadHeader = (token: any) => {
    /*if (!this.accessToken) {
      this.accessToken = token
    }*/
    let headers = {
      Accept: 'application/octet-stream',
      Authorization: TokenConstants.HEADER_PARTIAL_VALUE + ' ' + token,
      'Content-Type': 'application/octet-stream',
    };
    let config = {
      headers: headers,
    };
    return config;
  };
}

export default HttpHelper;
