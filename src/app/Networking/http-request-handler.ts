import axios from 'axios';
import {TokenConstants} from '../utils/constants'; 
import HttpHelper from './http-helper';

const httpHelper = new HttpHelper();

export const GET_WITHOUT_TOKEN = async (url: any, success: any, error: any) => {
  try {
    const response = await axios.get(url);
    if (success) {
      success(await response);
    }
  } catch (err: any) {
    if (error) {
      error(await err.response);
    }
  }
};

export const GET = async (url: any, success: any, error: any) => {
  try {
    let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
    console.log('get token', token)
    if(token) {
    const response = await axios.get(url,  httpHelper.getHeader(token));
    console.log('inspection response...', response);
    if (success) {
      success(await response);
    }
  }
  } catch (err: any) {
    console.log('user get response...error', err);
    if (error) {
      error(await err.response);
    }
  }
};

export const POST_WITHOUT_TOKEN = async (url:any, params: any, success: any, error: any) => {
 
  try {
    console.log('url params', url, params)
    const response = await axios.post(url, params);
    console.log('response', response)
    if (success) {
      success(await response);
    }
  } catch (err: any) {
    //console.log('err', err)
    if (error) {
      //console.log('Log in error', error);
      error(await err.response);
    }
  }
};

export const POST = async (url: any, params: any, success: any, error: any) => {
  try {
    let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
    if(token) {
    const response = await axios.post(url, params, httpHelper.getHeader(token));
    console.log('response', response)
    if (success) {
      success(await response);
    }
  }
  } catch (err: any) {
    if (error) {
      error(await err.response);
    }
  }
};

export const POST_EVENT = async (url: any, params: any, success: any, error: any) => {
    try {
      let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
      if(token) {
      const response = await axios.post(url, params, httpHelper.getEventHeader(token));
      console.log('response', response)
      if (success) {
        success(await response);
      }
    }
    } catch (err: any) {
      if (error) {
        error(await err.response);
      }
    }
  };

  export const PATCH_EVENT = async (url: any, params: any, success: any, error: any) => {
    try {
      let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
      if(token) {
      const response = await axios.patch(url, params, httpHelper.getEventHeader(token));
      console.log('response', response)
      if (success) {
        success(await response);
      }
    }
    } catch (err: any) {
      if (error) {
        error(await err.response);
      }
    }
  };

export const PATCH = async (url: any, params: any, success: any, error: any) => {
  try {
    let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
    if(token) {
    const response = await axios.patch(url, params, httpHelper.getMultiPartHeader(token));
    console.log('response', response)
    if (success) {
      success(await response);
    }
  }
} catch (err: any) {
    console.log('err', err)
    if (error) {
      error(await err.response);
    }
  }
};

export const GETFILE = async (url: any, success: any, error: any) => {
  try {
    let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
   if(token)  {
      console.log(httpHelper.getMultiPartHeader(token))
    const response = await axios.get(url,  httpHelper.getMultiPartHeader(token));
    console.log('GETFILE response...', response);
    if (success) {
      success(await response);
    }
  }
  } catch (err: any) {
    if (error) {
      error(await err.response);
    }
  }
};

export const UPLOAD = async (url: any, token: any, data: any, success: any, error: any) => {
  try {
    const response = await axios.post(
      url,
      data,
      httpHelper.getMultiPartHeader(token),
    ); 
    if (success) {
      success(await response);
    }
  } catch (err: any) {
    if (error) {
      error(await err.response);
    }
  }
};

export const PUT = async (url: any, token: any, params: any, success: any, error: any) => {
  try {
    const response = await axios.put(url, params, httpHelper.getHeader(token));
    if (success) {
      success(await response);
    }
  } catch (err: any) {
    if (error) {
      error(await err.response);
    }
  }
};

export const DELETE = async (url: any, token: any, params: any, success: any, error: any) => {
  try {
    const config = httpHelper.getHeader(token);
    if (params) {
      config.data = {
        userId: params.userId,
        teamId: params.teamId,
      };
    }
    const response = await axios.delete(url, config);
    if (success) {
      success(await response);
    }
  } catch (err: any) {
    if (error) {
      error(await err.response);
    }
  }
};
