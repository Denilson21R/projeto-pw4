import {LOGIN_USER} from "./userActions";

const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user
  }
}

const logoutUser = () => {
  return {
    type: "LOGOUT_USER"
  }
}

const changeUserData = (user) => {
  return {
    type: "CHANGE_USER_DATA",
    payload: user
  }
}