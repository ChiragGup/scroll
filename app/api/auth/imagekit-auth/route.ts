import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    });

    return NextResponse.json({
      signature: auth.signature,
      expire: auth.expire,
      token: auth.token,
    });
  } catch (error) {
    console.error("ImageKit Auth Error", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
