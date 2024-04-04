

// Getting your lat and lng based on location
navigator.geolocation.getCurrentPosition((position) => {
  let lat =(position.coords.latitude);
  let lng = (position.coords.longitude);

  // console.log(lat);
  // console.log(lng);

  // let urlWind 'https://api.ambeedata.com/weather/latest/by-lat-lng?lat=12&lng=77';
  // let url = 'https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=110.9889055&lng=50.574044';
  // let urlPollen = `https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lat}&lng=${lng}`;
  // let options = {
  //   method: 'GET',
  //   headers: {
  //     'x-api-key': '190afb5964122524d01182ba581dfaba793d2b66700fc83124429d93264e8f46', 
  //     'Content-type': 'application/json'
  //   }
  // };

  // let urlPollen = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=european_aqi,us_aqi,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&domains=cams_global`;

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

    if (aqi < 50){
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
    




//     //Grass Pollen
//     let grassPollen = document.getElementById('grass_pollen');
//     grassPollen.innerHTML = data.data[0].Count.grass_pollen;

//     let grassSpores = data.data[0].Count.grass_pollen;
//     let grassCount = document.getElementById('grass_count');

//     for (let i = 0; i < grassSpores; i++) {
//       let circle = document.createElement('div');
//       circle.classList.add('spore', 'grass');
//       grassCount.appendChild(circle);
//     }

//     //Tree Pollen
//     let treePollen = document.getElementById('tree_pollen');
//     treePollen.innerHTML = data.data[0].Count.tree_pollen;

//     let treeSpores = data.data[0].Count.tree_pollen;
//     let treeCount = document.getElementById('tree_count');

//     for (let i = 0; i < treeSpores; i++) {
//       let circle = document.createElement('div');
//       circle.classList.add('spore', 'tree');
//       // circle.style.left = Math.random() * window.innerWidth + 'px';
//       // circle.style.top = Math.random() * window.innerHeight + 'px';

//       // let directionX = Math.random(); 
//       // let directionY = Math.random(); 

//       circle.style.animation = `moveSpore ${Math.random() * 10 + 10}s linear infinite`;
//       // circle.style.animationDirection = directionX === 1 ? 'normal' : 'reverse';
//       treeCount.appendChild(circle);
//     }

//     //Weed Pollen
//     let weedPollen = document.getElementById('weed_pollen');
//     weedPollen.innerHTML = data.data[0].Count.weed_pollen;

//     let weedSpores = data.data[0].Count.weed_pollen;
//     let weedCount = document.getElementById('weed_count');

//     for (let i = 0; i < weedSpores; i++) {
//       let circle = document.createElement('div');
//       circle.classList.add('spore', 'weed');
//       weedCount.appendChild(circle);
//     }


//     //Allergy Risk
//     let grassRisk = document.getElementById('grass_risk');
//     grassRisk.innerHTML = data.data[0].Risk.grass_pollen;

//     let treeRisk = document.getElementById('tree_risk');
//     treeRisk.innerHTML = data.data[0].Risk.tree_pollen;

//     let weedRisk = document.getElementById('weed_risk');
//     weedRisk.innerHTML = data.data[0].Risk.weed_pollen;

  })

});




