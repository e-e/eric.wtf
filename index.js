const express = require("express");
const app = express();

const config = require("./config");


const routes = {
	index: require("./src/routes/index"),
};


app.use("/", routes.index);

app.get("/radio-k", (req, res) => {
	res.send("something isn't working correctly!");
});

app.listen(config.port, () => console.log(`listening on http://localhost:${config.port}/`));