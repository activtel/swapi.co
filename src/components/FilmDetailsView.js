import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

/**
 * Компонент для просмотра детальной информации о фильме.
 */
const FilmDetailsView = ({ film, match }) => (
    <div className="card">
        <div className="card-header">
            <h3>{film.title}</h3>
        </div>
        <div class="card-body">
            <h4>Эпизод {film.episode_id}</h4>

            <p>Дата выхода: {film.release_date}</p>
            <p>Продюссер: {film.producer}</p>
            <p>Режиссер: {film.director}</p>
        </div>
        <div class="card-footer text-center">
            <div class="btn-group btn-group-toggle">
                <Link key={film.episode_id} to={`${match.url}/edit`} className="btn btn-success">Редактировать</Link>
                <Link key={film.episode_id} to="/" className="btn btn-primary">К списку фильмов</Link>
            </div>
        </div>
    </div>
);

FilmDetailsView.propTypes = {
    /** Информация о фильме. */
    film: PropTypes.object.isRequired,
    /** Информация о роутинге. */
    match: PropTypes.object.isRequired
};

export default FilmDetailsView;