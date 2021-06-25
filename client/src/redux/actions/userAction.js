import {
  ISAUTHENTICATED_STATUS,
  LOGIN_FAIL,
  LOGIN_lOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from "../actionTypes";

import AuthService from "../../Services/AuthService";

export const login = (user) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_lOADING,
    });
    AuthService.login(user).then((data) => {
      const { isAuthenticated } = data;
      if (isAuthenticated) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: data,
        });
      }
    });

    // fetch("/user/login", {
    //   method: "POST",
    //   body: JSON.stringify(user),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((jsonData) => {
    //     dispatch({
    //       type: LOGIN_SUCCESS,
    //       payload: jsonData,
    //     });
    //   })
    //   .catch((err) =>
    //     dispatch({
    //       type: LOGIN_FAIL,
    //       payload: err,
    //     })
    //   );
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    AuthService.logout().then((data) => {
      if (data.success) {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: data,
        });
      }
    });
  };
};

export const isAuthenticated = () => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_lOADING,
    });
    AuthService.isAuthenticated().then((data) => {
      dispatch({
        type: ISAUTHENTICATED_STATUS,
        payload: data,
      });
    });
  };
};

export const registerUser = (user) => {
  console.log(user);
  return (dispatch) => {
    dispatch({
      type: REGISTER_LOADING,
    });
    AuthService.register(user).then((data) => {
      const { message } = data;
      console.log(message);
      if (message.msgError) {
        dispatch({
          type: REGISTER_FAIL,
          payload: message.msgBody,
        });
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: "Registration successful!",
        });
      }
    });
  };
};

// export const getBlogsList = () => {
//   return (dispatch) => {
//     dispatch({
//       type: LOGIN_lOADING,
//     });

//     BlogService.getTodos().then((data) => {
//       dispatch({
//         type: BLOGS_REQUEST_SUCCESS,
//         payload: data.blogs,
//       });
//     });
//   };
// };
