//https://api.heweather.net/s6/weather/now?location=beijing&key=627bb177b1af4abd94de23a35b711f32

export default function fetchWeather(city) {
    let url = `https://api.heweather.net/s6/weather/now?location={city}&key=627bb177b1af4abd94de23a35b711f32`;
  
    return fetch(url).then((response) => response.json())
  }