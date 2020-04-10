export const SET_AUTHED_USER = 'SET_AUTH_USER';

export function setAuthUser (id = null) {
  return {
    type: SET_AUTHED_USER,
    id
  };
}