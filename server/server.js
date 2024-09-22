const express = require('express');
const cors = require('cors');
const app = express();

const corsOption = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOption));

const PORT = process.env.PORT || 8080

app.get("/api", (req, res) => {
    res.json("Hello from /api")
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})