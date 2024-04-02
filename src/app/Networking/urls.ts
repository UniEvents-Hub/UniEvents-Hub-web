const Urls = {
    // TEST PLATFORM
    // BASE_URL: Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000',
    // BASE_URL: 'http://199.116.235.202:8000',
    BASE_URL: 'http://127.0.0.1:8000/',
  
    LOG_IN: 'login',
    SIGN_UP: 'user/signup/',
    GET_USER: 'api/userprofile',
    UPDATE_USER: 'api/updateuserprofile',
    GET_ALL_EVENTS: 'event/eventslist/',
    GET_EVENT_DETAILS: 'event/specificevent/',
    CREATE_EVENT: 'event/eventcreate/',
    UPDATE_EVENT: 'event/eventupdate/',
    GET_ORG_EVENTS: 'event/userspecificevent/',
    REFRESH_TOKEN: 'refreshToken', 
  };
  
  export default Urls;