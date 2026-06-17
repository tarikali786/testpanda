import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";
import { getUser, createUser, getTrial, createTrial } from "@/lib/firebase/db";

const SESSION_DURATION_MS = 60 * 60 * 24 * 14 * 1000; // 14 days

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    // Verify the ID token
    const decoded = await adminAuth.verifyIdToken(idToken);

    // Create or update user record in Firestore
    const existingUser = await getUser(decoded.uid);
    if (!existingUser) {
      await createUser({
        uid:      decoded.uid,
        email:    decoded.email ?? "",
        name:     decoded.name ?? "",
        photoURL: decoded.picture ?? "",
      });

      // Start 30-day trial for new users
      await createTrial(decoded.uid);
    }

    // Also create trial if user exists but has no trial (edge case)
    if (existingUser) {
      const trial = await getTrial(decoded.uid);
      if (!trial) await createTrial(decoded.uid);
    }

    // Create a Firebase session cookie
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION_MS,
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:   SESSION_DURATION_MS / 1000,
      path:     "/",
    });

    return response;
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
