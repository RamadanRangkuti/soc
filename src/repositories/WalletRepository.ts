import type {Wallet} from "../models/Wallet.js"

const walletDB:Wallet[] = [
    {id:1, balance:10000},
    {id:2, balance:15000}, 
    {id:3, balance:20000},
];

export const walletRepository = {
    findAll():Wallet[]{
        return walletDB
    },
    findById:(id:number): Wallet|undefined =>{
        return walletDB.find((wallet)=>wallet.id=id);
    },
    updateBalance(id: number, newBalance: number): Wallet | undefined {
    // Cari wallet-nya dulu
    const wallet = walletDB.find(w => w.id === id);

    // Jika ketemu (tidak undefined), update balance-nya
    if (wallet) {
        wallet.balance = newBalance;
        return wallet;
    }

    return undefined;
    }
}

