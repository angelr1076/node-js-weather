const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/cf346afc48d479b7ca041bc65b8b6f5f/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.summary} It is currently ${Math.round(
          body.currently.temperature
        )} degrees outside. Chance of rain is ${body.currently
          .precipProbability}%.`,
        body.alerts ? body.alerts[0].title : "No alerts to report",
        body.currently.icon
      );
    }
  });
};

module.exports = forecast;
