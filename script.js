document.addEventListener("DOMContentLoaded", () => {
  //loading all info from html file
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e";

  getWeatherBtn.addEventListener("click", async () => {
    //this will be activated as we click on getweather btn
    const city = cityInput.value.trim();
    if (!city) return; //if city string is empty then its equivalent to false therefore !city = true.

    /*- Remeber whenever we make a request there is always a chance that request may fail form the server so we have to handle it by then&catch / try &catch method.
        - Server/Database is mostly lies in different continent so it always requires some time to fetch info therefore always use 'await' & to use it we have to make our fun 'async',
            we have to make both fun async: 
            1)jis fun ke andar await keyword use krrhe (addEventListener)
            2)jis fun ko async keyword k baad call krrhe (fetchWeatherData)
      */

    try {
      const weatherData = await fetchWeatherData(city); //after calling the fun the returned data will be stored in weatherData
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //for fetching data (this is the template which we use when we fetch data from a url , learn it)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      // if entered city is valid then key 'ok' = true & vica versa for ok=false. You can check it by inspecting response in console.
      throw new Error(" City Not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    //displaying fetched data. Go & read the response in console before extracting the data.
    console.log(data);
    const { name, main, weather } = data; //from the feched info we only need to access these 3
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`; //main is a nested class which contains temp
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`; //weather is an array which contains description of weather

    //unlock the display
    weatherInfo.classList.remove("hidden"); //for displaying info we want weatherInfo to be visible and error message to be hidden
    errorMessage.classList.add("hidden");
  }

  function showError() {
    //jb error hoga tb weatherInfo class has to be hidden & errorMessage class has to be visible
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});
