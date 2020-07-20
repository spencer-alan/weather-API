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
    let geoCode = `https://us1.locationiq.com/v1/search.php?key=71ff5f7e923bc0&q=${search}&format=json`;

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

        let m = moment();
        let icon = response.current.weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
        let iconAlt = response.current.weather[0].description;
        let temp = "Tempurature: " + response.current.temp + " F";
        let humid = "Humidity: " + response.current.humidity + "%";
        let wind = "Wind Speed: " + response.current.wind_speed + " MPH";
        let uvIndex = "UV Index: " + response.current.uvi;
        
        $("#date").html(m.format("l"));
        $("#temp").html(temp);
        $("#humidity").html(humid);
        $("#wind").html(wind);
        $("#uv-index").html(uvIndex);
        $("#icon-image").attr("src", iconUrl);
        $("#icon-image").attr("alt", iconAlt);

        for (let i = 0; i < 5; i++) {
          let j = 1;
          let newDate = m.add(j, "days");
          j++;
          
          let cardArray = $(".card-body").toArray();

          let newH1 = cardArray[i].append("<h1></h1>");
          newH1.html(newDate);
          // let forecast = respone.daily[i];
          // let forecastIconUrl = forecast.weather[0].icon;
          // let forecastIconAlt = forecast.weather[0].description;
          // let forecastTemp = forecast.temp.max;
          // let forecastHumid = forecast.humidity;
          
        }
      })
    })  
  }
// document ready brackets
})