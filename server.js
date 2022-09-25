// dependencies 
const express = require('express');
const path = require('path');
const app = express();
// sets port for listening, heroku decides, if not, use port 3001 
const PORT = process.env.PORT || 3001;

const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/html');

// this middleware says to CSS and JS files directory named public 
app.use(express.static('public')); // tested 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);