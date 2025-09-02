# Deployment Guide

## 🚀 Deploy to Netlify

### Step 1: Prepare Your Repository
1. Push all code to GitHub/GitLab
2. Ensure your repository is public or connected to Netlify

### Step 2: Get OpenWeatherMap API Key
1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "My API Keys" in your dashboard
4. Copy your API key

### Step 3: Deploy on Netlify
1. Go to [Netlify](https://netlify.com) and sign in
2. Click "New site from Git"
3. Connect your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

### Step 4: Configure Environment Variables
1. In your Netlify dashboard, go to Site settings > Environment variables
2. Add new variable:
   - **Key**: `OPENWEATHER_API_KEY`
   - **Value**: Your OpenWeatherMap API key
3. Redeploy your site

### Step 5: Test Your App
1. Visit your deployed site
2. Select a city from the dropdown
3. Verify weather data loads correctly

## 🔧 Local Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Test Netlify Functions Locally
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local server with functions
netlify dev
```

## 📝 Important Notes

- The app will work locally without the API key (using placeholder data)
- For production, you MUST set the `OPENWEATHER_API_KEY` environment variable
- Netlify Functions are automatically deployed when you push to your repository
- The frontend calls `/.netlify/functions/weather` to get weather data

## 🐛 Troubleshooting

### Weather Not Loading
- Check browser console for errors
- Verify API key is set in Netlify environment variables
- Check Netlify function logs in the dashboard

### Build Failures
- Ensure Node.js 18+ is installed
- Check that all dependencies are properly installed
- Verify `netlify.toml` configuration

### Function Errors
- Check function logs in Netlify dashboard
- Verify `netlify/functions/package.json` has correct dependencies
- Ensure function code is properly formatted
