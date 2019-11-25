const RecipeController = require("../../controllers/recipe.controller");
const RecipeModel = require("../../model/recipe.model");
const httpMocks = require("node-mocks-http");
const newRecipe = require("../mock-data/new-recipe.json");
const allRecipes = require("../mock-data/all-recipes.json");

RecipeModel.create = jest.fn();
RecipeModel.find = jest.fn();
RecipeModel.findById = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("RecipeController.getRecipeById", () => {
    it("should have a getRecipeById", () => {
        expect(typeof RecipeController.getRecipeById).toBe("function");
    });
    it("should call RecipeModel.findById with route parameters", async () => {
        req.params.recipeId = "5d5ecb5a6e598605f06cb945";
        await RecipeController.getRecipeById(req, res, next);
        expect(RecipeModel.findById).toBeCalledWith("5d5ecb5a6e598605f06cb945");
    });
    it("should return json body and response code 200", async () => {
        RecipeModel.findById.mockReturnValue(newRecipe);
        await RecipeController.getRecipeById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newRecipe);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("should do error handling", async () => {
        const errorMessage = {
            message: "error finding recipeModel"
        };
        const rejectedPromise = Promise.reject(errorMessage);
        RecipeModel.findById.mockReturnValue(rejectedPromise);
        await RecipeController.getRecipeById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe("RecipeController.getRecipes", () => {
    it("should have a getRecipes function", () => {
        expect(typeof RecipeController.getRecipes).toBe("function");
    });
    it("should call RecipeModel.find({})", async () => {
        await RecipeController.getRecipes(req, res, next);
        expect(RecipeModel.find).toHaveBeenCalledWith({});
    });
    it("should return response with status 200 and all recipes", async () => {
        RecipeModel.find.mockReturnValue(allRecipes);
        await RecipeController.getRecipes(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allRecipes);
    });
    it("should handle errors in getRecipes", async () => {
        const errorMessage = {
            message: "Error finding"
        };
        const rejectedPromise = Promise.reject(errorMessage);
        RecipeModel.find.mockReturnValue(rejectedPromise);
        await RecipeController.getRecipes(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it("should return 404 when item doesnt exist", async () => {
        RecipeModel.findById.mockReturnValue(null);
        await RecipeController.getRecipeById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});

describe("RecipeController.createRecipe", () => {
    beforeEach(() => {
        req.body = newRecipe;
    });

    it("should have a createRecipe function", () => {
        expect(typeof RecipeController.createRecipe).toBe("function");
    });
    it("should call RecipeModel.create", () => {
        RecipeController.createRecipe(req, res, next);
        expect(RecipeModel.create).toBeCalledWith(newRecipe);
    });
    it("should return 201 response code", async () => {
        await RecipeController.createRecipe(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("should return json body in response", async () => {
        RecipeModel.create.mockReturnValue(newRecipe);
        await RecipeController.createRecipe(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newRecipe);
    });
    it("should handle errors", async () => {
        const errorMessage = {
            message: "Done property missing"
        };
        const rejectedPromise = Promise.reject(errorMessage);
        RecipeModel.create.mockReturnValue(rejectedPromise);
        await RecipeController.createRecipe(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});