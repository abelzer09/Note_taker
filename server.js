const express = require('express');
const { get } = require('express/lib/response');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const htmlRoutes = require('./routes/htmlroutes');
const apiRoutes = require('./routes/apiroutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/',htmlRoutes);





app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`));