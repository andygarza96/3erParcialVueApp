const express = require("express");
const recipeRoutes = require("./routes/recipe.routes");
const app = express();
const mongodb = require("./mongodb/mongodb.connect");

mongodb.connect();

app.use(express.json());

app.use("/recipes", recipeRoutes);

app.get("/", (req, res) => {
    res.json("Hello world!");
});


app.listen(3000, () => {
    console.log("Server is now running!");
});
module.exports = app;