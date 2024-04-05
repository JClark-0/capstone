

// Getting your lat and lng based on location saving to variable 
let lat, lng;
navigator.geolocation.getCurrentPosition((position) => {
  lat =(position.coords.latitude);
  lng = (position.coords.longitude);

  // console.log(lat);
  // console.log(lng);
  fetchData(lat, lng);

});

if (!document.URL.includes("country.html")) {
  // Load default coordinates if not on the "index.html" page
  lat = 40.014984;
  lng = -105.270546;

  // Call function to fetch air quality data
  fetchData(lat, lng);
}


function fetchData(lat,lng) {
  let urlPollen = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,uv_index,ammonia,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=auto`;
  fetch(urlPollen)
  .then((response) => response.json()) // Return it as JSON data
  .then((data) => { // Lets do stuff with the data now

    // Just to see what is going on
    console.log(data); 

    // Location
    let timeZone = document.getElementById('timezone');
    let formattedTimezone = data.timezone.replace(/_/g, ' ').replace(/[\/]/g, ', ');
    timeZone.innerHTML = formattedTimezone;


    //PM2.5 Pollutant
    let pm2_5 = data.current.pm2_5;
    let pm2_5Unit = data.current_units.pm2_5;
    console.log('pm2.5', pm2_5, pm2_5Unit);

    //ozone
    let ozone = data.current.ozone;
    let ozoneUnit = data.current_units.ozone;
    console.log('ozone', ozone, ozoneUnit);

    //Carbon Monoxide 
    let carbMon = data.current.carbon_monoxide;
    let carbMonUnit = data.current_units.carbon_monoxide;
    console.log('carbon monoxide', carbMon, carbMonUnit);

    //Nitrogen Dioxide 
    let nitroD = data.current.nitrogen_dioxide;
    let nitroDUnit = data.current_units.nitrogen_dioxide;
    console.log('nitrogen dioxide', nitroD, nitroDUnit);

    //Sulphur Dioxide 
    let sulphD = data.current.sulphur_dioxide;
    let sulphDUnit = data.current_units.sulphur_dioxide;
    console.log('sulphur dioxide', sulphD, sulphDUnit);

    //USA AQI
    let aqi = data.current.us_aqi;
    console.log('USA AQI', aqi);

    if (aqi <= 50){
      console.log('Condition: Good');
    } else if ( aqi >= 51 && aqi <= 100) {
      console.log('Condition: Moderate');
    } else if (aqi >= 101 && aqi <= 150) {
      console.log('Condition: Unhealthy(for senstive groups)');
    } else if (aqi >= 101 && aqi <= 150) {
      console.log('Condition: Unhealthy');
    } else if (aqi >= 201 && aqi <= 300) {
      console.log('Condition: Very Unhealthy');
    } else if (aqi >= 301 && aqi <= 500) {
      console.log('Condition: Hazardous');
    }
  })
  .catch((error) => {
    console.error('Error fetching air quality data:', error);
  });
}





// fetch('json/data.json')
// 	.then(response => response.json())
// 	.then(data => {
// 		// And passes the data to something
// 		console.log(data)
// 	})

// add saved lat and lng to add to list of places 
// add last updated 