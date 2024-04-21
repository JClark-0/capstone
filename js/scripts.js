

// ------- Latitude & Longitude ------- 
document.addEventListener('DOMContentLoaded', () => {

  navigator.geolocation.getCurrentPosition((position) => {
    lat =(position.coords.latitude);
    lng = (position.coords.longitude);
    fetchData(lat, lng); 
    // showLocation (lat, lng);
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



// ------- Create lat lng Database -------
let database = [];

// --- JSON Lat & Lng through API pushed to database ---
function fetchAndSave(lat,lng){

  let urlPollen = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,ammonia&hourly=us_aqi,us_aqi_pm2_5,us_aqi_pm10,us_aqi_nitrogen_dioxide,us_aqi_carbon_monoxide,us_aqi_ozone,us_aqi_sulphur_dioxide&timezone=auto&past_hours=1&forecast_days=1&forecast_hours=1`;
  fetch(urlPollen)
  .then((response) => response.json())
  .then((data) => { 
    data.realLatitude = lat;
    data.realLongitude = lng;
    database.push(data)
  })
}

// --- Location added to database ready to render ---
function fetchData(lat,lng) {
  let urlPollen = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,ammonia&hourly=us_aqi,us_aqi_pm2_5,us_aqi_pm10,us_aqi_nitrogen_dioxide,us_aqi_carbon_monoxide,us_aqi_ozone,us_aqi_sulphur_dioxide&timezone=auto&past_hours=1&forecast_days=1&forecast_hours=1`;
  fetch(urlPollen)
  .then((response) => response.json())
  .then((data) => {
    data.realLatitude = lat;
    data.realLongitude = lng;
    database.splice(0, 0, data);
    renderOnScreen(database[0]);
    console.log(database);
    
  })
  .catch((error) => {
    console.error('Error', error);
  });
}

// ------- Show Location Name ------- 
const showLocation = (lat, lng) => {
  const options = { method: 'GET', headers: { accept: 'application/json' } };
  fetch(`https://us1.locationiq.com/v1/reverse?lat=${lat}&lon=${lng}&format=json&key=pk.83485c19ebc3983a826192780bdd4e9c`, options)
    .then(response => response.json())
    .then(response => { 
      console.log(response);
      let locationName = document.getElementById('locationId');
        if (response.address.country.includes('United States of America')) {
          locationName.innerHTML = response.address.city + ', ' + response.address.state;
          // +', ' + 'USA'
          } else  {
          locationName.innerHTML = response.address.city + ', ' + response.address.country;
        }
    })
    .catch(err => console.error(err));
};

// ------- Render data on page -------
function renderOnScreen(data){
  console.log(data);
  // Clear Pollutant circles 
  document.querySelectorAll('.pollutants').forEach(box => {
    box.innerHTML = ''; 
  });

  // Changes value on variable 
  document.documentElement.style.setProperty('--on_load', 100);

   // Show location based on Lat & Long (linked to API)
  showLocation (data.realLatitude, data.realLongitude);

  // let timeZone = document.getElementById('timezone');
  // let formattedTimezone = data.timezone.replace(/_/g, ' ').replace(/[\/]/g, ', ');
  // timeZone.innerHTML = formattedTimezone;


  // ------- Calling Pollutant Functions ------- 
  
  //PM2.5: 
  createPollutant (data, 'pm2_5', 'pm2_5_count', 'pm2_5');
  showData (data, 'pm2_5', 'pm2_5_data' ,'pm2_5UnitId');
  scrollPollutant('pm2_5_count', 'pm2_5box');
  //PM10:
  createPollutant (data, 'pm10', 'pm10_count', 'pm10');
  showData (data, 'pm10', 'pm10_data' ,'pm10UnitId');
  scrollPollutant('pm10_count', 'pm10box');
  //Ozone: 
  createPollutant (data, 'ozone', 'ozone_count', 'ozone');
  showData (data, 'ozone', 'ozone_data','ozoneUnitId');
  scrollPollutant('ozone_count', 'ozonebox');
  //Carbon Monoxide:
  createPollutant (data, 'carbon_monoxide', 'cm_count', 'cm');
  showData (data, 'carbon_monoxide', 'cm_data','cmUnitId');
  scrollPollutant('cm_count', 'cmbox');
  //Nitrogen Dioxide: 
  createPollutant (data, 'nitrogen_dioxide', 'nd_count', 'nd');
  showData (data, 'nitrogen_dioxide', 'nd_data', 'ndUnitId');
  scrollPollutant('nd_count', 'ndbox');
  //Sulphur Dioxide:
  createPollutant (data, 'sulphur_dioxide', 'sd_count', 'sd');
  showData (data, 'sulphur_dioxide', 'sd_data','sdUnitId');
  scrollPollutant('sd_count', 'sdbox');

  // ------- USA AQI ------- 
  let aqi = data.current.us_aqi;
  let aqi_num = document.getElementById('aqi');
  aqi_num.innerHTML = aqi +' AQI';
  // console.log('USA AQI', aqi);

  let conditionText = '';
  if (aqi <= 50){
    conditionText = 'Good';
    adviceText = 'It’s a great day to be active outside.';

    // document.documentElement.style.setProperty('--pm2_5', '#9CE73D')
    document.documentElement.style.setProperty('--pm2_5', 'blue')
    document.documentElement.style.setProperty('--pm10', '#9CE73A')
    document.documentElement.style.setProperty('--ozone', '#B0F35C')
    document.documentElement.style.setProperty('--cm', '#CAF98D')
    document.documentElement.style.setProperty('--sd', '#93D77B')
    document.documentElement.style.setProperty('--nd', '#51A733')

  } else if ( aqi >= 51 && aqi <= 100) {
    conditionText = 'Moderate';
    adviceText = 'It’s good day to be active outside. Sensitive individuals may experience increased symptoms.';
    document.documentElement.style.setProperty('--pm2_5', '#187D40')
    document.documentElement.style.setProperty('--pm10', '#187D42')
    document.documentElement.style.setProperty('--ozone', '#1CB659')
    document.documentElement.style.setProperty('--cm', '#53D5C5')
    document.documentElement.style.setProperty('--sd', '#63EC9A')
    document.documentElement.style.setProperty('--nd', '#9DE6F6')

  } else if (aqi >= 101 && aqi <= 150) {
    conditionText = 'Unhealthy(senstive groups)';
    adviceText = 'It’s an ok day to be active outside today. Sensitive individuals should limit prolonged outdoor activities';
  } else if (aqi >= 151 && aqi <= 200) {
    conditionText = 'Unhealthy';
    adviceText = 'Everyone should limit prolonged outdoor activities today.';
  } else if (aqi >= 201 && aqi <= 300) {
    conditionText = 'Very Unhealthy';
    adviceText = 'Everyone should consider moving activities indoors today.';
  } else if (aqi >= 301 && aqi <= 500) {
    conditionText = 'Hazardous';
    adviceText = 'Everyone should avoid all physical activity outdoors today.';
  }
  document.getElementById('condition').textContent = conditionText;
  document.getElementById('aqi_advice').textContent = adviceText
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

// ------- Location Control ------- 
const nextLocation = document.getElementById('nxt_btn');
const currentLocation = document.getElementById('loc_btn');
let currentLocationIndex = 0;

nextLocation.onclick = () => {
  if (currentLocationIndex < database.length-1){
    currentLocationIndex++;
    currentLocation.classList.remove("control_btn_active");
  } else {
    currentLocationIndex = 0;
    nextLocation.classList.remove("control_btn_active");
    currentLocation.classList.add("control_btn_active");
  }
  console.log(currentLocationIndex);
  renderOnScreen(database[currentLocationIndex]);
}

currentLocation.onclick = () => {
  currentLocationIndex = 0;
  renderOnScreen(database[currentLocationIndex]);
  currentLocation.classList.add("control_btn_active");
  nextLocation.classList.remove("control_btn_active");
}

// ------- Advice Control ------- 
const minimizeButton = document.getElementById('minimize_button');
const expandButton = document.getElementById('expand_button');
const aqiDetails = document.querySelector('.aqi_details');

minimizeButton.addEventListener('click', () => {
    aqiDetails.classList.add('minimized');
    aqiDetails.classList.remove('expanded');
  });

expandButton.addEventListener('click', () => {
  aqiDetails.classList.remove('minimized');
  aqiDetails.classList.add('expanded');

});


// ------- Scroll to pollution info on click ------- 
const scrollPollutant = (pollutantId, infoBoxId) => {
  var targetBox = document.getElementById(infoBoxId);
  var listItem = document.getElementById(pollutantId);
  
    listItem.addEventListener('click', function(){
      console.log('clicked');
      targetBox.scrollIntoView({ behavior: 'smooth' });

      targetBox.classList.add('box_highlight');
      setTimeout(function() {
        targetBox.classList.remove('box_highlight');
      }, 1000);
    });
}


// add saved lat and lng to add to list of places 
// add last updated 
// add color states for different conditions (could use canvas)