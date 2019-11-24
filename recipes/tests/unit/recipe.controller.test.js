const RecipeController = require("../../controllers/recipe.controller");
const RecipeModel = require("../../moldel/recipe.model");
const httpMocks = require("node-mocks-http");
const newRecipe = require("../mock-data/new-recipe.json");


//We mock the function to know if we are calling it
RecipeModel.create = jest.fn();

//We mock our data
let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe("RecipeController.createRecipe", () => {
    beforeEach(() => {
        req.body = newRecipe;
    })
    it("Should have a createRecipe function", () => {
        expect(typeof RecipeController.createRecipe).toBe("function");
    });
    it("Should call TodoMode.create", () => {
        //We don't test if mongoose works right we trust it does
        //we test that the code I write works 

        RecipeController.createRecipe(req, res, next);
        expect(RecipeModel.create).toBeCalledWith(newRecipe);
    });
    it("Should return 201 response code", () => {

        RecipeController.createRecipe(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("Should return the json body in the response", () => {
        RecipeModel.create.mockReturnValue(newRecipe);
        RecipeController.createRecipe(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newRecipe);
    });
});