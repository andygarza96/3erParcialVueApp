const RecipeModel = require("../model/recipe.model");

exports.createRecipe = async (req, res, next) => {
    try {
        const createdModel = await RecipeModel.create(req.body);
        res.status(201).json(createdModel);
    } catch (err) {
        next(err);
    }
};

exports.getRecipes = async (req, res, next) => {
    try {
        const allRecipes = await RecipeModel.find({});
        res.status(200).json(allRecipes);
    } catch (err) {
        next(err);
    }
};

exports.getRecipeById = async (req, res, next) => {
    try {
        const recipeModel = await RecipeModel.findById(req.params.recipeId);
        if (recipeModel) {
            res.status(200).json(recipeModel);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};