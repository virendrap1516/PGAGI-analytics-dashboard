'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from './ui/animated-number';
import { Cloud, Sun } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Swal from 'sweetalert2';
import { useTheme } from 'next-themes';
import { Autocomplete } from './AutoComplete';

const showAlert = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    footer: '<a target="_blank" href="https://www.weather.com/">Check available cities here</a>',
    background: '#1e293b',
    color: '#f8fafc',
    confirmButtonColor: '#3b82f6',
  });
};

async function checkWeather({ latitude, longitude }: { latitude: string, longitude: string }) {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,wind_speed_10m`);
    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || 'Failed to fetch weather data');
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    showAlert('Unable to fetch weather data. Please try again later.');
  }
}

async function getCoordinates(placeName: string) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      const location = data[0];
      try {
        const weatherData = await checkWeather({ latitude: location.lat, longitude: location.lon });
        return { location, weatherData };
      } catch (error) {
        console.log(error);
        showAlert('Failed to get weather data. Please try again later.');
      }
    } else {
      showAlert('City not found. Please enter a valid city name.');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    showAlert('Unable to fetch coordinates. Please try again later.');
  }
  return null; // if no valid data is found
}

export function WeatherWidget() {
  const { theme } = useTheme();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await getCoordinates(city);
    if (result) {
      const { location, weatherData } = result;
      setWeather({ location, weatherData });
    }
    setLoading(false);
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
  };

  return (
    <Card
      className={`bg-white/20 ${theme === 'dark' ? 'dark:bg-gray-800' : 'bg-white'} text-white ${theme === 'dark' ? 'dark:text-gray-100' : 'text-gray-900'} backdrop-blur-md`}
    >
      <CardHeader>
        <CardTitle className="flex items-center text-3xl font-bold">
          <Sun className="mr-2 text-yellow-400" />
          Weather Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Autocomplete onSelect={handleCitySelect} />
          <Button
            type="submit"
            className={`w-full ${theme === 'dark' ? 'dark:bg-blue-700 dark:hover:bg-blue-600 text-white text-md' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </Button>
        </form>
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 space-y-4"
          >
            <h3 className="text-3xl font-semibold">{weather.location.display_name}</h3>
            <div className="flex items-center text-2xl">
              <Cloud className="mr-2 text-blue-400" />
              <AnimatedNumber value={weather.weatherData.current_weather.temperature} /> °C
            </div>
            <p className="text-xl">Wind: <AnimatedNumber value={weather.weatherData.current_weather.windspeed} /> km/h</p>
            <div className="mt-6 h-64 sm:h-[300px] md:h-[400px] lg:h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weather.weatherData.hourly.time.map((time: string, index: number) => ({
                    time: time.replace('T', ' '),
                    temperature: weather.weatherData.hourly.temperature_2m[index],
                  }))}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="time" stroke={theme === 'dark' ? 'white' : 'black'} />
                  <YAxis stroke={theme === 'dark' ? 'white' : 'black'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px',
                      color: 'white',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
