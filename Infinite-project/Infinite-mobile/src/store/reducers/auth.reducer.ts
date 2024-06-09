import * as authConstants from '../constants/auth.constants';

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  address: null,
  user: null,
  conversations: [],
  contacts: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case authConstants.RESTORE_ADDRESS_SUCCESS:
      return {
        ...state,
        address: action.payload.address,
        isLoading: false,
      };
    case authConstants.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case authConstants.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case authConstants.SET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };
    case authConstants.USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case authConstants.LOGIN_USER:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case authConstants.LOGOUT_USER:
    case authConstants.AUTH_ERROR:
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
