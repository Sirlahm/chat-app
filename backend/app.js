const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/auth");
const app = express();
const dotenv = require("dotenv").config();
const PORT = 5000;
const cors = require("cors");


dbConnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/api/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
require("./socket").init(server, {
  cors: {
    origin: true,
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },

});
