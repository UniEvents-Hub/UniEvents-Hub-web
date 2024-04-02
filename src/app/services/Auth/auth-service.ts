
import {POST_WITHOUT_TOKEN} from '@/app/Networking/http-request-handler';
import Urls from '@/app/Networking/urls';

export const doLogin = async (params: any, success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.LOG_IN}`; 
   return POST_WITHOUT_TOKEN(url, params, success, error);
 };

 export const doSignUp = async (params: any, success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.SIGN_UP}`; 
   return POST_WITHOUT_TOKEN(url, params, success, error);
 };