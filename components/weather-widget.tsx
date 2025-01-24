"use client";
import { useState } from "react";
import WeatherData from "./weather-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function WeatherWidget() {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onChangeHandler(e) {
    setLocation(e.target.value);
  }
  async function onClickHandler() {
    setIsLoading(true);
    setError(null);
    setWeather(null);
    const trimmedCity = location.trim();

    if (trimmedCity == "") {
      alert("Please Enter Valid City Name");
      setIsLoading(false);
      return;
    }

    try {
      const newData = await fetch("https://localhost:3000/");
      console.log(newData);

      const query = `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}`;
      const responce = await fetch(query);
      const fetchedData = await responce.json();
      // console.log(fetchedData);
      const weatherData: WeatherData = {
        temperature: fetchedData.current.temp_c,
        description: fetchedData.current.condition.text,
        location: fetchedData.location.name,
        unit: "C",
      };
      setWeather(weatherData);
    } catch (error) {
      console.log(error);
      console.log("Could not fetch any details due to some error");
      setError("City not found please try again later");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center my-[10%]">
      <div className="w-[95%] md:w-[500px]">
        <Card>
          <CardHeader>
            <CardTitle className="font-normal font-mono text-center text-3xl">
              Enter Your City Name
            </CardTitle>
            <CardDescription className="text-center font-mono font-extralight">
              We use this city name to get related data
            </CardDescription>
          </CardHeader>
          <div className="form-container p-10 gap-5 flex flex-col md:flex-row items-center md:items-start">
            <Input
              className="py-6 font-mono"
              value={location}
              onChange={onChangeHandler}
            />
            {!weather && (
              <Button
                disabled={isLoading}
                onClick={onClickHandler}
                className="py-6 font-mono"
              >
                {`${isLoading ? `Loading` : `Search`}`}
              </Button>
            )}
            {weather && (
              <Button
                onClick={() => {
                  setError(null);
                  setIsLoading(false);
                  setWeather(null);
                  setLocation("");
                }}
                className="py-6 font-mono bg-gray-500"
              >
                Refresh
              </Button>
            )}
          </div>
          {error || weather ? (
            <div className="pb-6 flex flex-col items-center">
              {weather && <WeatherData data={weather} />}
              {error && <p>{error}</p>}
            </div>
          ) : (
            <></>
          )}
        </Card>
      </div>
    </div>
  );
}

export default WeatherWidget;
