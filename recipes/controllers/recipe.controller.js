const RecipeModel = require("../moldel/recipe.model");


exports.createRecipe = (req, res, next) => {
    const createdModel = RecipeModel.create(req.body);
    res.status(201).json(createdModel);
};