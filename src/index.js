import './style.css';
import '../node_modules/normalize.css';


const testButton = document.querySelector('#test-button');
const searchField = document.querySelector('#search-field');


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
    console.log(location);
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

function weatherInLog(json){
    const conditions = json.currentConditions.conditions;
    const temperature = temperatureInCelcius(json.currentConditions.temp);
    console.log(`Today is ${conditions} and ${temperature} degrees celcius`)
}

testButton.addEventListener('click', ()=>{
    makeFetchRequest()
        .then(parseToJson)
        .then(weatherInLog)
        // .then(data => console.log(data))
        
});