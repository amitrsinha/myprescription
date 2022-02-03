const express = require('express');
const bodyParser = require("body-parser");
const app = express();

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.get('/', function(req, res) {
    res.send('Hello World');
})

require("../routes/userRoutes")(app);

app.listen(process.env.PORT, () => {
    console.log('Listening On Port '+process.env.PORT);
})


