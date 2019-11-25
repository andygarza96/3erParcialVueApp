const express = require("express");
const recipeController = require("../controllers/recipe.controller");
const router = express.Router();

router.post("/", recipeController.createRecipe);
router.get("/", recipeController.getRecipes);
router.get("/:recipeId", recipeController.getRecipeById);

module.exports = router;