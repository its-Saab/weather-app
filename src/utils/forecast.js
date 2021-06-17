//npm packages
const request = require("postman-request");

const forecast = (address, callback) => {
	const URL = `http://api.weatherstack.com/current?access_key=4c8506a0f9ec8fb4e34171d1acbc8c02&query= ${address}`;
	request(URL, (err, response, body) => {
		const { error, current } = JSON.parse(body);
		if (err) {
			callback("Unable to connect to location services!", undefined);
		} else if (error || !current) {
			callback(
				`Error code: ${error.code}, of type: ${error.type}. ${error.info}`,
				undefined
			);
		} else {
			callback(
				undefined,
				`${current.weather_descriptions}, It is currently + ${current.temperature} degress out. And feels like ${current.feelslike}.'`
			);
		}
	});
};

module.exports = forecast;
