
import { Router } from 'express';
import BookController from '../controllers/BookController';

const router = Router();

router.post('/books', BookController.createBook);
router.get('/books', BookController.getAllBooks);
router.put('/books/:id', BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);

export default router;