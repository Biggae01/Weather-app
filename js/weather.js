// Weather Dashboard Application
class WeatherApp {
    constructor() {
        
        this.API_KEY = 'd55afc9392f3bc3245713d6ec5ee126a'; 
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5';
        
        // State
        this.currentUnit = 'metric'; // 'metric' for Celsius, 'imperial' for Fahrenheit
        this.currentWeatherData = null;
        this.recentSearches = this.loadRecentSearches();
        
        // Initialize
        this.init();
    }

    init() {
        this.cacheDOMElements();
        this.attachEventListeners();
        this.renderRecentSearches();
        this.checkAPIKey();
    }

    cacheDOMElements() {
        // Input elements
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.unitToggle = document.getElementById('unitToggle');
        
        // Display elements
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        this.errorText = document.getElementById('errorText');
        this.weatherDisplay = document.getElementById('weatherDisplay');
        this.welcomeMessage = document.getElementById('welcomeMessage');
        
        // Weather info elements
        this.cityName = document.getElementById('cityName');
        this.weatherDate = document.getElementById('weatherDate');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.temperature = document.getElementById('temperature');
        this.unit = document.getElementById('unit');
        this.description = document.getElementById('description');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
        this.visibility = document.getElementById('visibility');
        this.forecast = document.getElementById('forecast');
        
        // Recent searches
        this.recentList = document.getElementById('recentList');
    }

    attachEventListeners() {
        // Search button
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        
        // Enter key in search input
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        // Location button
        this.locationBtn.addEventListener('click', () => this.getCurrentLocation());
        
        // Unit toggle
        this.unitToggle.addEventListener('click', () => this.toggleUnit());
    }

    checkAPIKey() {
        if (this.API_KEY === 'YOUR_API_KEY_HERE') {
            this.showError(
                '⚠️ Please add your OpenWeatherMap API key in weather.js! ' +
                'Get one free at: https://openweathermap.org/api'
            );
        }
    }

    async handleSearch() {
        const city = this.cityInput.value.trim();
        
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        if (this.API_KEY === 'YOUR_API_KEY_HERE') {
            this.showError('Please add your API key first!');
            return;
        }

        await this.fetchWeatherByCity(city);
    }

    async fetchWeatherByCity(city) {
        try {
            this.showLoading();
            
            // Fetch current weather
            const weatherResponse = await fetch(
                `${this.BASE_URL}/weather?q=${city}&appid=${this.API_KEY}&units=${this.currentUnit}`
            );
            
            if (!weatherResponse.ok) {
                throw new Error('City not found');
            }
            
            const weatherData = await weatherResponse.json();
            
            // Fetch 5-day forecast
            const forecastResponse = await fetch(
                `${this.BASE_URL}/forecast?q=${city}&appid=${this.API_KEY}&units=${this.currentUnit}`
            );
            
            const forecastData = await forecastResponse.json();
            
            // Store current weather data
            this.currentWeatherData = weatherData;
            
            // Display weather
            this.displayWeather(weatherData, forecastData);
            
            // Save to recent searches
            this.addToRecentSearches(city);
            
            // Clear input
            this.cityInput.value = '';
            
        } catch (error) {
            this.showError(`Error: ${error.message}. Please check the city name and try again.`);
        } finally {
            this.hideLoading();
        }
    }

    async fetchWeatherByCoords(lat, lon) {
        try {
            this.showLoading();
            
            // Fetch current weather by coordinates
            const weatherResponse = await fetch(
                `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=${this.currentUnit}`
            );
            
            const weatherData = await weatherResponse.json();
            
            // Fetch forecast
            const forecastResponse = await fetch(
                `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=${this.currentUnit}`
            );
            
            const forecastData = await forecastResponse.json();
            
            // Store current weather data
            this.currentWeatherData = weatherData;
            
            // Display weather
            this.displayWeather(weatherData, forecastData);
            
            // Save to recent searches
            this.addToRecentSearches(weatherData.name);
            
        } catch (error) {
            this.showError('Error fetching weather data. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }

        if (this.API_KEY === 'YOUR_API_KEY_HERE') {
            this.showError('Please add your API key first!');
            return;
        }

        this.showLoading();
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                this.hideLoading();
                this.showError('Unable to get your location. Please enable location services.');
            }
        );
    }

