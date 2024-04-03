

// Getting your lat and lng based on location
navigator.geolocation.getCurrentPosition((position) => {
  let lat =(position.coords.latitude);
  let lng = (position.coords.longitude);

  // console.log(lat);
  // console.log(lng);

  // let urlWind 'https://api.ambeedata.com/weather/latest/by-lat-lng?lat=12&lng=77';
  // let url = 'https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=110.9889055&lng=50.574044';
  let urlPollen = `https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lat}&lng=${lng}`;
  let options = {
    method: 'GET',
    headers: {
      'x-api-key': '190afb5964122524d01182ba581dfaba793d2b66700fc83124429d93264e8f46', 
      'Content-type': 'application/json'
    }
  };

  
  fetch(urlPollen, options)
  .then((response) => response.json()) // Return it as JSON data
  .then((data) => { // Lets do stuff with the data now
     
    // Just to see what is going on
    console.log(data); 

    // Location
    let timeZone = document.getElementById('timezone');
    let formattedTimezone = data.data[0].timezone.replace(/_/g, ' ').replace(/[\/]/g, ', ');
    timeZone.innerHTML = formattedTimezone;

    //Grass Pollen
    let grassPollen = document.getElementById('grass_pollen');
    grassPollen.innerHTML = data.data[0].Count.grass_pollen;

    let grassSpores = data.data[0].Count.grass_pollen;
    let grassCount = document.getElementById('grass_count');

    for (let i = 0; i < grassSpores; i++) {
      let circle = document.createElement('div');
      circle.classList.add('spore', 'grass');
      grassCount.appendChild(circle);
    }

    //Tree Pollen
    let treePollen = document.getElementById('tree_pollen');
    treePollen.innerHTML = data.data[0].Count.tree_pollen;

    let treeSpores = data.data[0].Count.tree_pollen;
    let treeCount = document.getElementById('tree_count');

    for (let i = 0; i < treeSpores; i++) {
      let circle = document.createElement('div');
      circle.classList.add('spore', 'tree');
      // circle.style.left = Math.random() * window.innerWidth + 'px';
      // circle.style.top = Math.random() * window.innerHeight + 'px';

      // let directionX = Math.random(); 
      // let directionY = Math.random(); 

      circle.style.animation = `moveSpore ${Math.random() * 10 + 10}s linear infinite`;
      // circle.style.animationDirection = directionX === 1 ? 'normal' : 'reverse';
      treeCount.appendChild(circle);
    }

    //Weed Pollen
    let weedPollen = document.getElementById('weed_pollen');
    weedPollen.innerHTML = data.data[0].Count.weed_pollen;

    let weedSpores = data.data[0].Count.weed_pollen;
    let weedCount = document.getElementById('weed_count');

    for (let i = 0; i < weedSpores; i++) {
      let circle = document.createElement('div');
      circle.classList.add('spore', 'weed');
      weedCount.appendChild(circle);
    }


    //Allergy Risk
    let grassRisk = document.getElementById('grass_risk');
    grassRisk.innerHTML = data.data[0].Risk.grass_pollen;

    let treeRisk = document.getElementById('tree_risk');
    treeRisk.innerHTML = data.data[0].Risk.tree_pollen;

    let weedRisk = document.getElementById('weed_risk');
    weedRisk.innerHTML = data.data[0].Risk.weed_pollen;

  })
    
});



