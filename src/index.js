renderBackground();

const refreshBtn = document.getElementById('refresh-button'),
    currentLocation = document.getElementById('current-location'),
    dateTime = document.getElementById('date-time'),
    currentTemperature = document.getElementById('current-temperature'),
    currentIcon = document.getElementById('current-icon'),
    wetherDescription = document.getElementById('wether-description'),
    feelsLike = document.getElementById('feels-like'),
    windBlock = document.getElementById('wind-block'),
    currentHumidity = document.getElementById('humidity'),
    todayDate = document.getElementById('today'),
    todayDegrees = document.getElementById('today-degrees'),
    todayIcon = document.getElementById('today-icon'),
    tomorrowDate = document.getElementById('tomorrow'),
    tomorrowDegrees = document.getElementById('tomorrow-degrees'),
    tomorrowIcon = document.getElementById('tomorrow-icon'),
    afterTomorrowDate = document.getElementById('after-tomorrow'),
    afterTomorrowDegrees = document.getElementById('after-tomorrow__degrees'),
    afterTomorrowIcon = document.getElementById('after-tomorrow__icon'),
    currentLatitude = document.getElementById('latitude'),
    currentLongitude = document.getElementById('longitude'),
    EngBtn = document.getElementById('english-language'),
    RusBtn = document.getElementById('russian-language'),
    BelBtn = document.getElementById('belarusian-language');

let AppLanguage = 1,
    now = new Date(),
    mapLatitude,
    mapLongitude;

refreshBtn.addEventListener('click', renderBackground);

function getUserLocation() {
    return fetch('https://ipinfo.io/json?token=8bd8e9716fc2b5')
        .then(response => {
            return response.json();
        })
}

function getWhether(locationCity) {

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=3f3f4e007992408ab39154350203005&q=${locationCity}&days=3`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            currentLocation.innerText = `${data.location.name}, ${data.location.country}`;
            currentTemperature.innerText = `${data.current.temp_c}`;
            currentIcon.style.backgroundImage = `url(http:${data.current.condition.icon})`;
            wetherDescription.innerText = `${data.current.condition.text}`;
            feelsLike.innerText = `Feels like: ${data.current.feelslike_c}`;
            windBlock.innerText = `Wind: ${data.current.wind_kph}`;
            currentHumidity.innerText = `Humidity: ${data.current.humidity} %`;
            todayDate.innerText = `${data.forecast.forecastday[0].date}`;
            todayDegrees.innerText = `${data.forecast.forecastday[0].day.avgtemp_c}`;
            todayIcon.style.backgroundImage = `url(http:${data.forecast.forecastday[0].day.condition.icon})`;
            tomorrowDate.innerText = `${data.forecast.forecastday[1].date}`;
            tomorrowDegrees.innerText = `${data.forecast.forecastday[1].day.avgtemp_c}`;
            tomorrowIcon.style.backgroundImage = `url(http:${data.forecast.forecastday[1].day.condition.icon})`;
            afterTomorrowDate.innerText = `${data.forecast.forecastday[2].date}`;
            afterTomorrowDegrees.innerText = `${data.forecast.forecastday[2].day.avgtemp_c}`;
            afterTomorrowIcon.style.backgroundImage = `url(http:${data.forecast.forecastday[2].day.condition.icon})`;
            currentLatitude.innerText = `Latitude: ${data.location.lat}`;
            currentLongitude.innerText = `Longitude: ${data.location.lon}`;
            dateTime.innerText = `${now}`;
            mapLatitude = data.location.lat;
            mapLongitude = data.location.lon;

            mapboxgl.accessToken = 'pk.eyJ1IjoiNHlnbyIsImEiOiJja2FxeG51ZmYwNHl4MndvNXFsaHc2b2F6In0.oEg5vdV5Ba_q4uk8s1pyKg';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [mapLongitude, mapLatitude],
                zoom: 9
            });

            var marker = new mapboxgl.Marker()
                .setLngLat([mapLongitude, mapLatitude])
                .addTo(map);
        })
}

function init() {
    getUserLocation().then(location => {
            const currentCity = location.city;
            return getWhether(currentCity);
        })
        .then(currentWhether => {

        })
}

init();


function renderBackground() {
    fetch('https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=3weiH4JD7jfoK87qEYCgET6aTNZHosBSrkRgyPfVZ9o')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.body.style.backgroundImage = `url(${data.urls.regular})`;
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundSize = "cover";
        });
}