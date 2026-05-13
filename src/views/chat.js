import { getCharacterReply } from "../services/aiClient.js";
import { debounce, wait } from "../services/debounce.js";
import { getUserMessage } from "../ui/messages.js";

const state = {
    messages: [
        { role: "character", text: "Hey!!! what's in your mind, what are we chat about?" },
    ],
    status: "idle",
    error: null,
    lastUserMessage: null,
    retryCountdown: null,
    currentCharacter: null,
};

export function renderChat() {
    const $app = document.querySelector("#app");
    const selectedCharacter = localStorage.getItem("selectedCharacter");

    if (selectedCharacter !== state.currentCharacter) {
        state.currentCharacter = selectedCharacter;
        state.messages = [
            { role: "character", text: "Hey!!! what's in your mind, what are we chat about?" }
        ];
        state.status = "idle";
        state.error = null;
        state.lastUserMessage = null;
    }

    applyThemeFromLastCharacter();

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
    if (state.status === "loading" && state.retryCountdown !== null) {
        return `
        <div class="message message--character message--typing">
        Waiting to retry (${state.retryCountdown} seconds)...
        </div>
        `;
    }

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

    const debouncedSend = debounce(async () => {
        if (state.status === "loading") return;

        const text = $input.value.trim();
        if (!text) return;

        await sendMessage(text);
        $input.value = "";
    }, 200);

    $form.addEventListener("submit", async (event) => {
        event.preventDefault();

        debouncedSend();
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
    const nextMessages = isRetry ? state.messages : [ ... state.messages, { role: "user", text }];

    setState({
        messages: nextMessages,
        status: "loading",
        error: null,
        retryCountdown: null, 
        lastUserMessage: isRetry ? state.lastUserMessage : text,
    });

    try {
        const reply = await getCharacterReply(nextMessages);
        setState({
            messages: [ ...state.messages, { role: "character", text: reply }],
            status: "idle",
            error: null,
            lastUserMessage: null,
        });
        } catch (err) {
            
        if (err.status === 429) {
            const seconds = err.retryAfterSeconds ?? 5;

            for (let s = seconds; s > 0; s--) {
                setState({ status: "loading", retryCountdown: s});
                await wait(1000);
            }

            try {
                setState({ status: "loading", retryCountdown: null });
                const reply = await getCharacterReply(nextMessages);
                setState({
                    messages: [ ... nextMessages, { role: "character", text: reply }],
                    status: "idle",
                    error: null,
                    lastUserMessage: null,
                });
                return;
            } catch (errRetry) {
                setState({
                    status: "error",
                    error: getUserMessage(errRetry),
                });
                return;
            }
        }
        setState({
            status: "error",
            error: getUserMessage(err),
        });
    }
} 

function scrollToBottom() {
    const $messages = document.querySelector("#chatMessages");
    if ($messages) {
        $messages.scrollTop = $messages.scrollHeight;
    }
}

/*   THEME HANDLER (Chat view)*/

function applyThemeFromLastCharacter() {
    const last = localStorage.getItem("lastCharacterName");
    if (!last) return;

    const lower = last.toLowerCase();

    document.body.classList.remove("theme-bugs", "theme-rocket", "theme-transition", "theme-portal");
    document.body.classList.add("theme-transition", "theme-portal");

    if (lower.includes("bugs") || lower.includes("bunny")) {
        document.body.classList.add("theme-bugs");
        return;
    }

    if (lower.includes("rocket") || lower.includes("raccoon")) {
        document.body.classList.add("theme-rocket");
        return;
    }
}