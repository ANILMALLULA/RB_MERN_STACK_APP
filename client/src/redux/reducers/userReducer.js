import {
  BLOG_REQUEST_FAIL,
  ISAUTHENTICATED_STATUS,
  LOGIN_FAIL,
  LOGIN_lOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "../actionTypes";

const initialState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  error: null,
  message: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_lOADING:
      return {
        ...state,
        loading: true,
      };
    case ISAUTHENTICATED_STATUS:
      return {
        ...state,
        loading: false,
        isAuthenticated: payload.isAuthenticated,
        user: payload.user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
        isAuthenticated: payload.isAuthenticated,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: payload.message,
        isAuthenticated: false,
        loading: false,
        error: payload.user.message,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: payload.user,
        loading: false,
        isAuthenticated: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        message: null,
      };
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        error: null,
      };
    case BLOG_REQUEST_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
