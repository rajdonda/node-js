const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const methodOverride = require('method-override');
const Record = require('./models/record');

const app = express();

mongoose.connect('mongodb://localhost:27017/recordDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(methodOverride('_method'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}${fileExt}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.png', '.jpg', '.jpeg', '.gif'];
  const fileExt = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PNG, JPG, JPEG, and GIF files are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

app.get('/', (req, res) => {
  res.redirect('/create');
});

app.get('/create', (req, res) => {
  res.render('create', {
    cities: ['New York', 'London', 'Tokyo', 'Paris', 'Sydney']
  });
});

app.post('/create', upload.single('image'), async (req, res) => {
  try {
    const record = new Record({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      hobbies: Array.isArray(req.body.hobbies) ? req.body.hobbies : [req.body.hobbies],
      gender: req.body.gender,
      city: req.body.city,
      image: req.file ? req.file.filename : ''
    });

    await record.save();
    res.redirect('/view');
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

app.get('/view', async (req, res) => {
  const records = await Record.find();
  res.render('view', { records });
});

app.get('/edit/:id', async (req, res) => {
  const record = await Record.findById(req.params.id);
  res.render('edit', {
    record,
    cities: ['New York', 'London', 'Tokyo', 'Paris', 'Sydney']
  });
});

app.put('/edit/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      hobbies: Array.isArray(req.body.hobbies) ? req.body.hobbies : [req.body.hobbies],
      gender: req.body.gender,
      city: req.body.city
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    await Record.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/view');
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

app.delete('/delete/:id', async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);
  res.redirect('/view');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});