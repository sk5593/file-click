import Cookies from 'js-cookie'
const TokenKey = 'x-access-token'
const TokenKey2 = 'access_token'
var inFifteenMinutes = new Date(new Date().getTime() + 120 * 60 * 1000);
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, { expires: inFifteenMinutes })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getToken2() {
    return Cookies.get(TokenKey2)
}

export function setToken2(token) {
    return Cookies.set(TokenKey2, token, { expires: inFifteenMinutes })
}

export function removeToken2() {
    return Cookies.remove(TokenKey2)
}