import * as TYPES from "../types";

import NetUtil from '../util/NetUtil';
//	实况天气
export function getNowWeather(name){
// export function getWeather(self){
    return dispatch => {
        // const name = self.props.selectCity?self.props.selectCity:"上海"
        return fetch("https://free-api.heweather.net/s6/weather/now?location="+name)
        .then((response)=>{
            if(response.ok){
                return response.json();
            }
        })
        .then((jsonData)=>{
            dispatch(changeWeather(jsonData));
        }).done
    };
}

//forecast 3-10天预报

export function getForecastWeather(name){
    // export function getWeather(self){
        return dispatch => {
            // const name = self.props.selectCity?self.props.selectCity:"上海"
            return fetch("https://free-api.heweather.net/s6/weather/forecast?location="+name)
            .then((response)=>{
                if(response.ok){
                    return response.json();
                }
            })
            .then((jsonData)=>{
                dispatch(changeForecast(jsonData));
            }).done
        };
    }


    //hourly 	逐小时预报
    export function getHourlyWeather(name){
        // export function getWeather(self){
            return dispatch => {
                // const name = self.props.selectCity?self.props.selectCity:"上海"
                return fetch("https://free-api.heweather.net/s6/weather/hourly?location="+name)
                .then((response)=>{
                    if(response.ok){
                        return response.json();
                    }
                })
                .then((jsonData)=>{
                    dispatch(changeForecast(jsonData));
                }).done
            };
        }

// Lifestyle生活指数
export function getLifestyleWeather(name){
    // export function getWeather(self){
        return dispatch => {
            // const name = self.props.selectCity?self.props.selectCity:"上海"
            return fetch("https://free-api.heweather.net/s6/weather/lifestyle?location="+name)
            .then((response)=>{
                if(response.ok){
                    return response.json();
                }
            })
            .then((jsonData)=>{
                dispatch(changeForecast(jsonData));
            }).done
        };
    }
export function changeWeather(weatherList) {
  return {
    type: TYPES.WEATHER_LIST,
    text: weatherList
  };
}



export function changeForecast(forecastList) {
  return {
    type: TYPES.FORECAST_LIST,
    text: forecastList
  };
}
export function getCity(name){
    return dispatch => {
        dispatch(changeCity(name));
    };
}
export function changeCity(selectCity) {
  return {
    type: TYPES.SELECT_CITY,
    text: selectCity
  };
}
