import { NextRequest, NextResponse } from "next/server";

const CORRECT_PASSWORD = "bybyte_top";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }
    console.log(`password`, password);

    if (password === CORRECT_PASSWORD) {
      const token = Math.random().toString(36).substring(2);

      const response = NextResponse.json({ success: true }, { status: 200 });

      // Установка куки в новом формате
      response.cookies.set({
        name: "is-authenticated",
        value: token,
        httpOnly: true,
        maxAge: 2592000,
        path: "/",
        sameSite: "strict",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    console.log(`error`, error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
