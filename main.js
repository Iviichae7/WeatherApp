// Description: A simple Node.js script that sends a text message with the weather for a list of cities every day at 8 AM.
// For making HTTP requests
const axios = require('axios');
// For sending SMS messages
const twilio = require('twilio');
// For running scheduled tasks
const cron = require('node-cron');
// For environment variables
require('dotenv').config();

// Setting up Twilio account
const { TWILIO_ACCOUNT_SID: accountSid, TWILIO_AUTH_TOKEN: authToken } = process.env;
const client = new twilio(accountSid, authToken);

// URL for the weather API
const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';

/**
 * Fetch the weather for a city.
 * @param {string} city - The city for which to fetch the weather
 * @returns {Promise<object|null>} - Weather data or null in case of an error
 */
async function fetchWeather(city) {
  try {
    // API key for the weather service
    const apiKey = process.env.WEATHER_API_KEY;
    // Determine the country code
    const countryCode = city === 'Belfast' ? 'GB' : 'IE';
    // Build the complete API URL
    const fullUrl = `${WEATHER_API_URL}?q=${city},${countryCode}&appid=${apiKey}&units=metric`;

    // Fetch the weather data
    const response = await axios.get(fullUrl);
    return response.data;
  } catch (error) {
    // If something goes wrong, log the error and return null
    console.error(`Failed to fetch weather for ${city}: ${error}`);
    return null;
  }
}

/**
 * Send a weather update text message for a city.
 * @param {string} city - The city for which to send the weather update
 */
async function sendText(city) {
  try {
    // Fetch weather data for the city
    const weatherData = await fetchWeather(city);
    if (!weatherData) return;

    // Destructure relevant weather data
    const { main: { temp: temperature }, clouds: { all: clouds }, wind: { speed: windSpeed } } = weatherData;

    // Build the text message body
    const message = [
      `Weather in ${city}:`,
      `Description: ${weatherData.weather[0].description}`,
      `Temperature: ${temperature}°C`,
      `Clouds: ${clouds}%`,
      `Wind Speed: ${windSpeed} m/s`,
    ].join('\n');

    // Send the SMS
    await client.messages.create({
      body: message,
      to: process.env.PHONE_NUMBER,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    // Log a success message
    console.log(`Sent message: ${message}`);
  } catch (error) {
    // If something goes wrong, log the error
    console.error(`Failed to send weather update for ${city}: ${error}`);
  }
}

// Schedule the task to run at 8 AM every day
cron.schedule('0 8 * * *', () => {
  // List of cities for which to fetch the weather
  const cities = ['Dublin', 'Cork', 'Limerick', 'Wexford', 'Belfast'];

  // Send a weather update for each city
  cities.forEach(sendText);
});
