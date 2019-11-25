const RecipeController = require("../../controllers/recipe.controller");
const RecipeModel = require("../../model/recipe.model");
const httpMocks = require("node-mocks-http");
const newRecipe = require("../mock-data/new-recipe.json");
const allRecipes = require("../mock-data/all-recipes.json");

//We mock the function to know if we are calling it
RecipeModel.create = jest.fn();
RecipeModel.find = jest.fn();

//We mock our data
let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
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
});

describe("RecipeController.getRecipes", () => {

});
describe("RecipeController.createRecipe", () => {
    beforeEach(() => {
        req.body = newRecipe;
    })
    it("Should have a createRecipe function", () => {
        expect(typeof RecipeController.createRecipe).toBe("function");
    });
    it("Should call RecipeMode.create", () => {
        //We don't test if mongoose works right we trust it does
        //we test that the code I write works 

        RecipeController.createRecipe(req, res, next);
        expect(RecipeModel.create).toBeCalledWith(newRecipe);
    });
    it("Should return 201 response code", async () => {

        await RecipeController.createRecipe(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("Should return the json body in the response", async () => {
        RecipeModel.create.mockReturnValue(newRecipe);
        await RecipeController.createRecipe(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newRecipe);
    });
    it("should handle erros", async () => {
        const errorMessage = {
            message: "Describe property missing"
        };
        const rejectedPromise = Promise.reject(errorMessage);
        RecipeModel.create.mockReturnValue(rejectedPromise);
        await RecipeController.createRecipe(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});