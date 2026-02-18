import { BookRepository } from '../repositories/BookRepository.js';

export const BookService = {
  borrowBook: (bookId: number) => {
    // 1. Minta data ke Repo
    const book = BookRepository.findById(bookId);

    // 2. Validasi Ketersediaan Data
    if (!book) {
      throw new Error('Buku tidak ditemukan!');
    }

    // 3. Validasi Logic Bisnis (Inti SoC)
    if (book.stock <= 0) {
      throw new Error('Stok buku habis, tidak bisa pinjam.');
    }

    // 4. Jika lolos, suruh Repo update data
    BookRepository.decrementStock(bookId);

    return { message: 'Berhasil meminjam buku', bookTitle: book.title };
  },
  
  getAllBooks: () => {
      return BookRepository.findAll();
  }
};