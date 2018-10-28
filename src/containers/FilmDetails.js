import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as filmsActions from '../store/films/actions';
import * as filmsSelectors from '../store/films/reducer';
import Preloader from '../components/Preloader';
import FilmDetailsView from '../components/FilmDetailsView';

/**
 * Компонент-контйнер для детальной информации о фильме.
 * 
 * @class
 * @extends React.Component
 * 
 * @prop {array} films
 * @prop {object} match
 */
class FilmDetails extends Component {

    static propTypes = {
        /** Информация о фильме. */
        film: PropTypes.object.isRequired,
        /** Информация о роутинге. */
        match: PropTypes.object.isRequired
    };

    componentDidMount() {
        if (!this.props.film) this.props.dispatch(filmsActions.fetchFilms());
    }

    render() {
        if (!this.props.film) return <Preloader />;

        return (
            <FilmDetailsView film={this.props.film} match={this.props.match} />
        );
    }
}


export default connect(
    (state, props) => ({
        film: filmsSelectors.getFilm(state, props.match.params.filmId)
    })
)(FilmDetails);