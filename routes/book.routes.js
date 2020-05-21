const express = require('express');
const router = express.Router();
const _ = require('lodash');

const books = require('../books.json');
const authors = require('../authors.json');

//routes
router.get('/books', (req,res) => {
    _.each(books, (book)=>{
        _.each(authors,(author)=> {
            if(author.id == book.authorId){
                book = {...book, author:{author}}
            }
        })
    })
    res.json(books);
})

router.post('/books',(req,res) => {
    const {name, authorId} = req.body;

    _.each(authors, (author)=> {
        if(author.id == authorId){
            if(name && authorId){
                const newBook = {...req.body};
                books.push(newBook);
                res.status(201).json({'msg':'Book created'});
            }else{
                res.status(400).json({'statusCode': 'Bad request'});
            }
        }
    })
})

router.put('/books/:id',(req,res) => {
    
    const {name,authorId} = req.body;
    _.each(books, (book) =>{
        if(books.id == req.params.id){
            book.name = name;
            book.authorId = authorId
        }
    });
    res.status(200).json({'msg':'Book modify'})
})

router.delete('/books/:id',(req,res) => {
    const id = req.params.id;
    _.remove(books, (book) => {
        return book.id == id
    });
    res.status(200).json({'msg':'Book delete'},books);
});


module.exports = router;