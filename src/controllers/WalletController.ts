import type { Request, Response } from 'express';
import {WalletService} from "../services/WalletService.js"

export const WalletController = {
    getAll:(_req:Request, res:Response)=>{
        const wallets = WalletService.getAllWallet()
        res.status(200).json({
            code: 200,
            status: "success",
            data: wallets
        });
    },
    getById:(req:Request, res:Response)=>{
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                code: 400,
                status: "fail",
                message: "ID harus berupa angka"
            });
        }

        const wallet = WalletService.getWalletById(id);

        if (!wallet) {
            return res.status(404).json({
                code: 404,
                status: "fail",
                message: "Wallet tidak ditemukan"
            });
        }

        res.status(200).json({
            code: 200,
            status: "success",
            data: wallet
        });
    },
    topUp: (req: Request, res: Response) => {
        const { userId, amount } = req.body;

        if (!userId || !amount || amount <= 0) {
            return res.status(400).json({
                code: 400,
                status: "fail",
                message: "User ID dan jumlah Top Up (positif) diperlukan"
            });
        }

        const updatedWallet = WalletService.topUp(Number(userId), Number(amount));

        if (!updatedWallet) {
            return res.status(404).json({
                code: 404,
                status: "fail",
                message: "User tidak ditemukan"
            });
        }

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Top Up berhasil",
            data: updatedWallet
        });
    },
    transfer: (req: Request, res: Response) => {
        const { fromId, toId, amount } = req.body;

        // Validasi input dasar
        if (!fromId || !toId || !amount || amount <= 0) {
            return res.status(400).json({
                code: 400,
                status: "fail",
                message: "Data transfer tidak lengkap atau jumlah tidak valid"
            });
        }

        const result = WalletService.transfer(Number(fromId), Number(toId), Number(amount));

        if (!result.success) {
            return res.status(400).json({
                code: 400,
                status: "fail",
                message: result.message
            });
        }

        res.status(200).json({
            code: 200,
            status: "success",
            message: result.message
        });
    }
}