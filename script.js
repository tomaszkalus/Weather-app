import { api } from "./api.js";
import { presentWeatherData } from "./showData.js";
import { deleteSuggestionsDropdown, showSuggestions } from "./suggestions.js";

// Object for accessing the DOM elements (search bar and button)
const dom = {
    city_input: (document.querySelector('#city-input')),
    search_btn: (document.querySelector('#search-btn'))
};

// Wrapper function for getting the data, processing it and showing on screen
async function showWeather(coordinates) {
    const weather_query = api.weatherQuery(coordinates);
    const weather_data = await api.getData(weather_query);
    Object.assign(weather_data, { city_name: coordinates.name });
    Object.assign(weather_data, { state: coordinates.state });

    presentWeatherData(weather_data);
}

// Shows the weather from the suggestion box that the user clicks
function getWeatherFromSuggestion(ev, suggestions) {
    const id = ev.target.getAttribute('data-id');
    showWeather(suggestions[id]);
}

// Showing the default city before the user picks his
async function showDefaultCity() {
    const query = api.getGeocodingQuery(default_city);
    console.log(query);
    const geo = await api.getData(query);
    showWeather(geo[0]);
}

// Handling the suggestions showing up when user searches for the city
dom.city_input.addEventListener('keyup', async e => {
    if (e.key != 'Escape') {
        const suggestions = await showSuggestions(e);
        const suggestion_boxes = document.querySelectorAll('.list-items');
        suggestion_boxes.forEach(e => {
            e.addEventListener('click', e => {
                getWeatherFromSuggestion(e, suggestions);
            });
        });
    }
});

// Closes the suggestions dropdown when user presses escape
document.addEventListener('keydown', e => {
    if (e.key == 'Escape') {
        deleteSuggestionsDropdown();
        dom.city_input.value = '';
    }
});

const default_city = 'New York';
showDefaultCity();