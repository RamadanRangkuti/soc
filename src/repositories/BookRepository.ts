import type { Book } from '../models/Book.js';

// Simulasi Database (Array)
const booksDB: Book[] = [
  { id: 1, title: 'Harry Potter', stock: 3 },
  { id: 2, title: 'Belajar TypeScript', stock: 0 },
];

export const BookRepository = {
  // Cari buku berdasarkan ID
  findById: (id: number): Book | undefined => {
    return booksDB.find((book) => book.id === id);
  },

  // Kurangi stok buku
  decrementStock: (id: number): boolean => {
  const book = booksDB.find((b) => b.id === id);
  if (book && book.stock > 0) {
    book.stock -= 1;
    return true;
  }
  return false; 
},
  
  // Ambil semua buku (untuk debugging)
  findAll: (): Book[] => {
    return booksDB;
  }
};