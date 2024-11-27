import "./Weather.css";
import React, { useState } from "react";
import axios from "axios"; // Import Axios for API calls

const Weather = () => {
  // States to manage city input, fetched weather data, and error messages
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Replace this with your OpenWeatherMap API key
  const API_KEY = "cf55c6c93ed371fa11bda37144ba9b2a";

  // Function to fetch weather data
  const fetchWeather = async () => {
    // If city is empty, display an error
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    try {
      // Make API call using Axios
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data); // Set fetched weather data
      setError(""); // Clear any previous error
    } catch (err) {
      // Handle errors (e.g., city not found)
      setError("City not found. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Title */}
      <h1 style={{ color: "#4A90E2" }}>Weather App</h1>

      {/* Input for City Name */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)} // Update city state on input change
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          marginRight: "10px",
          border: "1px solid #ccc",
          width: "200px",
        }}
      />

      {/* Button to Fetch Weather */}
      <button
        onClick={fetchWeather}
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "#4A90E2",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Get Weather
      </button>

      {/* Error Message */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {/* Display Weather Information */}
      {weather && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            display: "inline-block",
            textAlign: "left",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>{weather.name}</h2>
          <p style={{ margin: "5px 0" }}>🌡 Temperature: {weather.main.temp}°C</p>
          <p style={{ margin: "5px 0" }}>🌦 Weather: {weather.weather[0].description}</p>
          <p style={{ margin: "5px 0" }}>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
