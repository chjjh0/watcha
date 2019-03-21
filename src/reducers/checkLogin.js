import * as types from '../actions/ActionTypes';

const initialState = {
    isLogged: false,
    loginId: ''
}

export default function login(state = initialState, action) {
    switch(action.type) {
        case types.LOGIN:
            return {
                ...state,
                isLogged: state.isLogged = true,
                loginId: state.loginId = action.loginId
            }
        case types.LOGOUT:
            return {
                ...state,
                isLogged: false,
                loginId: state.loginId = ''
            }
        default:
            return state;
    }
}