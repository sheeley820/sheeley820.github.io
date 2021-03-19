/**
 * @jest-environment node
 */

const {MongoClient} = require('mongodb');
const express = require("express");
const app = express();
let routerBuilder = require('../router.js')
let mongo = require('../mongo')
const request = require("axios");
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
    const response = await request.get(`${BASE_PATH}/message`)
    expect(response.data).toEqual({ "message": "Hello!" })
  });
  
  it('should delete archves', async () => {
    
    let code = await request.delete(`${BASE_PATH}/deleteAllArchives`)
     
    let result = await db.collection("archive").find({}).toArray()
    expect(result).toEqual([]);
    expect(code.status).toEqual(200)
  });

  it("should retrieve an archive with the appropriate Id", async () => {
    let response = await request.get(`${BASE_PATH}/archive?postID=123`)
    let expected = {"_id": 123, "body": "lorem ipsum...", "date": "", "imgURL": "../images/reddeadimage.jpg", "tags": ["Red Dead Redemption", "First Person Shooter"], "title": "Red Dead Redemption Walkthrough"}
    expect(response.data).toEqual(expected)
    expect(response.status).toEqual(200)
  })

  it("should add an item to archives", async () => {
    let post_data = '{\n      title: "title",\n      body: "body",\n      imgURL: "img.com",\n      tags: "tag",\n      date: Date.now()\n    }'
    const options = {
      method: 'POST',
      url: 'http://localhost:4000/archive',
      headers: {'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(post_data)
            },
      data: post_data
    };

    let response = request.request(options).then(function (response) {
          console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });
    let expected = {
      "result": "ok",
      "post": ""
    }
    expect(response.data).toEqual(expected)
  })
});
