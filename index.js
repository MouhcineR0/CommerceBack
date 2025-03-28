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
	origin: process.env.NODE_ENV == 'development' ? '*' : false,
	credentials: true
}));

require("dotenv").config();

ConnectionDB();
// console.log(ma);

// here i should set our routes
app.get("/", (req, res) => {
	res.send("index");
})

const UsersRoutes = require("./Routes/UsersRoutes");
app.use("/api", UsersRoutes);


const PORT = process.env.PORT || 3065;

app.listen(PORT, () => {
	console.log(`running on port ${PORT}`);
})