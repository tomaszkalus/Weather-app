function presentWeatherData(data) {

    // Function for converting epoch time to human readable.
    // If empty, returns current time
    function getTime(epoch = false) {
        let date;
        if (epoch) { date = new Date(Math.round(epoch * 1000)); }
        else { date = new Date() }
        const minutes = ('0' + date.getMinutes()).slice(-2);
        return `${date.getHours()}:${minutes}`;
    }

    const city_name = (data.name == data.city_name ? data.name : data.name + ', ' + data.city_name);
    const state = (data.state == data.name ? '' : data.state);
    const temp = Math.round(data.main.temp) + ' °C';
    const humidity = data.main.humidity + '%';
    const wind_speed = Math.round(data.wind.speed) + ' km/h';
    const weather_desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const flag_url = "https://countryflagsapi.com/png/" + data.sys.country;
    const sunrise = 'Sunrise: ' + getTime(data.sys.sunrise);
    const sunset = 'Sunset: ' + getTime(data.sys.sunset);


    document.querySelector('#country-flag').src = flag_url;
    document.querySelector('#weather-icon').src = icon_url;
    document.querySelector('#city_name').textContent = city_name;
    document.querySelector('#temperature').textContent = temp;
    document.querySelector('#humidity').textContent = humidity;
    document.querySelector('#wind_speed').textContent = wind_speed;
    document.querySelector('#time').textContent = getTime();
    document.querySelector('#weather-desc').textContent = weather_desc;
    document.querySelector('#sunrise').textContent = sunrise;
    document.querySelector('#sunset').textContent = sunset;
    document.querySelector('#state').textContent = state;
    
}

export { presentWeatherData };