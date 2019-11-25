const RecipeModel = require("../model/recipe.model");


exports.createRecipe = async (req, res, next) => {
    const createdModel = await RecipeModel.create(req.body);
    res.status(201).json(createdModel);
};