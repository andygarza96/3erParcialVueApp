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
    it("POST " + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newRecipe);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newRecipe.title);
        expect(response.body.done).toBe(newRecipe.done);
    });
    it(
        "should return error 500 on malformed data with POST" + endpointUrl,
        async () => {
            const response = await request(app)
                .post(endpointUrl)
                .send({
                    title: "Missing done property"
                });
            expect(response.statusCode).toBe(500);
            expect(response.body).toStrictEqual({
                message: "Recipe validation failed: description: Path `description` is required."
            });
        }
    );
});