import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, Globe } from 'lucide-react'

const CitySelector = ({ cities, selectedCity, onCityChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCitySelect = (city) => {
    onCityChange(city)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full max-w-2xl mx-auto weather-card rounded-2xl p-6 text-left flex items-center justify-between cursor-pointer hover-lift"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-gray-500 text-sm font-medium">Select City</span>
            <div className="text-2xl font-bold text-gray-800">
              {selectedCity.name}
            </div>
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg"
        >
          <ChevronDown className="w-5 h-5 text-white" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-full max-w-2xl z-50"
          >
            <div className="weather-card rounded-2xl p-4 max-h-80 overflow-y-auto shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cities.map((city, index) => (
                  <motion.button
                    key={city.name}
                    onClick={() => handleCitySelect(city)}
                    className={`group p-4 rounded-xl transition-all duration-300 flex items-center space-x-3 text-left ${
                      city.name === selectedCity.name
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white/60 hover:bg-white/80 text-gray-700 hover:scale-105'
                    }`}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <MapPin className={`w-5 h-5 ${
                      city.name === selectedCity.name ? 'text-white' : 'text-blue-500'
                    }`} />
                    <span className="font-semibold text-lg">{city.name}</span>
                    
                    {city.name === selectedCity.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto bg-white/20 p-1 rounded-full"
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CitySelector
