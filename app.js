let ul = document.querySelector(".facts");
let btn = document.querySelector(".fact-btn");
btn.addEventListener("click", function () {
  let url = "https://catfact.ninja/fact";

  fetch(url) //this help us to send api request
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("fact1: ", data.fact);
      let item = document.createElement("li");
      item.innerText = data.fact;
      ul.appendChild(item);
      return fetch(url);
    })
    .catch((err) => {
      console.log("Error - ", err);
    });
});

//for weather
// Your OpenWeatherMap API Key
// Replace with your actual API key
// Function to get weather for the input city

// Function to fetch weather data
async function fetchWeather(city) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=acd0a4c14e71d3fc9366d8e3ceae6694&units=metric`;

  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("weather").innerText =
      "Unable to fetch weather data.";
  }
}

// Function to display weather data
function displayWeather(data) {
  const weatherContainer = document.getElementById("weather");
  weatherContainer.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Call fetchWeather function on page load
document.addEventListener("DOMContentLoaded", () => {
  const city = "New York"; // Set the default city or use user input
  fetchWeather(city);
});

function getWeather() {
  const city = document.getElementById("cityInput").value;
  console.log(city);
  fetchWeather(city);
}

//for news

// Your News API key
// const apiKey = 'YOUR_NEWS_API_KEY'; // Replace with your actual API key

// Function to fetch news data

async function fetchNews() {
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=973d1e59779f4e719917fa3c341f0e47`;

    try {
        const response = await fetch(newsUrl);
        if (!response.ok) throw new Error('Error fetching news data');
        
        const data = await response.json();
        console.log(data.articles);
        console.log("working");
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('news').innerText = "Unable to fetch news data.";
    }
}

// Function to display news data
function displayNews(articles) {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = ''; // Clear previous news

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
            <hr>
        `;
        newsContainer.appendChild(newsItem);
    });
}

// Call fetchNews function on page load
document.addEventListener('DOMContentLoaded', fetchNews);

