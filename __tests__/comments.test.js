const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");


beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api/article/:article_1/comments', () => {

    test('GET: 200 response should return with an array of objects with request of api/aricles/1/comments ', () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then((response) => {
         const comments = response.body.comments;
           expect(comments.length).toEqual(11);
           comments.forEach((comment) => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              article_id: expect.any(Number),
              });
           })
        });
    });

    test('GET: 404 response when given invalid article id for /api/:article_id/comments', () => {
      return request(app)
        .get("/api/articles/9999/comments")
        .expect(404).then((response) => {
          expect(response.body.msg).toBe('Not Found');
        }) 
    });

    test('POST:201 response with the correct object created', () => {
        const newComment = {
           username : "butter_bridge",
	         body : "random post.....",
           randomProp : "some value..."
        };
        return request(app)
          .post("/api/articles/1/comments")
          .send(newComment)
          .expect(201)
          .then((response) => {
            const comment = response._body.comment;
             expect(comment.body).toBe('random post.....')
             expect(comment.article_id).toBe(1)
             expect(comment.author).toBe("butter_bridge")
             expect(comment.unnecessaryProperty).toBeUndefined();
          });
          
      });


      test('POST: 400 response with the responds with bad request when no username is given', () => {
        const newComment = {
	         body : "random post....."
        };
        return request(app)
          .post("/api/articles/1/comments")
          .send(newComment)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
          }) 
      });


      test('POST: 400 response with the responds with an appropriate status and error message when the id is incorrect value type e.g string', () => {
        const newComment = {
          username : "butter_bridge",
	         body : "random post....."
        };
        return request(app)
          .post("/api/articles/wrong_id/comments")
          .send(newComment)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe('Bad request');
          }) 
      });

      test('POST: 400 response with the responds with an appropriate status and error message when the id is incorrect value e.g 0 or 9999', () => {
        const newComment = {
          username : "butter_bridge",
	         body : "random post....."
        };
        return request(app)
          .post("/api/articles/9999/comments")
          .send(newComment)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('Not found');
          }) 
      });

      test('POST: 404 response with non-existent author username', () => {
        const newComment = {
          username: "userdoesntexist",
          body: "random post....."     
        };
        return request(app)
          .post("/api/articles/1/comments") 
          .send(newComment)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('Not found');
          }) 
      });

      test('DELETE: 204 response with no content', () => {
        return request(app)
          .delete("/api/comments/18")
          .expect(204);
      });
 
      test('DELETE: 404 with correct status response given non-existent id', () => {
        return request(app)
          .delete("/api/comments/200")
          .expect(404).then((response) => {
            expect(response.body.msg).toBe("Comment not found");
          }) 
      });

      test('DELETE: 404 with correct status given the incorrect data type e.g string ', () => {
        return request(app)
          .delete("/api/comments/deleted_this_one")
          .expect(400).then((response) => {
            expect(response.body.msg).toBe("Bad request");
          }) 
      });
    

})