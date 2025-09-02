# Quick Setup Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Navigate to `http://localhost:3000`

## ✨ What You'll See

- **Beautiful UI**: Obsidian charcoal theme with gold accents
- **City Selector**: Dropdown with 8 major Pakistani cities
- **Weather Display**: Demo weather data for each city
- **Responsive Design**: Works on mobile and desktop
- **Smooth Animations**: Powered by Framer Motion

## 🔑 For Real Weather Data

1. Get free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Create `.env` file in root directory:
   ```env
   OPENWEATHER_API_KEY=your_api_key_here
   ```
3. Deploy to Netlify (see `deploy.md` for full instructions)

## 🎯 Features

- **8 Pakistani Cities**: Karachi, Lahore, Islamabad, Peshawar, Quetta, Multan, Faisalabad, Hyderabad
- **Real-time Data**: Live weather from OpenWeatherMap API
- **Beautiful Design**: Glassmorphism cards with golden borders
- **Smooth Animations**: Hover effects and transitions
- **Mobile First**: Responsive design for all devices

## 🛠️ Development

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Netlify Functions (serverless)
- **Styling**: Custom obsidian + gold theme
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📱 Test on Mobile

The app is fully responsive and works great on mobile devices. Try resizing your browser window to see the responsive design in action!

---

**Ready to deploy?** Check out `deploy.md` for Netlify deployment instructions!
