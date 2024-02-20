const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");


beforeEach(() => seed(testData));
afterAll(() => db.end());


describe('/api/articles', () => {
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
         expect(articles.length).toEqual(13);
         expect(articles).toMatchObject([
          {
            author: 'icellusedkars',
            title: 'Eight pug gifs that remind me of mitch',
            article_id: 3,
            topic: 'mitch',
            created_at: '2020-11-03T09:12:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '2'
          },
          {
            author: 'icellusedkars',
            title: 'A',
            article_id: 6,
            topic: 'mitch',
            created_at: '2020-10-18T01:00:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '1'
          },
          {
            author: 'icellusedkars',
            title: 'Sony Vaio; or, The Laptop',
            article_id: 2,
            topic: 'mitch',
            created_at: '2020-10-16T05:03:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '0'
          },
          {
            author: 'butter_bridge',
            title: 'Moustache',
            article_id: 12,
            topic: 'mitch',
            created_at: '2020-10-11T11:24:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '0'
          },
          {
            author: 'butter_bridge',
            title: 'Another article about Mitch',
            article_id: 13,
            topic: 'mitch',
            created_at: '2020-10-11T11:24:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '0'
          },
          {
            author: 'rogersop',
            title: 'UNCOVERED: catspiracy to bring down democracy',
            article_id: 5,
            topic: 'cats',
            created_at: '2020-08-03T13:14:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '2'
          },
          {
            author: 'butter_bridge',
            title: 'Living in the shadow of a great man',
            article_id: 1,
            topic: 'mitch',
            created_at: '2020-07-09T20:11:00.000Z',
            votes: 100,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '11'
          },
          {
            author: 'butter_bridge',
            title: "They're not exactly dogs, are they?",
            article_id: 9,
            topic: 'mitch',
            created_at: '2020-06-06T09:10:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '2'
          },
          {
            author: 'rogersop',
            title: 'Seven inspirational thought leaders from Manchester UK',
            article_id: 10,
            topic: 'mitch',
            created_at: '2020-05-14T04:15:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '0'
          },
          {
            author: 'rogersop',
            title: 'Student SUES Mitch!',
            article_id: 4,
            topic: 'mitch',
            created_at: '2020-05-06T01:14:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '0'
          },
          {
            author: 'icellusedkars',
            title: 'Does Mitch predate civilisation?',
            article_id: 8,
            topic: 'mitch',
            created_at: '2020-04-17T01:08:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '0'
          },
          {
            author: 'icellusedkars',
            title: 'Am I a cat?',
            article_id: 11,
            topic: 'mitch',
            created_at: '2020-01-15T22:21:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '0'
          },
          {
            author: 'icellusedkars',
            title: 'Z',
            article_id: 7,
            topic: 'mitch',
            created_at: '2020-01-07T14:08:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '0'
          }
        ]);
      })
    });
    

    test('GET: 400 response when given invalid article id for /api/:article_id', () => {
      return request(app)
        .get("/api/articles/hello")
        .expect(400).then((response) => {
          expect(response.body.msg).toBe('Bad request');
        }) 
    });
    
    test('GET: 404 response when given invalid article id for /api/:article_id', () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404).then((response) => {
          expect(response.body.msg).toBe('Not Found');
        }) 
    });
    
  });