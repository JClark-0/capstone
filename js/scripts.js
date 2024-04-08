

// Getting your lat and lng based on location saving to variable 
let lat, lng;
navigator.geolocation.getCurrentPosition((position) => {
  lat =(position.coords.latitude);
  lng = (position.coords.longitude);

  // console.log(lat);
  // console.log(lng);
  fetchData(lat, lng);

});

// lat and lng for other pages 
// if (!document.URL.includes("country.html")) {
//   lat = 40.014984;
//   lng = -105.270546;

//   // Call function to fetch air quality data
//   fetchData(lat, lng);
// }


function fetchData(lat,lng) {
  let urlPollen = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=european_aqi,us_aqi,pm10,pm2_5,ozone,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,uv_index,ammonia,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=auto`;
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

    let pm_25Count = document.getElementById('pm2_5_count');
    for (let i = 0; i < pm2_5; i++) {
        let circle = document.createElement('div');
        circle.classList.add('pm2_5', 'pollutant');
        pm_25Count.appendChild(circle);
      }

    //ozone
    let ozone = data.current.ozone;
    let ozoneUnit = data.current_units.ozone;
    console.log('ozone', ozone, ozoneUnit);

    let ozoneCount = document.getElementById('ozone_count');
    for (let i = 0; i < ozone; i++) {
        let circle = document.createElement('div');
        circle.classList.add('ozone', 'pollutant');
        ozoneCount.appendChild(circle);
      }

    //Carbon Monoxide 
    let carbMon = data.current.carbon_monoxide;
    let carbMonUnit = data.current_units.carbon_monoxide;
    console.log('carbon monoxide', carbMon, carbMonUnit);

    let cmCount = document.getElementById('cm_count');
    for (let i = 0; i < carbMon; i++) {
        let circle = document.createElement('div');
        circle.classList.add('cm', 'pollutant');
        cmCount.appendChild(circle);
      }


    //Nitrogen Dioxide 
    let nitroD = data.current.nitrogen_dioxide;
    let nitroDUnit = data.current_units.nitrogen_dioxide;
    console.log('nitrogen dioxide', nitroD, nitroDUnit);

    let ndCount = document.getElementById('nd_count');
    for (let i = 0; i < nitroD; i++) {
        let circle = document.createElement('div');
        circle.classList.add('nd', 'pollutant');
        ndCount.appendChild(circle);
      }

    //Sulphur Dioxide 
    let sulphD = data.current.sulphur_dioxide;
    let sulphDUnit = data.current_units.sulphur_dioxide;
    console.log('sulphur dioxide', sulphD, sulphDUnit);

    let sdCount = document.getElementById('sd_count');
    for (let i = 0; i < sulphD; i++) {
        let circle = document.createElement('div');
        circle.classList.add('sd', 'pollutant');
        sdCount.appendChild(circle);
      }

    //USA AQI
    let aqi = data.current.us_aqi;
    let aqi_num = document.getElementById('aqi');
    aqi_num.innerHTML = aqi +' AQI';

    console.log('USA AQI', aqi);


    let conditionText = '';

    if (aqi <= 50){
      conditionText = 'Condition: Good';
      // console.log('Condition: Good');
    } else if ( aqi >= 51 && aqi <= 100) {
      conditionText = 'Moderate';
      // console.log('Condition: Moderate');
    } else if (aqi >= 101 && aqi <= 150) {
      conditionText = 'Condition: Unhealthy(for senstive groups';
      // console.log('Condition: Unhealthy(for senstive groups)');
    } else if (aqi >= 101 && aqi <= 150) {
      conditionText = 'Condition: Unhealthy';
      // console.log('Condition: Unhealthy');
    } else if (aqi >= 201 && aqi <= 300) {
      conditionText = 'Condition: Very Unhealthy';
      // console.log('Condition: Very Unhealthy');
    } else if (aqi >= 301 && aqi <= 500) {
      conditionText = 'Condition: Hazardous';
      // console.log('Condition: Hazardous');
    }
    document.getElementById('condition').textContent = conditionText;
  })
  .catch((error) => {
    console.error('Error fetching air quality data:', error);
  });

  // moveCircles();
}

// function moveCircles() {
//   const circles = document.querySelectorAll('.pollutant');
//   const container = document.querySelector('.pollutant_view');

//   circles.forEach(circle => {
//     const containerWidth = container.clientWidth;
//     const containerHeight = container.clientHeight;
//     const circleWidth = circle.clientWidth;
//     const circleHeight = circle.clientHeight;

//     const xPos = Math.random() * (containerWidth - circleWidth);
//     const yPos = Math.random() * (containerHeight - circleHeight);

//     circle.style.position = 'absolute';
//     circle.style.left = xPos + 'px';
//     circle.style.top = yPos + 'px';
//   });
// }









// fetch('json/data.json')
// 	.then(response => response.json())
// 	.then(data => {
// 		// And passes the data to something
// 		console.log(data)
// 	})

// add saved lat and lng to add to list of places 
// add last updated 
// add color states for different conditions (could use canvas)