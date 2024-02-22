const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");


beforeEach(() => seed(testData));
afterAll(() => db.end());


describe.only('/api/users', () => { 
    test('GET:200 return an array of objects of users', () => {
        return request(app)
               .get("/api/users")
               .expect(200)
               .then((response) => {
                const users = response.body.users;
                users.forEach((user) => {
                    expect(user).toMatchObject({
                      username: expect.any(String),
                      name: expect.any(String),
                      avatar_url: expect.any(String)
  
                });
             })
        });    
    });

})
