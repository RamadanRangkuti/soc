import express from 'express';
import { BookController } from './controllers/BookController.js';
import { WalletController } from './controllers/WalletController.js';

const app = express();

// Supaya bisa baca req.body JSON
app.use(express.json()); 

// Route: User mau pinjam buku
app.post('/borrow', BookController.borrow);

// Route: Cek daftar buku
app.get('/books', BookController.list);

//Route:Wallet
app.get('/wallet', WalletController.getAll);
app.get('/wallet/:id', WalletController.getById);
app.post('/wallets/topup', WalletController.topUp);
app.post('/wallets/transfer', WalletController.transfer);

app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});