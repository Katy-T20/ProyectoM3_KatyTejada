
const state = {
    messages: [
        { role: "character", text: "Hello! I am your favorite character, what would you like to chat about?" },
    ],
    status: "idle",
    error: null,
    lastUserMessage: null,
};

export function renderChat() {
    const $app = document.querySelector("#app");

    $app.innerHTML = `
        <div class="chatApp">
            <header class="chatHeader">
                <h1 class="chatHeader__title">Chat</h1>
                <p class="chatHeader__subtitle">With your favorite character</p>
            </header>

            <main class="chatMessages" id="chatMessages" aria-live="polite">
                ${renderMessages()}
                ${renderStatus()}
            </main>

            <form class="chatComposer" id="chatComposer">
                <input
                    class="chatComposer__input"
                    id="chatInput"
                    type="text"
                    placeholder="Type a message..."
                    aria-label="Type your message"
                    ${state.status === "loading" ? "disabled" : ""}
                />
                <button class="chatComposer__send" type="submit" ${state.status === "loading" ? "disabled" : ""}>Send</button>
            </form>
        </div>
    `;

    setupChat();
    scrollToBottom();
}

function renderMessages() {
    return state.messages
    .map(msg => `<div class="message message--${msg.role}">${escapeHtml(msg.text)}</div>`)
    .join('');
}

function renderStatus() {
    if (state.status === "loading") {
        return `<div class="message message--character message--typing">Typing...</div>`;
    }
    if (state.status === "error") {
        return `
        <div class="message message--error">
        ${state.error}
        <button class="message__retry" id="retryBtn" type="button">Try Again</button>
        </div>
        `;
    }
    return "";
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function setState(updates) {
    Object.assign(state, updates);
    renderChat();
}

function setupChat() {
    const $form = document.querySelector("#chatComposer");
    const $input = document.querySelector("#chatInput");
    const $retry = document.querySelector("#retryBtn");

    $form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const text = $input.value.trim();
        if (!text) return;

        await sendMessage(text);
        $input.value = "";
    });

    $retry?.addEventListener("click", () => {
        if (state.lastUserMessage){
            sendMessage(state.lastUserMessage, true);
        }
    });
        
    document.querySelector("#chatInput")?.focus();
}
//New Function, 2nd parameter isRetry
async function sendMessage(text, isRetry = false) {
    if (!isRetry) {
        setState({
            messages: [ ...state.messages, { role: "user", text }],
            status: "loading",
            error: null,
            lastUserMessage: text,
        });
    } else {
        setState({ status: "loading", error: null });
    }

    try {
        const reply = await getCharacterReply(text);
        setState({
            messages: [ ...state.messages, { role: "character", text: reply }],
            status: "idle",
            error: null,
            lastUserMessage: null,
        });
    } catch (err) {
        setState({
            status: "error",
            error: "Opps, I couldn't respond!",
        });
    }
} 

function scrollToBottom() {
    const $messages = document.querySelector("#chatMessages");
    if ($messages) {
        $messages.scrollTop = $messages.scrollHeight;
    }
}

import { getFirstCharacterByName } from "../services/Api.js";

function getCharacterReply(userText) {
    return new Promise(async (resolve, reject) => {
        try {
            // Try to find a character based on user input
            const character = await getFirstCharacterByName(userText);
            resolve(`I found ${character.name} from Rick and Morty! Species: ${character.species}, Status: ${character.status}`);
        } catch (error) {
            if (error.code === "NO_RESULTS") {
                resolve(`I couldn't find any Rick and Morty character matching "${userText}". Try a different name!`);
            } else {
                reject(new Error("Failed to fetch character data"));
            }
        }
    });
}