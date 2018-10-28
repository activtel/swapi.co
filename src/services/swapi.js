// Адрес REST-API swapi.co
const SWAPI_ENDPOINT = 'https://swapi.co/api';

/**
 * Сервис для получения данных от swapi.co.
 * 
 * @class
 * @extends React.Component
 * 
 * @prop {array} films
 * @prop {object} match
 */
class SwapiService {

    /**
     * Возвращает список фильмов
     * 
     * @returns список фильмов.
     */
    async getFilms() {
        const url = `${SWAPI_ENDPOINT}/films/`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`При вызове метода getFilms сервиса SwapiService произошла ошибка, HTTP статус ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    }

}

export default new SwapiService();