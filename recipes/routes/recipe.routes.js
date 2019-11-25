const express = require("express");
const recipeController = require("../controllers/recipe.controller");
const router = express.Router();

router.post("/", recipeController.createRecipe);

module.exports = router;