const path = require("path");

const express = require("express");
const app = express();

const config = require("./config");


const routes = {
	index: require("./routes/index"),
};

app.use("/static", express.static(path.resolve("./static")));
app.use("/", routes.index);


app.listen(config.port, () => console.log(`listening on http://localhost:${config.port}/`));