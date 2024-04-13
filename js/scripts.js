

// ------- Latitude & Longitude ------- 
document.addEventListener('DOMContentLoaded', () => {

  navigator.geolocation.getCurrentPosition((position) => {
    lat =(position.coords.latitude);
    lng = (position.coords.longitude);
    fetchData(lat, lng); 
  });

  fetch('json/data.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(location => {
          const lat = location.lat
          const lng = location.lng
          fetchAndSave(lat, lng);
        });
    })
});

// ------- Show Location Name ------- 
const showLocation = (lat, lng) => {
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  fetch(`https://us1.locationiq.com/v1/reverse?lat=${lat}&lon=${lng}&format=json&zoom=14&accept-language=en&key=pk.83485c19ebc3983a826192780bdd4e9c`, options)
    .then(response => response.json())
    .then(response => { 
      console.log(response);
      let locationName = document.getElementById('locationId');
      if (locationName) {
        locationName.innerHTML = response.address.city;
      } else {
        console.error(`Element with id '${locationId}' not found.`);
      }
    })
    .catch(err => console.error(err));
};


// ------- Create lat lng Database -------
let database = [];

// --- JSON Lat & Lng through API pushed to database ---
function fetchAndSave(lat,lng){
  let urlPollen = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,ammonia&hourly=us_aqi,us_aqi_pm2_5,us_aqi_pm10,us_aqi_nitrogen_dioxide,us_aqi_carbon_monoxide,us_aqi_ozone,us_aqi_sulphur_dioxide&timezone=auto&past_hours=1&forecast_days=1&forecast_hours=1`;
  fetch(urlPollen)
  .then((response) => response.json())
  .then((data) => { 
    database.push(data)
  })
}

// --- Location added to database ready to render ---
function fetchData(lat,lng) {
  let urlPollen = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,ammonia&hourly=us_aqi,us_aqi_pm2_5,us_aqi_pm10,us_aqi_nitrogen_dioxide,us_aqi_carbon_monoxide,us_aqi_ozone,us_aqi_sulphur_dioxide&timezone=auto&past_hours=1&forecast_days=1&forecast_hours=1`;
  fetch(urlPollen)
  .then((response) => response.json())
  .then((data) => {

    database.splice(0, 0, data);
    renderOnScreen(database[0]);
    console.log(database);
  })
  .catch((error) => {
    console.error('Error', error);
  });
}

// ------- Render data on page -------
function renderOnScreen(data){
  
  // Clear Pollutant circles 
  document.querySelectorAll('.pollutants').forEach(box => {
    box.innerHTML = ''; 
  });

  // Changes value on variable 
  document.documentElement.style.setProperty('--on_load', 100);

  showLocation (lat, lng);

  let timeZone = document.getElementById('timezone');
  let formattedTimezone = data.timezone.replace(/_/g, ' ').replace(/[\/]/g, ', ');
  timeZone.innerHTML = formattedTimezone;


  // ------- Calling Pollutant Functions ------- 
  // createPollutant function: Data, Pollutant Name, Container Id, Pollutant Class
  // showData function: Data, Pollutant Name, Container Id
  //PM2.5: 
  createPollutant (data, 'pm2_5', 'pm2_5_count', 'pm2_5');
  showData (data, 'pm2_5', 'pm2_5_data' ,'pm2_5UnitId');
  //Ozone: 
  createPollutant (data, 'ozone', 'ozone_count', 'ozone');
  showData (data, 'ozone', 'ozone_data','ozoneUnitId');
  //Carbon Monoxide:
  createPollutant (data, 'carbon_monoxide', 'cm_count', 'cm');
  showData (data, 'carbon_monoxide', 'cm_data','cmUnitId');
  //Nitrogen Dioxide: 
  createPollutant (data, 'nitrogen_dioxide', 'nd_count', 'nd');
  showData (data, 'nitrogen_dioxide', 'nd_data', 'ndUnitId');
  //Sulphur Dioxide:
  createPollutant (data, 'sulphur_dioxide', 'sd_count', 'sd');
  showData (data, 'sulphur_dioxide', 'sd_data','sdUnitId');

  // ------- USA AQI ------- 
  let aqi = data.current.us_aqi;
  let aqi_num = document.getElementById('aqi');
  aqi_num.innerHTML = aqi +' AQI';
  // console.log('USA AQI', aqi);

  let conditionText = '';
  if (aqi <= 50){
    conditionText = 'Good';
  } else if ( aqi >= 51 && aqi <= 100) {
    conditionText = 'Moderate';
    document.documentElement.style.setProperty('--pm2_5', '#187D40')
    document.documentElement.style.setProperty('--ozone', '#1CB659')
    document.documentElement.style.setProperty('--cm', '#53D5C5')
    document.documentElement.style.setProperty('--sd', '#63EC9A')
    document.documentElement.style.setProperty('--nd', '#9DE6F6')
  } else if (aqi >= 101 && aqi <= 150) {
    conditionText = 'Unhealthy(for senstive groups)';
  } else if (aqi >= 151 && aqi <= 200) {
    conditionText = 'Unhealthy';
  } else if (aqi >= 201 && aqi <= 300) {
    conditionText = 'Very Unhealthy';
  } else if (aqi >= 301 && aqi <= 500) {
    conditionText = 'Hazardous';
  }
  document.getElementById('condition').textContent = conditionText;
}

// -------  Function: Circles from pollutant count ------- 
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

// ------- Function: Show pollutant data ------- 
const showData = (data, pollutantName, containerId, unitId) =>{
    
    let pollutantData = document.getElementById(containerId);
    pollutantData.innerHTML = data.current[pollutantName];

    let pollutantUnit = document.getElementById(unitId);
    pollutantUnit.innerHTML = data.current_units[pollutantName];
};

// ------- Click to Next Location ------- 
const nextLocation = document.getElementById('nxt_btn');
let currentLocationIndex = 0;
nextLocation.onclick = () => {
  if (currentLocationIndex < database.length-1){
    currentLocationIndex++;
  } else {
    currentLocationIndex = 0;
  }
  console.log(currentLocationIndex);
  renderOnScreen(database[currentLocationIndex]);
}


// add saved lat and lng to add to list of places 
// add last updated 
// add color states for different conditions (could use canvas)