// Weather Jit Application Enhanced Features v2
class WeatherApp {
    constructor() {
        // API Configuration
        this.API_KEY = 'd55afc9392f3bc3245713d6ec5ee126a'; 
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5';
        
        // App State (store current information)
        this.currentUnit = 'metric'; 
        this.currentWeatherData = null; 
        this.recentSearches = this.loadRecentSearches(); 
        this.darkMode = this.loadDarkMode(); 
        
        // Initialize app
        this.init();
    }

    init() {
        
        this.cacheDOMElements();
        this.attachEventListeners();
        this.renderRecentSearches();
        this.applyDarkMode();
    }

    cacheDOMElements() {
        // Get all the buttons and inputs from HTML
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.unitToggle = document.getElementById('unitToggle');
        this.darkModeToggle = document.getElementById('darkModeToggle'); // update
        
        // Get display areas
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        this.errorText = document.getElementById('errorText');
        this.weatherDisplay = document.getElementById('weatherDisplay');
        this.welcomeMessage = document.getElementById('welcomeMessage');
        
        // Get weather info display elements
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
        this.hourlyForecast = document.getElementById('hourlyForecast'); // update
        
        // Get recent searches list
        this.recentList = document.getElementById('recentList');
    }

    attachEventListeners() {
        
        this.searchBtn.addEventListener('click', () => this.handleSearch());

        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        this.locationBtn.addEventListener('click', () => this.getCurrentLocation());
        
        this.unitToggle.addEventListener('click', () => this.toggleUnit());
        
        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
    }

    toggleDarkMode() {
        // Switch dark mode on/off
        this.darkMode = !this.darkMode;
        
        // Save preference 
        this.saveDarkMode();
        
        // Apply dark mode
        this.applyDarkMode();
    }

    applyDarkMode() {
        // Get body element
        const body = document.body;
        
        if (this.darkMode) {
            // Turn ON dark mode
            body.classList.add('dark-mode');
        } else {
            // Turn OFF dark mode
            body.classList.remove('dark-mode');
        }
    }

    saveDarkMode() {
        // Save to browser storage 
        localStorage.setItem('weatherDarkMode', JSON.stringify(this.darkMode));
    }

    loadDarkMode() {
        // Load from browser storage
        const saved = localStorage.getItem('weatherDarkMode');
        return saved ? JSON.parse(saved) : false; // Default to light mode
    }

    async handleSearch() {
        // Get input
        const city = this.cityInput.value.trim();
        
        // empty input
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        // Fetch weather for city
        await this.fetchWeatherByCity(city);
    }

