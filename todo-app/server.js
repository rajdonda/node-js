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
        records.push({ name, phone });
    }
    res.redirect('/view');
});

app.get('/view', (req, res) => {
    res.render('view', { records });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
