

function fetchData(lat,lng) {
  let urlPollen = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=european_aqi,us_aqi,pm10,pm2_5,ozone,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,uv_index,ammonia,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=auto`;
  fetch(urlPollen)
  .then((response) => response.json()) // Return it as JSON data
  .then((data) => { // Lets do stuff with the data now

    // Just to see what is going on
    // console.log(data); 

    // Location
    let timeZone = document.getElementById('timezone');
    let formattedTimezone = data.timezone.replace(/_/g, ' ').replace(/[\/]/g, ', ');
    timeZone.innerHTML = formattedTimezone;

    // createPollutant function: Data, Pollutant Name, Container Id, Pollutant Class
    // showData function: Data, Pollutant Name, Container Id

    //PM2.5: Create Pollutant + Show Data with units
    createPollutant (data, 'pm2_5', 'pm2_5_count', 'pm2_5');
    showData (data, 'pm2_5', 'pm2_5_data' ,'pm2_5UnitId');
    // showUnit (data, 'pm2_5');

    //Ozone: Create Pollutant + Show Data with units
    createPollutant (data, 'ozone', 'ozone_count', 'ozone');
    showData (data, 'ozone', 'ozone_data','ozoneUnitId');

    //Carbon Monoxide: Create Pollutant + Show Data with units
    createPollutant (data, 'carbon_monoxide', 'cm_count', 'cm');
    showData (data, 'carbon_monoxide', 'cm_data','cmUnitId');

    //Nitrogen Dioxide: Data, Pollutant Name, Container Id, Pollutant Class 
    createPollutant (data, 'nitrogen_dioxide', 'nd_count', 'nd');
    showData (data, 'nitrogen_dioxide', 'nd_data', 'ndUnitId');

    //Sulphur Dioxide:Data, Pollutant Name, Container Id, Pollutant Class  
    createPollutant (data, 'sulphur_dioxide', 'sd_count', 'sd');
    showData (data, 'sulphur_dioxide', 'sd_data','sdUnitId');

    //USA AQI
    let aqi = data.current.us_aqi;
    let aqi_num = document.getElementById('aqi');
    aqi_num.innerHTML = aqi +' AQI';

    // console.log('USA AQI', aqi);


    let conditionText = '';

    if (aqi <= 50){
      conditionText = 'Good';
      // console.log('Condition: Good');
    } else if ( aqi >= 51 && aqi <= 100) {
      conditionText = 'Moderate';
      // console.log('Condition: Moderate');
    } else if (aqi >= 101 && aqi <= 150) {
      conditionText = 'Unhealthy(for senstive groups';
      // console.log('Condition: Unhealthy(for senstive groups)');
    } else if (aqi >= 101 && aqi <= 150) {
      conditionText = 'Unhealthy';
      // console.log('Condition: Unhealthy');
    } else if (aqi >= 201 && aqi <= 300) {
      conditionText = 'Very Unhealthy';
      // console.log('Condition: Very Unhealthy');
    } else if (aqi >= 301 && aqi <= 500) {
      conditionText = 'Hazardous';
      // console.log('Condition: Hazardous');
    }
    document.getElementById('condition').textContent = conditionText;
  })
  .catch((error) => {
    console.error('Error', error);
  });
}


// Getting your lat and lng based on location saving to variable 
document.addEventListener('DOMContentLoaded', () => {
  navigator.geolocation.getCurrentPosition((position) => {
    lat =(position.coords.latitude);
    lng = (position.coords.longitude);
    fetchData(lat, lng);
  });

  // Button click event to change location
  document.getElementById('nxt_btn').addEventListener('click', () => {
    fetch('json/data.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(location => {
          const lat = location.lat
          const lng = location.lng
          fetchData(lat, lng);
        });
    })
    fetchData(lat, lng);
  });
});

//Function to create the circles based on pollutant count
const createPollutant = (data, pollutantName, containerId, pollutantClass) => {
  const pollutantCount = data.current[pollutantName];
  const pollutantCountElement = document.getElementById(containerId);

  //Loop through the pollutant count 
    for (let i = 0; i < pollutantCount; i++) {
      let circle = document.createElement('div');
      circle.classList.add(pollutantClass, 'pollutant');
      
      //Animate circles
      circle.style.left = Math.random() * window.innerWidth + 'px';
      circle.style.top = Math.random() * window.innerHeight + 'px';

      let directionX = Math.random(); 
      let directionY = Math.random(); 

      circle.style.animation = `moveSpore ${Math.random() * 40 + 20}s linear infinite`;
      circle.style.animationDirection = directionX === 1 ? 'normal' : 'reverse';
      
      //Display
      pollutantCountElement.appendChild(circle);
      
    }
  };

  //Function to show data 
  const showData = (data, pollutantName, containerId, unitId) =>{
    
    let pollutantData = document.getElementById(containerId);
    pollutantData.innerHTML = data.current[pollutantName];

    let pollutantUnit = document.getElementById(unitId);
    pollutantUnit.innerHTML = data.current_units[pollutantName];
  };






// lat and lng for other pages 
// if (!document.URL.includes("country.html")) {
//   lat = 40.014984;
//   lng = -105.270546;

//   // Call function to fetch air quality data
//   fetchData(lat, lng);
// }



// add saved lat and lng to add to list of places 
// add last updated 
// add color states for different conditions (could use canvas)