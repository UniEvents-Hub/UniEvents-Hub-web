
import {POST_WITHOUT_TOKEN, GET_WITHOUT_TOKEN, GET_FIXED_TOKEN} from '@/app/Networking/http-request-handler';
import Urls from '@/app/Networking/urls';

export const doLogin = async (params: any, success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.LOG_IN}`; 
   return POST_WITHOUT_TOKEN(url, params, success, error);
 };

 export const doSignUp = async (params: any, success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.SIGN_UP}`; 
   return POST_WITHOUT_TOKEN(url, params, success, error);
 };

 export const checkUserExistOrNot = async (user_email: any, success: any, error: any) => {
  console.log('user_email', user_email)
  let url = `${Urls.BASE_URL}${Urls.USER_EXIST_NOT}/${user_email}/`; 
  console.log('url', url)
  return GET_FIXED_TOKEN(url, success, error);
};