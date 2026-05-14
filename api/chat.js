import { GoogleGenerativeAI } from "@google/generative-ai";

const RETRY_AFTER_FALLBACK_SECONDS = 10

export default async function handler(req, res) {
    //1.Validate HTTP method
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        //Extract payload from body
        const { contents, systemInstruction, generationConfig } = req.body ?? {};

        //3.Minimum validation
        if (!Array.isArray(contents) || contents.length === 0) {
            return res.status(400).json({ error: "contents are required and must be non-empty" });
        }

        //4. Initialize SDK with API key from .env
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            systemInstruction,
            generationConfig,
        });
        
        //5. Call Gemini with complete history
        const result = await model.generateContent({ contents });

        //6. Return complete response with Gemini to client
        return res.status(200).json(result.response);
    }   catch (error) {

        console.error("Full error:", JSON.stringify(error, null, 2));
        console.error("Error message:", error.message); 

        if (error.status === 429) {
            console.warn("Rate limit hit on Gemini");
            return res.status(429).json({
                error: "Rate limit exceeded",
                retryAfterSeconds: RETRY_AFTER_FALLBACK_SECONDS,
            });
        }

        console.error("Error calling Gemini:", error);
        return res.status(500).json({ error: "Error generating response" });
    }
}
