import type { Request, Response } from 'express';
import { BookService } from '../services/BookService.js';

export const BookController = {
  // Menangani Request Peminjaman
  borrow: (req: Request, res: Response) => {
    try {
      // Ambil input dari body
      const { bookId } = req.body;

      // Panggil Service
      const result = BookService.borrowBook(Number(bookId));

      // Kirim Response Sukses
      res.status(200).json({
        success: true,
        data: result,
      });
      
    } catch (error: any) {
      // Kirim Response Error (sesuai pesan dari Service)
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  
  list: (req: Request, res: Response) => {
      const books = BookService.getAllBooks();
      res.json(books);
  }
};