/* eslint-disable import/no-extraneous-dependencies */
import * as algokit from "@algorandfoundation/algokit-utils";
import algosdk, { Account, Algodv2 } from "algosdk";
import * as dotenv from "dotenv";
import * as path from "path";
import fs from "fs";
import axios from "axios";
import base58 from "bs58";
import { AlgoDidClient } from "../artifacts/algo-did-client";
import contractABI from "../artifacts/AlgoDID.abi.json";

// local account setup
import localSetup from "../setup.json";

const dotenvPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: dotenvPath });

// account settings format
type Profile = {
  name: string;
  node: string;
  app_id: number;
  address: string;
  mnemonic: string;
  private_key: string;
  access_token: string;
};

type Setup = {
  current_profile: string;
  profiles: Profile[];
};

const setup: Setup = localSetup;

// get active profile from setup.json
function getProfile(): Profile | undefined {
  return setup.profiles.find((p) => p.name === setup.current_profile);
}

// get Algorand account from setup.json
function getAccount(): Account {
  const profile = getProfile();
  if (!profile) {
    throw new Error("profile not found, check 'current_profile' in setup.json");
  }
  return algokit.mnemonicAccount(profile.mnemonic);
}

// get Algorand account from mnemonic
function getAccountByMnemonic(mnemonic: string): Account {
  return algokit.mnemonicAccount(mnemonic);
}

// get algod client based on the active profile
function getAlgodClient(): Algodv2 {
  const profile = getProfile();
  if (!profile) {
    throw new Error("profile not found, check 'current_profile' in setup.json");
  }
  return algokit.getAlgoClient({
    server: profile.node,
    token: profile.access_token,
  });
}

// get application client based on the active profile
async function getAppClient(): Promise<AlgoDidClient> {
  const profile = getProfile();
  if (!profile) {
    throw new Error("profile not found, check 'current_profile' in setup.json");
  }
  return new AlgoDidClient(
    {
      sender: getAccount(),
      resolveBy: "id",
      id: profile.app_id,
    },
    getAlgodClient()
  );
}

// create a new account using the local KMD instance
async function createNewAccount(
  name: string,
  algod: Algodv2
): Promise<Account> {
  return algokit.getOrCreateKmdWalletAccount(
    {
      name,
      // set fundWith to 0 so algokit doesn't try to fund the account
      // from another kmd account
      fundWith: algokit.microAlgos(0),
    },
    algod,
    algokit.getAlgoKmdClient({
      server: "http://localhost",
      port: 4002,
      token: "a".repeat(64),
    })
  );
}

export function loadContract() {
  const contract = new algosdk.ABIContract(contractABI);
  return contract;
}

export function loadTeals() {
  const approvalTeal = fs.readFileSync(
    `${process.cwd()}/artifacts/AlgoDID.approval.teal`,
    "utf8"
  );
  const clearTeal = fs.readFileSync(
    `${process.cwd()}/artifacts/AlgoDID.clear.teal`,
    "utf8"
  );

  return { approvalTeal, clearTeal };
}

export function encodeBoxIndex(index: number): Uint8Array {
  const buffer = new ArrayBuffer(8);
  const dataView = new DataView(buffer);
  dataView.setBigUint64(0, BigInt(index), false); // Big Endian
  return new Uint8Array(buffer);
}

export function base58Encode(buffer: Uint8Array): string {
  return base58.encode(buffer);
}

export async function submitToProvider(
  networkClient: { profile: { storeProvider: string }; algod: algosdk.Algodv2 },
  didDocument: Record<string, unknown>,
  method = "POST"
) {
  const endpoint = `${networkClient.profile.storeProvider}/v1/${didDocument.id}`;
  const response = await axios({
    method,
    url: endpoint,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(didDocument),
  });

  if (response.status !== 200) {
    throw new Error(`Unexpected response: ${response.statusText}`);
  }
}

export function unit8ToHex(buffer: Uint8Array): string {
  const uint8Array = new Uint8Array(Object.values(buffer));

  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function parseDID(did: string) {
  // This assumes the DID format is `did:algo:<network>:app:<appID>:<publicKey>`
  const matches = did.match(/^did:algo:([^:]+):app:([^:]+):([^:]+)$/);
  if (!matches) {
    return null;
  }
  return {
    network: matches[1],
    appID: parseInt(matches[2], 10),
    pubKey: matches[3],
  };
}

export {
  getAccount,
  getAccountByMnemonic,
  getAlgodClient,
  getAppClient,
  createNewAccount,
  Profile,
};
