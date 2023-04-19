import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import tenderRouter from "./routes/tenderRouter.js";
import getDateTimeString from "./helpers/getDateTimeString.js";

const PORT = process.env.PORT || 3001;

dotenv.config();

const app = express();


app.use(express.json());
app.use(compression());
app.use(helmet());

const whitelist = ["https://justeducationtenders.co.uk", "https://therealseanwallace.github.io", "https://jet-next-frontend-pulb.vercel.app/", "https://jet-next-frontend-pulb-74du3de4e-therealseanwallace.vercel.app/", "151.237.131.6"];
/* const whitelist = ["https://localhost:3000", "https://localhost:3001", "http://localhost:3000", "http://localhost:3001"]; */

 const corsOptions = {
  origin: function corsCheck(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
}; 

app.use(cors(corsOptions));

app.use(cors());

const apiRequestLimiter = rateLimit({
  // limit each IP to 100 requests per minute
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: `${getDateTimeString()} - Too many requests from this IP, please try again shortly`,
});

app.use("/api/", apiRequestLimiter);

app.use("/api/tenders/", tenderRouter);

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`${getDateTimeString()} - Server running on port ${PORT}`);
});

// Mongoose //

const { MONGO_URL } = process.env;
console.log("MONGO_URL", MONGO_URL);

async function connect() {
  try {
    const connection = await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log(`${getDateTimeString()} - Error connecting to MongoDB: `, error.message);
  } finally {
    if (mongoose.connection.readyState === 1) {
      console.log(`${getDateTimeString()} - Connected to MongoDB`);
    }
  }
}

connect();
