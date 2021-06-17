//npm packages
const request = require("postman-request");

const geoLocation = (address, callback) => {
	const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaXRzLXNhYWIiLCJhIjoiY2tteHh3am92MHRwbDJ2bjF1aDRrczBuOSJ9.48YeoRYiitaPPNDNvQY4Cg&limit=1`;

	request(URL, (error, response, body) => {
		const {features} = JSON.parse(body);
		if (error) {
			callback("Unable to connect to geo location server", undefined);
		} else if (features.length === 0) {
			callback(
				"Couldn't find a match for the provided location, please check the location and try again",
				undefined
			);
		} else {
			callback(undefined, {
				latitude: features[0].center[1],
				longitude: features[0].center[0],
				location: features[0].place_name,
			});
		}
	});
};

module.exports = geoLocation;
