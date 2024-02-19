const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api/topics', () => {
    test('return array of object for the topics', () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
          const topics = body.topics;
          expect(topics.length).toEqual(3);   
          topics.forEach((topic) => {
             expect(typeof topic.description).toBe("string")
             expect(typeof topic.slug).toBe("string")
          });  
          
        });
    });
})