// async function weatherData() {
//     const key = 'fbccce410e1e9d2e52b1c8878c985484';
//     const city = 'dhaka';
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    
//     try {
//       const response = await fetch(apiUrl);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log(data); // Logs the weather data
//       //return data;
//     } catch (error) {
//       console.error('Error fetching the weather data:', error);
//     }
//   }
  
//   weatherData(); // Call the function
  

  //weather app
  const weatherForm = document.querySelector(".weatherForm");
  const cityInput = document.querySelector(".cityInput");
  const card = document.querySelector(".card");
  const apiKey = "fbccce410e1e9d2e52b1c8878c985484";

  weatherForm.addEventListener("submit",async (event)=>{
        event.preventDefault();
        const city = cityInput.value;
        //console.log(city);
        if(city){
            try{

                const weatherData = await getWeather(city);
                displayInfo(weatherData);

            }
            catch(error){
                console.log(error);
                displayError(error);
            }
        }
        else{
            displayError("Please Enter a city");
        }
  });

  async function getWeather(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    //console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return response.json();
    
  }

  function displayInfo(data){
    console.log(data);

    const {name:city,
           main:{temp,humidity},
           weather:[{description,id}]}=data;

           card.textContent="";
           card.style.display="flex";

           const cityDisplay = document.createElement("h1");
           const tempDisplay = document.createElement("p");
           const humidityDisplay = document.createElement("p");
           const descDisplay = document.createElement("p");
           const weatherEmoji = document.createElement("p");

           cityDisplay.textContent=city;
           tempDisplay.textContent=`${(temp-273).toFixed(1)}°c`;
           humidityDisplay.textContent=`Humidity:${humidity}%`;
           descDisplay.textContent=description;
           weatherEmoji.textContent = getEmoji(id);

           cityDisplay.classList.add("cityDisplay");
           tempDisplay.classList.add("tempDisplay");
           humidityDisplay.classList.add("humidityDisplay");
           descDisplay.classList.add("descDisplay");
           weatherEmoji.classList.add("weatherEmoji");

           card.appendChild(cityDisplay);
           card.appendChild(tempDisplay);
           card.appendChild(humidityDisplay);
           card.appendChild(descDisplay);
           card.appendChild(weatherEmoji);
  }

  function getEmoji(weatherId){

    switch(true){
        case (weatherId>=200 && weatherId <300):
            return "⛈️";

     case (weatherId>=300 && weatherId <400):
            return "🌧️";
     case (weatherId>=500 && weatherId <600):
             return "🌧️";
    case (weatherId>=700 && weatherId <800):
            return "❄️";
    case (weatherId>=200 && weatherId <300):
             return "💨";
    case (weatherId == 800):
                return "☀️";
    case (weatherId>=801 && weatherId <810):
        return "☁️";
    default:
        return "❓";
    }

  }

  function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
  }