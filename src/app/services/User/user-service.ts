
import {PATCH, GET} from '@/app/Networking/http-request-handler';
import Urls from '@/app/Networking/urls';

export const doUpdateUser = async (user_id: any, params: any, success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.UPDATE_USER}/${user_id}/`; 
   return PATCH(url, params, success, error);
 };

 export const getUserInfo = async (user_id: any, success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.GET_USER}/${user_id}/`; 
   return GET(url, success, error);
 };

 export const getUserOrders = async (user_id: any, success: any, error: any) => {
  let url = `${Urls.BASE_URL}${Urls.GET_USER_ORDERS}?user_id=${user_id}`; 
 return GET(url, success, error);
};

export const getUserOrderDetails = async (order_id: any, success: any, error: any) => {
  let url = `${Urls.BASE_URL}${Urls.GET_ORDER_DETAILS}${order_id}/`; 
 return GET(url, success, error);
};

