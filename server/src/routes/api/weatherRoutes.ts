import { Router } from 'express';
const router = Router();
import fs from 'node:fs/promises';

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, _res) => {
  const city = req.body;
  // TODO: GET weather data from city name
  router.get('/weather/:city', async (req, res) => {
    try {
      const city = req.params.city;
      const cityCode = await WeatherService.convertCityNameToCode(city);
      const events = await WeatherService.getClosestEventByCity(cityCode);
      if (typeof events === 'string') {
        res.status(404).json({ message: 'No events found' });
      } else {
        res.json(events);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  // TODO: save city to search history


  router.get('/:state', async (req, res) => {
    try {
      const stateName = req.params.state;
      const stateCode = await WeatherService.convertCityNameToCode(stateName);
      const parks = await WeatherService.getParksByCity(stateCode);
      //ensures saved data has proper casing regardless of input
      const sanitizedStateName = await WeatherService.convertStateCodeToName(
        stateCode
      );
      await HistoryService.addCity(sanitizedStateName);
      res.json(parks);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


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
