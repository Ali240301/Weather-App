import { motion } from 'framer-motion'
import { Thermometer, Droplets, Wind, MapPin, Clock, Eye, Sunrise, Sunset, Compass } from 'lucide-react'

const WeatherCard = ({ weatherData }) => {
  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
      return '☀️'
    } else if (conditionLower.includes('cloud')) {
      return '☁️'
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return '🌧️'
    } else if (conditionLower.includes('snow')) {
      return '❄️'
    } else if (conditionLower.includes('thunder')) {
      return '⛈️'
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist') || conditionLower.includes('haze')) {
      return '🌫️'
    } else {
      return '🌤️'
    }
  }

  const getWeatherTheme = (condition) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
      return 'weather-sunny'
    } else if (conditionLower.includes('cloud')) {
      return 'weather-cloudy'
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'weather-rainy'
    } else {
      return 'weather-clear'
    }
  }

  const getWeatherColor = (condition) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
      return 'from-yellow-400 to-orange-500'
    } else if (conditionLower.includes('cloud')) {
      return 'from-blue-400 to-indigo-500'
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'from-blue-500 to-indigo-600'
    } else if (conditionLower.includes('snow')) {
      return 'from-blue-300 to-indigo-400'
    } else if (conditionLower.includes('thunder')) {
      return 'from-gray-600 to-gray-800'
    } else {
      return 'from-blue-400 to-indigo-500'
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A'
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-6xl mx-auto"
    >
      {/* Main Weather Card */}
      <div className={`weather-card rounded-3xl p-8 mb-8 relative overflow-hidden ${getWeatherTheme(weatherData.condition)}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${getWeatherColor(weatherData.condition)} rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br ${getWeatherColor(weatherData.condition)} rounded-full blur-2xl`}></div>
        </div>

        <div className="relative z-10">
          {/* Header with Date */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="text-8xl mb-6"
            >
              {getWeatherIcon(weatherData.condition)}
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-gray-800 mb-3"
            >
              {weatherData.city}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-2xl text-gray-600 capitalize mb-2"
            >
              {weatherData.condition}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-gray-500"
            >
              {formatDate(weatherData.timestamp)}
            </motion.p>
          </div>

          {/* Temperature Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            className="text-center mb-12"
          >
            <div className="text-7xl md:text-8xl font-bold text-gray-800 mb-4">
              {Math.round(weatherData.temperature)}°C
            </div>
            <div className="text-xl text-gray-600">
              Feels like {Math.round(weatherData.feelsLike || weatherData.temperature)}°C
            </div>
          </motion.div>

          {/* Weather Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {/* Humidity */}
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              className="glass-effect rounded-2xl p-6 text-center hover-lift"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {weatherData.humidity}%
              </div>
              <div className="text-gray-600 font-medium">Humidity</div>
            </motion.div>

            {/* Wind Speed */}
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              className="glass-effect rounded-2xl p-6 text-center hover-lift"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-xl">
                  <Wind className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {weatherData.windSpeed} km/h
              </div>
              <div className="text-gray-600 font-medium">Wind Speed</div>
            </motion.div>

            {/* Visibility */}
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              className="glass-effect rounded-2xl p-6 text-center hover-lift"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                  <Eye className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {weatherData.visibility || 'N/A'} km
              </div>
              <div className="text-gray-600 font-medium">Visibility</div>
            </motion.div>

            {/* Last Updated */}
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              className="glass-effect rounded-2xl p-6 text-center hover-lift"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-lg font-bold text-gray-800 mb-2">
                {formatTime(weatherData.timestamp)}
              </div>
              <div className="text-gray-600 font-medium">Last Updated</div>
            </motion.div>
          </motion.div>

          {/* Additional Weather Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Sunrise/Sunset */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Sun Schedule</h3>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Sunrise className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-600">Sunrise</div>
                  <div className="font-semibold text-gray-800">
                    {weatherData.sunrise ? formatTime(weatherData.sunrise) : 'N/A'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Sunset className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-600">Sunset</div>
                  <div className="font-semibold text-gray-800">
                    {weatherData.sunset ? formatTime(weatherData.sunset) : 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {/* Pressure & Description */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Weather Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pressure:</span>
                  <span className="font-semibold text-gray-800">{weatherData.pressure} hPa</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Description:</span>
                  <span className="font-semibold text-gray-800 capitalize">{weatherData.description}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Icon Code:</span>
                  <span className="font-semibold text-gray-800">{weatherData.icon}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* API Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="glass-effect rounded-2xl p-6 text-center"
      >
        <div className="flex items-center justify-center space-x-3 text-gray-600">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium">
            Weather data provided by OpenWeatherMap API • Real-time information for {weatherData.city}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WeatherCard
