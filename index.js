// @flow

const express = require('express');
require('dotenv').config();

const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
// const csrf = require('csurf');
const { Deta } = require('deta');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express().disable('x-powered-by');
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
// app.use(csrf({ cookie: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

const deta = Deta(process.env.DETA_PROJECT_KEY);
const projectData = deta.Drive('Projects');
const postData = deta.Drive('Posts');

app.use(
    cors({
        origin: 'http://localhost:3000',
        // exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
    })
);

//TODO: Add api router
//TODO: Add CSRF verification to routes

getDataFromDrive = async (drive) => {
    const result = await drive.list();
    const allFiles = result.names;
    const len = allFiles.length;
    const parsedFileNames = allFiles.map((item) => item.replace('.json', ''));
    const contents = [];
    const res = [];

    let counter = 0;
    for (const file of allFiles) {
        await drive
            .get(file)
            .then(async (responce) => await responce.text())
            .then((content) => content.split('([//])'))
            .then((data) =>
                contents.push({ title: data[0], content: data[1] })
            );
        counter++;
        if (counter == len) {
            parsedFileNames.forEach((_name, index) => {
                filedata = contents[index];
                const title = filedata.title;
                const content = filedata.content;
                const response = { title, content };
                res.push(response);
            });
        }
    }
    return res;
};

app.get(`/getPosts`, async (req, res) => {
    const response = await getDataFromDrive(postData);
    res.json({ response });
});

app.get(`/getProjects`, async (req, res) => {
    const response = await getDataFromDrive(projectData);
    res.json({ response });
});

app.post('/uploadPost', async (req, res) => {
    const parsedTitle = req.body.replace(/\s+(.)/g, function (match, group) {
        return group.toUpperCase();
    });
    const filename = `${parsedTitle}.json`;
    const post = await postData.put(filename, {
        data: req.body.text,
    });
});

app.post('/uploadProject', async (req, res) => {
    console.log("Request received");
    const parsedTitle = req.body.title.replace(
        /\s+(.)/g,
        function (match, group) {
            return group.toUpperCase();
        }
    );
    const data = `${req.body.title}([//])${req.body.content}`;
    const filename = `${parsedTitle}.json`;
    const databaseRes = await projectData.put(filename, { data });
    res.json({ file: filename, databaseRes });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/public/index.html`));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Local: http://localhost:${port}`); // \nOn Your Network: http://172.20.10.2:${port}
});
