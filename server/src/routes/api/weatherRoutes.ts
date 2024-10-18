import { Router } from 'express';
const router = Router();
// import fs from 'node:fs/promises';

import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));








// TODO: POST Request with city name to retrieve weather data

 
  // TODO: GET weather data from city name
  //got from parkRoutes.ts api 
  //idenify lat and lon 
  // openweathermap geo weather point returns lat and lon
  // openweathermap endpoint by city name - resources channel 
  // https://openweathermap.org/current#name
  router.get('/weather/', async (req, res) => {
    
  //  const city = req.body;
    try {

      const city = req.body.city;

      //gets send to the front end, then the front end parses the data 
     const cityData = await WeatherService.getWeatherForCity(city);
 

      if (typeof cityData === 'string') {
        res.status(404).json({ message: 'No events found' });

        console.log('city' +cityData);

      } else {
        res.json(cityData);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })

  // try {
  //   const stateName = req.params.state;
  //   const stateCode = await ParkService.convertStateNameToCode(stateName);
  //   const parks = await ParkService.getParksByState(stateCode);
  //   //ensures saved data has proper casing regardless of input
  //   const sanitizedStateName = await ParkService.convertStateCodeToName(
  //     stateCode
  //   );
  //   await HistoryService.addState(sanitizedStateName);
  //   res.json(parks);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }





  // TODO: save city to search history


  router.get('/:state', async (_req, res) => {
    try {
      //const stateName = req.params.state;
   //   const stateCode = await WeatherService.convertCityNameToCode(stateName);
     // const parks = await WeatherService.getParksByCity(stateCode);
      //ensures saved data has proper casing regardless of input
      // const sanitizedStateName = await WeatherService.convertStateCodeToName(
      //   stateCode
      // );
      // await HistoryService.addCity(sanitizedStateName);
      // res.json(parks);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // TODO: GET search history
  router.get('/history', async (_req, res) => {

    try {
      const savedCities = await HistoryService.getCities();
      res.json(savedCities);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

  });

  // * BONUS TODO: DELETE city from search history
  router.delete('/history/:id', async (req, res) => {

    try {
      if (!req.params.id) {
        res.status(400).json({ msg: 'State id is required' });
      }
      await HistoryService.removeCity(req.params.id);
      res.json({ success: 'State successfully removed from search history' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

  });



  // Listen for connections
  app.listen(PORT, () => console.info(`Example app listening at http://localhost:${PORT}`));




  export default router;
