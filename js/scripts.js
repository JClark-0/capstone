

// Getting your lat and lng based on location
navigator.geolocation.getCurrentPosition((position) => {

  let lat =(position.coords.latitude);
  let lng = (position.coords.longitude);

  console.log(lat);
  console.log(lng);

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
     
    let timeZone = document.getElementById('timezone');
    timeZone.innerHTML = data.data[0].timezone;
    console.log(data); // Just to see what is goign on
  })
    
});



