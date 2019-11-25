//these are the routes for everything related to a recipe 
const express = require("express");
const recipeController = require("../controllers/recipe.controller");
const router = express.Router();

router.post("/", recipeController.createRecipe);
router.get("/", recipeController.getRecipes);
router.get("/:recipeId", recipeController.getRecipeById);
router.put("/:recipeId", recipeController.updateRecipe);
router.delete("/:recipeId", recipeController.deleteRecipe);

module.exports = router;