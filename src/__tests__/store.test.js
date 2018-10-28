import * as reducers from '../store/reducers';
import { addFilms } from '../store/films/actions';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

describe("store test", () => {
    let store;
    const films = [
        {
            "title": "A New Hope",
            "episode_id": 4,
            "director": "George Lucas",
            "producer": "Gary Kurtz, Rick McCallum",
            "release_date": "1977-05-25",
        },
        {
            "title": "Attack of the Clones",
            "episode_id": 2,
            "director": "George Lucas",
            "producer": "Rick McCallum",
            "release_date": "2002-05-16",
        },
        {
            "title": "The Phantom Menace",
            "episode_id": 1,
            "director": "George Lucas",
            "producer": "Rick McCallum",
            "release_date": "1999-05-19",
        }
    ];

    beforeAll(() => {
        store = createStore(combineReducers(reducers), { films }, applyMiddleware(thunk));
        store.dispatch(addFilms({
                "title": "Revenge of the Sith",
                "episode_id": 3,

                "director": "George Lucas",
                "producer": "Rick McCallum",
                "release_date": "2005-05-19",
            })
        );
    })

    it("ADD_FILM store success", () => expect(store.getState().films.length).toBe(4));
});