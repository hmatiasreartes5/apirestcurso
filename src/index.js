const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json);

const PORT = process.env.PORT || 3000;

app.use(require('../routes/index'));

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);    
});

