import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";
import { notifyOwnerOfLead } from "@/lib/email";

// Supabase + email need the Node runtime.
export const runtime = "nodejs";

type LeadInput = {
  name?: string;
  brand?: string;
  email?: string;
  instagram?: string;
  goal?: string;
  source?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: LeadInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const brand = body.brand?.trim();
  const email = body.email?.trim();

  if (!name || !brand || !email) {
    return NextResponse.json(
      { error: "Name, brand, and email are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  try {
    const lead = await saveLead({
      name,
      brand,
      email,
      instagram: body.instagram?.trim() ?? "",
      goal: body.goal?.trim() ?? "",
      source: body.source?.trim() || "website",
    });

    // Notify the owner; don't fail the request if email has an issue.
    await notifyOwnerOfLead(lead);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Failed to save lead:", err);
    return NextResponse.json({ error: "Could not save your request." }, { status: 500 });
  }
}
