

// Getting your lat and lng based on location saving to variable 
navigator.geolocation.getCurrentPosition((position) => {
  lat =(position.coords.latitude);
  lng = (position.coords.longitude);
  fetchData(lat, lng);
  // console.log(lat);
  // console.log(lng);
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
  function showData(data, pollutantName, containerId, pollutantClass){
    var pollutantCount = data.current[pollutantName];
    // need to finish this
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


    //PM2.5 Pollutant: Data, Pollutant Name, Container Id, Pollutant Class
    createPollutant (data, 'pm2_5', 'pm2_5_count', 'pm2_5');

    // let pm2_5 = data.current.pm2_5;
    // let pm2_5Unit = data.current_units.pm2_5;
    // console.log('pm2.5', pm2_5, pm2_5Unit);

    //Ozone: Data, Pollutant Name, Container Id, Pollutant Class
    createPollutant (data, 'ozone', 'ozone_count', 'ozone');

    // let ozone = data.current.ozone;
    // let ozoneUnit = data.current_units.ozone;
    // console.log('ozone', ozone, ozoneUnit);


    //Carbon Monoxide: Data, Pollutant Name, Container Id, Pollutant Class 
    createPollutant (data, 'carbon_monoxide', 'cm_count', 'cm');

    // let carbMon = data.current.carbon_monoxide;
    // let carbMonUnit = data.current_units.carbon_monoxide;
    // console.log('carbon monoxide', carbMon, carbMonUnit);

 
    //Nitrogen Dioxide: Data, Pollutant Name, Container Id, Pollutant Class 
    createPollutant (data, 'nitrogen_dioxide', 'nd_count', 'nd');

    // let nitroD = data.current.nitrogen_dioxide;
    // let nitroDUnit = data.current_units.nitrogen_dioxide;
    // console.log('nitrogen dioxide', nitroD, nitroDUnit);

    //Sulphur Dioxide:Data, Pollutant Name, Container Id, Pollutant Class  
    createPollutant (data, 'sulphur_dioxide', 'sd_count', 'sd');

    // let sulphD = data.current.sulphur_dioxide;
    // let sulphDUnit = data.current_units.sulphur_dioxide;
    // console.log('sulphur dioxide', sulphD, sulphDUnit);

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


	//Button add remove on scroll position
	const btnTop = document.querySelector(".top");

	window.addEventListener("scroll", () => {
		if (window.scrollY > 80) {
			btnTop.classList.add("active");
		} else {
			btnTop.classList.remove("active");
		}
	});

// lat and lng for other pages 
// if (!document.URL.includes("country.html")) {
//   lat = 40.014984;
//   lng = -105.270546;

//   // Call function to fetch air quality data
//   fetchData(lat, lng);
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