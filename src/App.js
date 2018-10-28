import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Films from './containers/Films';
import FilmDetails from './containers/FilmDetails';
import FilmEdit from './containers/FilmEdit';
import ErrorBoundary from './ErrorBoundary'

/**
 * Компонент страницы 404.
 */
export const Whoops404 = ({ location }) => (
    <div className="whoops-404">
        <h1>Ресурс "{location.pathname}" не найден.</h1>
    </div>
);

class App extends Component {
    render() {
        return (
            <ErrorBoundary>
                <div className="container">
                    <Router>
                        <div>
                            <Switch>
                                <Route path="/add" component={FilmEdit} />
                                <Route path="/details/:filmId/edit" component={FilmEdit} />
                                <Route path="/details/:filmId" component={FilmDetails} />
                                <Switch>
                                    <Route path="/sort/:sort" component={Films} />
                                    <Route exact path="/" component={Films} />
                                </Switch>
                                <Route component={Whoops404} />
                            </Switch>
                        </div>
                    </Router>
                </div>
            </ErrorBoundary>
        );
    }
}

export default App;
