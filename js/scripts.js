





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
  const showData = (data, pollutantName, containerId) =>{
    
    let pollutantData = document.getElementById(containerId);
    pollutantData.innerHTML = data.current[pollutantName] + " " + data.current_units[pollutantName];
  };

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

    // createPollutant function: Data, Pollutant Name, Container Id, Pollutant Class
    // showData function: Data, Pollutant Name, Container Id

    //PM2.5: Create Pollutant + Show Data with units
    createPollutant (data, 'pm2_5', 'pm2_5_count', 'pm2_5');
    showData (data, 'pm2_5', 'pm2_5_data');

    //Ozone: Create Pollutant + Show Data with units
    createPollutant (data, 'ozone', 'ozone_count', 'ozone');
    showData (data, 'ozone', 'ozone_data');

    //Carbon Monoxide: Create Pollutant + Show Data with units
    createPollutant (data, 'carbon_monoxide', 'cm_count', 'cm');
    showData (data, 'carbon_monoxide', 'cm_data');

    //Nitrogen Dioxide: Data, Pollutant Name, Container Id, Pollutant Class 
    createPollutant (data, 'nitrogen_dioxide', 'nd_count', 'nd');
    showData (data, 'nitrogen_dioxide', 'nd_data');

    //Sulphur Dioxide:Data, Pollutant Name, Container Id, Pollutant Class  
    createPollutant (data, 'sulphur_dioxide', 'sd_count', 'sd');
    showData (data, 'sulphur_dioxide', 'sd_data');

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
      const predeterminedLat = 40.014984; // Example latitude
      const predeterminedLng = -105.270546; // Example longitude
      fetchData(predeterminedLat, predeterminedLng);
    });
  });


  //     fetch('json/data.json')
	// .then(response => response.json())
	// .then(data => {
	// 	console.log(data)
	// })


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