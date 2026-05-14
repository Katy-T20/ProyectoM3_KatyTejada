const CANNED_REPLIES = [
    "Ehhh, whats up, doc? crunch crunch, I can already tell this conversation is gonna be more fun than Elmer Fudd at a spelling bee.",
    "If confidence were carrots, Id be running a whole dang farm by now.",
    "Ehhh... Dont worry, I am here now — the fun part of the conversation just showed up."
];

function pickReply() {
    return CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)];
}

function buildOkResponse(replyText, inputTokens) {
    const outputTokens = Math.ceil(replyText.length / 4);

    return {
        candidates: [
            {
                content: {
                    parts: [{ text: replyText }],
                    role: "model",
                },
                finishReason: "STOP",
            },
        ],
        usageMetadata: {
            promptTokenCount: inputTokens,
            candidatesTokenCount: outputTokens,
            totalTokenCount: inputTokens + outputTokens,
        },
    };
}

function estimateInputTokens(payload) {
    const systemText = payload.systemInstruction?.parts?.[0]?.text ?? "";
    const messagesText = (payload.contents ?? [])
        .flatMap((c) => c.parts ?? [])
        .map((p) => p.text ?? "")
        .join(" ");
    return Math.ceil((systemText.length + messagesText.length) / 4);
}

const RATE_LIMIT_PROBABILITY = 0.3;

function buildRateLimitError() {
    const err = new Error("Rate limit exceeded");
    err.status = 429;
    err.retryAfterSeconds = 5;
    return err;
}

export function send(payload) {
    return new Promise((resolve, reject) => {
        const delay = 600 + Math.random() * 1000;
        setTimeout(() => {

            if (Math.random() < RATE_LIMIT_PROBABILITY) {
                reject(buildRateLimitError());
                return;
            }
            const inputTokens = estimateInputTokens(payload);
            const reply = pickReply();
            resolve(buildOkResponse(reply, inputTokens));
        }, delay);
    });
}
