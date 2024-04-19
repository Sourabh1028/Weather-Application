$(document).ready(function(){ 
    let cityName = $(".weather_city");
    let dateTime = $(".weather_date_time");
    let w_forcast = $(".weather_forcast");
    let W_icon = $(".weahter_icon");
    let W_temperature = $(".weather_temperature");
    let W_minTem = $(".weather_min");
    let W_maxTem = $(".weather_max");

    let w_feelsLike = $(".weather_feelsLike");
    let w_humidity = $(".weather_humidity");
    let w_wind = $(".weather_wind");
    let w_pressure = $(".weather_pressure");

    let citySearch = $(".weather_search");


    const getCountryName = (code) => {
        return new Intl.DisplayNames([code], {type: "region"}).of(code);
    }

    const getDateTime = (dt) => {
        const date = new Date(dt * 1000);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
          };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        console.log(formatter);
        return formatter.format(date);
    };

    let city = "pune";
    citySearch.on("submit", (e) => {
        e.preventDefault();

        let cityName = $(".city_name");
        city = cityName.val();

        getWeatherData();
        cityName.val() = "";
    });

    const getWeatherData = async () => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e96649321926b6f7c5e48345b1fc8bed`;

        try {
            const res = await fetch(weatherUrl);
            const data = await res.json();
            console.log(data);

            const {main, name, weather, wind, sys, dt } = data;
            cityName.html(`${name}, ${getCountryName(sys.country)}`);
            dateTime.html(`${getDateTime(dt)}`);
            w_forcast.html(weather[0].main)

            W_temperature.html(`${main.temp}&#176`);
            W_minTem.html(`Min: ${main.temp_min.toFixed()}&#176`);
            W_maxTem.html(`Max: ${main.temp_max.toFixed()}&#176`);

            w_feelsLike.html(`${main.feels_like.toFixed(2)}&#176`);
            w_humidity.html(`${main.humidity} %`);
            w_wind.html(`${wind.speed} m/s`);
            w_pressure.html(`${main.pressure} hPa`);
            W_icon.html(`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`);

        } catch (error) {
            console.log(error);
        }
    };

    $("body").load(getWeatherData());

})