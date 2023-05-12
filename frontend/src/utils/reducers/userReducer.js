import {CHANGE_USER_DATA, LOGIN_USER, LOGOUT_USER} from "../actions/userActions";

const initialState = {
    user: null,
    token: null
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            return{
                ...state,
                user: action.payload.user,
                token: action.payload.token
            }
        case LOGOUT_USER:
            return{
                ...state,
                user: null,
                token: null
            }
        case CHANGE_USER_DATA:
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state;
    }
}