/**
 * @jest-environment node
 */

const {MongoClient} = require('mongodb');
const express = require("express");
const app = express();
let routerBuilder = require('../router.js')
let mongo = require('../mongo')
const request = require("supertest");
const mockData = require('../testData.json')
process.env.DB_NAME = 'test'
const BASE_PATH = "http://localhost:4000"


describe('insert', () => {
  let connection;
  let db;
  let server

  beforeAll(async () => {
      connection = await mongo.getClient(new MongoClient(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }));
      await routerBuilder.buildRouter(connection).then(resolvedRouter => {
        app.use("/", resolvedRouter)
        server = app.listen(4000, () => console.log("Listening"))
        db = connection.db('test')
      })
  });

  beforeEach(async () => {
    await db.collection('archive').deleteMany({});
    await db.collection('archive').insertMany(mockData);
  });

  afterAll(async () => {
    await connection.close();
    server.close()
  });

  it("should not blow up", async () => {
    expect(true).toEqual(true)
  })

  it('should get a message', async () => {
    const response = await request(app).get(`/message`)
    expect(JSON.parse(response.text)).toEqual({ "message": "Hello!" })
  });
  
  it('should delete archves', async () => {
    //Jest using async/await
    let code = await request(app).delete(`/deleteAllArchives`)
     
    let result = await db.collection("archive").find({}).toArray()

    expect(result).toEqual([]);
    expect(code.status).toEqual(200)
  });

  it("should retrieve an archive with the appropriate Id", () => {
    //Jest using promises
    let expected = {"_id": 123, "body": "lorem ipsum...", "date": "", "imgURL": "../images/reddeadimage.jpg", "tags": ["Red Dead Redemption", "First Person Shooter"], "title": "Red Dead Redemption Walkthrough"}
    
    return request(app).get(`/archive?postID=123`).then(res => {
      expect(JSON.parse(res.text)).toEqual(expected)
      expect(res.status).toEqual(200)
    })
  })

  it("should add an item to archives", () => {
    let post_data = { 
      title: "title",
      body: "body",
      imgURL: "img.com",
      tags: "tag",
      date: Date.now()
    }

    let expectedValues = {
      "status": 200,
      "text": "{\"response\":\"Wahoo\"}",
    }

    function callback(data) {
        expect(data).toMatchObject(expectedValues)
    }

    return request(app).post("/archive")
                .timeout(10000)
                .set('Content-Type', 'application/json')
                .send(post_data)
                .then(callback)
  })
});
