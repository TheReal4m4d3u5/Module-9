import dotenv from 'dotenv';
// import axios from 'axios';
//import e from 'express';
dotenv.config();

// TODO: Define an interface for the Coordinates object

interface Coordinates{
  latitude: number;
  longitude: number;
}


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

    const coordinates = [data[0].lat, data[0].lon];

    console.log("data.latitude: " + data[0].lon);

    return coordinates;
  }

  
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    
    let myCord: Coordinates;
    console.log("destructureLocationData");
    console.log("locationData.latitude: ", locationData);
    console.log("locationData.latitude: " + locationData[0]);
    console.log("locationData.latitude: " + locationData[1]);
    //console.log("locationData[0]: " + locationData[]);
                          
    console.log("destructureLocationData");

    myCord = {latitude: locationData[0], longitude: locationData[0]};
    return myCord
  }


  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string{
    let query = `http://api.openweathermap.org/geo/1.0/direct?q=${this.cityName}&limit=5&appid=${this.apiKey}`;
    console.log("buildGeocodeQuery: ");
    console.log("query: " + query);
    console.log("buildGeocodeQuery: ");
    console.log(" ");

    return query;
  }



  // // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {

    let query = `${this.baseURL}/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
    console.log("query: " + query);

    return query;
  }

  // // TODO: Create fetchAndDestructureLocationData method
     private async fetchAndDestructureLocationData() {
      let locationDataDestructured = await this.destructureLocationData(await this.fetchLocationData(this.buildGeocodeQuery()));
      return locationDataDestructured; 
    }

  // // TODO: Create fetchWeatherData method
    private async fetchWeatherData() {

      const response = await fetch(this.buildWeatherQuery(await this.fetchAndDestructureLocationData()));

      console.log("response: " , response);

      if(!response.ok){
          throw new Error('Failed to fetch weather data.');
      }

      const data = await response.json();


      data.forEach((entry:any) => {

        console.log("main.temp, " + entry)
      })

      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")





      return data;

    }

  // // TODO: Build parseCurrentWeather method
    private parseCurrentWeather(response: any) {
  
      const temperature = response.main.temp;
      const humidity = response.main.humidity;
      const windSpeed = response.wind.speed;

      const coordinates: Coordinates = {
        latitude: response.coord.lat,
        longitude: response.coord.long,
         
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

      console.log("weatherData!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log("weatherData[0].coord");
      console.log(weatherData[0].coord);
  
      console.log("weatherData!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    //  console.log("myData: " + weatherData.temp);


      
   
      weatherData.forEach((entry:any) => {

         console.log("main.temp, " + entry)

        //  const weather = new Weather(

        //   entry.main.temp,
        //   entry.main.humidity,
        //   entry.wind.speed,
        //   { latitude: entry.coord.lat, longitude: entry.coord.lon}
        // );

        // console.log("weather", weather);

        // forecaseArray.push(weather);

      } );

      return forecaseArray;
   }

  // // TODO: Complete getWeatherForCity method

  async getWeatherForCity(cityName: string) {
    
    this.cityName = cityName;

    let weatherData = await this.fetchWeatherData();

    console.log("weatherData: " + weatherData[0]);

    let currentWeather = this.parseCurrentWeather(weatherData)

    let currentForcast = this.buildForecastArray(currentWeather, weatherData)

    return currentForcast;
   
  }

}

export default new WeatherService();
