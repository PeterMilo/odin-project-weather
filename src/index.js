import './style.css';
import '../node_modules/normalize.css';


let weatherData
const testButton = document.querySelector('#test-button');
const searchField = document.querySelector('#search-field');
const temperatureDisplay = document.querySelector('.temperature');
const conditionsIconDisplay = document.querySelector('.weather-icon');
const loadingSpinner = document.querySelector('#loading-spinner'); 



function makeFetchRequest () {
    return fetch(urlWithSearch(), {mode:'cors'});
};


function urlWithSearch() {
    const weatherUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const apiKey = 'T4TV4WJWEUEWYYCZW5TQMWT3U';
    const searchTerm = getSearchInput();
    const urlString = weatherUrl+searchTerm+'?key='+apiKey;
    console.log(urlString)
    return urlString;

}

function getSearchInput(){
    const location = searchField.value;
    return location; 
}


function parseToJson(data){
    return data.json();
}

function temperatureInCelcius(farenheit){
    const celcius = (farenheit-32)*(5/9);
    const celciusRounded = celcius.toFixed(1);
    return celciusRounded;
}

function displayTemperature(){
    const temperatureToDisplay = temperatureInCelcius(weatherData.localweather.temperature);
    temperatureDisplay.textContent = temperatureToDisplay;
    console.log(temperatureToDisplay);
}

function displayWeatherConditions() {
    const conditionsToDisplay = weatherData.localweather.currentConditions;
    let result
    let iconToDisplay

    switch(conditionsToDisplay){
        case 'Partially cloudy': 
            result = '🌤';
            break;
        case 'Overcast':
            result = '☁';
            break;
        case 'Clear':
            result = '☀';
            break;
        case 'Drizzle':
            result = '🌧';
            break;
        default:
            result = 'Unknown weather';
    }

    conditionsIconDisplay.textContent = result;

}


async function getSpecificWeatherData(){
    const fetchObject = await makeFetchRequest();
    const jsonObject = await fetchObject.json();
    const weatherConditions = await jsonObject.currentConditions.conditions;
    const weatherTemperature = await jsonObject.currentConditions.temp;

    const myWeatherObject = await {localweather: {currentConditions:weatherConditions,temperature:weatherTemperature} 
    }

    weatherData = myWeatherObject;

    console.log(myWeatherObject);
    return myWeatherObject;
}

function weatherInLog(json){
    const conditions = json.currentConditions.conditions;
    const temperature = temperatureInCelcius(json.currentConditions.temp);
    console.log(`Today is ${conditions} and ${temperature} degrees celcius`)
}

testButton.addEventListener('click', ()=>{

    loadingSpinner.style.display = 'block'; // Show the spinner

    makeFetchRequest()
        .then(parseToJson)
        .then(weatherInLog)
        .then(getSpecificWeatherData)
        .then(displayTemperature)
        .then(displayWeatherConditions)
        .catch(error => console.error('Error:', error))
        .finally(() => {
            loadingSpinner.style.display = 'none'; // Hide the spinner after everything is done
        });
});

