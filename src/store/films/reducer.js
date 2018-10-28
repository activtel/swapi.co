import * as types from './actionTypes';

/**
 * Редьюсер для преобразования части состояния приложения, связанного с фильмом.
 */
export const film = (state = {}, action) => {
    switch (action.type) {
        case types.ADD_FILM:
            return {
                episode_id: action.film.episode_id,
                title: action.film.title,
                release_date: action.film.release_date,
                producer: action.film.producer,
                director: action.film.director
            }
        case types.EDIT_FILM:
            return (state.episode_id !== action.film.episode_id)
                ? state
                : {
                    ...state,
                    episode_id: action.film.episode_id,
                    title: action.film.title,
                    release_date: action.film.release_date,
                    producer: action.film.producer,
                    director: action.film.director
                }
        default:
            return state
    }
}

/**
 * Редьюсер для преобразования части состояния приложения, связанного с фильмами.
 */
export default function reduce(state = [], action = {}) {
    switch (action.type) {
        case types.ADD_FILM:
            return [
                ...state,
                film({}, action)
            ];
        case types.FILMS_FETCHED:
            return [
                ...state,
                ...action.films
            ];
        case types.EDIT_FILM:
            return state.map(f => film(f, action));
        case types.REMOVE_FILM:
            return state.filter(f => f.episode_id !== action.episode_id)
        default:
            return state;
    }
}

// Селекторы

/**
 * Возвращает список фильмов
 * 
 * @param {object} state - состояние приложения.
 * @returns список фильмов.
 */
export function getFilms(state) {
    return state.films;
}

/**
 * Возвращает фильм по его идентификатору.
 * 
 * @param {object} state - состояние приложения.
 * @param {number} filmId - идентификатор фильма.
 * @returns фильм.
 */
export function getFilm(state, filmId) {
    return state.films
        .filter(item => item.episode_id === +filmId)[0];
}
