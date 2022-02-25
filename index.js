const express = require('express');
require('dotenv').config();

const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express().disable('x-powered-by');
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    // exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
};
app.use(cors(corsOptions));

app.get('/process', async (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/public/index.html`));
});

app.listen(5000, () => {
    console.log(`Local: http://localhost:${5000}`);
});
