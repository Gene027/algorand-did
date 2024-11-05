import { NextResponse } from "next/server";
import { UserIdDto } from "../../../(signup)/interface/auth.interface";
import axios from "axios";
import prisma from "../../../../libs/db";
import { CreateDIDRes } from "../../../(signup)/interface/did.interface";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DID_SERVER_URL,
});

export async function POST(request: Request) {
  const body: UserIdDto = await request.json();

  if (!body?.userId) {
    return new Response(JSON.stringify({ error: "Invalid DTO" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: body.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const res = await axiosInstance.post("/v1/wallet/deploy", {
      mnemonic: user.walletMnemonic,
    });

    const { appId } = res.data;
    await prisma.user.update({
      where: { id: user.id },
      data: { appId },
    });

    const didCreateRes = await axiosInstance.post("/v1/did/create", {
      appId,
      mnemonic: user.walletMnemonic,
      data: {
        name: user.name,
        email: user.email,
      },
    });
    const { did } = didCreateRes.data as CreateDIDRes;

    await prisma.user.update({
      where: { id: user.id },
      data: { did: did.id },
    });

    return NextResponse.json({ did: did.id }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error?.message ?? "Error querying surrogate server" },
      { status: 500 }
    );
  }
}
