import swapiService from '../../services/swapi';
import * as types from './actionTypes';
import * as errors from '../errors/actionTypes';

/**
 * Запрашивает список фильмов
 */
export function fetchFilms() {
    return async (dispatch, getState) => {
        try {
            const films = await swapiService.getFilms();
            dispatch({ type: types.FILMS_FETCHED, films });
        } catch (error) {
            console.error(error);
        }
    };
}
/**
 * Изменяет фильм
 */
export function editFilms(film) {
    return async (dispatch) => {
        dispatch({ type: types.EDIT_FILM, film });
    };
}

/**
 * Добавляет фильм
 */
export function addFilms(film) {
    return async (dispatch, getState) => {
        const state = getState();
        const newfilm = {
            ...film,
            episode_id: +film.episode_id
        }

        if (state.films.filter(f => f.episode_id === newfilm.episode_id)[0]) {
            dispatch({ type: errors.ERROR, message: `Эпизод с номером ${newfilm.episode_id} уже существует.` });
        } else {
            dispatch({ type: types.ADD_FILM, film: newfilm });
        }
    };
}

/**
 * Удаляет фильм
 */
export function removeFilm(episode_id) {
    return async (dispatch) => {
        dispatch({ type: types.REMOVE_FILM, episode_id });
    };
}