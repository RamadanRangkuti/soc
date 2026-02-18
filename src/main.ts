import express from 'express';
import { BookController } from './controllers/BookController.js';

const app = express();

// Supaya bisa baca req.body JSON
app.use(express.json()); 

// Route: User mau pinjam buku
app.post('/borrow', BookController.borrow);

// Route: Cek daftar buku
app.get('/books', BookController.list);

app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});