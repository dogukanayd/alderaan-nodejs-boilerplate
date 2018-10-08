/*eslint-disable*/
const axios = require('axios');

const url = 'https://graph.facebook.com/v3.1/10217632434072897/likes?fields=id%2Cname%2Cfan_count%2Ccategory%2Cpicture&access_token=EAACX09djprYBAHVfX0MFHtICArh7IpUZAaxAxR74ZAXim1kni0nZCmq2Sjht2v9ncwbunMfU2GtMPNmVK5WKwyqnTs9KJZB3GW9pUljjiqmnjJIGexJT3zswjWsbdJglc4uyeyrULNv6Iv7nZB6yZBjyUmV2jccdUZD&limit=1000';

// var sayac = 0;
// function getData(url){
//   axios.get(url)
//   .then(function (response) {
//     // array dump
//     console.log(response.data.data);
//     while(response.data.paging.next){
//       sayac = sayac + 1;
//       console.log(sayac);
//     }
//   });
// }

const getPlanets = (url, planets) => {
  axios.get(url)
    .then(response => {
      const retrivedPlanets = planets.concat(response.data)
      if (response.data.paging.next !== null) {
        return getPlanets(response.data.next)
      } else {
        return resolve(retrivedPlanets)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
}

var asd = getPlanets(url)
console.log(asd)
// getData(url);


