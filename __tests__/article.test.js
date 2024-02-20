const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/articles", () => {

  test("GET: 200 response should return with an object with request of api/aricles/:id ", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const body = response.body.article;
        expect(body).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  test("GET: 200  response should return with an array of objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articles = response._body.articles;
        expect(articles.length).toEqual(13);
        articles.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
          });
        });
      });
  });

  test("GET: 400 response when given invalid article id for /api/:article_id", () => {
    return request(app)
      .get("/api/articles/hello")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });

  test("GET: 404 response when given non-existent id for /api/:article_id", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });

  test("PATCH: 200 response should return with an array of objects", () => {
    const votes = {
      inc_votes: 10,
    };
    return request(app)
      .patch("/api/articles/1")
      .send(votes)
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        expect(article[0].votes).toEqual(110);
      });
  });

  test("PATCH: 200 response should return with an array of objects", () => {
    const votes = {
      inc_votes: 10,
    };
    return request(app)
      .patch("/api/articles/2")
      .send(votes)
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        expect(article[0].votes).toEqual(10);
      });
  });

  test("PATCH: 400 response when given the incorrect data type", () => {
    const votes = {
      inc_votes: "increased by 10",
    };
    return request(app)
      .patch("/api/articles/1")
      .send(votes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad request");
      });
  });

  test("PATCH: 404 response when given given non-existent id for /api/:article_id", () => {
    const votes = {
      inc_votes: 10,
    };
    return request(app)
      .patch("/api/articles/9999")
      .send(votes)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });

  


});
