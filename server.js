const express = require('express');
const app = express();
const routes = require("./routes");
require('dotenv').config();

app.use(express.json());


app.use('/', routes)
app.get('/', (req, res) => {
    res.send('Welcome to the Smart Inventory Management System API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:30000/`);
});
