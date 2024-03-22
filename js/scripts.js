
const url = 'https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=12.9889055&lng=77.574044';
let options = {
  method: 'GET',
  // qs: {lat: '40.712776', lng: '-74.005974'},
  headers: {
    'x-api-key': '190afb5964122524d01182ba581dfaba793d2b66700fc83124429d93264e8f46', 
    'Content-type': 'application/json'}
};

// const url = 'https://ambee-pollen-data1.p.rapidapi.com/latest/pollen/by-lat-lng?lat=20.59&lng=78.96';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '190afb5964122524d01182ba581dfaba793d2b66700fc83124429d93264e8f46',
// 		'X-RapidAPI-Host': 'ambee-pollen-data1.p.rapidapi.com'
// 	}
// };

fetch(url, options)

  .then((response) => response.json()) // Return it as JSON data
  .then((data) => { // Do stuff with the data

    console.log(data);
     
    let timeZone = document.getElementById('timezone');
    timeZone.innerHTML = data.data[0].timezone;
    })




    
// const url = 'https://ambee-pollen-data1.p.rapidapi.com/latest/pollen/by-lat-lng?lat=20.59&lng=78.96';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '190afb5964122524d01182ba581dfaba793d2b66700fc83124429d93264e8f46',
// 		'X-RapidAPI-Host': 'ambee-pollen-data1.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);


// } catch (error) {
// 	console.error(error);
// }

    
