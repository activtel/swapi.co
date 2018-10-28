import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import * as filmsActions from '../store/films/actions';
import * as errorsActions from '../store/errors/actions';
import * as filmsSelectors from '../store/films/reducer';
import * as errorSelectors from '../store/errors/reducer';
import Preloader from '../components/Preloader';
import FilmsView from '../components/FilmsView';
import SearchView from '../components/SearchView';

const PAGE_SIZE = 5;

/**
 * Компонент-контйнер для просмотра списка фильмов.
 * 
 * @class
 * @extends React.Component
 * 
 * @prop {array} films
 * @prop {object} match
 */
class Films extends Component {

    static propTypes = {
        /** Список фильмов. */
        films: PropTypes.array.isRequired,
        /** Информация о роутинге. */
        match: PropTypes.object.isRequired,
    };

    /**
     * Создает компонент.
     * @param {object} props - свойства компонента.
     */
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1
        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount() {
        if (!this.props.films.length) this.props.dispatch(filmsActions.fetchFilms());
    }

    /**
     * Возвращает список фильмов с учетом сортировки, фильтрации, пагинации
     */
    getFilms() {
        let sortFunction = (a, b) => a.episode_id - b.episode_id;
        if (this.props.match.params.sort === "date") {
            sortFunction = (a, b) => new Date(a.release_date) - new Date(b.release_date)
        }

        // сортируем массив
        let films = [...this.props.films].sort(sortFunction);

        // фильтруем массив
        if (this.state.term) {
            films = [...films].filter(f => f.title.toLowerCase().includes(this.state.term.toLowerCase()))
        }

        // разбиваем на страницы
        return this.paginator(films, this.state.pageNumber, PAGE_SIZE);
    }

    /**
     * Разбивает массив на страницы
     * @param {array} items - массив.
     * @param {number} pageNumber - номер страницы.
     * @param {number} pageSize - количество страниц.
     */
    paginator(items, pageNumber = 1, pageSize = PAGE_SIZE) {

        const offset = (pageNumber - 1) * pageSize,
            paginatedItems = items.slice(offset).slice(0, pageSize),
            totalPages = Math.ceil(items.length / pageSize);

        return {
            pageNumber: pageNumber,
            pageSize: pageSize,
            prePage: pageNumber - 1 ? pageNumber - 1 : null,
            nextPage: (totalPages > pageNumber) ? pageNumber + 1 : null,
            total: items.length,
            totalPages: totalPages,
            data: [...paginatedItems]
        };
    }

    /**
     * Удаляет фильм.
     * @param {number} id - номер эпизода.
     */
    removeFilm = (id) => {
        this.props.dispatch(filmsActions.removeFilm(id));
    }

    /**
     * Очищает ошибки.
     */
    clearError = () => {
        this.props.dispatch(errorsActions.removeError());
    }

    handlePageClick(data) {
        this.setState({ pageNumber: data.selected + 1 })
    };

    render() {
        if (!this.props.films.length) {
            return <div className="text-center"><Preloader /></div>;
        }

        if (this.props.errors.error) {
            return (
                <div class="alert alert-danger" role="alert">
                    <h2 key="h">Произошла ошибка.</h2>
                    <p>{this.props.errors.error}</p>
                    <button key="b" onClick={() => this.clearError()} className="btn btn-dark">Продолжить работу</button>
                </div>
            )
        }

        let pagination = this.getFilms();
        return [
            <nav className="navbar navbar-dark bg-dark justify-content-between">
                <Link key="a" to="/add" className="btn btn-success">Добавить фильм</Link>
                <form class="form-inline">
                    <SearchView
                        key="s"
                        onChange={(term) => this.setState({ term: term, pageNumber: 1 })} />
                </form>
            </nav>,


            <FilmsView
                key="f"
                films={pagination.data}
                match={this.props.match}
                removeFilm={this.removeFilm} />,
            <nav aria-label="Page navigation example">
                <ReactPaginate key="p" previousLabel={"Предыдущая"}
                    nextLabel={"следующая"}
                    breakLabel={"..."}
                    pageCount={pagination.totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    previousClassName={"page-item"}
                    nextClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    activeClassName={"active"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                />
            </nav>
        ];
    }
}

// Выбираем необходимые компоненту свойства
function mapStateToProps(state) {
    return {
        films: filmsSelectors.getFilms(state),
        errors: errorSelectors.getErrors(state),
    };
}

export default connect(mapStateToProps)(Films);
