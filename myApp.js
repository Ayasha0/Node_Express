let express = require("express");
let bodyParser = require("body-parser");
let app = express();

require("dotenv").config();

console.log("hello world");

app.use((req, res, next) => {
	console.log(req.method + " " + req.path + " - " + req.ip);
	next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.get(
	"/now",
	(req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.send({time: req.time});
	}
);

app.get("/:word/echo", (req, res) => {
	const {word} = req.params;
	res.json({
		echo: word,
	});
});

app.get("/name", function (req, res) {
	var firstName = req.query.first;
	var lastName = req.query.last;
	// OR you can destructure and rename the keys
	var {first: firstName, last: lastName} = req.query;
	// Use template literals to form a formatted string
	res.json({
		name: `${firstName} ${lastName}`,
	});
});

app.post("/name", (req, res) => {
	var string = req.body.first + " " + req.body.last;
	res.json({name: string});
});

app.get("/json", (req, res) => {
	res.json({
		message:
			process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json",
	});
});

module.exports = app;
