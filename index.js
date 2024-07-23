const express = require('express');
const authorRouter = require('./routes/author.routes');
const publisherRouter = require('./routes/publisher.routes');
const booksRouter = require('./routes/books.routes');
const narratorRouter = require('./routes/narrator.routes');
const audioRouter = require('./routes/audio.routes');
const app = express();
const port = 3000;


app.use(express.json());

app.use('/author', authorRouter);
app.use('/publisher', publisherRouter);
app.use('/books', booksRouter);
app.use('/narrator', narratorRouter)
app.use('/audioBooks', audioRouter)



app.listen(port,()=>{
console.log('server is started.');
})