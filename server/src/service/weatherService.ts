import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object


interface Coordinates{
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object

class Weather{
  temperature: number;
  humidity: number;
  windSpeed: number;

  constructor(temp: number, hum: number, windS: number){

    this.temperature = temp;
    this.humidity = hum;
    this.windSpeed = windS;
  }
}


// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string = "https://api.openweathermap.org/data/2.5/weather"; 
  apiKey?: string = '';
  cityName: string = '';

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }


  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any>{

    const response = await fetch(this.buildGeocodeQuery(query));
    const data = await response.json();
    return data;

  }


  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const {lat, lon} = locationData;
    return {lat, lon}
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(query: string ): string{

    return query;

  }

  // TODO: Create buildWeatherQuery method
    private buildWeatherQuery(coordinates: Coordinates): string {
      return '';
    }

  // TODO: Create fetchAndDestructureLocationData method
    private async fetchAndDestructureLocationData() {}

  // TODO: Create fetchWeatherData method
   private async fetchWeatherData(coordinates: Coordinates) {

   }

  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any) {}

  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {





   }

  // TODO: Complete getWeatherForCity method
   async getWeatherForCity(city: string) {



   }
}

export default new WeatherService();
