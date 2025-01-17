const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const BodyParser = require("body-parser");

const ConnectionDB = require("./database/Connection");

app.use(helmet());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors({
	// instead of setting backend url we just working now with every dns 
	origin: '*',
	credentials: true
}));

require("dotenv").config();
// const country = require("./json/country.json");

// const ma = country.find((ele,ind) => 
// {
// 	return ele.name == "Morocco";
// })
ConnectionDB();
// console.log(ma);

// here i should set our routes
const UsersRoutes = require("./Routes/UsersRoutes");
app.use("/api", UsersRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`running on port ${PORT}`);
})