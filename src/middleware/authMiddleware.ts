// middleware/authMiddleware.ts
import type { Request, Response, NextFunction } from 'express';

export const secretKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers['x-secret-key'];

    if (key !== 'RAHASIA123') {
        return res.status(403).json({
            code: 403,
            status: "fail",
            message: "Akses ditolak! Secret key salah."
        });
    }

    next();
};