    displayWeather(weatherData, forecastData) {
        // Hide welcome message and error
        this.welcomeMessage.classList.add('hidden');
        this.error.classList.add('hidden');
        
        // Show weather display
        this.weatherDisplay.classList.remove('hidden');
        
        // Update current weather
        this.updateCurrentWeather(weatherData);
        
        // Update forecast
        this.updateForecast(forecastData);
    }

    updateCurrentWeather(data) {
        // City and date
        this.cityName.textContent = `${data.name}, ${data.sys.country}`;
        this.weatherDate.textContent = this.formatDate(new Date());
        
        // Weather icon
        const iconCode = data.weather[0].icon;
        this.weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        this.weatherIcon.alt = data.weather[0].description;
        
        // Temperature
        this.temperature.textContent = Math.round(data.main.temp);
        this.unit.textContent = this.currentUnit === 'metric' ? '°C' : '°F';
        
        // Description
        this.description.textContent = data.weather[0].description;
        this.feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}${this.currentUnit === 'metric' ? '°C' : '°F'}`;
        
        // Details
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${data.wind.speed} ${this.currentUnit === 'metric' ? 'm/s' : 'mph'}`;
        this.pressure.textContent = `${data.main.pressure} hPa`;
        this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    }

    updateForecast(data) {
        // Clear previous forecast
        this.forecast.innerHTML = '';
        
        // Get one forecast per day (at 12:00)
        const dailyForecasts = data.list.filter(item => 
            item.dt_txt.includes('12:00:00')
        ).slice(0, 5);
        
        dailyForecasts.forEach(day => {
            const forecastCard = this.createForecastCard(day);
            this.forecast.appendChild(forecastCard);
        });
    }

    createForecastCard(data) {
        const date = new Date(data.dt * 1000);
        const dayName = this.getDayName(date);
        const dateStr = this.formatShortDate(date);
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        card.innerHTML = `
            <p class="forecast-day">${dayName}</p>
            <p class="forecast-date">${dateStr}</p>
            <img 
                src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                alt="${data.weather[0].description}"
                class="forecast-icon"
            >
            <p class="forecast-temp">${Math.round(data.main.temp)}${this.currentUnit === 'metric' ? '°C' : '°F'}</p>
            <p class="forecast-desc">${data.weather[0].description}</p>
        `;
        
        return card;
    }

    toggleUnit() {
        // Toggle between metric and imperial
        this.currentUnit = this.currentUnit === 'metric' ? 'imperial' : 'metric';
        
        // Update button text
        this.unitToggle.textContent = this.currentUnit === 'metric' ? '°C' : '°F';
        
        // If we have current weather data, re-fetch with new unit
        if (this.currentWeatherData) {
            const { coord } = this.currentWeatherData;
            this.fetchWeatherByCoords(coord.lat, coord.lon);
        }
    }

    // Recent Searches Management
    addToRecentSearches(city) {
        // Remove if already exists
        this.recentSearches = this.recentSearches.filter(
            item => item.toLowerCase() !== city.toLowerCase()
        );
        
        // Add to beginning
        this.recentSearches.unshift(city);
        
        // Keep only 5 recent searches
        this.recentSearches = this.recentSearches.slice(0, 5);
        
        // Save to localStorage
        this.saveRecentSearches();
        
        // Update UI
        this.renderRecentSearches();
    }

    renderRecentSearches() {
        this.recentList.innerHTML = '';
        
        if (this.recentSearches.length === 0) return;
        
        this.recentSearches.forEach(city => {
            const item = document.createElement('span');
            item.className = 'recent-item';
            item.textContent = city;
            item.addEventListener('click', () => {
                this.cityInput.value = city;
                this.handleSearch();
            });
            this.recentList.appendChild(item);
        });
    }

    saveRecentSearches() {
        localStorage.setItem('weatherRecentSearches', JSON.stringify(this.recentSearches));
    }

    loadRecentSearches() {
        const saved = localStorage.getItem('weatherRecentSearches');
        return saved ? JSON.parse(saved) : [];
    }

    // UI State Management
    showLoading() {
        this.loading.classList.remove('hidden');
        this.error.classList.add('hidden');
        this.weatherDisplay.classList.add('hidden');
        this.welcomeMessage.classList.add('hidden');
    }

    hideLoading() {
        this.loading.classList.add('hidden');
    }

    showError(message) {
        this.error.classList.remove('hidden');
        this.errorText.textContent = message;
        this.loading.classList.add('hidden');
        this.weatherDisplay.classList.add('hidden');
    }

    // Utility Functions
    formatDate(date) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }

    formatShortDate(date) {
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    getDayName(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherApp = new WeatherApp();
});