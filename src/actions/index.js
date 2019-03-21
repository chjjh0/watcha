import * as types from './ActionTypes';

export function login(loginId) {
    return {
        type: types.LOGIN,
        loginId
    };
}

export function logout() {
    return {
        type: types.LOGOUT
    };
}