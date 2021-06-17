console.log("js client side ");

const query = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const debounce = (func, timeToWait, immediate) => {
	let timeout;

	return function (...args) {
		const later = () => {
			timeout = null;
			func(...args);
		};

		let callNow = immediate && !timeout;

		clearTimeout(timeout);
		timeout = setTimeout(later, timeToWait);

		if (callNow) later();
	};
};

const renderData = (data, element) => {
	element.textContent = data;
};
const fetchWeather = (address) => {
	renderData("Loading...", messageOne);
	fetch(`http://localhost:3000/weather?address=${address}`)
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				return renderData(data.error, messageOne);
			}
			renderData(data.forecast, messageOne);
			renderData(data.location, messageTwo);
		});
};

query.addEventListener(
	"input",
	debounce(
		function ({ target }) {
			if (target.value.length === 0) {
				messageOne.textContent = "";
				messageTwo.textContent = "";
			} else {
				fetchWeather(target.value);
			}
		},
		500,
		false
	)
);


