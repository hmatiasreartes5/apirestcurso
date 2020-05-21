const express = require('express');
const router = express.Router();

const authors = require('../authors.json');
const books = require('../books.json');

//routes
router.get('/authors', (req,res) => {
    res.json(authors);
})

router.post('/authors',(req,res) => {
    const {name, lastname} = req.body;

    if(name && lastname){
        const newAuthor = {...req.body};
        authors.push(newAuthor);
        res.status(201).json({'msg':'Author created'});
    }else{
        res.status(400).json({'statusCode': 'Bad request'});
    }
})

router.put('/authors/:id',(req,res) => {
    
    const {name, lastname} = req.body;
    _.each(authors, (author) =>{
        if(authors.id == req.params.id){
            author.name = name;
            author.lastname = lastname
            res.status(200).json({'msg':'Author modify'})
        }
    });
})

router.delete('/authors/:id',(req,res) => {
    const id = req.params.id;
    authors.filter(author => author.id !== id);
    books.filter(book => book.authorId !== id);
    res,status(200).json(authors,books);
});

module.exports = router;