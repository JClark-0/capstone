

// Getting your lat and lng based on location
navigator.geolocation.getCurrentPosition((position) => {
  let lat =(position.coords.latitude);
  let lng = (position.coords.longitude);

  // console.log(lat);
  // console.log(lng);

  // let url = 'https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=12.9889055&lng=77.574044';
  let url = `https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lat}&lng=${lng}`;
  let options = {
    method: 'GET',
    headers: {
      'x-api-key': '190afb5964122524d01182ba581dfaba793d2b66700fc83124429d93264e8f46', 
      'Content-type': 'application/json'
    }
  };

  
  fetch(url, options)
  .then((response) => response.json()) // Return it as JSON data
  .then((data) => { // Lets do stuff with the data now
     
    // Just to see what is going on
    console.log(data); 

    // Location
    let timeZone = document.getElementById('timezone');
    let formattedTimezone = data.data[0].timezone.replace(/_/g, ' ').replace(/[\/]/g, '<br>');
    timeZone.innerHTML = formattedTimezone;

    //Pollen count
    let grassPollen = document.getElementById('grass_pollen');
    grassPollen.innerHTML = data.data[0].Count.grass_pollen;

    let treePollen = document.getElementById('tree_pollen');
    treePollen.innerHTML = data.data[0].Count.tree_pollen;

    let weedPollen = document.getElementById('weed_pollen');
    weedPollen.innerHTML = data.data[0].Count.weed_pollen;

    //Allergy Risk
    let grassRisk = document.getElementById('grass_risk');
    grassRisk.innerHTML = data.data[0].Risk.grass_pollen;

    let treeRisk = document.getElementById('tree_risk');
    treeRisk.innerHTML = data.data[0].Risk.tree_pollen;

    let weedRisk = document.getElementById('weed_risk');
    weedRisk.innerHTML = data.data[0].Risk.weed_pollen;

  })
    
});



