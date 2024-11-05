import { privateDecrypt, publicEncrypt } from "crypto";
import crypto from "crypto";

export const encryptText = async (text: string) => {
  try {
    const publicKey = Buffer.from(process.env.PUBLIC_KEY || "");

    const encryptedText = publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(text)
    );
    const base64Encoding = encryptedText.toString("base64");

    return base64Encoding;
  } catch (error) {
    console.log(error);
    return text;
  }
};

export const decryptText = async (base64Encoding: string) => {
  try {
    const privateKey = Buffer.from(process.env.PRIVATE_KEY || "");
    const encryptedBuffer = Buffer.from(base64Encoding, "base64");

    const decryptedText = privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      encryptedBuffer
    );

    return decryptedText.toString();
  } catch (error) {
    console.log(error);
    return null;
  }
};
