const axios = require('axios');

const url = 'https://graph.facebook.com/v3.1/10217632434072897/likes?fields=id%2Cname%2Cfan_count%2Ccategory%2Cpicture&access_token=EAACX09djprYBAHVfX0MFHtICArh7IpUZAaxAxR74ZAXim1kni0nZCmq2Sjht2v9ncwbunMfU2GtMPNmVK5WKwyqnTs9KJZB3GW9pUljjiqmnjJIGexJT3zswjWsbdJglc4uyeyrULNv6Iv7nZB6yZBjyUmV2jccdUZD&limit=100';

/*eslint-disable*/

function getNextURLFacebook(url) {
  axios.get(url)
  .then(function (response) {
    console.log(response.data.paging.next);
    console.log('----------------');
  });
}

function getLikesFromFacebook(url){
  axios.get(url)
    .then(function (response) {
      console.log(response.data.data);
    });
}


main(url);