# Weather SMS Notifier ☀️📲

This application is designed to send daily weather updates via SMS for multiple cities. It uses the OpenWeather API for fetching weather data and Twilio for sending SMS.

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)

## Features 🌟

- Fetches daily weather data for a list of cities.
- Sends weather details, including temperature, cloud cover, and wind speed via SMS.
- Scheduled to run every day at 8 AM.

## Requirements 📋

- Node.js
- npm
- A Twilio account for sending SMS
- An OpenWeather API key for fetching weather data

## Installation 💾

### Clone the Repository

```bash
git clone https://github.com/Iviichae7/WeatherApp.git
```

### Navigate to the Directory

```bash
cd WeatherApp
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

- Rename `.env.sample` to `.env`.
- Fill in your Twilio account SID, Auth token, and OpenWeather API key.

## Usage 🚀

**Run the App**

```bash
node main.js
```

