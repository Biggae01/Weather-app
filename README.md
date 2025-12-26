# Weather Dashboard

A professional, real-time weather application providing current conditions and 5-day forecasts for cities worldwide.

![Weather Dashboard](Screenshots\screenshot.png) 

## Overview

Weather Dashboard is a clean, responsive web application built with vanilla JavaScript that delivers accurate weather information through the OpenWeatherMap API. The application features an intuitive interface with location-based weather detection, temperature unit conversion, and comprehensive weather metrics.

## Features

### Core Functionality
- **Real-time Weather Data** - Current weather conditions for any global location
- **5-Day Forecast** - Extended weather predictions with 3-hour intervals
- **Geolocation Support** - Automatic weather detection using device location
- **Unit Conversion** - Seamless toggle between Celsius and Fahrenheit
- **Search History** - Quick access to recently searched locations
- **Comprehensive Metrics** - Detailed information including humidity, wind speed, pressure, and visibility

### Technical Features
- Responsive design optimized for all devices
- Font Awesome icon integration for professional UI
- Local storage for persistent search history
- Error handling with user-friendly messages
- Clean, semantic HTML structure
- Modern CSS with professional styling

## Live Demo

[View Live Demo](https://weather-dashapp.netlify.app/) <!-- Add your deployment link -->

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **API:** OpenWeatherMap API
- **Icons:** Font Awesome 6
- **Storage:** Browser LocalStorage

## Installation

### Prerequisites

- Modern web browser with JavaScript enabled
- OpenWeatherMap API key ([Register for free](https://openweathermap.org/api))

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Biggae01/weather-dashboard.git
cd weather-dashboard
```

2. Configure API key:
   - Open `js/weather.js`
   - Locate line 3 and replace the placeholder with your API key:
   ```javascript
   this.API_KEY = 'your_openweathermap_api_key';
   ```

3. Launch the application:
   
   **Option A: Direct Browser Access**
   - Open `index.html` in your web browser

   **Option B: Local Development Server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js with http-server
   npx http-server -p 8000
   ```
   - Navigate to `http://localhost:8000`

## Usage Guide

### Search by City
1. Enter a city name in the search field
2. Press Enter or click the Search button
3. View current weather and 5-day forecast

### Location-Based Weather
1. Click the location icon button
2. Grant location permission when prompted
3. Weather data for your current location will display automatically

### Temperature Units
- Click the °C/°F toggle button to switch between Celsius and Fahrenheit
- The application will refresh all temperature displays

### Recent Searches
- Previously searched cities appear below the search bar
- Click any recent search to instantly retrieve that city's weather

## Project Structure

```
weather-dashboard/
├── index.html              # Main application structure
├── css/
│   └── weather.css        # Styling and responsive design
├── js/
│   └── weather.js         # Application logic and API integration
├── README.md              # Project documentation
└── screenshot.png         # Application preview
```

## API Reference

This application utilizes the following OpenWeatherMap API endpoints:

- **Current Weather:** `/data/2.5/weather`
- **5-Day Forecast:** `/data/2.5/forecast`

### API Rate Limits (Free Tier)
- 1,000 calls per day
- 60 calls per minute
- No credit card required for registration

## Browser Compatibility

| Browser | Minimum Version |
|---------|----------------|
| Chrome  | 90+            |
| Firefox | 88+            |
| Safari  | 14+            |
| Edge    | 90+            |

## Error Handling

The application includes comprehensive error handling for:
- Invalid city names
- Network connectivity issues
- API rate limiting
- Geolocation permission denial
- Missing API key configuration

## Contributing

Contributions are welcome and appreciated. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Add comments for complex functionality
- Test thoroughly across different browsers
- Update documentation as needed

## Security Considerations

**Important:** Never commit your API key to version control. Consider:
- Using environment variables for production deployments
- Implementing server-side API calls for public applications
- Rotating API keys periodically

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Edwin Mwansa**
- Portfolio: [edwinmwansa-portfolio.netlify.app](https://edwinmwansa-portfolio.netlify.app/)
- GitHub: [@Biggae01](https://github.com/Biggae01)
- LinkedIn: [Edwin Mwansa](https://www.linkedin.com/in/edwin-mwansa-b4042223a/)
- Email: edwinmwansa80@gmail.com

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Inspired by modern weather application design patterns

## Future Enhancements

Planned features for future releases:
- Hourly weather forecast
- Weather alerts and notifications
- Multiple location comparison
- Weather maps integration
- Dark mode toggle
- Extended 10-day forecast

---

**Note:** This project is for educational and portfolio purposes. For production use, implement proper API key management and consider rate limiting strategies.