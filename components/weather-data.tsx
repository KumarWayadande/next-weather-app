import React from "react";

import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";

// ###########################
// Helper Functions
function getTemperatureMessage(temperature: number, unit: string): string {
  if (unit === "C") {
    if (temperature < 0) {
      return `It's freezing at ${temperature}°C! Bundle up!`;
    } else if (temperature < 10) {
      return `It's quite cold at ${temperature}°C. Wear warm clothes.`;
    } else if (temperature < 20) {
      return `The temperature is ${temperature}°C. Comfortable for a light jacket.`;
    } else if (temperature < 30) {
      return `It's a pleasant ${temperature}°C. Enjoy the nice weather!`;
    } else {
      return `It's hot at ${temperature}°C. Stay hydrated!`;
    }
  } else {
    return `${temperature}°${unit}`;
  }
}

function getWeatherMessage(description: string): string {
  switch (description.toLowerCase()) {
    case "sunny":
      return "It's a beautiful sunny day!";
    case "partly cloudy":
      return "Expect some clouds and sunshine.";
    case "cloudy":
      return "It's cloudy today.";
    case "overcast":
      return "The sky is overcast.";
    case "rain":
      return "Don't forget your umbrella! It's raining.";
    case "thunderstorm":
      return "Thunderstorms are expected today.";
    case "snow":
      return "Bundle up! It's snowing.";
    case "mist":
      return "It's misty outside.";
    case "fog":
      return "Be careful, there's fog outside.";
    default:
      return description;
  }
}

function getLocationMessage(location: string): string {
  const currentHour = new Date().getHours();
  const isNight = currentHour >= 18 || currentHour < 6;

  return ` ${location} ${isNight ? "at Night" : "During the Day"}`;
}

function WeatherData({ data }) {
  return (
    <div className="flex flex-col gap-2 font-mono font-bold">
      <div className="flex flex-row gap-2">
        <ThermometerIcon />
        <h1>{getTemperatureMessage(data.temperature, data.unit)}</h1>
      </div>
      <div className="flex flex-row gap-2">
        <CloudIcon />
        <h1>{getWeatherMessage(data.description)}</h1>
      </div>
      <div className="flex flex-row gap-2">
        <MapPinIcon />
        <h1>{getLocationMessage(data.location)}</h1>
      </div>
    </div>
  );
}

export default WeatherData;
