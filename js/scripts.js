


const url = 'https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=12.9889055&lng=77.574044';
let options = {
  method: 'GET',
  headers: {
    'x-api-key': '190afb5964122524d01182ba581dfaba793d2b66700fc83124429d93264e8f46', 
    'Content-type': 'application/json'}
};

fetch(url, options)

  .then((response) => response.json()) // Return it as JSON data
  .then((data) => { // Do stuff with the data

    console.log(data);
     
    let timeZone = document.getElementById('timezone');
    timeZone.innerHTML = data.data[0].timezone;
    })


    
