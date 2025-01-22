"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";
import WeatherData from "./weather-data";
function WeatherWidget() {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onChangeHandler(e) {
    setLocation(e.target.value);
  }
  async function onClickHandler() {
    setIsLoading(true);
    const trimmedCity = location.trim();

    if (trimmedCity == "") {
      alert("Please Enter Valid City Name");
      setIsLoading(false);
      return;
    }

    try {
      const query = `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}`;
      const responce = await fetch(query);
      const fetchedData = await responce.json();
      console.log(fetchedData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center my-[10%]">
      <div className="w-[95%] md:w-[500px]">
        <Card>
          <CardHeader>
            <CardTitle className="font-normal text-center text-3xl">
              Enter Your City Name
            </CardTitle>
            <CardDescription className="text-center font-extralight">
              We use this city name to get related data
            </CardDescription>
          </CardHeader>
          <div className="form-container p-10 gap-5 flex flex-col md:flex-row items-center md:items-start">
            <Input
              className="py-6"
              value={location}
              onChange={onChangeHandler}
            />
            <Button
              disabled={isLoading}
              onClick={onClickHandler}
              className="py-6"
            >
              {`${isLoading ? `Loading` : `Search`}`}
            </Button>
          </div>
        </Card>
      </div>
      {}
    </div>
  );
}

export default WeatherWidget;
