const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const endpointsData = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => db.end());


describe.only('/api/articles/:id', () => {
    test('should ', () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
         const body = response.body;
          body.article.forEach((articles) => {
            expect(typeof articles.article_id).toBe("number"),
            expect(typeof articles.title).toBe("string"),
            expect(typeof articles.author).toBe("string"),
            expect(typeof articles.body).toBe("string"),
            expect(typeof articles.created_at).toBe("string"),
            expect(typeof articles.votes).toBe("number")
          });
        });
    })
    
  })