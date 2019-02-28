const request = require('request');

var geocodeAddress = (address, callback) => {
  //var encodedAddress = encodeURIComponent(address);

  request({
    url: `http://api.openweathermap.org/data/2.5/weather?q=${address}&appid=c272dec0896663f3441bb18a6ca55728`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect openweathermap servers.');
    } else if (body.cod === '404') {
      callback('Unable to find city.');
    } else if (body.cod === 200) {
      callback(undefined, {
        address: body.name,
        latitude: body.coord.lat,
        longitude: body.coord.lon
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
