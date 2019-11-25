const express = require("express");
const recipeRoutes = require("./routes/recipe.routes");
const app = express();
const mongoose = require('mongoose');

// ============
// Database configuration
// ============
// Compatibility of MongoDB >=3.6 with Mongoose < v5.0.0
mongoose.plugin(schema => {
    schema.options.usePushEach = true
});

// Native promises in Mongoose
mongoose.Promise = Promise;

// Connect
mongoose.connect('mongodb://localhost:27017/recipesApp', {
    useNewUrlParser: true
});

mongoose.connection.on("open", function () {
    // console.log("MongoDB connection opened");
});


app.use(express.json());

app.use("/recipes", recipeRoutes);

app.get("/", (req, res) => {
    res.json("Hello world!");
});


// app.listen(3000, () => {
//     console.log("Server is now running!");
// });
module.exports = app;