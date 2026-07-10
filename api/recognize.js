const known = [
  { brand: "Ibuprofen", generic: "Ibuprofen", strength: "200 mg", meal: "with food", confidence: 0.88 },
  { brand: "Tylenol", generic: "Acetaminophen", strength: "500 mg", meal: "with or without food", confidence: 0.84 },
  { brand: "Amoxicillin", generic: "Amoxicillin", strength: "500 mg", meal: "as prescribed", confidence: 0.81 },
  { brand: "Omeprazole", generic: "Omeprazole", strength: "20 mg", meal: "before food", confidence: 0.79 }
];

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Use POST." });
    return;
  }

  const now = new Date().toISOString();
  const pick = known[Math.floor(Math.random() * known.length)];

  response.status(200).json({
    mode: "server-recognition-stub",
    capturedAt: now,
    result: {
      ...pick,
      frequency: "3 times daily",
      times: ["08:00", "13:00", "20:00"],
      source: "beloved-med recognition pipeline placeholder"
    },
    next: "Replace this stub with Vision OCR, barcode, QR, and Druglist/openFDA/NHS matching in Replit."
  });
}
