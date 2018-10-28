import * as types from '../store/films/actionTypes';
import { film } from '../store/films/reducer';
import deepFreeze from 'deep-freeze'


describe("film Reducer", () => {
    it("ADD_FILM success", () => {
        const state = {};
        const action = {
            type: types.ADD_FILM,
            film: {
                "episode_id": 4,
                "director": "George Lucas",
                "release_date": "1977-05-25",
                "title": "A New Hope"
            }
        };

        deepFreeze(state);
        deepFreeze(action);

        const results = film(state, action);
        expect(results).toEqual({
            "episode_id": 4,
            "director": "George Lucas",
            "release_date": "1977-05-25",
            "title": "A New Hope"
        });
    });

    it("EDIT_FILM success", () => {

        const state = {
            "episode_id": 4,
            "director": "George Lucas",
            "release_date": "1977-05-25",
            "title": "A New Hope"
        }
            ;
        const action = {
            type: types.EDIT_FILM,
            film: {
                "episode_id": 4,
                "director": "Rick McCallum",
                "release_date": "2002-05-16",
                "title": "Attack of the Clones"
            }
        };

        deepFreeze(state);
        deepFreeze(action);

        const results = film(state, action);
        expect(results).toEqual({
            "episode_id": 4,
            "director": "Rick McCallum",
            "release_date": "2002-05-16",
            "title": "Attack of the Clones"
        });
    });
});