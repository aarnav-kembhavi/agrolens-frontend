import { NextRequest, NextResponse } from "next/server";
import { KindwiseResponse } from "@/lib/types";

export async function POST(req: NextRequest) {
  const apiKey = process.env.KINDWISE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured." },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const imageBase64 = Buffer.from(fileBuffer).toString("base64");

    const details = [
      "common_names",
      "url",
      "description",
      "treatment",
      "classification",
      "language",
      "entity_id",
    ].join(",");

    const apiUrl = "https://plant.id/api/v3/identification?language=en&details=" + details;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey,
      },
      body: JSON.stringify({
        images: [imageBase64],
        health: "all",
        similar_images: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Kindwise API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to analyze plant health" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in plant-health API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
