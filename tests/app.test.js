import { describe, it, expect, vi } from "vitest";
 
import { getAllCharacters, getFirstCharacterByName } from "../src/services/api.js";
import { getSystemPromptByCharacter } from "../src/services/prompts.js";
import { getCharacterReply } from "../src/services/aiClient.js";
 
// 1. getAllCharacters — static data
describe("getAllCharacters", () => {
    it("returns an array with at least 2 characters", () => {
        const characters = getAllCharacters();
        expect(Array.isArray(characters)).toBe(true);
        expect(characters.length).toBeGreaterThanOrEqual(2);
    });
 
    it("each character has the required fields", () => {
        const characters = getAllCharacters();
        characters.forEach((c) => {
            expect(c).toHaveProperty("id");
            expect(c).toHaveProperty("name");
            expect(c).toHaveProperty("status");
            expect(c).toHaveProperty("image");
            expect(c).toHaveProperty("origin");
            expect(c).toHaveProperty("location");
        });
    });
});

// 2. getFirstCharacterByName — lookup + errors
describe("getFirstCharacterByName", () => {
    it("finds a character by partial, case-insensitive name", async () => {
        const result = await getFirstCharacterByName("bugs");
        expect(result.name).toBe("Bugs Bunny");
    });
 
    it("finds Rocket Raccoon by partial name", async () => {
        const result = await getFirstCharacterByName("rocket");
        expect(result.name).toBe("Rocket Raccoon");
    });
 
    it("throws NO_RESULTS for an unknown name", async () => {
        await expect(getFirstCharacterByName("Daffy Duck")).rejects.toMatchObject({
            code: "NO_RESULTS",
        });
    });
 
    it("throws NO_RESULTS for an empty or null name", async () => {
        await expect(getFirstCharacterByName("")).rejects.toMatchObject({
            code: "NO_RESULTS",
        });
        await expect(getFirstCharacterByName(null)).rejects.toMatchObject({
            code: "NO_RESULTS",
        });
    });
});
 
// 3. getSystemPromptByCharacter — prompt routing
describe("getSystemPromptByCharacter", () => {
    it("returns the Rocket Raccoon prompt for names containing 'rocket'", () => {
        const prompt = getSystemPromptByCharacter("Rocket Raccoon");
        expect(prompt).toContain("Rocket Raccoon");
    });
 
    it("returns the Bugs Bunny prompt as default for any other name", () => {
        const prompt = getSystemPromptByCharacter("Bugs Bunny");
        expect(prompt).toContain("Bugs Bunny");
    });
 
    it("is case-insensitive when matching the character name", () => {
        const prompt = getSystemPromptByCharacter("ROCKET");
        expect(prompt).toContain("Rocket Raccoon");
    });
});
 
// 4. getCharacterReply — mocks fetchJson
vi.mock("../src/services/fetchJson.js", () => ({
    fetchJson: vi.fn().mockResolvedValue({
        candidates: [
            {
                content: {
                    parts: [{ text: "Ehh, whats up doc?" }],
                },
            },
        ],
        usageMetadata: {
            promptTokenCount: 10,
            candidatesTokenCount: 5,
        },
    }),
}));
 
// Mock localStorage (not available in Node)
vi.stubGlobal("localStorage", {
    getItem: vi.fn().mockReturnValue("Bugs Bunny"),
});
 
describe("getCharacterReply", () => {
    it("returns the normalized text from the AI response", async () => {
        const messages = [{ role: "user", text: "Hello!" }];
        const reply = await getCharacterReply(messages);
        expect(reply).toBe("Ehh, whats up doc?");
    });
 
    it("throws a rate-limit error with retryAfterSeconds when status is 429", async () => {
        const { fetchJson } = await import("../src/services/fetchJson.js");
 
        const rateLimitError = new Error("Rate limit");
        rateLimitError.status = 429;
        rateLimitError.body = { retryAfterSeconds: 5 };
        fetchJson.mockRejectedValueOnce(rateLimitError);
 
        const messages = [{ role: "user", text: "Hello!" }];
        await expect(getCharacterReply(messages)).rejects.toMatchObject({
            status: 429,
            retryAfterSeconds: 5,
        });
    });
});