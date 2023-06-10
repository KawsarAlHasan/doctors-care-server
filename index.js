const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// mongodb connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aydlau6.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const appointmentOptionCollection = client
      .db("doctorsCare")
      .collection("appointmentOptions");
    const bookingsCollection = client.db("doctorsCare").collection("bookings");

    app.get("/appointmentOptions", async (req, res) => {
      const query = {};
      const options = await appointmentOptionCollection.find(query).toArray();
      res.send(options);
    });
  } finally {
  }
}
run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("Doctors care server is running");
});

app.listen(port, () => console.log(`Doctors Care running on ${port}`));
