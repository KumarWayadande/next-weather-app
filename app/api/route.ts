"use server";
interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  unit: string;
}

async function GET() {
  const query = `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}`;

  try {
    const responce = await fetch(query);
    const fetchedData = await responce.json();
    console.log(fetchedData);
    const weatherData: WeatherData = {
      temperature: fetchedData.current.temp_c,
      description: fetchedData.current.condition.text,
      location: fetchedData.location.name,
      unit: "C",
    };
    return weatherData;
  } catch (error) {
    console.log(error);
  }
}

export default GET;
