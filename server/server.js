const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8080

const corsOption = {
    origin: ["http://localhost:5173"],
};

//middleware
app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true }))




//api call
app.get("/api", (req, res) => {
    res.json("Hello from /api")
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})