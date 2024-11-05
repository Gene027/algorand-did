import { NextResponse } from "next/server";
import { UserIdDto } from "../../../(signup)/interface/auth.interface";
import prisma from "../../../../libs/db";

export async function POST(request: Request) {
  const body: UserIdDto = await request.json();

  if (!body?.userId) {
    return new Response(JSON.stringify({ error: "Invalid DTO" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { userId } = body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      return NextResponse.json(
        { ...user },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error?.message ?? "Error querying database" },
      { status: 500 }
    );
  }
}
