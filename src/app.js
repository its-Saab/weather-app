//npm packages:
const express = require("express");
const path = require("path");
const hbs = require("hbs");
//project files
const geoLocation = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

//Setup routes
app.get("", (req, res) => {
	res.render("index", {
		message: "Weather Forecast",
		name: "its-Saab",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		message: "About page",
		name: "it's Saab",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		message: "Help page",
		name: "its Saab",
	});
});

app.get("/weather", (req, res) => {
	const location = req.query.address;
	if (!location) {
		return res.send({
			error: "Please provide a location",
		});
	}

	geoLocation(location, (error, data) => {
		if (!location) {
			return res.send({ error: "Please provide a location" });
		}
		if (error) {
			return res.send({ error: "error connecting to the server" });
		}

		forecast(data.location, (err, body) => {
			if (err) {
				return res.send({ error: "error connecting to the server" });
			}
			res.send({
				forecast: body,
				location: data.location,
				address: req.query.address,
			});
		});
	});
});

//Error handler
app.get("/help/*", (req, res) => {
	res.render("404", {
		message: "Help article was not found",
		name: "its Saab",
		message: "404",
	});
});
app.get("*", (req, res) => {
	res.render("404", {
		message: "Page not found",
		name: "its Saab",
		message: "404",
	});
});
app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
