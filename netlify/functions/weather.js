const axios = require('axios');

// OpenWeatherMap API configuration - Real working API key
const OPENWEATHER_API_KEY = 'f5cb0b965ea1564c50c6f1b74534d823'; // Real working API key
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Pakistani cities coordinates mapping - Major cities only
const CITY_COORDINATES = {
  'Karachi': { lat: 24.8607, lon: 67.0011 },
  'Lahore': { lat: 31.5204, lon: 74.3587 },
  'Islamabad': { lat: 33.6844, lon: 73.0479 },
  'Peshawar': { lat: 34.0150, lon: 71.5249 },
  'Quetta': { lat: 30.1798, lon: 66.9749 },
  'Multan': { lat: 30.1575, lon: 71.5249 },
  'Faisalabad': { lat: 31.4169, lon: 73.0892 },
  'Hyderabad': { lat: 25.3969, lon: 68.3778 }
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Get city from query parameters
    const { city } = event.queryStringParameters || {};
    
    if (!city) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'City parameter is required',
          message: 'Please provide a city name in the query parameters'
        })
      };
    }

    // Check if city exists in our mapping
    const cityData = CITY_COORDINATES[city];
    if (!cityData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'City not found',
          message: 'Please provide a valid Pakistani city name',
          availableCities: Object.keys(CITY_COORDINATES)
        })
      };
    }

    // Fetch weather data from OpenWeatherMap API
    const weatherResponse = await axios.get(OPENWEATHER_BASE_URL, {
      params: {
        lat: cityData.lat,
        lon: cityData.lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric' // Use Celsius
      }
    });

    const weatherData = weatherResponse.data;

    // Transform the data to match our frontend expectations
    const transformedData = {
      city: city,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
      condition: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,
      timestamp: weatherData.dt,
      feelsLike: weatherData.main.feels_like,
      pressure: weatherData.main.pressure,
      visibility: weatherData.visibility / 1000, // Convert to km
      sunrise: weatherData.sys.sunrise,
      sunset: weatherData.sys.sunset
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(transformedData)
    };

  } catch (error) {
    console.error('Error fetching weather data:', error);

    // Handle specific API errors
    if (error.response) {
      const statusCode = error.response.status;
      let errorMessage = 'Failed to fetch weather data';

      if (statusCode === 401) {
        errorMessage = 'Invalid API key. Please check your OpenWeatherMap API key.';
      } else if (statusCode === 429) {
        errorMessage = 'API rate limit exceeded. Please try again later.';
      } else if (statusCode === 500) {
        errorMessage = 'OpenWeatherMap service is currently unavailable.';
      }

      return {
        statusCode: statusCode,
        headers,
        body: JSON.stringify({
          error: 'Weather API Error',
          message: errorMessage,
          statusCode: statusCode
        })
      };
    }

    // Handle network or other errors
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: 'Failed to fetch weather data. Please try again later.'
      })
    };
  }
};
