export const TokenConstants = {
    ACCESSIBLES: 'accessibles', 
    ACCESS_TOKEN: 'access-token',
    SESSION_EXPIRED: 'session_expired',
  
    REFRESH_TOKEN: 'refresh_token',
    DECODED_TOKEN: 'decoded_token',
  
    HEADER_PARTIAL_VALUE: 'Bearer', 
  };

  export const StatusCodeConstants = {
    STATUS_OK: 200,
    STATUS_FAILED: 400,
    STATUS_INTERNAL_SERVER_ERROR: 500,
    STATUS_TOKEN_EXPIRED: 401,
    STATUS_UNAUTHORIZED_REQUEST: 404,
    STATUS_SUCCESS: 'success',
  }

  export const UserConstants = { 
    USER_INFO: 'user_info',
    USER_ID: 'user-id',  
  };

  export const userSignUpFormSteps = [ 
    {
      id: 1,
      title: "Interests information",
      questionGuide: {
        title: "What are your interests?",
        body: "Select all that apply"
      },
      questions: [
        {
          id: 1,
          title: "Interests",
          slug: "tags",
          inputType: 'INPUT_CHECKBOX',
          options: [
            { id: 0, title: "Technology", selected: false },
            { id: 1, title: "Gaming", selected: false },
            { id: 3, title: "Music", selected: false },
            { id: 4, title: "Fashion", selected: false },
            { id: 6, title: "Culture", selected: false },
            { id: 7, title: "Film", selected: false },
           ],
          value: "",
          placeholder: "Choose your answer",
          displayCondition: true,
          required: true
        },
      ]
    }
  ]

  
  