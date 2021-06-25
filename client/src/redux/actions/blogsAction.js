import BlogService from "../../Services/BlogService";
import {
  BLOGS_REQUEST_FAIL,
  BLOGS_REQUEST_lOADING,
  BLOGS_REQUEST_SUCCESS,
  BLOG_DELETE_FAIL,
} from "../actionTypes";

export const getBlogsList = () => {
  return (dispatch) => {
    dispatch({
      type: BLOGS_REQUEST_lOADING,
    });

    BlogService.getBlogs()
      .then((data) => {
        console.log(data);
        dispatch({
          type: BLOGS_REQUEST_SUCCESS,
          payload: data.blogs,
        });
      })
      .catch((error) => {
        dispatch({
          type: BLOGS_REQUEST_FAIL,
          payload: error,
        });
      });
  };
};

export const deleteBlogItem = (blog) => {
  return (dispatch) =>
    BlogService.deleteBlog(blog)
      .then(() => {
        console.log(blog);
        BlogService.getBlogs().then((data) => {
          console.log(data);
          dispatch({
            type: BLOGS_REQUEST_SUCCESS,
            payload: data.blogs,
          });
        });
      })
      .catch((error) => {
        dispatch({
          type: BLOG_DELETE_FAIL,
          payload: error,
        });
      });
};

export const postBlogItem = (blog) => {
  return (dispatch) => {
    BlogService.postBlog(blog).then((data) => {
      const { message } = data;
      console.log(message);
      if (message.msgError) {
        dispatch({
          type: BLOGS_REQUEST_FAIL,
          payload: message.msgBody,
        });
      } else {
        BlogService.getBlogs().then((data) => {
          console.log(data);
          dispatch({
            type: BLOGS_REQUEST_SUCCESS,
            payload: data.blogs,
          });
        });
      }

      //   if (!message.msgError) {
      //     BlogService.getBlogsList();
      //   } else if (message.msgBody === "UnAuthorized") {
      //     dispatch({
      //       type: BLOG_REQUEST_FAIL,
      //       payload: message.msgBody,
      //     });
      //   } else {
      //     dispatch({
      //       type: BLOGS_REQUEST_FAIL,
      //       payload: message.msgBody,
      //     });
      //   }
    });
  };
};
