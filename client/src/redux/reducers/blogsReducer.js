import {
  BLOGS_REQUEST_FAIL,
  BLOGS_REQUEST_lOADING,
  BLOGS_REQUEST_SUCCESS,
  BLOG_DELETE_FAIL,
} from "../actionTypes";

const initialState = {
  loading: false,
  blogs: [],
  blog: {},
  error: null,
  message: null,
};

const blogsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case BLOGS_REQUEST_lOADING:
      return {
        ...state,
        loading: true,
      };
    case BLOGS_REQUEST_SUCCESS:
      return {
        ...state,
        blogs: payload,
        loading: false,
      };
    case BLOGS_REQUEST_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case BLOG_DELETE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default blogsReducer;
