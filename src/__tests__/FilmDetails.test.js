import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import FilmDetailsView from '../components/FilmDetailsView';

describe("<FilmDetailsView /> ", () => {

    configure({ adapter: new Adapter() });

    const film = {
        "episode_id": 4,
        "director": "George Lucas",
        "release_date": "1977-05-25",
        "title": "A New Hope"
    };

    const match = {
        url: "url"
    };

    it("renders <FilmDetailsView />", () =>
        expect(shallow(
            <FilmDetailsView
                film={film}
                match={match} />
        ).find('div.card').length).toBe(1)
    );
}) 