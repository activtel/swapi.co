import { connect } from 'react-redux';
import * as filmsSelectors from '../store/films/reducer';
import * as filmsActions from '../store/films/actions';
import FilmEditForm from '../components/FilmEditForm';

/**
 * Компонент-контейнер для редактирования информации о фильме.
 */
export default connect(
    (state, props) => ({
        film: filmsSelectors.getFilm(state, props.match.params.filmId) || {},
        history: props.history
    }),
    dispatch =>
        ({
            onEditFilm(film) {
                // При сохранении номер эпизодап прел=образуется в число и так хранится
                // Если здесь пришла строка, то значит, что происходит добавление фильма
                if (typeof film.episode_id === 'string') {
                    dispatch(filmsActions.addFilms(film));
                } else {
                    dispatch(filmsActions.editFilms(film));
                }
            }
        })
)(FilmEditForm);