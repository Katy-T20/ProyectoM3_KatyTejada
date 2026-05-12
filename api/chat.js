import { FinishReason } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { contents, systemInstruction, generationConfig } = req.body ?? {};

        if (!Array.isArray(contents) || contents.length === 0) {
            return res.status(400).json({ error: "contents are required and must be non-empty" });
        }

        return res.status(200).json({
            candidates: [
                {
                    content: {
                        parts: [{ text: "Mocking from the serverless. Wiring is ok" }],
                        role: "model",
                    },
                    finishReason: "STOP",
                },
            ],
            usageMetadata: {
                promptTokenCount: 10,
                candidatesTokenCount: 10,
                totalTokenCount: 20
            },
        });
    }   catch (error) {
        console.error("Error in /api/chat:", error)
        return res.status(500).json({ error: "Internal server error" });
    }
}