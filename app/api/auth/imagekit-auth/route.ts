import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse, NextRequest } from "next/server";

/**
 * @description
 * API route to generate upload authentication parameters for ImageKit.
 * Returns: signature, expire timestamp, and token.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
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
    console.error("[IMAGEKIT_AUTH_ERROR]", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
