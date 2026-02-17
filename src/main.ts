import express, { type Request, type Response } from 'express';
// import type { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});