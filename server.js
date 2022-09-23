// dependencies 
const express = require('express');
const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/html');

// setting up the server 
const app = express();
const PORT = process.env.PORT || 3001;

// middleware - connecting js and css files
app.use(express.static('./public'));
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);