const key = '2332fe3ba39615a36f2b036e3cbdaaf6';

const api = {
    // Fetching data from given URL
    getData: async function getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;

    },

    // Function for constructing a weather query
    weatherQuery: function (geocoding_response) {
        const base_url = 'https://api.openweathermap.org/data/2.5/weather?';
        const url = new URLSearchParams();
        url.append('lat', geocoding_response.lat);
        url.append('lon', geocoding_response.lon);
        url.append('units', 'metric');
        url.append('appid', key);
        return base_url + url.toString();
    },

    // Function for constructing a geocoding query
    getGeocodingQuery: function (query) {
        const base_url = 'https://api.openweathermap.org/geo/1.0/direct?';
        const url = new URLSearchParams();
        url.append('q', query);
        url.append('limit', 5);
        url.append('appid', key);
        return base_url + url.toString();
    }
};

export { api };