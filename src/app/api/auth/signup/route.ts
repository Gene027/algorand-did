import { NextResponse } from "next/server";
import { SignUpDto } from "../../../(signup)/interface/auth.interface";
import prisma from "../../../../libs/db";
import { encryptText } from "../../../../libs/utils";
import { sendNotification } from "../../../../libs/email";

export async function POST(request: Request) {
  try {
    const body: SignUpDto = await request.json();

    const {
      email,
      name,
      address,
      dateOfBirth,
      digitalId,
      gender,
      appId,
      did,
      walletAddress,
      walletMnemonic,
    } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    try {
      const hashedMnemonic = await encryptText(walletMnemonic);
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          walletMnemonic: hashedMnemonic,
          walletAddress,
          address,
          dateOfBirth,
          digitalId,
          gender,
          appId: Number(appId),
          did,
        },
      });

      sendNotification({
        to: email,
        subject: "Welcome to our platform",
        html: `<p> Hello ${name}, <br>
        Welcome to our platform. <br>
        Your wallet address is ${walletAddress} <br> 
        Your mnemonic is: <br> 
      ${walletMnemonic} <br>
      Your DID is: ${did}. <br>
      Please keep it safe. <br>
      Top up your wallet at https://dispenser.testnet.aws.algodev.network </p>`,
      });

      return NextResponse.json({ ...newUser }, { status: 201 });
    } catch (error: any) {
      console.error("Error creating user:", error.message);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
