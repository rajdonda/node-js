const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const records = [];

app.get('/', (req, res) => {
    res.redirect('/add');
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { name, phone } = req.body;
    if (name && phone) {
        const id = Math.floor(Math.random() * 100000);
        records.push({ id, name, phone });
    }
    res.redirect('/view');
});

app.get('/view', (req, res) => {
    res.render('view', { records });
});

app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = records.findIndex(record => record.id === id);
    if (index !== -1) {
        records.splice(index, 1);
    }
    res.redirect('/view');
});

app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const record = records.find(record => record.id === id);
    if (record) {
        res.render('edit', { record });
    } else {
        res.redirect('/view');
    }
});

app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, phone } = req.body;
    const record = records.find(record => record.id === id);
    if (record) {
        record.name = name;
        record.phone = phone;
    }
    res.redirect('/view');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
