let todayName = document.getElementById("today-date-day-name");
let todayNumber = document.getElementById("today-date-day-number");
let todayMonth = document.getElementById("today-date-month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayConditionImg = document.getElementById("today-condition-img");
let todayConditionText = document.getElementById("today-condition-text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");
let nextDay = document.getElementsByClassName("next-day-name");
let nextMaxTemp = document.getElementsByClassName("next-max-temp");
let nextMiniTemp = document.getElementsByClassName("next-min-temp");
let nextConditionImg = document.getElementsByClassName("next-condition-img");
let nextConditionText = document.getElementsByClassName("next-condition-text");
let searchInput = document.getElementById("search");


 async function getAllData(cityName){
  let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=133af45b3f68480684114704241801&q=${cityName}&days=3`)
  let response= await data.json();
  return response;
}

 function displayDay(data){
  let todayDate = new Date();
 

  todayName.innerHTML = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  todayNumber.innerHTML = todayDate.getDate() //dayNumber
  todayMonth.innerHTML = todayDate.toLocaleString("en-US",{month:"long"})
  console.log(data.current.condition.icon);
  todayLocation.innerHTML  =data.location.name
  todayTemp.innerHTML= data.current.temp_c
  todayConditionImg.setAttribute("src","https://"+data.current.condition.icon)
  todayConditionText.innerHTML = data.current.condition.text
  humidity.innerHTML=data.current.humidity+"%"
  wind.innerHTML=data.current.wind_kph+"km/h"
  windDirection.innerHTML=data.current.wind_dir
 }


 function displayOtherDays(data){
       let forecastData = data.forecast.forecastday
      for(let i=0;i<2;i++){
        let nextDate = new Date(forecastData[i + 1].date);
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", {
          weekday: "long",
        });
        nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c
        nextMiniTemp[i].innerHTML=forecastData[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src","https://"+forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML=forecastData[i+1].day.condition.text
      }
 }


 async function main(city="london") {
   let responseData=await getAllData(city)

   displayDay(responseData)
   displayOtherDays(responseData)
   
 }
 main()


 searchInput.addEventListener("keyup",function(){
  main(searchInput.value)
 })
