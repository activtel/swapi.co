import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Компонент для редактирования фильма.
 * 
 * @class
 * @extends React.Component
 * 
 * @prop {object} film
 * @prop {object} history
 * @prop {function} onEditFilm
 */

export default class FilmEditForm extends Component {

    static propTypes = {
        /** Информация о фильме. */
        film: PropTypes.object.isRequired,
        /** Информация о истории переходов по ссылкам. */
        history: PropTypes.object.isRequired,
        /** Обратный вызов для редактирования фильма. */
        onEditFilm: PropTypes.func.isRequired
    };


    /**
     * Создает компонент.
     * @param {object} props - свойства компонента.
     */
    constructor(props) {
        super(props);
        this.state = {
            episodeId: props.film.episode_id || "",
            title: props.film.title || "",
            releaseDate: props.film.release_date || "",
            producer: props.film.producer || "",
            director: props.film.director || "",
        };

        this.submit = this.submit.bind(this);
    }

    /**
     * Обрабатывает событие нажатия на кнопку отправки формы.
     * @param {object} e - Объект события.
     */
    submit = e => {
        e.preventDefault();
        this.props.onEditFilm({
            episode_id: this.state.episodeId,
            title: this.state.title,
            release_date: this.state.releaseDate,
            producer: this.state.producer,
            director: this.state.director
        });

        this.props.history.goBack();
    }

    render() {
        return (
            <div class="card">
                <div className="card-header">
                    <h3>{this.state.episodeId ? "Редактирование эпизода" : "Добавление эпизода"}</h3>
                </div>
                <form onSubmit={this.submit} >
                    <div class="card-body">
                        <div className="form-group row">
                            <label for="episodeId" className="col-sm-2 col-form-label">Номер эпизода</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="episodeId"
                                    value={this.state.episodeId}
                                    onChange={(event) => this.setState({ episodeId: event.target.value })}
                                    placeholder="Номер эпизода..."
                                    disabled={this.props.film.episode_id}
                                    required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="title" className="col-sm-2 col-form-label">Название фильма</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    value={this.state.title}
                                    className="form-control"
                                    id="title"
                                    onChange={(event) => this.setState({ title: event.target.value })}
                                    placeholder="Название фильма..."
                                    required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="releaseDate" className="col-sm-2 col-form-label">Дата выхода</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="releaseDate"
                                    value={this.state.releaseDate}
                                    onChange={(event) => this.setState({ releaseDate: event.target.value })}
                                    placeholder="Дата выхода..."
                                    required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="producer" className="col-sm-2 col-form-label">Продюссер</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="producer"
                                    value={this.state.producer}
                                    onChange={(event) => this.setState({ producer: event.target.value })}
                                    placeholder="Продюссер..."
                                    required />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="director" className="col-sm-2 col-form-label">Продюссер</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="director"
                                    value={this.state.director}
                                    onChange={(event) => this.setState({ director: event.target.value })}
                                    placeholder="Режиссер..."
                                    required />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <div class="btn-group btn-group-toggle">
                            <button class="btn btn-success">Сохранить</button>
                            <button onClick={this.props.history.goBack} class="btn btn-default">Отменить</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
