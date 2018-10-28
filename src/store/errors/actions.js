import * as types from './actionTypes';

/**
 * Очищает ошибку
 */
export function removeError() {
    return async (dispatch, getState) => {
        dispatch({ type: types.REMOVE_ERROR });
    };
}