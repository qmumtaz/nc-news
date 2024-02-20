const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");


beforeEach(() => seed(testData));
afterAll(() => db.end());


describe.only('/api/articles', () => {

    test('GET: 200 response should return with an object with request of api/aricles/:id ', () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
         const body = response.body.article;
          expect(body).toEqual({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: '2020-07-09T20:11:00.000Z',
                votes: 100,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
          })
        });
    });


    test('GET: 200  response should return with an array of objects', () => {
      return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
         const articles = response._body.articles;
         articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
         })
      })
    });
    

    test('GET: 404 response with not found', () => {
      return request(app)
        .get("/api/hello")
        .expect(404).then((response) => {
          expect(response.statusCode).toBe(404);
        }) 
    })






    test('GET: 400 response when given invalid article id for /api/:article_id', () => {
      return request(app)
        .get("/api/articles/hello")
        .expect(400).then((response) => {
          expect(response.body.msg).toBe('Bad request');
        }) 
    })
    
    
  });