    async fetchWeatherByCity(city) {
        try {
            
            this.showLoading();
            
            // Get current weather
            const weatherResponse = await fetch(
                `${this.BASE_URL}/weather?q=${city}&appid=${this.API_KEY}&units=${this.currentUnit}`
            );
            
            if (!weatherResponse.ok) {
                throw new Error('City not found');
            }
            
            const weatherData = await weatherResponse.json();
            
            // Get 5-day forecast 
            const forecastResponse = await fetch(
                `${this.BASE_URL}/forecast?q=${city}&appid=${this.API_KEY}&units=${this.currentUnit}`
            );
            
            const forecastData = await forecastResponse.json();
            
            // Save the data
            this.currentWeatherData = weatherData;
            
            // Display everything
            this.displayWeather(weatherData, forecastData);
            
            // Add to recent searches
            this.addToRecentSearches(city);
            
            // Clear search box
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
            
            // Get weather using GPS coordinates
            const weatherResponse = await fetch(
                `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=${this.currentUnit}`
            );
            
            const weatherData = await weatherResponse.json();
            
            // Get forecast
            const forecastResponse = await fetch(
                `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=${this.currentUnit}`
            );
            
            const forecastData = await forecastResponse.json();
            
            this.currentWeatherData = weatherData;
            this.displayWeather(weatherData, forecastData);
            this.addToRecentSearches(weatherData.name);
            
        } catch (error) {
            this.showError('Error fetching weather data. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    getCurrentLocation() {
        // Check if browser supports GPS
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser');
            return;
        }

        this.showLoading();
        
        // Ask user's location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Success! Got the location
                const { latitude, longitude } = position.coords;
                this.fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                // Failed to get location
                this.hideLoading();
                this.showError('Unable to get your location. Please enable location services.');
            }
        );
    }

    displayWeather(weatherData, forecastData) {
        // Hide welcome message and errors
        this.welcomeMessage.classList.add('hidden');
        this.error.classList.add('hidden');
        
        // Show weather display
        this.weatherDisplay.classList.remove('hidden');
        
        // Update all sections
        this.updateCurrentWeather(weatherData);
        this.updateHourlyForecast(forecastData); // update
        this.updateForecast(forecastData);
    }

    updateCurrentWeather(data) {
        // Update city name and date
        this.cityName.textContent = `${data.name}, ${data.sys.country}`;
        this.weatherDate.textContent = this.formatDate(new Date());
        
        // Update weather icon
        const iconCode = data.weather[0].icon;
        this.weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        this.weatherIcon.alt = data.weather[0].description;
        
        // Update temperature
        this.temperature.textContent = Math.round(data.main.temp);
        this.unit.textContent = this.currentUnit === 'metric' ? '°C' : '°F';
        
        // Update description
        this.description.textContent = data.weather[0].description;
        this.feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}${this.currentUnit === 'metric' ? '°C' : '°F'}`;
        
        // Update weather details
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${data.wind.speed} ${this.currentUnit === 'metric' ? 'm/s' : 'mph'}`;
        this.pressure.textContent = `${data.main.pressure} hPa`;
        this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    }

    updateHourlyForecast(data) {
        // Clear previous hourly forecast
        this.hourlyForecast.innerHTML = '';
    
        // show the next 24 hours (8 entries)
        const hourlyData = data.list.slice(0, 8);
        
        hourlyData.forEach(hour => {
            // Create card for each hour
            const hourCard = this.createHourlyCard(hour);
            this.hourlyForecast.appendChild(hourCard);
        });
    }

    createHourlyCard(data) {
        // Get time from the data
        const date = new Date(data.dt * 1000);
        const time = this.formatTime(date);
        
        // Create new div element
        const card = document.createElement('div');
        card.className = 'hourly-card';
        
        // Fill with HTML content
        card.innerHTML = `
            <p class="hourly-time">${time}</p>
            <img 
                src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                alt="${data.weather[0].description}"
                class="hourly-icon"
            >
            <p class="hourly-temp">${Math.round(data.main.temp)}${this.currentUnit === 'metric' ? '°C' : '°F'}</p>
            <p class="hourly-desc">${data.weather[0].description}</p>
        `;
        
        return card;
    }

    updateForecast(data) {
        // Clear previous forecast
        this.forecast.innerHTML = '';
        
        // Get one forecast per day
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
        // Switch between Celsius and Fahrenheit
        this.currentUnit = this.currentUnit === 'metric' ? 'imperial' : 'metric';
        
        // Update button text
        this.unitToggle.textContent = this.currentUnit === 'metric' ? '°C' : '°F';
        
        // If weather data available, refresh with new unit
        if (this.currentWeatherData) {
            const { coord } = this.currentWeatherData;
            this.fetchWeatherByCoords(coord.lat, coord.lon);
        }
    }

    addToRecentSearches(city) {
        // Remove if exists
        this.recentSearches = this.recentSearches.filter(
            item => item.toLowerCase() !== city.toLowerCase()
        );
        
        // Add to the beginning
        this.recentSearches.unshift(city);
        
        // Keep 7 recent searches
        this.recentSearches = this.recentSearches.slice(0, 7);
        
        // Save to browser storage
        this.saveRecentSearches();
        
        // Update the display
        this.renderRecentSearches();
    }

    renderRecentSearches() {
        // Clear the list
        this.recentList.innerHTML = '';
        
        // If no recent searches, do nothing
        if (this.recentSearches.length === 0) return;
        
        // Create button for each recent search
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
        // Save to browser storage
        localStorage.setItem('weatherRecentSearches', JSON.stringify(this.recentSearches));
    }

    loadRecentSearches() {
        // Load from browser storage
        const saved = localStorage.getItem('weatherRecentSearches');
        return saved ? JSON.parse(saved) : [];
    }

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

    formatTime(date) {
        
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric',
            minute: '2-digit',
            hour12: true 
        });
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

document.addEventListener('DOMContentLoaded', () => {
    window.weatherApp = new WeatherApp();
});
