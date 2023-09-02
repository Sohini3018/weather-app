

### **Debugging and Enhancement Assignment: Advanced Weather Dashboard**

#### **Background**

You've inherited a front-end project that's supposed to be an Advanced Weather Dashboard. This dashboard should display weather information for multiple cities using a weather API. The existing codebase uses HTML, CSS, and JavaScript (ReactJS). However, the application is not working as expected and lacks some advanced features.

#### **Basic Requirements**

1. Users should be able to search for a city's weather by entering a city name.
2. The dashboard should display the current weather information for multiple cities in cards.
3. Users should be able to delete a city's weather card.
4. Users should be able to refresh weather information for a specific city by clicking a refresh button on the city's card.

#### **Advanced Requirements**

1. Users should be able to toggle between Celsius and Fahrenheit for temperature display.
2. Implement pagination to display only 5 cities per page.
3. The dashboard should have a feature to display weather information for the next 5 days for a specific city.
4. Users should be able to filter cities based on temperature (Hot, Moderate, Cold).
5. The application should be responsive, and the layout should adapt to mobile and tablet views.

#### **Code Snippet**

```js
import React, { useState } from 'react'; function WeatherDashboard() { const [cities, setCities] = useState([]); const [search, setSearch] = useState(''); async function fetchWeather(city) { const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`); return response.json(); } const addCity = () => { const weather = fetchWeather(search); setCities([...cities, weather]); }; const deleteCity = (city) => { setCities(cities.filter(c => c.name !== city.name)); }; return ( <div> <input type="text" value={search} onChange={e => setSearch(e.target.value)} /> <button onClick={addCity}>Add City</button> <div> {cities.map(city => ( <div key={city.name}> <h2>{city.name}</h2> <p>Temperature: {city.main.temp}</p> <button onClick={() => deleteCity(city)}>Delete</button> </div> ))} </div> </div> ); }
```

#### **Bugs to Fix**

1. The city search and addition are not functioning properly.
2. The temperature is not being displayed.
3. The delete functionality is not working.
4. The dashboard does not have a refresh functionality for individual cities.
5. The UI doesn't look well-organized.

#### **Tips**

- You may need to use debugging techniques like browser developer tools, console logs, or reading documentation.
- You'll need to understand ReactJS state management, asynchronous operations, API calls, and responsive design.

#### **Deliverables**

1. A working Advanced Weather Dashboard application that meets the basic and advanced requirements.
2. A brief write-up explaining the bugs you found and how you fixed them, as well as how you implemented the advanced features.

#### **Bonus**

1. Add error handling for API calls.
2. Implement a loading spinner while the weather information is being fetched.
3. Use CSS pre-processors like SASS or LESS for styling.
4. Implement unit tests for your components.

