import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    return NextResponse.json({ session });
  } catch (error) {
    return new NextResponse("Failed to fetch session", { status: 500 });
  }
}
