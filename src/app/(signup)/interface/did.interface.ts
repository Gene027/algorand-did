export interface DIDWallet {
  mnemonic: string;
  address: string;
  metadata: {
    privateKey: Uint8Array;
  };
}

export interface CreateWalletRes {
  message: string;
  wallet: DIDWallet;
  dispenser: string;
}

export interface DIDWalletInfo {
  address: string;
  amount: number;
  "amount-without-pending-rewards": number;
  "apps-local-state": any[];
  "apps-total-schema": {
    "num-byte-slice": number;
    "num-uint": number;
  };
  assets: any[];
  "created-apps": {
    id: number;
    params: {
      "approval-program": string;
      "clear-state-program": string;
      creator: string;
      "global-state": any[];
      "global-state-schema": {
        "num-byte-slice": number;
        "num-uint": number;
      };
      "local-state-schema": {
        "num-byte-slice": number;
        "num-uint": number;
      };
    };
  }[];
  "created-assets": any[];
  "min-balance": number;
  "pending-rewards": number;
  "reward-base": number;
  rewards: number;
  round: number;
  status: string;
  "total-apps-opted-in": number;
  "total-assets-opted-in": number;
  "total-created-apps": number;
  "total-created-assets": number;
}

export interface ContractDeployRes {
  appId: number;
}

export interface CreateDIDReq {
  mnemonic: string;
  appId: number;
  walletAddress: string;
}

export interface DIDDocument {
  id: string;
  "@context": string[];
  verificationMethod: {
    id: string;
    type: string;
    controller: string;
  }[];
  authentication: string[];
}

export interface CreateDIDRes {
  ok: boolean;
  did: DIDDocument;
}

export interface ResolveDIDReq {
  walletAddress: string;
  appId: number;
}

export interface GenerateDIDRes {
  walletAddress: string;
  mnemonic: string;
  appID: number;
  did: string;
}
