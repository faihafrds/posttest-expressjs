const express = require('express')
const app = express()
let books = require('./books.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/books', (req, res) => {
    res.status(200).json(books)
})

app.get('/books/:id', (req, res) => {
    const book = books.find(i => i.id === +req.params.id)
    res.status(200).json(book)
})

app.post('/books', (req, res) => {
    const { isbn, judul, sinopsis, penulis, genre } = req.body
    const id = books[books.length - 1].id + 1
    const book = {
        id, isbn, judul, sinopsis, penulis, genre
    }
    books.push(book)
    res.status(201).json('Data berhasil ditambahkan')
}) 

app.put('/books/:id', (req, res)=>{
    const id = req.params.id
    books.filter(book => {
        if (book.id == id) {
            book.isbn = req.body.isbn
            book.judul = req.body.judul
            book.sinopsis = req.body.sinopsis
            book.penulis = req.body.penulis
            book.genre = req.body.genre
            return book
        }
    })
    res.status(200).json(`Data dengan id ${req.params.id} sudah berhasil di-update`)
})

app.delete('/books/:id', (req, res) => {
    books = books.filter(i => i.id != +req.params.id)
    res.status(200).json({
        message: `Data dengan id ${req.params.id} sudah berhasil dihapus!`
    })
})

app.listen('3000', () => {
    console.log('Server sudah nyala!')
})