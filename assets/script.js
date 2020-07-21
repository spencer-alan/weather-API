$(document).ready(function() {
  // Makes feather Icons appear
  feather.replace();

  // Start of Code
  
  // need one more on enter event listener
  
  $("#search-btn").on("click", getWeather); 
  // one more event listener to handle recent search button click
  //need to populate the city name text when recent search is clicked
  
  function getWeather() {
    let search = $("#search").val().trim();
    $("#city-name").text(search);
    let geoCode = `https://us1.locationiq.com/v1/search.php?key=PASSWORD&q=${search}&format=json`;

    $.ajax({
      url: geoCode,
      method: "GET"
    }).then(function(response) {
      //console.log(response);

      let lat = response[0].lat;
      let lon = response[0].lon;
      let queryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=2c77de34da40a4af3610f7e69981374f`;
      
      $.ajax({
        url: queryUrl,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        let date = response.current.dt;
        let milliseconds = date * 1000;
        let dateObject = new Date(milliseconds);
        let options = {
          month: "numeric",
          day: "numeric", 
          year: "numeric"
        }
        let humanDate = dateObject.toLocaleString("en-US", options);
        let icon = response.current.weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
        let iconAlt = response.current.weather[0].description;
        let temp = "Tempurature: " + response.current.temp + " F";
        let humid = "Humidity: " + response.current.humidity + "%";
        let wind = "Wind Speed: " + response.current.wind_speed + " MPH";
        let uvIndex = "UV Index: " + response.current.uvi;
        
        $("#date").html(humanDate);
        $("#temp").html(temp);
        $("#humidity").html(humid);
        $("#wind").html(wind);
        $("#uv-index").html(uvIndex);
        $("#icon-image").attr("src", iconUrl);
        $("#icon-image").attr("alt", iconAlt);
     
        $(".card-body").html("");
        for (let i = 0; i < 5; i++) {
          
          let card1 = $("#card1");
          let card2 = $("#card2");
          let card3 = $("#card3");
          let card4 = $("#card4");
          let card5 = $("#card5");
          let cardArray = [card1, card2, card3, card4, card5];

          let forecast = response.daily[i];
          let forecastDate = forecast.dt;
          let forecastMilliseconds = forecastDate * 1000;
          let forecastDateObject = new Date(forecastMilliseconds);
          let forecastOptions = {
            month: "numeric",
            day: "numeric", 
            year: "numeric"
          }
          let forecastHumanDate = forecastDateObject.toLocaleString("en-US", forecastOptions);
          let forecastIcon = forecast.weather[0].icon;
          let forecastIconUrl = "http://openweathermap.org/img/wn/" + forecastIcon + ".png";
          let forecastIconAlt = forecast.weather[0].description;
          let forecastTemp = forecast.temp.max;
          let forecastHumid = forecast.humidity;
          let newP = $("<p>");
          let newImg = $("<img>");
          let newDivTemp = $("<div>");
          let newDivHumid = $("<div>");

          newP.html(forecastHumanDate);
          cardArray[i].append(newP);
          newImg.attr("src", forecastIconUrl);
          newImg.attr("alt", forecastIconAlt);
          cardArray[i].append(newImg);
          newDivTemp.html("Tempurature: " + forecastTemp + "F");
          cardArray[i].append(newDivTemp);
          newDivHumid.html("Humidity: " + forecastHumid);
          cardArray[i].append(newDivHumid);

        }
      })
    })  
  }
// document ready brackets
})
