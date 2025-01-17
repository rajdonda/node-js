const express = require('express');
const app = express();
const port = 3000;


app.set('view engine','ejs');

const path = require('path');

app.get('/',(req,res)=>{
    res.render('dasebord');
})

app.use('/',express.static(path.join(__dirname,'public')))

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

