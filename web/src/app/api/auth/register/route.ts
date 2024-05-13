import { BASE_URL } from "@/lib/constants";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  try {
    await axios.post(`${BASE_URL}/auth/register`, {
      name: name,
      email: email,
      password: password,
    });

    // Return a success response
    return new NextResponse("User registered successfully", { status: 201 });
  } catch (error) {
    // Return an error response
    return new NextResponse("Internal server error", { status: 400 });
  }
}
