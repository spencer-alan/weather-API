$(document).ready(function() {
  // Makes feather Icons appear
  feather.replace();

  // Start of Code
  
  $("#search-btn").on("click", function() {
    
    let search = $("#search").val().trim();
    $("#city-name").text(search);
    let geoCode = `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=AIzaSyCkEObfpLOQDH06__WzcOMHkDfvjYi5QIE`;

    $.ajax({
      url: geoCode,
      method: "GET"
    }).then(function(response) {
      //console.log(response);

      let lat = response.results[0].geometry.location.lat;
      let lon = response.results[0].geometry.location.lng;
      let queryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=f0b0a3f8ddd94f0167372124c4d1652d`;
      
      $.ajax({
        url: queryUrl,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        let temp = "Tempurature: " + response.current.temp + " F";
        let humid = "Humidity: " + response.current.humidity + "%";
        let wind = "Wind Speed: " + response.current.wind_speed + " MPH";
        let uvIndex = "UV Index: " + response.current.uvi;
        let icon = response.current.weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        let iconAlt = response.current.weather[0].description;

        $("#temp").html(temp);
        $("#humidity").html(humid);
        $("#wind").html(wind);
        $("#uv-index").html(uvIndex);
        $("#icon-image").attr("src", iconUrl);
        $("#icon-image").attr("alt", iconAlt);
      })
    })  
  })
})