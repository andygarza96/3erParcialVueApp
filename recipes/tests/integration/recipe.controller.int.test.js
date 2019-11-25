const request = require("supertest");
const app = require("../../app");
const newRecipe = require("../mock-data/new-recipe.json");

const endpointURL = "/recipes/";

describe(endpointURL, () => {
    it("POST" + endpointURL, async () => {
        const response = await request(app)
            .post(endpointURL)
            .send(newRecipe);
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(newRecipe.name);
        expect(response.body.description).toBe(newRecipe.description);
        expect(response.body.category).toStrictEqual(newRecipe.category);
        expect(response.body.image).toBe(newRecipe.image);
        expect(response.body.ingredients).toStrictEqual(newRecipe.ingredients);
        expect(response.body.instructions).toStrictEqual(newRecipe.instructions);

    });
});