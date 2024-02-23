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

    test('GET:200 return an object of the correct user for the username ', () => {
        return request(app)
            .get("/api/users/rogersop")
            .expect(200)
            .then((response) => {
              const users = response.body.user;            
                expect(users.username).toBe("rogersop")
                expect(users.name).toBe("paul")
                expect(users.avatar_url).toBe("https://avatars2.githubusercontent.com/u/24394918?s=400&v=4")                  
            })
    });

    test('GET:404 return response when given invalid username for /api/users/:username ', () => {
        return request(app)
               .get("/api/users/wrongusername")
               .expect(404)
               .then((response) => {
                console.log(response);
                expect(response.body.msg).toBe("Not found")
         })
    });

    
})
