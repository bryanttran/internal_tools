import {SET_PERMISSION, GET_PERMISSION,SET_INTERNAL_USER } from './actionTypes'

export const setPermission = permission => ({
    type: SET_PERMISSION,
    payload: {
        permission
    }
});

export const setInternalUser = username => ({
    type: SET_INTERNAL_USER,
    payload: {
        username
    }
});

export const getPermission = () => ({
    type: GET_PERMISSION,
});

export const setFilter = filter => ({ type: 'SET_FILTER', payload: { filter } });