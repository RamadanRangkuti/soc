import type {Wallet} from "../models/Wallet.js";
import {walletRepository} from "../repositories/WalletRepository.js";

export const WalletService = {
    getAllWallet:():Wallet[]=>{
        return walletRepository.findAll()
    },
    getWalletById:(id:number):Wallet|undefined=>{
        return walletRepository.findById(id)
    },
    topUp(userId: number, amount: number): Wallet | undefined {
        const wallet = walletRepository.findById(userId);
        
        if (!wallet) return undefined; // User tidak ditemukan

        const newBalance = wallet.balance + amount;
        return walletRepository.updateBalance(userId, newBalance);
    },
    transfer(fromId: number, toId: number, amount: number): { success: boolean; message: string } {
        const sender = walletRepository.findById(fromId);
        const receiver = walletRepository.findById(toId);

        // Validasi keberadaan akun
        if (!sender || !receiver) {
            return { success: false, message: "Pengirim atau penerima tidak ditemukan" };
        }

        // Validasi saldo cukup
        if (sender.balance < amount) {
            return { success: false, message: "Saldo tidak mencukupi" };
        }

        // Eksekusi Transfer
        walletRepository.updateBalance(fromId, sender.balance - amount);
        walletRepository.updateBalance(toId, receiver.balance + amount);

        return { success: true, message: "Transfer berhasil" };
    }
}