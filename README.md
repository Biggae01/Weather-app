# 🌤️ Weather Dashboard

A clean, modern weather application that provides real-time weather information and 5-day forecasts for cities worldwide.

![Weather Dashboard](screenshot.png) <!-- Add your screenshot here -->

## ✨ Features

- **Real-time Weather Data** - Get current weather conditions for any city
- **5-Day Forecast** - Plan ahead with extended weather predictions
- **Location Support** - Automatically detect weather for your current location
- **Temperature Units** - Toggle between Celsius and Fahrenheit
- **Recent Searches** - Quickly access previously searched cities
- **Detailed Metrics** - View humidity, wind speed, pressure, and visibility
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Live Demo

[View Live Demo](#) <!-- Add your deployment link -->

## 🎯 How to Use

1. **Search by City Name**
   - Type any city name in the search box (e.g., "Lusaka", "Kabwe", "London", "Tokyo")
   - Click the search button or press Enter

2. **Use Your Location**
   - Click the 📍 location button
   - Allow location access when prompted
   - Your local weather will be displayed automatically

3. **Switch Temperature Units**
   - Click the °C/°F button to toggle between Celsius and Fahrenheit

4. **Quick Access**
   - Use the recent searches section to quickly revisit cities you've checked before

## 🛠️ Setup & Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- An OpenWeatherMap API key ([Get one free here](https://openweathermap.org/api))

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Biggae01/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Add your API key**
   - Open `js/weather.js`
   - Replace `YOUR_API_KEY_HERE` with your OpenWeatherMap API key:
   ```javascript
   const API_KEY = 'your_actual_api_key';
   ```

3. **Launch the app**
   - Simply open `index.html` in your web browser
   - Or use a local server for better development:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

## 📦 Project Structure

```
weather-dashboard/
├── index.html          # Main HTML structure
├── css/
│   └── weather.css     # Styling and animations
├── js/
│   └── weather.js      # Application logic and API calls
└── README.md           # Documentation
```

## 🔑 API Information

This app uses the [OpenWeatherMap API](https://openweathermap.org/api) for weather data:
- **Current Weather Data** - Real-time weather conditions
- **5 Day Forecast** - Weather predictions every 3 hours
- **Geocoding API** - Convert city names to coordinates

The free tier includes:
- 1,000 API calls per day
- Current weather and forecasts
- No credit card required

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Edwin Mwansa**
- GitHub: [@Biggae01](https://github.com/Biggae01)

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Weather icons from OpenWeatherMap
