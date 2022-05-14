let lat;
let long;
const apiKey= "69feb6cdb8ed24b1f17a170861cbf5d9";

function startApp() {
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                
                console.log("lat:", lat, "long", long);
                getWeatherData();
            }
        );
    }
}

function getWeatherData() {
    let  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    console.log(url);

    fetch(url).then( function(responce){
        responce.json().then( function(data){
            console.log(data);
            updateWeatherData(data);
        } );
    });
}

function updateWeatherData(data){
    const temp = data.main.temp;
    document.getElementById("temp").innerHTML = temp;

    const humidity = data.main.humidity;
    document.getElementById("humidity").innerHTML = humidity;

    const pressure = data.main.pressure;
    document.getElementById("pressure").innerHTML = pressure;

    const cloudsPerc = data.clouds.all;
    document.getElementById("cloudsPerc").innerHTML = cloudsPerc;

    const windSpeed = data.wind.speed;
    document.getElementById("windSpeed").innerHTML = windSpeed;

    const sunRise = new Date(data.sys.sunrise *1000);
    document.getElementById("sunRise").innerHTML = sunRise.getHours() + ":" + sunRise.getMinutes();

    const sunSet = new Date(data.sys.sunset *1000);
    document.getElementById("sunSet").innerHTML = sunSet.getHours() + ":" + sunRise.getMinutes();
    
    let imgUrl = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    document.getElementById("currentWeatherImg").setAttribute("src", imgUrl);
    
    const city = data.name;
    const locationLink = document.getElementById("locationLink");
    locationLink.innerHTML = city;

    locationLink.href = `https://openstreetmap.org/#map=15/${lat}/${long}`;
}