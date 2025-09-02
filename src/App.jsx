import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Sun, CloudRain, Wind, MapPin, Thermometer, Droplets, Clock, Eye, Sunrise, Sunset } from 'lucide-react'
import WeatherCard from './components/WeatherCard'
import CitySelector from './components/CitySelector'

const PAKISTANI_CITIES = [
  { name: 'Karachi', coordinates: { lat: 24.8607, lon: 67.0011 } },
  { name: 'Lahore', coordinates: { lat: 31.5204, lon: 74.3587 } },
  { name: 'Islamabad', coordinates: { lat: 33.6844, lon: 73.0479 } },
  { name: 'Peshawar', coordinates: { lat: 34.0150, lon: 71.5249 } },
  { name: 'Quetta', coordinates: { lat: 30.1798, lon: 66.9749 } },
  { name: 'Multan', coordinates: { lat: 30.1575, lon: 71.5249 } },
  { name: 'Faisalabad', coordinates: { lat: 31.4169, lon: 73.0892 } },
  { name: 'Hyderabad', coordinates: { lat: 25.3969, lon: 68.3778 } }
]

// OpenWeatherMap API key - working key
const API_KEY = 'f5cb0b965ea1564c50c6f1b74534d823'

function App() {
  const [selectedCity, setSelectedCity] = useState(PAKISTANI_CITIES[0])
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async (city) => {
    setLoading(true)
    setError(null)
    
    try {
      // Call OpenWeatherMap API directly
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lon}&appid=${API_KEY}&units=metric`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }
      
      const data = await response.json()
      
      // Transform the data to match our frontend expectations
      const transformedData = {
        city: city.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        timestamp: data.dt,
        feelsLike: data.main.feels_like,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // Convert to km
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      }
      
      setWeatherData(transformedData)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching weather:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity)
    }
  }, [selectedCity])

  const handleCityChange = (city) => {
    setSelectedCity(city)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center py-12 px-4"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-block mb-6"
        >
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30">
            <Cloud className="w-12 h-12 text-white" />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Pakistani Weather
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Real-time weather information for major cities across Pakistan
        </motion.p>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 pb-12">
        {/* City Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <CitySelector 
            cities={PAKISTANI_CITIES}
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
          />
        </motion.div>

        {/* Weather Display */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-center items-center py-32"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border-4 border-white/30 border-t-white rounded-full mx-auto mb-6"
                ></motion.div>
                <p className="text-white text-xl font-medium">Fetching weather data...</p>
                <p className="text-white/70 text-sm mt-2">Please wait while we get the latest information</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-center py-32"
            >
              <div className="weather-card rounded-3xl p-12 max-w-lg mx-auto">
                <div className="text-red-500 text-7xl mb-6">⚠️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h3>
                <p className="text-gray-600 mb-8 text-lg">{error}</p>
                <button
                  onClick={() => fetchWeather(selectedCity)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          ) : weatherData ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <WeatherCard weatherData={weatherData} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 text-center py-8 px-4 border-t border-white/20 bg-white/10 backdrop-blur-md"
      >
        <div className="flex items-center justify-center space-x-2 text-white/80 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Powered by OpenWeatherMap API</span>
        </div>
        <p className="text-white/60 text-xs">
          Built with React, Vite & ❤️ for Pakistan
        </p>
      </motion.footer>
    </div>
  )
}

export default App
