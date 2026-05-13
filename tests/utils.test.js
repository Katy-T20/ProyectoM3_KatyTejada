import { describe, it, expect } from "vitest";
 
import { toCharacterProfile } from "../src/transform/character.js";
import {
    toApiMessages,
    buildPayload,
    normalizeAIResponse,
    appendUserMessage,
    appendAssistantMessage,
    getTrimmedHistory,
} from "../src/transform/chatPayload.js";
 
// 1. toCharacterProfile — transforms raw data
describe("toCharacterProfile", () => {
    it("maps all fields correctly from a complete raw character", () => {
        const raw = {
            id: 1,
            name: "Bugs Bunny",
            status: "Active",
            species: "Rabbit",
            image: "/images/Bugs_Bunny.jpg",
            origin: { name: "Looney Tunes" },
            location: { name: "Warner Bros. Studio" },
        };
 
        const profile = toCharacterProfile(raw);
 
        expect(profile).toEqual({
            id: 1,
            name: "Bugs Bunny",
            status: "Active",
            image: "/images/Bugs_Bunny.jpg",
            originName: "Looney Tunes",
            locationName: "Warner Bros. Studio",
        });
    });
 
    it("falls back to 'Unknown' for missing origin, location, name, and status", () => {
        const profile = toCharacterProfile({ id: 99 });
 
        expect(profile.name).toBe("Unknown");
        expect(profile.status).toBe("Unknown");
        expect(profile.originName).toBe("Unknown");
        expect(profile.locationName).toBe("Unknown");
        expect(profile.image).toBe("");
    });
});
 
// 2. toApiMessages — role mapping
describe("toApiMessages", () => {
    it("converts 'character' role to 'model' and 'user' stays 'user'", () => {
        const uiMessages = [
            { role: "user", text: "Hello!" },
            { role: "character", text: "Ehh, whats up doc?" },
        ];
 
        const result = toApiMessages(uiMessages);
 
        expect(result[0]).toEqual({ role: "user", parts: [{ text: "Hello!" }] });
        expect(result[1]).toEqual({ role: "model", parts: [{ text: "Ehh, whats up doc?" }] });
    });
});
 
// 3. normalizeAIResponse — parses API response
describe("normalizeAIResponse", () => {
    it("extracts and joins text parts from a valid API response", () => {
        const raw = {
            candidates: [
                {
                    content: {
                        parts: [{ text: "Ehh, " }, { text: "whats up doc?" }],
                    },
                },
            ],
        };
 
        expect(normalizeAIResponse(raw)).toBe("Ehh, whats up doc?");
    });
 
    it("returns empty string when response has no candidates", () => {
        expect(normalizeAIResponse({})).toBe("");
        expect(normalizeAIResponse(null)).toBe("");
        expect(normalizeAIResponse({ candidates: [] })).toBe("");
    });
});

// 4. getTrimmedHistory — slices message history
describe("getTrimmedHistory", () => {
    it("returns the last N messages when history exceeds maxTurns", () => {
        const messages = Array.from({ length: 10 }, (_, i) => ({
            role: "user",
            text: `msg ${i}`,
        }));
 
        const trimmed = getTrimmedHistory(messages, 7);
 
        expect(trimmed).toHaveLength(7);
        expect(trimmed[0].text).toBe("msg 3");
        expect(trimmed[6].text).toBe("msg 9");
    });
 
    it("returns all messages when history is shorter than maxTurns", () => {
        const messages = [{ role: "user", text: "hi" }];
        expect(getTrimmedHistory(messages, 7)).toHaveLength(1);
    });
});
 
// 5. appendUserMessage / appendAssistantMessage
describe("appendUserMessage and appendAssistantMessage", () => {
    it("appends a user message without mutating the original array", () => {
        const original = [{ role: "character", text: "Hi!" }];
        const updated = appendUserMessage(original, "Hello");
 
        expect(updated).toHaveLength(2);
        expect(updated[1]).toEqual({ role: "user", text: "Hello" });
        expect(original).toHaveLength(1);
    });
 
    it("appends an assistant message with role 'character'", () => {
        const updated = appendAssistantMessage([], "Ehh, could be.");
        expect(updated[0]).toEqual({ role: "character", text: "Ehh, could be." });
    });
});
 
// 6. buildPayload — full payload shape
describe("buildPayload", () => {
    it("produces a payload with the correct model, systemInstruction, and contents", () => {
        const payload = buildPayload({
            systemPrompt: "You are Bugs Bunny.",
            uiMessages: [{ role: "user", text: "Hey!" }],
        });
 
        expect(payload.model).toBe("gemini-2.5-flash-lite");
        expect(payload.systemInstruction.parts[0].text).toBe("You are Bugs Bunny.");
        expect(payload.contents).toHaveLength(1);
        expect(payload.contents[0].role).toBe("user");
        expect(payload.generationConfig.maxOutputTokens).toBe(75);
    });
});