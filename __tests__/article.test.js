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
            comment_count: "11"
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

  test("GET: 200  response should return with an array of objects with all with topic from the query e.g mitch", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then((response) => {
        const articles = response._body.articles;
        expect(articles.length).toEqual(12);
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
          expect(article.topic).toBe("mitch");
        });
        
      });
  });

  test("GET: 200  response should return with an array of objects with all with sort by title default descending ", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then((response) => {
        const articles = response._body.articles;     
        expect(articles.length).toEqual(13);
         expect(articles[0].title).toBe("Z");
      });
  });

  test("GET: 200  response should return with an array of objects with all with sort by author default descending ", () => {
    return request(app)
      .get("/api/articles?sort_by=author")
      .expect(200)
      .then((response) => {
        const articles = response._body.articles;
        expect(articles.length).toEqual(13);
         expect(articles[0].author).toBe("rogersop");
      });
  });

  test("GET: 200  response should return with an array of objects with all with sort by title and order by ascending ", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=asc")
      .expect(200)
      .then((response) => {
        const articles = response._body.articles;      
        expect(articles.length).toEqual(13);
         expect(articles[0].title).toBe("A");
      });
  });

  test("GET: 404  response when given incorrect query when topic is incorrect e.g topic=coding ", () => {
    return request(app)
      .get("/api/articles?topic=coding")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });

  test("GET: 400 response when given incorrect query when sort_by is incorrect e.g sort_by=telephone ", () => {
    return request(app)
      .get("/api/articles?sort_by=telephone")
      .expect(400)
      .then((response) => {
         expect(response.body.msg).toBe("Bad request");
      });
  });

  test("GET: 400 response when given incorrect query when sort_by is incorrect e.g sort_by=1234 ", () => {
    return request(app)
      .get("/api/articles?sort_by=1235")
      .expect(400)
      .then((response) => {
         expect(response.body.msg).toBe("Bad request");
      });
  });

  test("GET: 400 response when given incorrect query when order is incorrect e.g order=dasd ", () => {
    return request(app)
      .get("/api/articles?order=123")
      .expect(400)
      .then((response) => {
         expect(response.body.msg).toBe("Bad request");
      });
  });

  test("GET: 400 response when given incorrect query when both order  and sort_by are incorrect e.g sort_by=123&order=123 ", () => {
    return request(app)
      .get("/api/articles?sort_by=telephone&order=123")
      .expect(400)
      .then((response) => {
         expect(response.body.msg).toBe("Bad request");
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

  test("PATCH: 200 response should return article updated from the id", () => {
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

  test("PATCH: 200 response should article updated updated from the id ", () => {
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

  test('POST:201 response with the correct article created', () => {
    const newPost = {
      author: "butter_bridge",
      title: "new post article",
      body: "lorem ipsum dolor",
      topic: "mitch"
    };
    return request(app)
      .post("/api/articles")
      .send(newPost)
      .expect(201)
      .then((response) => {
        const article = response._body.article;
        
        expect(article.title).toBe('new post article');
        expect(article.article_id).toBe(14);
        expect(article.topic).toBe('mitch');
        expect(article.body).toBe('lorem ipsum dolor');
      });
      
  });

  test('POST: 400 response with the responds with bad request when no author is given', () => {
    const newPost = {
      title: "new post article",
      body: "lorem ipsum dolor",
      topic: "mitch"
    };
    return request(app)
      .post("/api/articles")
      .send(newPost)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      }) 
  });

  test('POST: 400 response with the responds with bad request when no body is given', () => {
    const newPost = {
      title: "new post article",
      topic: "mitch"
    };
    return request(app)
      .post("/api/articles")
      .send(newPost)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      }) 
  });
  
  test('POST: 400 response with the responds with bad request when no topic is given', () => {
    const newPost = {
      title: "new post article",
      body: "lorem ipsum dolor"     
    };
    return request(app)
      .post("/api/articles")
      .send(newPost)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      }) 
  });


});
