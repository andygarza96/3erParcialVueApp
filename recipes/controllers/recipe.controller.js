//this is the controller for everything that a is related to a recipe
const RecipeModel = require("../model/recipe.model");


/*Creates one recipe and catch if there is data missing ot data errors
and sends a message with the error back*/
exports.createRecipe = async (req, res, next) => {
    try {
        const createdModel = await RecipeModel.create(req.body);
        res.status(201).json(createdModel);
    } catch (err) {
        next(err);
    }
};

/*Gets all recipes and catch if there is an error 
and sends a message with the error back*/
exports.getRecipes = async (req, res, next) => {
    try {
        const allRecipes = await RecipeModel.find({});
        res.status(200).json(allRecipes);
    } catch (err) {
        next(err);
    }
};

/*Gets one recipe by Id and catch if is a non existing Id 
or if there is an error and sends a message with the error back*/
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

/*Updates one recipe by its Id, it handles error and non existing Ids
and sends a message with the error back.
With this controller we can also add the comments*/
exports.updateRecipe = async (req, res, next) => {
    try {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
            req.params.recipeId,
            req.body, {
                new: true,
                useFindAndModify: false
            }
        );
        if (updatedRecipe) {
            res.status(200).json(updatedRecipe);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};
/*this is to delete a recipe by its Id, it handles errors,
 catch non existing Ids and sends a message with the error back*/
exports.deleteRecipe = async (req, res, next) => {
    try {
        const deletedRecipe = await RecipeModel.findByIdAndDelete(req.params.recipeId);

        if (deletedRecipe) {
            res.status(200).json(deletedRecipe);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};