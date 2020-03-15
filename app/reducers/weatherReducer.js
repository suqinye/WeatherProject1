import * as TYPES from "../types";
const initialState = {
  weatherList: [],
  forecastList: [],
  selectCity:""
};
export default function weatherList(state = initialState, action) {
  switch (action.type) {
    case TYPES.WEATHER_LIST:
      return {
        ...state,
        weatherList: action.text
      };
    case TYPES.FORECAST_LIST:
      return {
        ...state,
        forecastList: action.text
      };
    case TYPES.SELECT_CITY:
      return {
        ...state,
        selectCity: action.text
      };
    default:
      return state;
  }
}
