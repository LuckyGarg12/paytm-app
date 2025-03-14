const express = require("express");
const mainRouter = require("./routes/index");
const { PORT } = require("./config");
const cors = require("cors");
require("express-async-errors")

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

