export interface User {
    id: string;
    email: string;
    did: string | null;
    createdAt: Date;
    updatedAt: Date;
    name: string | null;
    appId: number | null;
    walletMnemonic: string | null;
    walletAddress: string | null;
}