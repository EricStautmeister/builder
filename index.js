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

// const projectData = deta.Drive('Projects');
// const postData = deta.Drive('Posts');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    // exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
};
app.use(cors(corsOptions));

app.get('/process', async (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

app.post('/authorize', (req, res) => {
    
});

app.post('/login', async (req, res) => {
    
});

app.post('/uploadPost', async (req, res) => {

});

app.post('/uploadProject', async (req, res) => {

});

app.get(`/getPosts`, async (req, res) => {
});

app.get(`/getProjects`, async (req, res) => {
});

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/public/index.html`));
});

app.listen(5000, () => {
    console.log(`Local: http://localhost:${5000}`);
});
