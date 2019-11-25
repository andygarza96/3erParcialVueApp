  const RecipeController = require("../../controllers/recipe.controller");
  const RecipeModel = require("../../model/recipe.model");
  const httpMocks = require("node-mocks-http");
  const newRecipe = require("../mock-data/new-recipe.json");
  const allRecipes = require("../mock-data/all-recipes.json");

  jest.mock("../../model/recipe.model");

  let req, res, next;
  const recipeId = "5d5ecb5a6e598605f06cb945";
  beforeEach(() => {
      req = httpMocks.createRequest();
      res = httpMocks.createResponse();
      next = jest.fn();
  });

  describe("RecipeController.deleteRecipe", () => {
      it("should have a deleteRecipe function", () => {
          expect(typeof RecipeController.deleteRecipe).toBe("function");
      });
      it("should call findByIdAndDelete", async () => {
          req.params.recipeId = recipeId;
          await RecipeController.deleteRecipe(req, res, next);
          expect(RecipeModel.findByIdAndDelete).toBeCalledWith(recipeId);
      });
      it("should return 200 OK and deleted recipemodel", async () => {
          RecipeModel.findByIdAndDelete.mockReturnValue(newRecipe);
          await RecipeController.deleteRecipe(req, res, next);
          expect(res.statusCode).toBe(200);
          expect(res._getJSONData()).toStrictEqual(newRecipe);
          expect(res._isEndCalled()).toBeTruthy();
      });
      it("should handle errors", async () => {
          const errorMessage = {
              message: "Error deleting"
          };
          const rejectedPromise = Promise.reject(errorMessage);
          RecipeModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
          await RecipeController.deleteRecipe(req, res, next);
          expect(next).toHaveBeenCalledWith(errorMessage);
      });
      it("should handle 404", async () => {
          RecipeModel.findByIdAndDelete.mockReturnValue(null);
          await RecipeController.deleteRecipe(req, res, next);
          expect(res.statusCode).toBe(404);
          expect(res._isEndCalled()).toBeTruthy();
      });
  });

  describe("RecipeController.updateRecipe", () => {
      it("should have a updateRecipe function", () => {
          expect(typeof RecipeController.updateRecipe).toBe("function");
      });
      it("should update with RecipeModel.findByIdAndUpdate", async () => {
          req.params.recipeId = recipeId;
          req.body = newRecipe;
          await RecipeController.updateRecipe(req, res, next);

          expect(RecipeModel.findByIdAndUpdate).toHaveBeenCalledWith(recipeId, newRecipe, {
              new: true,
              useFindAndModify: false
          });
      });
      it("should return a response with json data and http code 200", async () => {
          req.params.recipeId = recipeId;
          req.body = newRecipe;
          RecipeModel.findByIdAndUpdate.mockReturnValue(newRecipe);
          await RecipeController.updateRecipe(req, res, next);
          expect(res._isEndCalled()).toBeTruthy();
          expect(res.statusCode).toBe(200);
          expect(res._getJSONData()).toStrictEqual(newRecipe);
      });
      it("should handle errors", async () => {
          const errorMessage = {
              message: "Error"
          };
          const rejectedPromise = Promise.reject(errorMessage);
          RecipeModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
          await RecipeController.updateRecipe(req, res, next);
          expect(next).toHaveBeenCalledWith(errorMessage);
      });
  });

  describe("RecipeController.getRecipeById", () => {
      it("should have a getRecipeById", () => {
          expect(typeof RecipeController.getRecipeById).toBe("function");
      });
      it("should call RecipeModel.findById with route parameters", async () => {
          req.params.recipeId = recipeId;
          await RecipeController.getRecipeById(req, res, next);
          expect(RecipeModel.findById).toBeCalledWith(recipeId);
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
      it("should handle 404", async () => {
          RecipeModel.findByIdAndUpdate.mockReturnValue(null);
          await RecipeController.updateRecipe(req, res, next);
          expect(res.statusCode).toBe(404);
          expect(res._isEndCalled()).toBeTruthy();
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