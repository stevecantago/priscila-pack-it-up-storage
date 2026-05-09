import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  preferredUnitSize?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !message || (!phone && !email)) {
    return NextResponse.json(
      {
        message:
          "Please include your name, message, and either a phone number or email address.",
      },
      { status: 400 },
    );
  }

  if (process.env.NODE_ENV === "development") {
    console.info("Contact form submission", {
      name,
      phone,
      email,
      message,
      preferredUnitSize: body.preferredUnitSize?.trim(),
    });
  }

  return NextResponse.json({
    message:
      "Thanks. We received your message and will follow up using the contact information provided.",
  });
}
