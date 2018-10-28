import * as types from './actionTypes';

/**
 * Редьюсер для преобразования части состояния приложения, связанного с фильмами.
 */
export default function reduce(state = {}, action = {}) {
    switch (action.type) {
        case types.ERROR:
            return {
                ...state,
                error: action.message
            }
        case types.REMOVE_ERROR:
            return {
                ...state,
                error: ""
            }
        default:
            return state;
    }
}

// Селекторы

/**
 * Возвращает ошибку
 * 
 * @param {object} state - состояние приложения.
 * @returns список фильмов.
 */
export function getErrors(state) {
    return state.errors;
}
