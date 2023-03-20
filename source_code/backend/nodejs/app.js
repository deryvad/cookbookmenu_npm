const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webapi = require("./routes/web_api");

let app = express();
app.use(cors({origin: true}));
app.disable("x-powered-by");
app.use(bodyParser.json());

//Uncomment the code below to enable Azure Auth token validation
//Add the security headers to the API response
//app.use(security);

app.use(`/api/web`, webapi)

app.use((err, req, res, next) => {
    res.status(400).json({ error: err.message });
});

module.exports = app;