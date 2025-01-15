const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

app.use(helmet());
app.use(cors({
	// instead of setting backend url we just working now with every dns 
	origin : '*',
	credentials : true
}));

require("dotenv").config();

// here i should set our routes
const UsersRoutes = require("./Routes/UsersRoutes");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`running on port ${PORT}`);
})