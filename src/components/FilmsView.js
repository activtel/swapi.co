import React from 'react';
import { Link, NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const selectedStyle = { color: 'red' }

/**
 * Компонент для просмотра списка фильмов.
 */
const FilmsView = ({ films, match, removeFilm }) => (
    <table className="table">
        <thead>
            <tr>
                <th>
                    <NavLink to="/" style={match.url.indexOf("/sort/date") < 0 ? selectedStyle : undefined}>Номер эпизода</NavLink>
                </th>
                <th>Название эпизода</th>
                <th>
                    <NavLink to="/sort/date" activeStyle={selectedStyle}>Дата выхода</NavLink>
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                films.map((film) =>
                    <tr key={film.episode_id}>
                        <td>{film.episode_id}</td>
                        <td>
                            <Link key={film.episode_id} to={`/details/${film.episode_id}`}>{film.title}</Link>
                        </td>
                        <td>{film.release_date}</td>
                        <td><button onClick={() => removeFilm(film.episode_id)} className="btn btn-danger">Удалить</button></td>
                    </tr>
                )}
        </tbody>
    </table>
);

FilmsView.propTypes = {
    /** Список фильмов. */
    films: PropTypes.array.isRequired,
    /** Информация о роутинге. */
    match: PropTypes.object.isRequired,
    /** Метод для удаления информации о фильме. */
    removeFilm: PropTypes.func.isRequired,
};

export default FilmsView;