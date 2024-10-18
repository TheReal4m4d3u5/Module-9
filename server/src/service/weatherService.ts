import dotenv from 'dotenv';
// import axios from 'axios';
//import e from 'express';
dotenv.config();

// TODO: Define an interface for the Coordinates object


interface Coordinates{
  latitude: number;
  longitude: number;
}


// interface WeatherData {
//   temperature: number;
//   description: string;
//   city: string;
//   country: string
// }


// TODO: Define a class for the Weather object

class Weather{
  temperature: number;
  humidity: number;
  windSpeed: number;
  coordinates: Coordinates;


  constructor(temp: number, hum: number, windS: number, coordinates: Coordinates){

    this.temperature = temp;
    this.humidity = hum;
    this.windSpeed = windS;
    this.coordinates = coordinates;
  }
}


// TODO: Complete the WeatherService class
class WeatherService {

  //what is this? from the homework readme
  //[5-day weather forecast API](https://openweathermap.org/forecast5) 
  //[Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string; 
  private apiKey?: string;
  cityName: string = '';

  constructor(cityName: string = "") {
    this.baseURL = process.env.API_BASE_URL || 'Your_Base_URL';
    this.apiKey = process.env.API_KEY || 'YOUR_API_KEY';
    this.cityName = cityName;
  }


  // // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any>{

    const response = await fetch(query);

    if(!response.ok){
        throw new Error('Failed to fetch location data.');
    }
    const data = await response.json();
    return data;
  }

  
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    
    let myCord: Coordinates;

    console.log("locationData: " + locationData);
    myCord = {latitude: locationData.latitude, longitude: locationData.longitude};
    return myCord
  }


  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string{
    let query = `http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&limit=5&appid=${this.apiKey}`;
    return query;
  }



  // // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {

    let query = `${this.baseURL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
    return query;
  }

  // // TODO: Create fetchAndDestructureLocationData method
     private async fetchAndDestructureLocationData() {
  
      let locationData = await this.destructureLocationData(await this.fetchLocationData(this.buildGeocodeQuery()));
      return locationData; 
    }

  // // TODO: Create fetchWeatherData method
    private async fetchWeatherData() {

      const response = await fetch(this.buildWeatherQuery(await this.fetchAndDestructureLocationData()));

      if(!response.ok){
          throw new Error('Failed to fetch weather data.');
      }
      const data = await response.json();
      return data;

    }

  // // TODO: Build parseCurrentWeather method
    private parseCurrentWeather(response: any) {
  
      const temperature = response.main.temp;
      const humidity = response.main.humidity;
      const windSpeed = response.wind.speed;

      const coordinates: Coordinates = {
        latitude: response.coordinates.lat,
        longitude: response.coordinates.lat,
         
      };

      return new Weather(
        temperature,
        humidity,
        windSpeed,
        coordinates, 
      );
    }




  // // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
      const forecaseArray: Weather[] = [];

      forecaseArray.push(currentWeather);

      weatherData.forEach((entry:any ) =>{


        const weather = new Weather(

          entry.main.temp,
          entry.main.humidity,
          entry.wind.speed,
          { latitude: entry.coordinates.lat, longitude: entry.coordinates.lon}
        );

        forecaseArray.push(weather);

      } );


      return forecaseArray;

   }

  // // TODO: Complete getWeatherForCity method

  async getWeatherForCity(cityName: string) {
    
    this.cityName = cityName;

    let weatherData = await this.fetchWeatherData();

    let currentWeather = this.parseCurrentWeather(weatherData)
    let currentForcast = this.buildForecastArray(currentWeather, weatherData)


    return currentForcast;
   
  }

}

export default new WeatherService();
