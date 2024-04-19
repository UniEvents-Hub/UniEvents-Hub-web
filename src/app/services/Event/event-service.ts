
import {PATCH, GET, POST, POST_EVENT, PATCH_EVENT, DELETE} from '@/app/Networking/http-request-handler';
import Urls from '@/app/Networking/urls';


export const getEvents = async (success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.GET_ALL_EVENTS}`; 
   return GET(url, success, error);
 };

export const getEventDetails = async (event_id: any, success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.GET_EVENT_DETAILS}?event_id=${event_id}`; 
   return GET(url, success, error);
 };

export const getFilteredEvents = async (event_type: any, success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.GET_ALL_EVENTS}?event_type=${event_type}`; 
   return GET(url, success, error);
 };

 export const getOrgEvents = async (user_id: any, success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.GET_ORG_EVENTS}?user_id=${user_id}`; 
   return GET(url, success, error);
 };

 export const getEventImage = async (event_id: any, success: any, error: any) => {
  let url = `${Urls.BASE_URL}${Urls.GET_IMAGE_EVENTS}${event_id}/`; 
 return GET(url, success, error);
};

 export const getFavouritesEvents = async (user_id: any, success: any, error: any) => {
  let url = `${Urls.BASE_URL}${Urls.GET_FAVS_EVENTS}?user_id=${user_id}`; 
 return GET(url, success, error);
};

export const checkEventIsSaved = async (event_id: any, success: any, error: any) => {
  let url = `${Urls.BASE_URL}${Urls.CHECK_SAVED_EVENT}${event_id}/`; 
 return GET(url, success, error);
};

export const doCreateEvent = async (params: any, success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.CREATE_EVENT}`; 
   return POST_EVENT(url, params, success, error);
 };

 export const doUploadImages = async (params: any, success: any, error: any) => {
  let url = `${Urls.BASE_URL}${Urls.UPLOAD_IMAGES}`; 
 return POST_EVENT(url, params, success, error);
};

 export const doUpdateEvent = async (event_id: any, params: any, success: any, error: any) => {
    let url = `${Urls.BASE_URL}${Urls.UPDATE_EVENT}${event_id}/`; 
   return PATCH_EVENT(url, params, success, error);
 };

 export const doSaveEvent = async (params: any, success: any, error: any) => {
  let url = `${Urls.BASE_URL}${Urls.SAVED_EVENT}`; 
 return POST_EVENT(url, params, success, error);
};

export const doUnSaveEvent = async (params: any, event_id: any, success: any, error: any) => {
  let url = `${Urls.BASE_URL}${Urls.UN_SAVED_EVENT}${event_id}/`; 
 return DELETE(url, params, success, error);
};

export const doBuyTicket = async (params: any, success: any, error: any) => {
  let url = `${Urls.BASE_URL}${Urls.BUY_TICKET}`; 
 return POST(url, params, success, error);
};