const Urls = {
    // TEST PLATFORM
    // BASE_URL: Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000',
    // BASE_URL: 'http://199.116.235.202:8000',
    BASE_URL: 'http://127.0.0.1:8000/',
  
    LOG_IN: 'login',
    SIGN_UP: 'signup/',
    GET_USER: 'api/userprofile',
    USER_EXIST_NOT: 'api/userexists',
    UPDATE_USER: 'api/updateuserprofile',
    GET_ALL_EVENTS: 'event/eventslist/',
    GET_EVENT_DETAILS: 'event/specificevent/',
    CREATE_EVENT: 'event/eventcreate/',
    UPLOAD_IMAGES: 'event/images/',
    UPDATE_EVENT: 'event/eventupdate/',
    SAVED_EVENT: 'event/eventsave/',
    UN_SAVED_EVENT: 'event/eventunsave/',
    GET_ORG_EVENTS: 'event/userspecificevent/',
    GET_IMAGE_EVENTS: 'event/getimages/',
    GET_FAVS_EVENTS: 'event/getsaved/',
    CHECK_SAVED_EVENT: 'event/checksaved/',
    BUY_TICKET: 'event/buyticket/',
    GET_USER_ORDERS: 'event/getticket/',
    GET_ORDER_DETAILS: 'event/ticketdetail/',
    REFRESH_TOKEN: 'refreshToken', 
  };
  
  export default Urls;