const express = require("express");
const mainRouter = require("./routes/index");
const { PORT } = require("./config");

const app = express();
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});

