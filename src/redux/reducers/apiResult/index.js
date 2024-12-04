const initialState = {
  data: null,
  loading: false,
  message: null,
  status: null,
  typeRequest: 0, //0 No request, 1 GET, 2 POST, 3 PUT
};

const apiRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'API_REQUEST':
      return {
        ...state,
        loading: true,
        typeRequest: action.typeRequest
      };
    case 'API_SUCCESS':
      return {
        ...state,
        loading: false,
        status: action.status,
        message: action.message,
        data: action.data,
        typeRequest: 0
      };
    case 'API_FAILURE':
      return {
        ...state,
        loading: false,
        status: action.status,
        message: action.message,
        data: action.data,
        typeRequest: 0
      };
    default:
      return state;
  }
};

export default apiRequestReducer;
