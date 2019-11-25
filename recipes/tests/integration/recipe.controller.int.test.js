const request = require("supertest");
const app = require("../../app");
const newRecipe = require("../mock-data/new-recipe.json");

const endpointUrl = "/recipes/";

describe(endpointUrl, () => {
    test("GET " + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].description).toBeDefined();
        expect(response.body[0].category).toBeDefined();
        expect(response.body[0].image).toBeDefined();
        expect(response.body[0].ingredients).toBeDefined();
        expect(response.body[0].instructions).toBeDefined();
        expect(response.body[0].coments).toBeDefined();

    });
    it("POST" + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newRecipe);
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(newRecipe.name);
        expect(response.body.description).toBe(newRecipe.description);
        expect(response.body.category).toStrictEqual(newRecipe.category);
        expect(response.body.image).toBe(newRecipe.image);
        expect(response.body.ingredients).toStrictEqual(newRecipe.ingredients);
        expect(response.body.instructions).toStrictEqual(newRecipe.instructions);

    });
    it(
        "should return error 500 on malformed data with POST" + endpointUrl,
        async () => {
            const response = await request(app)
                .post(endpointUrl)
                .send({
                    title: "Missing description property"
                });
            expect(response.statusCode).toBe(500);
            expect(response.body).toStrictEqual({
                message: "Recipe validation failed: description: Path `description` is required."
            });
        }
    );
});