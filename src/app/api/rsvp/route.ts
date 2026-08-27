import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate payload
    if (!data || !data.guestName || typeof data.attending !== "boolean") {
      return NextResponse.json(
        { error: "Invalid RSVP submission data" },
        { status: 400 }
      );
    }

    console.log("RSVP Received:", data);

    // Here you can hook up Supabase, Google Sheets Webhook, Resend email notification, or Telegram Bot
    return NextResponse.json({
      success: true,
      message: "RSVP recorded successfully",
    });
  } catch (error) {
    console.error("Error processing RSVP:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
