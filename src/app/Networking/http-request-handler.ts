import axios from 'axios';
import {TokenConstants} from '../utils/constants'; 
import HttpHelper from './http-helper';

const httpHelper = new HttpHelper();

export const GET_WITHOUT_TOKEN = async (url: any, success: any, error: any) => {
  try {
    const response = await axios.get(url);
    console.log('GET_WITHOUT_TOKEN response', response)
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
    // console.log('get token', token)
    if(token) {
    const response = await axios.get(url,  httpHelper.getHeader(token));
    console.log('response', response)
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

export const GET_FIXED_TOKEN = async (url: any, success: any, error: any) => {
  try {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3NzEyNjU0LCJpYXQiOjE3MTI1Mjg2NTQsImp0aSI6ImVkZjUxNjdiOTcxYTQ4YTJiOWUwYzJjZGZlZTI0ZTNlIiwidXNlcl9pZCI6Mn0.liMH4qsgWl83ViEaAwLh2nYQOOkg9PYLUrufKHiUWPc';
    // console.log('get token', token)
    if(token) {
    const response = await axios.get(url,  httpHelper.getHeader(token));
    console.log('response', response)
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
    const response = await axios.post(url, params); 
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
    // console.log('response', response)
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

export const DELETE = async (url: any, params: any, success: any, error: any) => {
  try {
    let token = localStorage.getItem(TokenConstants.ACCESS_TOKEN);
     const config = httpHelper.getHeader(token);
    if (params) {
      config.data = params
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
