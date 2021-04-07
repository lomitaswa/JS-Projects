const inp = document.querySelector('#form input[type="text"]');
const btn = document.querySelector('button');

const apiKey = 'be4745cd26e0655266c98bd1346c1679';

// https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=be4745cd26e0655266c98bd1346c1679

let addWeather = (obj) => {
    let date = getDays();

    document.querySelector('#location').innerText = obj.city +", " +obj.country;
    document.querySelector('#date').innerText = date.day +", "+date.date +" " +date.month+" "+ date.year;
    document.querySelector('#temp').innerText = Math.floor(obj.temp-273.15)+"°C";
    document.querySelector('#desc').innerText = obj.weather;
    document.querySelector('#min-max').innerText = Math.floor(obj.minTemp-273.15)+"°C/ "+Math.floor(obj.maxTemp-273.15)+"°C";
    document.querySelector('#humidity').innerText = "Humidity: "+obj.humidity+"%";
    document.querySelector('#wind').innerText = "Wind Speed: "+obj.windSpeed+"km/h";
}

let getDays = () => {
    let date = new Date();

    let days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dateObj = {
        day: days[date.getDay()],
        date: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear()
    }
    return dateObj;
}

btn.addEventListener('click', (e) => {
    const cityName = inp.value;

    if(cityName){
        e.preventDefault();
        // console.log(cityName);
        const uri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        fetch(uri)
            .then((data) => {
                return data.json();
            })
            .then((parsedData) => {
                
                if(parsedData.cod == 404){
                    throw new Error('City not Found');
                } else {
                    const weatherObj = {
                        city: parsedData.name,
                        country: parsedData.sys.country,
                        temp: parsedData.main.temp,
                        maxTemp: parsedData.main.temp_max,
                        minTemp: parsedData.main.temp_min,
                        weather: parsedData.weather[0].main,
                        humidity: parsedData.main.humidity,
                        windSpeed: parsedData.wind.speed
                    }
                    // console.log(weatherObj);
                    addWeather(weatherObj);
                }
                
            })
            .catch((e) => {
                alert(e.message);
            })
       
    } else{
        alert('Please enter city name !!!');
    }

    inp.value = ''
})
