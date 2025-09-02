# Pakistani Weather App

A stunning full-stack weather application built with React, Vite, and Netlify Functions, featuring a premium obsidian charcoal and gold accent theme.

## ✨ Features

- **Beautiful UI**: Obsidian charcoal gradient background with gold accents
- **Real-time Weather**: Live weather data for major Pakistani cities
- **Responsive Design**: Mobile-first design with smooth animations
- **Serverless Backend**: Netlify Functions with OpenWeatherMap API
- **Modern Tech Stack**: React 18, Vite, Tailwind CSS, Framer Motion

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons

### Backend
- **Netlify Functions** - Serverless backend
- **Node.js** - JavaScript runtime
- **Express-style** - API handling
- **OpenWeatherMap API** - Weather data source

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd weather-app
npm install
```

### 2. Get OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard

### 3. Set Environment Variables
Create a `.env` file in the root directory:
```env
OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Run Locally
```bash
npm run dev
```
The app will open at `http://localhost:3000`

## 🌍 Available Cities

The app includes weather data for these major Pakistani cities:
- Karachi
- Lahore  
- Islamabad
- Peshawar
- Quetta
- Multan
- Faisalabad
- Hyderabad

## 🚀 Deployment to Netlify

### Option 1: Deploy from Git (Recommended)
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `OPENWEATHER_API_KEY`
6. Deploy!

### Option 2: Manual Deploy
```bash
# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Environment Variables on Netlify
Make sure to set these in your Netlify dashboard:
- `OPENWEATHER_API_KEY` - Your OpenWeatherMap API key

## 📁 Project Structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── CitySelector.jsx
│   │   └── WeatherCard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── netlify/
│   └── functions/
│       ├── weather.js
│       └── package.json
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── netlify.toml
└── README.md
```

## 🎨 Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:
- **Obsidian**: Charcoal grey tones (#0d1117 to #6c757d)
- **Gold**: Accent colors (#fbbf24 to #92400e)

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- Edit component files for specific styling

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Local Netlify Functions
To test functions locally:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local dev server with functions
netlify dev
```

## 📱 Responsive Design

The app is fully responsive with:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## 🎭 Animations

Powered by Framer Motion:
- Smooth page transitions
- Hover effects on cards
- Loading animations
- Staggered element reveals

## 🔒 API Security

- CORS enabled for frontend access
- Input validation for city names
- Error handling for API failures
- Rate limiting consideration

## 🐛 Troubleshooting

### Common Issues

1. **Weather data not loading**
   - Check your OpenWeatherMap API key
   - Verify the API key is set in environment variables
   - Check browser console for errors

2. **Build failures**
   - Ensure Node.js 18+ is installed
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

3. **Function deployment issues**
   - Verify `netlify.toml` configuration
   - Check function dependencies in `netlify/functions/package.json`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Netlify](https://netlify.com/) for hosting and functions
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

---

Built with ❤️ for Pakistan's weather enthusiasts!
